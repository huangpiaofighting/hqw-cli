const figlet = require("figlet");
const printer = require("@darkobits/lolcatjs");

const start = function(welcomeText){
    const txt = figlet.textSync(welcomeText);
    const text = printer.default.fromString(txt);
    console.log(text);
}

module.exports = {
    start
}