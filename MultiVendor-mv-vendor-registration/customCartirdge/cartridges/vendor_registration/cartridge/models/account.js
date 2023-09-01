'use strict';
/**
 * Account class that represents the current customer's profile dashboard
 * @param {Object} currentCustomer - Current customer
 * @param {Object} profile - current customer's profile
 * @returns {Object} an object that contains information about the current customer's profile
 * @constructor
 */

function account(currentCustomer, addressModel, orderModel) {
  module.superModule.call(this, currentCustomer, addressModel, orderModel);
  var profile = currentCustomer.raw.profile;
  this.profile.ssnNumber = profile.custom.ssnNumber;
  this.profile.vendorAddress = profile.custom.vendorAddress;
  this.profile.vendorCompanyStatus = profile.custom.vendorCompanyStatus;
  this.profile.vendorCompanyName = profile.custom.vendorCompanyName;
  this.profile.vendorCountry = profile.custom.vendorCountry;
  this.profile.vendorDesignation = profile.custom.vendorDesignation;
  this.profile.vendorProductCategory = profile.custom.vendorProductCategory;
  this.profile.gstNumber = profile.custom.vendorGstNumber;
  this.profile.panNumber = profile.custom.vendorPanNumber;
  this.profile.pinCode = profile.custom.vendorPinCode;
  this.profile.amount = profile.custom.amount;
  this.profile.commissionOfVendor = profile.custom.commissionOfVendor;
  this.profile.totalAmountPaid = profile.custom.totalAmountPaid;
  this.profile.totalSale = profile.custom.totalSale;
}


module.exports = account;
