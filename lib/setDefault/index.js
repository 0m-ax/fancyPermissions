var Permissions = require('../').Permissions;
module.exports = function (buildTree){
   return function (defaultPermissios = {}){
        return (req,res,next)=>{
            buildTree(defaultPermissios).then((defaultPermissios)=>{
                req.FancyPermissionsExtracter = function (req){
                    if(req.user && req.user.Permissions){
                        return req.user.Permissions;
                    }else{
                        return defaultPermissios;
                    }
                };
                next();
            })
        }
    }
}