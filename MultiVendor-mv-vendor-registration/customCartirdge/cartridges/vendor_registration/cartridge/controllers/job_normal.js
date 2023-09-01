'use strict';

function removeProfileAttributeFun() {
    var Logger = require('dw/system/Logger');
    Logger.error("hii, its my first steptype json job");
    var CustomerMgr = require('dw/customer/CustomerMgr');
    var customerGroup = CustomerMgr.getCustomerGroups();
         var Collection = require('dw/util/Collection');
         var group = (myCustomer.customer.customerGroups).toArray()
         var member = false;
         group.map((item,index)=>{
            if(item.ID == ("ydMemberShipSilver","ydMemberShipGold","ydMemberShipPlatinum")){
                member = true;
            }
         })
         var Transaction = require('dw/system/Transaction');

         if (member ==false ){
            Transaction.wrap(function () {
            myCustomer.custom.ydIsMemberGold = "";
        })
         }
    }

module.exports = {
    execute: removeProfileAttributeFun
}