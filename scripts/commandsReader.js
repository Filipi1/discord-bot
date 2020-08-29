const fs = require('fs');
const dir = "./commands/";

module.exports = (prefix) => {
    var commands = {};
    const scripts = fs.readdirSync(dir);
    
    console.log(scripts)

    scripts.forEach(s => {
        commands[prefix + " " + s.split(".")[0]] = require("../" + dir + s);
    })

    console.log(commands)
    return commands;
}