var server = require('server');


server.get('Page',(req,res,next)=>{

    var category = ["mens-footwear","cameras","computer&laptops","mobiles","Refrigetor","Televisions","Furniture- Chairs & Curtans","Furniture-Tables","Kids-Casual Wears"," Kids-Foot Wear"," Kids-Party Wear","Toys","Mens-Casual Wear"]
    var category2 = ["mens-footwear","cameras","computer&laptops","mobiles","Refrigetor","Televisions","Furniture- Chairs & Curtans","Furniture-Tables","Kids-Casual Wears"," Kids-Foot Wear"," Kids-Party Wear","Toys","Mens-Casual Wear"]
    res.render('sellerpage',{category:category,category2:category2})

    next();

})

module.exports = server.exports()