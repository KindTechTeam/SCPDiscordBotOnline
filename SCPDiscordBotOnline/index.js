let { red, cyan, green, magenta } = require("colors");
console.log("========Modules Loading========".bgGreen);

let { Client, MessageEmbed } = require("discord.js");
const client = new Client();
let fs = require('fs')
let fetch = require("node-fetch");
console.log("Modules Loaded!".green);

let cfg = require("./cfg.json");
console.log("Config Loaded!".green);
console.log("========End========".bgRed);

client.on('message', async message => {
    if (message.content.startsWith(`${cfg.prefix}info`) && message.content.includes(client.user.id)) {
        let data = require('./cache.json');
        let emb = new MessageEmbed()
            .setTitle(`Server Info`)
            .addField('IP:', `${cfg.IP}:${cfg.PORT}`)
            .addField('Players Count:', `${data.Players}`)
            .addField('WhiteList:', data.WL)
            .addField('Frendly Fire:', data.FF)
            .addField('Modded:', data.Modded)
            .addField('Version:', data.Version)
        message.channel.send(emb)
    }
});

function getonline() {
    return new Promise((resolve, reject) => {
        fetch(`https://api.scpslgame.com/serverinfo.php?id=${cfg.AccountID}&key=${cfg.ApiKey}&players=true&version=true&flags=true`).then(res => res.json()).then(out => {
            out = out.Servers;
            
            out = out.filter(r => r.ID === cfg.ServerID);
            out = out.filter(r => r.Port === cfg.PORT);

            fs.writeFileSync('./cache.json', JSON.stringify(out[0]))
            
            if (out[0])
                resolve([parseInt(out[0].Players.split("/")[0]), parseInt(out[0].Players.split("/")[1]), out[0].WL, out[0].FF, out[0].Modded, out[0].Version])
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
    }, 20000)
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