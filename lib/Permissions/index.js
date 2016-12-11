var Permissions = require('./Permissions');
module.exports = function (database){
    //function to resurively build permissions tree
    function processGroup(group,groups = []){
        //set permissions for current group
        var permmissions = {
            allowed:group.allowed || [],
            disallowed:group.disallowed || []
        }
        //check if group inherits
        if(group.inherit){
            //if inherit add sub group permission onto tree (resurively) and return
            return Promise.all(
                group.inherit.map((group)=>
                    database.getGroup(group)
                    .then((group)=>processGroup(group))
                )
            )
            .then((groups)=>{
                permmissions.inherit = groups;
                return permmissions;
            })
        }else{
            //if not return current Permissions object (end of branch)
            return Promise.resolve(permmissions)
        }
    }
    return function (user){
        //create the permissions tree then create new object from tree
        return processGroup(user).then((permissions)=>new Permissions(permissions))
    }
}