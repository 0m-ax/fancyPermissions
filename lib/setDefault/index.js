var Permissions = require('../').Permissions;
module.exports = function (defaultPermissios = {}){
    return (req,res,next)=>{
        Permissions(defaultPermissios).then((defaultPermissios)=>{
            req,FancyPermissionsExtracter = function (req){
                if(req.user && req.user.Permissions){
                    return Promise.resolve(req.user.Permissions);
                }else{
                    return defaultPermissios;
                }
            };
            next();
        })
    }
};