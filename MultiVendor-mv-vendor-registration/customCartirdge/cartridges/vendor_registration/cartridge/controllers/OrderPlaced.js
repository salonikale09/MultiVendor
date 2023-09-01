'use strict'

var server = require("server");

server.get('Show',function(req,res,next){
    var OrderMgr = require('dw/order/OrderMgr');
    next();
})

// getting order from the different site and use them in vendor-registration.
server.exports = module.exports;