var server = require("server");
var csrfProtection = require("*/cartridge/scripts/middleware/csrf");
var userLoggedIn = require("*/cartridge/scripts/middleware/userLoggedIn");
var page = require("app_storefront_base/cartridge/controllers/Account");
server.extend(page);

/**
 * Account-Show : The Account-Show endpoint will render the vendor's account page. Once a vendor logs in they will see is a dashboard that displays profile, password & when the person request will accepted then the file uploading column.
 * @name Base/Account-SetLocale
 * @function
 * @memberof Account
 * @param {default} - request.setLocale is used to set the locale and then redirect to the Account-Show
 * @param {helper} -  path - /cartridge/scripts/vendorHelpers/localeSetting. function_used - setLocale()
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
  res.redirect(URLUtils.url("Account-Show").toString());
  next();
});

/**
 * Account-Show : The Account-Show endpoint will render the vendor's account page. Once a vendor logs in they will see is a dashboard that displays profile, password & when the person request will accepted then the file uploading column.
 * @name Base/Account-Show
 * @function
 * @memberof Account
 * @param {middleware} - server.middleware.https
 * @param {middleware} - userLoggedIn.validateLoggedIn
 * @param {middleware} - consentTracking.consent
 * @param {querystringparameter} - registration - A flag determining whether or not this is a newly registered account
 * @param {category} - senstive
 * @param {customAttribute} - isVendorAuthenticated 
 * @param {customAttribute} - registered_locale
 * @param {renders} - isml
 * @param {serverfunction} - get
 */

server.append("Show",server.middleware.https,userLoggedIn.validateLoggedIn,function (req, res, next) {
    var data = res.getViewData();
    var status = customer.getProfile();
    // request.setLocale(status.custom.registered_locale);
    var check = status.custom.isVendorAuthenticate;
    res.render("account/customDashBoard", { check: check });
    res.setViewData(data);
    next();
  }
);

/**
 * Account-SubmitRegistration : The Account-SubmitRegistration endpoint is the endpoint that gets hit when a vendor submits their registration for a new account
 * @name Base/Account-SubmitRegistration
 * @function
 * @memberof Account
 * @param {middleware} - server.middleware.https
 * @param {middleware} - csrfProtection.validateAjaxRequest
 * @param {querystringparameter} - rurl - redirect url. The value of this is a number. This number then gets mapped to an endpoint set up in oAuthRenentryRedirectEndpoints.js
 * @param {httpparameter} - dwfrm_profile_customer_firstname - Input field for the vendors's first name
 * @param {httpparameter} - dwfrm_profile_customer_lastname - Input field for the vendor's last name
 * @param {httpparameter} - dwfrm_profile_customer_phone - Input field for the vendor's phone number
 * @param {httpparameter} - dwfrm_profile_customer_email - Input field for the vendor's email address
 * @param {httpparameter} - dwfrm_profile_customer_emailconfirm - Input field for the vendor's email address
 * @param {httpparameter} - dwfrm_profile_login_password - Input field for the vendor's password
 * @param {httpparameter} - dwfrm_profile_login_passwordconfirm: - Input field for the vendor's password to confirm
 * @param {httpparameter} - dwfrm_profile_customer_addtoemaillist - Checkbox for whether or not a vendor wants to be added to the mailing list
 * @param {httpparameter} - csrf_token - hidden input field CSRF token
 * @param {httpparameter} - dwfrm_profile_customer_vendorCountry - drowdown field for selection of country of the vendor.
 * @param {httpparameter} - dwfrm_profile_customer_vendorPan - Input field for the PAN number of the vendor
 * @param {httpparameter} - dwfrm_profile_customer_vendorPin - Input field for the PIN code the area where the factory is situated
 * @param {httpparameter} - dwfrm_profile_customer_vendorGst - Input field for the GST number associated with the firm.
 * @param {httpparameter} - dwfrm_profile_customer_ssnNumber - Input field for the Social Security Number. Only available for the foreign vendors.
 * @param {httpparameter} - dwfrm_profile_customer_vendorAddress - field for the address of the firm
 * @param {httpparameter} - dwfrm_profile_customer_vendorCompanyStatus - Field for the selection of company status. Available in the dropdown.
 * @param {httpparameter} - dwfrm_profile_customer_vendorDesignation - field for the selection of vendor designation. Available in the dropdown.
 * @param {httpparameter} - dwfrm_profile_customer_vendorCompanyName - Input field for the name of the company.
 * @param {httpparameter} - dwfrm_profile_customer_vendorProductCategory - field for the selection of product which is sell by the vendor in our storefront.
 * @param {category} - sensitive
 * @param {returns} - json
 * @param {serverfunction} - post
 */

