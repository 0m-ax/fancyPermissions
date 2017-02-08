module.exports = function (database){
    var output = {};
    output.buildTree = require('./Permissions')(database)
    output.middleware = require('./setDefault')(output.buildTree)
    return output;
}
