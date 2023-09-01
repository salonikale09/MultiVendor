"use strict";

var server = require("server");
var CustomerMgr = require("dw/customer/CustomerMgr");
var OrderMgr = require("dw/order/OrderMgr");
var Transaction = require("dw/system/Transaction");
importPackage(dw.net);
importPackage(dw.system);

server.get("getCommissionPage", function (req, res, next) {
  res.render("commisiontemplate");
  next();
});

server.get("getCommission", function (req, res, next) {
  var customer = req.querystring.vendorname;
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const d = new Date();
  let months = month[d.getMonth()];
  var customers = CustomerMgr.queryProfiles(
    "custom.vendorCompanyName != null",
    null,
    null
  );
  var commission = [];
  while (customers.hasNext()) {
    var customerData = customers.next();
    if (customer == customerData.custom.vendorCompanyName) {
      commission.push({
        amount: customerData.custom.amount,
        commission: customerData.custom.commissionOfVendor,
        customerData: customerData,
      });
    }
  }
  res.render("commisiontemplate", {
    commission: commission,
    customer: customer,
    months:months
  });
  next();
});

server.get("paymentDone", function (req, res, next) {
  var customerNumber = req.querystring.customerNumber;
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const d = new Date();
  let months = month[d.getMonth()];
  Transaction.wrap(function () {
    var customer = CustomerMgr.getProfile(customerNumber);
    var mail: Mail = new dw.net.Mail();
    mail.addTo(customer.email);
    mail.setFrom("noreply@us01.dx.commercecloud.salesforce.com");
    mail.setSubject("Payment Settlement Done");
    // sets the content of the mail as plain string
    mail.setContent(
      `
         <html>
         <head><title>Payment Settlement of the month : ${months}</title></head>
         <body>
            <p>Your Settlement of the month ${months} is: </p>
         <div>
            Total Sale : ${customer.custom.amount} <br>
            Codesquare Commission : ${customer.custom.commissionOfVendor} <br>
            Amount Transfered : ${
              customer.custom.amount - customer.custom.commissionOfVendor
            } <br>
         </div>
         <p> Note : After Settlement done, the values of Total Sale and Commission turned to 0.</p>
         <b>Thank you</b>!
         <b> Codesquare Team</b>
         </body>
         </html>`,
      `text/html`,
      `UTF-8`
    );

    mail.send();
    customer.custom.totalAmountPaid += (customer.custom.amount - customer.custom.commissionOfVendor);
    customer.custom.amount = 0;
    customer.custom.commissionOfVendor = 0;
  });
  res.render("commisiontemplate");
  next();
});

module.exports = server.exports();
