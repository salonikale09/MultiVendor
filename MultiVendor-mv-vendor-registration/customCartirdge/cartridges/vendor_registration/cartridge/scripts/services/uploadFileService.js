var LocalServiceRegistry = require("dw/svc/LocalServiceRegistry");
var HTTPRequestPart = require('dw/net/HTTPRequestPart');
var UploadFileService = LocalServiceRegistry.createService("vendor.catalog.file.upload", {
  createRequest: function (svc, params) {
    svc.setRequestMethod("POST");

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
  UploadFileService: UploadFileService,
};
