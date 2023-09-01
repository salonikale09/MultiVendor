"use strict";
var server = require("server");
var CustomObjectMgr = require('dw/object/CustomObjectMgr');



server.get("UploadAll", function (req, res, next) {
  var Transaction = require('dw/system/Transaction');
 

  var FileWriter = require("dw/io/FileWriter");
  var ArrayList = require('dw/util/ArrayList');
  var StringUtils = require("dw/util/StringUtils");
  var URLUtils = require('dw/web/URLUtils');
  var File = require("dw/io/File");
  var deleteservice = require("*/cartridge/scripts/services/deleteFiles");
  var service = require("*/cartridge/scripts/services/getFiles");
  var params = { filedescription: "catalog" };
  var result = service.getFile.call(params);
  var filArr = [];
  var fileObj = result.object.data;
  var redirectUrl = URLUtils.url("UploadWebDav-Show");
  var s = URLUtils.url("UploadWebDav-Show");

  fileObj.forEach(element => {
    var FileWriter = require('dw/io/FileWriter');
var File = require('dw/io/File');
var StringUtils = require("dw/util/StringUtils")
var catalog = element.filename.includes("catalog");
var inventory = element.filename.includes("inventory");
var pricebook = element.filename.includes("pricebook");
var feedPath;
if(catalog){
   feedPath = StringUtils.format("{0}/{1}/", File.IMPEX, "src/catalogs");
}
if(inventory){
   feedPath = StringUtils.format("{0}/{1}/", File.IMPEX, "src/inventory");
}
if(pricebook){
   feedPath = StringUtils.format("{0}/{1}/", File.IMPEX, "src/pricebooks");
}
  new File(feedPath).mkdirs();
    var feedFile = StringUtils.format("{0}/{1}", feedPath,element.filename);
  var fileWriter = new FileWriter(new File(feedFile));
  fileWriter.writeLine(element.file);
  fileWriter.close();
  });

var deleteResult = deleteservice.deleteFile.call();

var Preview = CustomObjectMgr.getCustomObject('showPreview', "1");
Transaction.wrap(function () {
  Preview.custom.Show = true;
});



next();
});


server.get("UploadPreview", function (req, res, next) {
  var Transaction = require('dw/system/Transaction');
 


  var FileWriter = require("dw/io/FileWriter");
  var ArrayList = require('dw/util/ArrayList');
  var StringUtils = require("dw/util/StringUtils");
  var URLUtils = require('dw/web/URLUtils');
  var File = require("dw/io/File");
  var deleteservice = require("*/cartridge/scripts/services/deleteFiles");
  var service = require("*/cartridge/scripts/services/getFiles");
  var params = { filedescription: "catalog" };
  var result = service.getFile.call(params);
  var filArr = [];
  var fileObj = result.object.data;
  var redirectUrl = URLUtils.url("UploadWebDav-Show");
  var s = URLUtils.url("UploadWebDav-Show");

  fileObj.forEach(element => {
    var FileWriter = require('dw/io/FileWriter');
var File = require('dw/io/File');
var StringUtils = require("dw/util/StringUtils")
var catalog = element.filename.includes("catalog");
var inventory = element.filename.includes("inventory");
var pricebook = element.filename.includes("pricebook");
var feedPath;
if(catalog){
   feedPath = StringUtils.format("{0}/{1}/", File.IMPEX, "src/srcpreview/catalogs");
}
if(inventory){
   feedPath = StringUtils.format("{0}/{1}/", File.IMPEX, "src/srcpreview/inventory");
}
if(pricebook){
   feedPath = StringUtils.format("{0}/{1}/", File.IMPEX, "src/srcpreview/pricebooks");
}
  new File(feedPath).mkdirs();
    var feedFile = StringUtils.format("{0}/{1}", feedPath,element.filename);
  var fileWriter = new FileWriter(new File(feedFile));
  fileWriter.writeLine(element.file);
  fileWriter.close();
  });


var Preview = CustomObjectMgr.getCustomObject('showPreview', "1");
Transaction.wrap(function () {
  Preview.custom.Show = false;
});




next();
  });



module.exports = server.exports();