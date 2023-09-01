'use strict';
var server = require('server');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');


server.get('Show', function (req, res, next) {
  var Transaction = require('dw/system/Transaction');
  var Preview = CustomObjectMgr.getCustomObject('showPreview', '1');
  Preview = Preview.custom.Show;
  var service = require('*/cartridge/scripts/services/getFiles');
  var params = { filedescription: 'catalog' };
  var catalog = service.getFile.call(params);
  res.render('product/catalogData', { catalog: catalog.object.data, preview: Preview });
  next();
});


server.get('singleFile', function (req, res, next) {
  var filename = req.querystring.filename;
  var service = require('*/cartridge/scripts/services/getFiles');

  var params = { filedescription: 'catalog' };
  var catalog = service.getFile.call(params);
  res.render('product/showfile', { catalog: catalog.object.data, preview: Preview });
  next();
});

// server.get(
//   'getOrderCommision',
//   server.middleware.https,
//   consentTracking.consent,
//   userLoggedIn.validateLoggedInAjax,
//   function (req, res, next) {
//     var URLUtils = require('dw/web/URLUtils');
//     var OrderMgr = require('dw/order/OrderMgr');
//     var manufacturer = ["Anmol Wearings","Anmol Sports"]
//     var ordersList = OrderMgr.queryOrders('UUID != null', null, 'asc');
//     var createAccountUrl = URLUtils.url('Order-getOrderCommision')
//     var orderPriceArr = [];
//     while (ordersList.hasNext()) {
//       var list = ordersList.next();
//       for (var i = 0; i < list.allProductLineItems.length; i++) {
//           for(var j=0;j<manufacturer.length;j++){
//               if (list.allProductLineItems[i].manufacturerName == manufacturer[j]) {
//                   orderPriceArr.push({ manufacturer: list.allProductLineItems[i].manufacturerName, total: list.adjustedMerchandizeTotalGrossPrice + list.adjustedShippingTotalGrossPrice });
//                 } else {
//                 }
//           }
//       }
//     }
//     var arr = orderPriceArr;
//     let result = Object.values(arr.reduce((c, {manufacturer,total}) => {
//       c[manufacturer] = c[manufacturer] || {manufacturer,total: 0};
//       c[manufacturer].total += total;
//       return c;
//     }, {}));
//     result.forEach(element => {
//       element.commision = element.total*0.05
//     });
//     res.render('commisiontemplate',{result:result,createAccountUrl:createAccountUrl})
//     next();
// });

module.exports = server.exports();
