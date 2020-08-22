const Discord = require("discord.js");
module.exports = async (config) => {
    // Check type of config
    if(typeof config !== "object") throw new Error("Config must be a object");
    
    // Check config structure.
    if(typeof config.BOTS !== "object") throw new Error("Config > BOTS must be a object");
    if(typeof config.API !== "object") throw new Error("Config > API must be a object");
    
    
    // Check BOTS configuration.
    if(typeof config["BOTS"]["globalPrefix"] !== "string") throw new TypeError("globalPrefix must be a string");
    if(typeof config["BOTS"]["globalCommand"] !== "string") throw new TypeError("globalPrefix must be a string");
    if(!Array.isArray(config["BOTS"]["servers"])) throw new TypeError("globalPrefix must be a string");

    // If servers check all
    config["BOTS"]["servers"].forEach(server => {
        if(typeof server.PORT !== "number") throw new TypeError(`SERVER WITH ${server.PORT} > PORT must be a number`);
        if(typeof server.TOKEN !== "string") throw new TypeError(`SERVER WITH ${server.TOKEN} > TOKEN must be a string`);
    
        // Token Validation
        const client = new Discord.Client();
        client.once("ready", () => client.destroy());
        client.login(server.TOKEN).catch(e => {
            (function t(){
                if(e.message == "An invalid token was provided.") {
                    console.error(`SERVER WITH PORT: ${server.PORT} have invalid discord token.`);
                    process.exit();
                }
            })()    
        })
    })

    // Check API configration.
    if(typeof config["API"]["KEY"] !== "string") throw new TypeError("globalPrefix must be a string");
    if(typeof config["API"]["AccountID"] !== "string") throw new TypeError("globalPrefix must be a string");
    return;
}