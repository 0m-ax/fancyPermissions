var fancyMatch = require('fancymatch');
class Permissions {
    constructor(permissions){
        console.log(JSON.stringify(permissions, null, 4));
        this.permissions = permissions;
    }
    match(permission){
        // create matcher and then match permission tree against it
        var matcher = new fancyMatch(permission);
        return Permissions.checkGroup(this.permissions,matcher)
    }
    static checkGroup(group,permission,allowed = false){
        //check if inheriting the permission from a group and if they allow it
        if(group.inherit){
            var allowed = group.inherit.reduce((allowed,group)=>{
                return Permissions.checkGroup(group,permission,allowed)
            },allowed)
        }
        //check if allowed permission
        allowed = group.allowed.reduce((allowed,item)=>{
            if(permission.match(item)){
                return true;
            }else{
                return allowed;
            }
        },allowed)
        //check if disallowed permission
        allowed = group.disallowed.reduce((allowed,item)=>{
            if(permission.match(item)){
                return false;
            }else{
                return allowed;
            }
        },allowed)
        return allowed;
    }
}
module.exports = Permissions