server.replace("SubmitRegistration", function (req, res, next) {
  var CustomerMgr = require("dw/customer/CustomerMgr");
  var Resource = require("dw/web/Resource");

  var formErrors = require("*/cartridge/scripts/formErrors");

  var registrationForm = server.forms.getForm("profile");

  // form validation
  // if (
  //   registrationForm.customer.email.value.toLowerCase() !==
  //   registrationForm.customer.emailconfirm.value.toLowerCase()
  // ) {
  //   registrationForm.customer.email.valid = false;
  //   registrationForm.customer.emailconfirm.valid = false;
  //   registrationForm.customer.emailconfirm.error = Resource.msg(
  //     "error.message.mismatch.email",
  //     "forms",
  //     null
  //   );
  //   registrationForm.valid = false;
  // }

  // if (
  //   registrationForm.login.password.value !==
  //   registrationForm.login.passwordconfirm.value
  // ) {
  //   registrationForm.login.password.valid = false;
  //   registrationForm.login.passwordconfirm.valid = false;
  //   registrationForm.login.passwordconfirm.error = Resource.msg(
  //     "error.message.mismatch.password",
  //     "forms",
  //     null
  //   );
  //   registrationForm.valid = false;
  // }

  // if (
  //   !CustomerMgr.isAcceptablePassword(registrationForm.login.password.value)
  // ) {
  //   registrationForm.login.password.valid = false;
  //   registrationForm.login.passwordconfirm.valid = false;
  //   registrationForm.login.passwordconfirm.error = Resource.msg(
  //     "error.message.password.constraints.not.matched",
  //     "forms",
  //     null
  //   );
  //   registrationForm.valid = false;
  // }

  var inProfile = {
    vendorPan:
      req.locale.id == "default"
        ? registrationForm.customer.vendorPanNumber.value
        : null,
    vendorPin:
      req.locale.id == "default"
        ? registrationForm.customer.vendorPinCode.value
        : null,
    vendorGst:
      req.locale.id == "default"
        ? registrationForm.customer.vendorGstNumber.value
        : null,
  };

  var gbProfile = {
    vendorSsn:
      req.locale.id == "fr_FR" || req.locale.id == "en_GB"
        ? registrationForm.customer.ssnNumber.value
        : null,
  };

  // setting variables for the BeforeComplete function
  var registrationFormObj = {
    firstName: registrationForm.customer.firstname.value,
    lastName: registrationForm.customer.lastname.value,
    phone: registrationForm.customer.phone.value,
    email: registrationForm.customer.email.value,
    emailConfirm: registrationForm.customer.emailconfirm.value,
    password: registrationForm.login.password.value,
    passwordConfirm: registrationForm.login.passwordconfirm.value,
    vendorCountry: registrationForm.customer.vendorCountry.value,
    vendorAddress: registrationForm.customer.vendorAddress.value,
    vendorCompanyStatus: registrationForm.customer.vendorCompanyStatus.value,
    inProfile: !empty(inProfile) ? inProfile : null,
    gbProfile: !empty(gbProfile) ? gbProfile : null,
    vendorCompanyName: registrationForm.customer.vendorCompanyName.value,
    vendorDesignation: registrationForm.customer.vendorDesignation.value,
    vendorProductCategory: registrationForm.customer.vendorProductCategory.value,
    vendorAccountHolderName: registrationForm.customer.accountholdername.value,
    vendorAccountIfsc: registrationForm.customer.accountifsc.value,
    vendorAccountNumber: registrationForm.customer.accountNumber.value,
    validForm: registrationForm.valid,
    form: registrationForm,
  };

  if (registrationForm.valid) {
    res.setViewData(registrationFormObj);

    this.on("route:BeforeComplete", function (req, res) {
      // eslint-disable-line no-shadow
      var Transaction = require("dw/system/Transaction");
      var accountHelpers = require("*/cartridge/scripts/helpers/accountHelpers");
      var authenticatedCustomer;
      var serverError;

      // getting variables for the BeforeComplete function
      var registrationForm = res.getViewData(); // eslint-disable-line
      if (registrationForm.validForm) {
        var login = registrationForm.email;
        var password = registrationForm.password;

        // attempt to create a new user and log that user in.
        try {
          Transaction.wrap(function () {
            var error = {};
            var newCustomer = CustomerMgr.createCustomer(login, password);

            var authenticateCustomerResult = CustomerMgr.authenticateCustomer(
              login,
              password
            );
            if (authenticateCustomerResult.status !== "AUTH_OK") {
              error = {
                authError: true,
                status: authenticateCustomerResult.status,
              };
              throw error;
            }

            authenticatedCustomer = CustomerMgr.loginCustomer(
              authenticateCustomerResult,
              false
            );

            if (!authenticatedCustomer) {
              error = {
                authError: true,
                status: authenticateCustomerResult.status,
              };
              throw error;
            } else {
              // assign values to the profile
              var newCustomerProfile = newCustomer.getProfile();

              newCustomerProfile.firstName = registrationForm.firstName;
              newCustomerProfile.lastName = registrationForm.lastName;
              newCustomerProfile.phoneHome = registrationForm.phone;
              newCustomerProfile.email = registrationForm.email;
              newCustomerProfile.custom.registered_locale = req.locale.id;
              newCustomerProfile.custom.vendorAddress =
                registrationForm.vendorAddress;
              newCustomerProfile.custom.vendorCompanyName =
                registrationForm.vendorCompanyName;
              newCustomerProfile.custom.vendorCompanyStatus =
                registrationForm.vendorCompanyStatus;
              newCustomerProfile.custom.vendorCountry =
                registrationForm.vendorCountry;
              newCustomerProfile.custom.vendorDesignation =
                registrationForm.vendorDesignation;
              newCustomerProfile.custom.vendorPinCode =
                registrationForm.inProfile.vendorPin;
              newCustomerProfile.custom.vendorGstNumber =
                registrationForm.inProfile.vendorGst;
              newCustomerProfile.custom.vendorPanNumber =
                registrationForm.inProfile.vendorPan;
              // newCustomerProfile.custom.pan_image = registrationForm.vendorPan;
              newCustomerProfile.custom.vendorProductCategory =
                registrationForm.vendorProductCategory;
              newCustomerProfile.custom.vendorAccountHolderName =
                registrationForm.vendorAccountHolderName;
              newCustomerProfile.custom.vendorAccountIfsc =
                registrationForm.vendorAccountIfsc;
              newCustomerProfile.custom.vendorAccountNumber =
                registrationForm.vendorAccountNumber;
              newCustomerProfile.custom.ssnNumber =
                registrationForm.gbProfile.vendorSsn;
            }
          });
        } catch (e) {
          var a = e;
          if (e.authError) {
            
            serverError = true;
          } else {
            registrationForm.validForm = false;
            registrationForm.form.customer.email.valid = false;
            registrationForm.form.customer.emailconfirm.valid = false;
            registrationForm.form.customer.email.error = Resource.msg(
              "error.message.username.invalid",
              "forms",
              null
            );
          }
        }
      }

      delete registrationForm.password;
      delete registrationForm.passwordConfirm;
      formErrors.removeFormValues(registrationForm.form);

      if (serverError) {
        res.setStatusCode(500);
        res.json({
          success: false,
          errorMessage: Resource.msg(
            "error.message.unable.to.create.account",
            "login",
            null
          ),
        });

        return;
      }

      if (registrationForm.validForm) {
        // send a registration email
        accountHelpers.sendCreateAccountEmail(authenticatedCustomer.profile);

        res.setViewData({ authenticatedCustomer: authenticatedCustomer });
        res.json({
          success: true,
          redirectUrl: accountHelpers.getLoginRedirectURL(
            req.querystring.rurl,
            req.session.privacyCache,
            true
          ),
        });

        req.session.privacyCache.set("args", null);
      } else {
        res.json({
          fields: formErrors.getFormErrors(registrationForm),
        });
      }
    });
  } else {
    res.json({
      fields: formErrors.getFormErrors(registrationForm),
    });
  }

  return next();
});

module.exports = server.exports();