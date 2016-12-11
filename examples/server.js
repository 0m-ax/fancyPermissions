//load need module
const need = require('../').need;
//intlise express
const express = require('express')
var app = express();
//set the default DB getter
const FancyPermissionsStatic = {
    getGroup:function (group){
        if(group == "group1"){
            return Promise.resolve({
                allowed:['part1.**'],
                disallowed:['part2.home','part2.page'],
                inherit:['group']
            })
        }
        return Promise.resolve({
            allowed:['part2.**'],
            disallowed:[]
        })
    }
};
//load permissions
const Permissions = require('../').Permissions(FancyPermissionsStatic);
//set default permissions
app.use(
    require('../').setDefault({
        allowed:['signup.**']
    })
);
//added user object to req
app.use((req,res,next)=>{
    Permissions({
        allowed:['part2.home'],
        disallowed:['part1.home'],
        inherit:['group1']
    }).then((permissions)=>{
        req.user = {
            Permissions:permissions
        }
        next()
    }).catch(()=>{
        console.log("EORR")
    })
})
//routes
app.get('/',(req,res)=>{
    res.send(req.user)
})
app.get('/attachment',need('part1.home'),(req,res)=>{
    res.send("attachment.home should not be allowed")
})
app.get('/checking',need('part2.home'),(req,res)=>{
    res.send("checking.home should be alloed")
})
app.get('/attachment/page',need('part1.page'),(req,res)=>{
    res.send("attachment.page should be alloed")
})
app.get('/checking/page',need('part2.page'),(req,res)=>{
    res.send("checking.page should not be allowed")
})
app.listen(8080)
