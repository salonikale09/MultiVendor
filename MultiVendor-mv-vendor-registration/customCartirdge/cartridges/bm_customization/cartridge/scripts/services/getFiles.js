var LocalServiceRegistry = require("dw/svc/LocalServiceRegistry");

var getFile = LocalServiceRegistry.createService("get.vendor.catalog.file", {
  createRequest: function (svc, params) {
    svc.setRequestMethod("GET");
    // if(params.filedescription == "catalog"){
      svc.addParam("filedescription",params.filedescription)
    // }
    // if(params.filedescription == "inventory"){
    //   svc.addParam("filedescription","inventory")

    // }
    // if(params.filedescription == "pricebook"){
    //   svc.addParam("filedescription","pricebook")

    // }
    return params;
  },
  parseResponse: function (svc, httpClient) {
    var result;
    try {
      result = JSON.parse(httpClient.text);
    } catch (e) {
      result = httpClient.text;
    }
    return result;
  },
});

module.exports = {
  getFile: getFile,
};
