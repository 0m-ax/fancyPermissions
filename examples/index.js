var express = require('express')
var fancyMatch = require('fancymatch');
const util = require('util')
var Permissions = require('../').Permissions;

Permissions({
    allowed:['test2'],
    disallowed:[],
    inherit:['group1',['group']]
}).then((group)=>{
    var perm =new fancyMatch('nope1')
    console.log(group.match(perm))
    console.log(util.inspect(group, false, null))
})