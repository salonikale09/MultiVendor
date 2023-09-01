var server = require("server");
var csrfProtection = require("*/cartridge/scripts/middleware/csrf");
var page = require("app_storefront_base/cartridge/controllers/Login");
var CatalogMgr = require("dw/catalog/CatalogMgr");
var CustomerMgr = require("dw/customer/CustomerMgr");
server.extend(page);

/**
 * Account-Show : The Account-Show endpoint will render the vendor's account page. Once a vendor logs in they will see is a dashboard that displays profile, password & when the person request will accepted then the file uploading column.
 * @name Base/Account-SetLocale
 * @function
 * @memberof Account
 * @param {default} - request.setLocale is used to set the locale and then redirect to the Account-Show
 * @param {helper} - /cartridge/scripts/vendorHelpers/localeSetting.js in which setLocale() is used.
 */

server.get("SetLocale", function (req, res, next) {
    /*notepad for the further notes or for the second approach but that was lengthy*/
    var URLUtils = require("dw/web/URLUtils");
    var countryLocale = {
        IN: "en_US",
        FR: "fr_FR",
        GB: "en_GB",
    };
    req.setLocale(countryLocale[req.geolocation.countryCode]);
  res.redirect(URLUtils.url("Login-Show").toString());
  next();
});

/**
 * Login-Show : This endpoint is called to load the login page
 * @name Base/Login-Show
 * @function
 * @memberof Login
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - server.middleware.https
 * @param {middleware} - csrfProtection.generateToken
 * @param {querystringparameter} - rurl - Redirect URL
 * @param {querystringparameter} - action - Action on submit of Login Form
 * @param {variable} - loginData. Which is use for helper.
 * @param {helper} -  path - /cartridge/scripts/vendorHelpers/localeSetting. function_used - login()
 * @param {category} - sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */

server.append(
  "Show",
  server.middleware.https,
  csrfProtection.generateToken,
  function (req, res, next) {
    var loginData = require('*/cartridge/scripts/vendorHelpers/localeSetting');
    loginData.login(res,req);
    next();
  }
);

module.exports = server.exports();
