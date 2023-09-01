"use strict";

/**
 * @namespace Home
 */

var server = require("server");
var page = require("app_storefront_base/cartridge/controllers/Home");
server.extend(page);
/**
 * Any customization on this endpoint, also requires update for Default-Start endpoint
 */
/**
 * Home-Show : This endpoint is called when a shopper navigates to the home page
 * @name Base/Home-Show
 * @function
 * @memberof Home
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - cache.applyDefaultCache
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.replace("Show", function (req, res, next) {
  var URLUtils = require("dw/web/URLUtils");
  if (customer.isAuthenticated()) {
    res.redirect(URLUtils.url("Account-SetLocale"));
  } else {
    res.redirect(URLUtils.url("Login-SetLocale"));
  }
  next();
});

module.exports = server.exports();
