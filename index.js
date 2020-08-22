require("./utils/console");
require("./utils/process");
try{
    global.config = require("./config.json");
}catch(e) {
    console.warn("Creating config.json");
    fs.writeFileSync("./config.json", "{}");
    process.exit();
};
const validator = require("./utils/validator");
const child = require("child_process");
const scpsl = require("./utils/scpsl");
const chalk = require("chalk");
const fs = require("fs");

/* 

    LOGO

*/

console.raw(chalk.cyan(fs.readFileSync("./logo.md", "utf-8")));

validator(config);

global.clients = {};


/* 

    Starting client workers.

*/

config["BOTS"]["servers"].forEach(s => {
    s.PORT = `${s.PORT}`;
    clients[s.PORT] = child.fork("./child/client.js", [s.TOKEN]);
    clients[s.PORT].on("message", (message) => {
        if(typeof message === "string") {
            console.log(`${chalk.hex(tools.getRandomHex())(s.PORT)} | ${message}`)
        };
    });
});

/* 

        SETUPPING INTERVAL

*/


setInterval(async () => {
    let online = await scpsl.getServers();
    if(Array.isArray(online) && online.length > 0) {
        console.log("Updating online for clients...");
        online.forEach(s => {
            sendClientData(s);
    });
    } else {
        console.warn("Hmmm, servers not found in SCPSL API. Retrying in 15seconds.");
    };
}, 16500)

/* 

    OTHER FUNCTIONS

*/

function sendClientData(s) {
    if(!clients[s.Port]) return console.warn(`Worker with PORT \'${chalk.bold(s.Port)}\' not found. Skipping...`);
    clients[s.Port].send(s.Players);
    clients[s.Port].send({ status: "cache", data: s });
}