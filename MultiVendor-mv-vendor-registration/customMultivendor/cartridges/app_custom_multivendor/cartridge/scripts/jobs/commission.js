function getCommission() {
  var Site = require("dw/system/Site");
  var ArrayList = require("dw/util/ArrayList");
  var CustomerList = require("dw/customer/CustomerList");
  var ukCommission = new ArrayList();
  var franceCommission = new ArrayList();
  var commission = Site.current.preferences.getCustom()["arrayOfVendors"];
  var commissionList = JSON.parse(commission);

  var OrderMgr = require('dw/order/OrderMgr');
  var totalOrderPrice = 0;
  var ordersList = OrderMgr.queryOrders("UUID != null", null, "asc");
  var orderPriceArr = [];
  while (ordersList.hasNext()) {
    var list = ordersList.next();
    if(!list.custom.CommissionCounted){
    var CustomerMgr = require("dw/customer/CustomerMgr");
    var customerList = CustomerMgr.queryProfiles("custom.vendorCompanyName != null",null,null);

    //   customer list merge krna h bhulna nai h .. fir ek hi site ki customer list ko access krke vendorki compnay k through compare krna h 
      while (customerList.hasNext()) {
        var customers = customerList.next();
        var array = list.allProductLineItems.toArray();
        for (var i = 0; i < array.length; i++) {
            if (array[i].manufacturerName == customers.custom.vendorCompanyName) {
               customers.custom.totalSale += array[i].adjustedGrossPrice + list.adjustedShippingTotalGrossPrice;
                customers.custom.amount += array[i].adjustedGrossPrice + list.adjustedShippingTotalGrossPrice;
                customers.custom.commissionOfVendor =+ (customers.custom.amount * 0.05);
            } else {
                continue;
            }
        }
    }
    }
    list.custom.CommissionCounted = true
  }
}
module.exports = {
  execute: getCommission,
};
