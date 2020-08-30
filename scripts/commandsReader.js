const fs = require('fs');
const dir = "./commands/";

module.exports = (prefix) => {
    var commands = {};
    const scripts = fs.readdirSync(dir);
    
    scripts.forEach(s => {
        commands[prefix + " " + s.split(".")[0]] = require("../" + dir + s);
    })

    return commands;
}