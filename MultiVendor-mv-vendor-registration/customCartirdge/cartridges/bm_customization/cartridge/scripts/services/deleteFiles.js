var LocalServiceRegistry = require("dw/svc/LocalServiceRegistry");

var deleteFile = LocalServiceRegistry.createService("DeleteVendorFiles", {
  createRequest: function (svc, params) {
    svc.setRequestMethod("DELETE");
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
    deleteFile: deleteFile,
};
