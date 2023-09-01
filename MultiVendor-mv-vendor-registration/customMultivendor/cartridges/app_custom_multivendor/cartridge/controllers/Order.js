'use strict';
var server = require('server');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var userLoggedIn = require('*/cartridge/scripts/middleware/userLoggedIn');
var csrfProtection = require("*/cartridge/scripts/middleware/csrf");
var Resource = require("dw/web/Resource");

server.get('getOrderCommision',
      function (req, res, next) {
        // res.render('tem');  
        var Site = require('dw/system/Site');
        var CustomerMgr = require('dw/customer/CustomerMgr');
        var CustomerMgr = require("dw/customer/CustomerMgr");
        var customerList = CustomerMgr.queryProfiles("custom.vendorCompanyName != null",null,null);
        
        var culis;
        var manufacturer =[];
        var manufacturerDetail =[];
        while(customerList.hasNext()){
          culis = customerList.next();
          manufacturer.push(culis.custom.vendorCompanyName);
        }
        if(manufacturer.includes(req.querystring.vendorname)){
          manufacturer = [req.querystring.vendorname]
        }
        else{
          manufacturer = [];
        }
        var URLUtils = require('dw/web/URLUtils');
      var OrderMgr = require('dw/order/OrderMgr');
      var ordersList = OrderMgr.queryOrders('UUID != null', null, 'asc');
      var createAccountUrl = URLUtils.url('Order-getOrderCommision')
      var orderPriceArr = [];
      while (ordersList.hasNext()) {
        var list = ordersList.next();
        for (var i = 0; i < list.allProductLineItems.length; i++) {
            for(var j=0;j<manufacturer.length;j++){
                if (list.allProductLineItems[i].manufacturerName == manufacturer[j]) {
                    orderPriceArr.push({ manufacturer: list.allProductLineItems[i].manufacturerName, total: list.adjustedMerchandizeTotalGrossPrice + list.adjustedShippingTotalGrossPrice });
                  } else {
                  }
            }
        }
      }
      var arr = orderPriceArr;
      let result = Object.values(arr.reduce((c, {manufacturer,total}) => {
        c[manufacturer] = c[manufacturer] || {manufacturer,total: 0};
        c[manufacturer].total += total;
        return c;
      }, {}));
      var clist
      result.forEach(element => {
       element.commision = element.total*0.05;
      });

      res.render('commisiontemplate',{result:result,createAccountUrl:createAccountUrl})
        next();
      });

      server.get(
        'History',
        consentTracking.consent,
        server.middleware.https,
        userLoggedIn.validateLoggedIn,
        function (req, res, next) {
            var OrderHelpers = require('*/cartridge/scripts/order/orderHelpers');
    
            var ordersResult = OrderHelpers.getOrders(
                req.currentCustomer,
                req.querystring,
                req.locale.id
            );
            var orders = ordersResult.orders;
            var filterValues = ordersResult.filterValues;
            var breadcrumbs = [
                {
                    htmlValue: Resource.msg('global.home', 'common', null),
                    url: URLUtils.home().toString()
                },
                {
                    htmlValue: Resource.msg('page.title.myaccount', 'account', null),
                    url: URLUtils.url('Account-Show').toString()
                }
            ];
    
            res.render('account/order/history', {
                orders: orders,
                filterValues: filterValues,
                orderFilter: req.querystring.orderFilter,
                accountlanding: false,
                breadcrumbs: breadcrumbs
            });
            next();
        }
    );

    server.post(
      'Confirm',
      consentTracking.consent,
      server.middleware.https,
      csrfProtection.generateToken,
      function (req, res, next) {
          var reportingUrlsHelper = require('*/cartridge/scripts/reportingUrls');
          var OrderMgr = require('dw/order/OrderMgr');
          var OrderModel = require('*/cartridge/models/order');
          var Locale = require('dw/util/Locale');
  
          var order;
  
          if (!req.form.orderToken || !req.form.orderID) {
              res.render('/error', {
                  message: Resource.msg('error.confirmation.error', 'confirmation', null)
              });
  
              return next();
          }
  
          order = OrderMgr.getOrder(req.form.orderID, req.form.orderToken);
  
          if (!order || order.customer.ID !== req.currentCustomer.raw.ID
          ) {
              res.render('/error', {
                  message: Resource.msg('error.confirmation.error', 'confirmation', null)
              });
  
              return next();
          }
          var lastOrderID = Object.prototype.hasOwnProperty.call(req.session.raw.custom, 'orderID') ? req.session.raw.custom.orderID : null;
          if (lastOrderID === req.querystring.ID) {
              res.redirect(URLUtils.url('Home-Show'));
              return next();
          }
  
          var config = {
              numberOfLineItems: '*'
          };
  
          var currentLocale = Locale.getLocale(req.locale.id);
  
          var orderModel = new OrderModel(
              order,
              { config: config, countryCode: currentLocale.country, containerView: 'order' }
          );
          var passwordForm;
  
          var reportingURLs = reportingUrlsHelper.getOrderReportingURLs(order);
  
          if (!req.currentCustomer.profile) {
              passwordForm = server.forms.getForm('newPasswords');
              passwordForm.clear();
              res.render('checkout/confirmation/confirmation', {
                  order: orderModel,
                  returningCustomer: false,
                  passwordForm: passwordForm,
                  reportingURLs: reportingURLs,
                  orderUUID: order.getUUID()
              });
          } else {
              res.render('checkout/confirmation/confirmation', {
                  order: orderModel,
                  returningCustomer: true,
                  reportingURLs: reportingURLs,
                  orderUUID: order.getUUID()
              });
          }
          req.session.raw.custom.orderID = req.querystring.ID; // eslint-disable-line no-param-reassign
          return next();
      }
  );



module.exports = server.exports();