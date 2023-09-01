"use strict";
var server = require("server");
var CustomerMgr = require("dw/customer/CustomerMgr");

importPackage(dw.net);
importPackage(dw.system);

server.get("Show", function (req, res, next) {
  var customerList = CustomerMgr.queryProfiles("firstName!=null", null);

  let customerCollection = [];
  while (customerList.hasNext()) {
    let customer = customerList.next();
    customerCollection.push({
      id: customer.customerNo,
      name: customer.firstName + " " + customer.lastName,
      designation: customer.custom.vendorDesignation,
      companyName: customer.custom.vendorCompanyName,
      catalog: customer.custom.vendorProductCategory,
      status: customer.custom.isVendorAuthenticate,
    });
  }
  res.render("vendor/vendorList", { customerData: customerCollection });
  next();
});

server.get("List", function (req, res, next) {
  var listId = req.querystring.id;
  var customerList = CustomerMgr.queryProfiles("firstName!=null", null);
  let customerCollection = [];
  if (listId === "approve") {
    while (customerList.hasNext()) {
      let customer = customerList.next();
      if (customer.custom.isVendorAuthenticate === true) {
        customerCollection.push({
          id: customer.customerNo,
          name: customer.firstName + " " + customer.lastName,
          designation: customer.custom.vendorDesignation,
          companyName: customer.custom.vendorCompanyName,
          catalog: customer.custom.vendorProductCategory,
          status: customer.custom.isVendorAuthenticate,
        });
      }
    }
  } else if (listId === "not-approve") {
    while (customerList.hasNext()) {
      let customer = customerList.next();
      if (customer.custom.isVendorAuthenticate === false) {
        customerCollection.push({
          id: customer.customerNo,
          name: customer.firstName + " " + customer.lastName,
          designation: customer.custom.vendorDesignation,
          companyName: customer.custom.vendorCompanyName,
          catalog: customer.custom.vendorProductCategory,
          status: customer.custom.isVendorAuthenticate,
        });
      }
    }
  } else if (listId === "pending") {
    while (customerList.hasNext()) {
      let customer = customerList.next();
      if (customer.custom.isVendorAuthenticate === null) {
        customerCollection.push({
          id: customer.customerNo,
          name: customer.firstName + " " + customer.lastName,
          designation: customer.custom.vendorDesignation,
          companyName: customer.custom.vendorCompanyName,
          catalog: customer.custom.vendorProductCategory,
          status: customer.custom.isVendorAuthenticate,
        });
      }
    }
  } else {
    while (customerList.hasNext()) {
      let customer = customerList.next();
      customerCollection.push({
        id: customer.customerNo,
        name: customer.firstName + " " + customer.lastName,
        designation: customer.custom.vendorDesignation,
        companyName: customer.custom.vendorCompanyName,
        catalog: customer.custom.vendorProductCategory,
        status: customer.custom.isVendorAuthenticate,
      });
    }
  }
  res.render("vendor/vendorTable", {
    customerData: customerCollection,
  });
  next();
});

server.get("Details", function (req, res, next) {
  const id = req.querystring.id;
  const customerDetails = CustomerMgr.getProfile(id);
  // var SendMail = require("*/cartridge/scripts/helpers/emailHelpers");
  // var template = "vendor/emailTemplate";
  // var context;
  // const emailObj = {
  //   to: "sachin.sendhav@codesquaretech.com",
  //   subject: "testing bro testing",
  //   from: "noreply@us01.dx.commercecloud.salesforce.com",
  // };

  // var done = SendMail.send(emailObj, template, context);

  const vendorDetails = {};
  vendorDetails.name =
    customerDetails.firstName + " " + customerDetails.lastName;
  vendorDetails.email = customerDetails.email;
  vendorDetails.id = customerDetails.customerNo;
  vendorDetails.phone = customerDetails.phoneHome;
  vendorDetails.status = customerDetails.custom.isVendorAuthenticate;
  vendorDetails.address = customerDetails.custom.vendorAddress;
  vendorDetails.companyName = customerDetails.custom.vendorCompanyName;
  vendorDetails.companyStatus = customerDetails.custom.vendorCompanyStatus;
  vendorDetails.country = customerDetails.custom.vendorCountry;
  vendorDetails.designation = customerDetails.custom.vendorDesignation;
  vendorDetails.gstNumber = customerDetails.custom.vendorGstNumber;
  vendorDetails.panNumber = customerDetails.custom.vendorPanNumber;
  vendorDetails.pinCode = customerDetails.custom.vendorPinCode;
  vendorDetails.catalog = customerDetails.custom.vendorProductCategory;
  vendorDetails.ssnNumber = customerDetails.custom.ssnNumber;

  res.render("vendor/vendorDetails", { vendorDetails: vendorDetails });
  next();
});

server.get("ApprovalStatus", function (req, res, next) {
  var Transaction = require("dw/system/Transaction");
  var CustomObjectMgr = require("dw/object/CustomObjectMgr");
  var URLUtils = require("dw/web/URLUtils");
  var mail: Mail = new dw.net.Mail();
  const catalogId = req.querystring.catId;
  const vendorId = req.querystring.id;
  const type = req.querystring.type;
  const page = req.querystring.page;
  var vendorDetails;
  var checkCatalogAvailability = true;
  Transaction.wrap(function () {
    if (type === "approve") {
      var customerList = CustomerMgr.queryProfiles("firstName!=null", null);
      let customerCollection = [];
      while (customerList.hasNext()) {
        let customer = customerList.next();
        if (customer.custom.isVendorAuthenticate === true) {
          if (customer.custom.vendorProductCategory === catalogId) {
            checkCatalogAvailability = false;
          } else {
            if (checkCatalogAvailability === false) {
              checkCatalogAvailability = false;
            } else {
              checkCatalogAvailability = true;
            }
          }
        }
      }
      if (checkCatalogAvailability === true) {
        vendorDetails = CustomerMgr.getProfile(vendorId);
        vendorDetails.custom.isVendorAuthenticate = true;
        mail.addTo(`${vendorDetails.email}`);
        mail.setFrom("noreply@us01.dx.commercecloud.salesforce.com");
        mail.setSubject(`Vendor Approval`);
        mail.setContent(
          `Hello ${
            vendorDetails.firstName + " " + vendorDetails.lastName
          }, Your request has been approved. welcome to our platform. now you can upload your catalog data`
        );
        mail.setContent(
          `<html>
         <head><title>Welcome</title></head>
         <body><b>Thank you</b> for registering at our shop!</body>
         </html>`,
          "text/html",
          "UTF-8"
        );
        mail.send();
      } else {
        res.json({ error: "already assigned!" });
      }
    } else {
      vendorDetails = CustomerMgr.getProfile(vendorId);
      vendorDetails.custom.isVendorAuthenticate = false;

      mail.addTo(`${vendorDetails.email}`);
      mail.setFrom("noreply@us01.dx.commercecloud.salesforce.com");
      mail.setSubject(`Vendor Approval`);
      mail.setContent(
        `Hello ${
          vendorDetails.firstName + " " + vendorDetails.lastName
        }, Your request has been not approved.we will contact later.`
      );
      mail.send();
    }
  });
  res.redirect(URLUtils.url("Vendor-Details", "id", vendorId));
  next();
});

module.exports = server.exports();
