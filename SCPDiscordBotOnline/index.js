let { red, cyan, green, magenta } = require("colors");
console.log("========Modules Loading========".bgGreen);

let { Client, MessageEmbed } = require("discord.js");
const client = new Client();
let fetch = require("node-fetch");
console.log("Modules Loaded!".green);

let cfg = require("./cfg.json");
if (cfg.ip === "", cfg.port) return console.log("Config WARNING!".bgRed);;
console.log("Config Loaded!".green);
console.log("========End========".bgRed);

client.on('message', async message => {
    if (message.content.startsWith(`${cfg.prefix}info`) && message.content.includes(client.user.id)) {
        let data = await getonline();
        let emb = new MessageEmbed()
            .setTitle(`Server Info`)
            .addField('IP:', `${cfg.IP}:${cfg.PORT}`)
            .addField('Players Count:', `${data[0]}/${data[1]}`)
            .addField('WhiteList:', data[2])
            .addField('Frendly Fire:', data[3])
        message.channel.send(emb)
    }
})

function getonline() {
    return new Promise((resolve, reject) => {
        fetch('https://api.scpslgame.com/lobbylist.php?format=json').then(res => res.json()).then(out => {
            out = out.filter(r => r.ip === cfg.IP);
            out = out.filter(r => r.port === cfg.PORT);
            if (out[0])
                resolve([parseInt(out[0].players.split("/")[0]), parseInt(out[0].players.split("/")[1]), out[0].whitelist, out[0].friendlyFire])
            else resolve('ERROR')
        });
    });
}

client.on('ready', () => {
    console.log("\n========Discord Connect========".bgMagenta);
    console.log(`${client.user.tag} - Logged!`.cyan);
    console.log("========End========".bgRed);

    console.log("\n========Check Status========".bgGreen);
    setInterval(async() => {
        let data = await getonline();
        if (typeof data === 'string') {
            client.user.setActivity(`Server shutdown`, { type: "WATCHING" });
            client.user.setPresence({ status: "dnd" })
            return console.log(`ERROR! SERVER NOT FOUND - SERVER NOT FOUND - SERVER NOT FOUND - SERVER NOT FOUND`.red, `IP: ${cfg.IP}:${cfg.PORT} check he is online?!`.red)
        }
        let online = `${data[0]}`.green;
        let max = `${data[1]}`.magenta;
        if (online && max) {
            if (parseInt(data[0]) != 0) {
                client.user.setActivity(`Online: ${data[0]}/${data[1]}`)
            } else {
                online = '0'.red;
                client.user.setActivity(`Server is empty`)
            }
            console.log(`[${timeConverter(Date.now())}]`.green, "» ".magenta, `Current online » ${online}/${max}`.cyan)
        } else
            client.user.setActivity(`Server not found`)
    }, cfg.UpdateInterval)
});
client.login(cfg.token);

// other
function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp);
    var months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    if (date.length == 1)
        date = `0${date}`
    var time = year + ':' + month + ':' + date + ':' + hour + ':' + min;
    return time;
}
