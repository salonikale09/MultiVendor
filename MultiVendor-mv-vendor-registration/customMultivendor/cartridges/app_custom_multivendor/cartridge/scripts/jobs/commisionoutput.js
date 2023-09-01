function getCommission() {
    var Site = require('dw/system/Site');
        var CustomerMgr = require('dw/customer/CustomerMgr');
        var commisionPercentage = Site.getCurrent().getPreferences().getCustom()["commisionPercentage"];
        var customerDetail = CustomerMgr.getSiteCustomerList();
        var URLUtils = require('dw/web/URLUtils');
      var OrderMgr = require('dw/order/OrderMgr');
      var customerList = CustomerMgr.queryProfiles("custom.vendorCompanyName != null",null,null);
      var manufacturer =[];
      if(req.querystring.vendorname){
        manufacturer = [req.querystring.vendorname]
      }
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
      result.forEach(element => {
        element.commision = element.total*0.05;
      });
  }
  module.exports = {
    execute: getCommission,
  };
