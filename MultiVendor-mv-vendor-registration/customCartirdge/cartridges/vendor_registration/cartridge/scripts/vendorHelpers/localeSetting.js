'use strict'

var CatalogMgr = require("dw/catalog/CatalogMgr");
var CustomerMgr = require("dw/customer/CustomerMgr");

/**
 * Showing Product list which is not assigned to other vendor (refinement)
 * @function
 * @param {setLocale} - setting locale as per the vendor's country.
 * @locale - forms available in three locales United States, United Kingdom, & France. 
 * @site_preference - vendorDesignation & vendorCompanyStatus.
 * @param {catalog} - catalog manager is used for getting data.
 * @param {httpparameter} - levelTwoCategory - to store the level two category of the categories
 * @param {httpparameter} - designations - contain the list of designation a vendor can select.
 * @param {httpparameter} - companyWorth - contain the list of the company worth a vendor can select.
 * @param {httpparameter} - selectedCategory - list of category alotted to the vendor
 * @locale - forms available in three locales United States, United Kingdom, & France. 
 */ 

function login(res,req){
    var Site = require("dw/system/Site");
    var data = res.getViewData();
    if(req.locale.id == 'default' || req.locale.id == 'en_GB'){
    var subjectData = Site.getCurrent().getCustomPreferenceValue("vendorDesignations");
    var designations = JSON.parse(subjectData);

    var companyWorthList = Site.getCurrent().getCustomPreferenceValue("vendorCompanyStatus");
    var companyWorth = JSON.parse(companyWorthList);
    }
    else if(req.locale.id == 'fr_FR'){
    var subjectData = Site.getCurrent().getCustomPreferenceValue("vendorDesignationFr");
    var designations = JSON.parse(subjectData);

    var companyWorthList = Site.getCurrent().getCustomPreferenceValue("vendorCompanyWorthFr");
    var companyWorth = JSON.parse(companyWorthList);
    }
    else{
    }

    // getting data for category dropdown from catalog
    var levelTwoCategory = [];
    var selectedCategory = [];
    var getCatalog = CatalogMgr.getCatalog("storefront-catalog-m-en-VR");
    var subcategory = getCatalog.root.subCategories;
    for (var i = 0; i < subcategory.length; i++) {
      var secondLevel = subcategory[i].subCategories;
      for (var j = 0; j < secondLevel.length; j++) {
        var final = secondLevel[j];
        levelTwoCategory.push({
          id: final.ID,
          name: final.displayName,
        });
      }
    }
    var customerList = CustomerMgr.queryProfiles("firstName!=null", null);
    let customerCollection = [];
    while (customerList.hasNext()) {
      let customer = customerList.next();
      if (customer.custom.isVendorAuthenticate === true) {
        selectedCategory.push(customer.custom.vendorProductCategory);
      }
    }

    // for (var i = levelTwoCategory.length - 1; i >= 0; i--) {
    //   for (var j = 0; j < selectedCategory.length; j++) {
    //     if (levelTwoCategory[i].id === selectedCategory[j]) {
    //       levelTwoCategory.splice(i, 1);
    //       }
    //     }
    //   }
    data.levelTwoCategory = levelTwoCategory;
    data.designations = designations;
    data.companyWorth = companyWorth;
    res.setViewData(data);
    
}

module.exports = {
    login:login
};