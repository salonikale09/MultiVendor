'use strict';

/**
 * @namespace CatalogFile
 */

var server = require("server");

server.post("Upload", function (req, res, next) {
  var service = require("*/cartridge/scripts/services/uploadFileService");

  // var form = req.form;
  // var xml = form.xmlFile;
  // var params = {
  //   file: xml,
  // };

  // var result = service.UploadFileService.call(params);
  var result = service.UploadFileService.call();
  if(result.object.success === true){
    res.json({success:true});
  }
  next();
});

module.exports = server.exports();
