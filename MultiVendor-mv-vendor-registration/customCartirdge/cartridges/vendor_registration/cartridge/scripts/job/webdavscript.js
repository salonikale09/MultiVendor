function webdavupload() {
    var Logger = require('dw/system/Logger');
    var WebDAVClient = require('dw/net/WebDAVClient');
    var webdavClient = new WebDAVClient("https://bjxc-002.sandbox.us01.dx.commercecloud.salesforce.com/on/demandware.servlet/webdav/Sites/Impex/src/library","umesh.namdev@codesquaretech.com", "9oG$u20~rhYt[htC}WW*9FTy/Q{jR97EX-Ce}(v=");
    var getString = webdavClient.get("jsoncustomer.xml","UTF-8");
    var message ;
   
    if (webdavClient.succeeded())
    {
         message = webdavClient.statusText;
    }
    else
    {
        // error handling
        message="An error occured with status code "+webdavClient.statusCode;
    }
   
    var data  = new XML(getString);
    Logger.error(data)

    
}

module.exports = {webdavupload:webdavupload};
