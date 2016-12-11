/*
const util = require('util')
var fancyMatch = require('fancymatch');

var Permissions = require('../').Permissions;
var Permissions = Permissions({
    getGroup:function (group){
        if(group == "group1"){
            return Promise.resolve({
                allowed:['permission.**'],
                disallowed:[],
                inherit:[]
            })
        }
        return Promise.resolve({
            allowed:[],
            disallowed:[]
        })
    }
})
Permissions({
    allowed:[''],
    disallowed:['permission.test2'],
    inherit:['group1']
}).then((group)=>{
    var perm =new fancyMatch('permission.test2')
    console.log(group.match(perm))
    console.log(util.inspect(group, false, null))
}).catch((error)=>{
    console.log(error)
})
*/