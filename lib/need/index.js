var fancyMatch = require('fancymatch');
var DefaultExtracter = function (req){
    if(req.user && req.user.Permissions){
        return req.user.Permissions;
    }else{
        return {};
    }
}
module.exports = function need(permission){
    return function(req,res,next){
        var extracter = req.FancyPermissionsExtracter || DefaultExtracter;
        console.log(extracter(req))
        if(extracter(req).match(permission)){
            return next();
        }
        throw "permission deined";
    }
}