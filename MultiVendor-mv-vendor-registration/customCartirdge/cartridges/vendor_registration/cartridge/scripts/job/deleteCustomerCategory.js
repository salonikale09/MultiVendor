'use strict'

// function RenewCategory(){
//     var CustomerMgr = require('dw/customer/CustomerMgr');
//     var Customer = require('dw/customer/Customer');
//     var CustomObjectMgr = require('dw/object/CustomObjectMgr');
//     var tru = [];
//     var category = CustomObjectMgr.getAllCustomObjects('catalogListForVendor');
//     while(category.hasNext()){
//         var categories = category.next();
//         categories.custom.catalogStatus = true;
//         tru.push(categories);
//     }
//     var profile = CustomerMgr.queryProfiles('firstName != null',null);
//     while(profile.hasNext()){
//         var pro = profile.next();
//         for(var i=0; i<tru.length;i++){
//             if(pro.custom.vendorProductCategory == tru[i].custom.catalogId){
//             tru[i].custom.catalogStatus = false
//             }
//         }
//     }
// }

function RenewCategory(){
    var CustomerMgr = require('dw/customer/CustomerMgr');
    var Customer = require('dw/customer/Customer');
    var CustomObjectMgr = require('dw/object/CustomObjectMgr');
    var tru = [];
    var categories = CustomObjectMgr.getAllCustomObjects('catalogListForVendor');
    while(categories.hasNext()){
        var category = categories.next();
        if(!category.custom.catalogStatus){
            tru.push(category);
        }
    }
    var profile = CustomerMgr.queryProfiles('firstName != null',null);
    if(profile.count == 0){
        for(var i=0;i<tru.length;i++){
            tru[i].custom.catalogStatus = true;
        }
    }
    else{
    while(profile.hasNext()){
        var pro = profile.next();
        for(var i=0; i<tru.length;i++){
            if(pro.custom.vendorProductCategory != tru[i].custom.catalogId){
            tru[i].custom.catalogStatus = true
            }
        }
    }
  }
}

module.exports = {execute:RenewCategory};