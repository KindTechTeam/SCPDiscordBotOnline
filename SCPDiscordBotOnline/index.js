let { red, cyan, green, magenta } = require("colors");
console.log("========Modules Loading========".bgGreen);

let { Client, MessageEmbed } = require("discord.js");
const client = new Client();
let fs = require('fs');
let fetch = require("node-fetch");
console.log("Modules Loaded!".green);

let cfg = require("./cfg.json");
console.log("Config Loaded!".green);
console.log("========End========".bgRed);

let clientConsole = {
    log: async (client, ...data) => {
        console.log(`[${client.user.id} | ${client.user.username}]`.magenta + `${data}`);
    }
}

global.servers = {};


let ports = cfg.PORTS;
let tokens = cfg.tokens;

if(ports.length != tokens.length) {
    for(i = 0; i < 15; i++) {
        console.log(`Port length dont equal tokens length`.red)
    }
    return process.exit();
}

let clients = {};

ports.forEach((port, i) => {
    port = `${port}`;
    var client = new Client();
    clients[port] = client;
    client.login(tokens[i]);

    client.on('ready', async () => {
        clientConsole.log(client, ` Logged as `.cyan+`${client.user.tag}`.green);
        setInterval(() => {
            if(servers[port]) {
            let cache = JSON.parse(fs.readFileSync('./cache.json'));
            data = [];
            data[2] = cache[port];
            data[0] = data[2]['Players'].split('/')[0];
            data[1] = data[2]['Players'].split('/')[1];

            if (typeof data === 'string') {
                client.user.setActivity(`Server shutdown`, { type: "WATCHING" });
                client.user.setPresence({ status: "dnd" })
                return console.log(`ERROR! SERVER NOT FOUND - SERVER NOT FOUND - SERVER NOT FOUND - SERVER NOT FOUND`.red, `IP: ${cfg.IP}:${cfg.PORT} check he is online?!`.red);
            }
            let online = `${data[0]}`.green;
            let max = `${data[1]}`.magenta;
            if (online && max) {
                if (parseInt(data[0]) != 0) {
                    client.user.setActivity(`за ${data[0]} игроками`, { type: "WATCHING" });
                } else {
                    online = '0'.red;
                    client.user.setActivity(`Server is empty`, { type: "WATCHING" });
                }
            } else
                client.user.setActivity(`Server not found`)
            console.log(`[${port}]`.green + ` Online: ${online}/${max}`.cyan);
            }
        }, 2000)
    })

    client.on('message', async message => {
        if (message.content.startsWith(`${cfg.prefix}info`) && message.content.includes(client.user.id)) {
            let data = JSON.parse(fs.readFileSync('./cache.json'));
            let emb = new MessageEmbed()
                .setTitle(`Server Info`)
                .addField('IP:', `${cfg.IP}:${port}`)
                .addField('Players Count:', `${data[port].Players}`)
                .addField('WhiteList:', data[port].WL)
                .addField('Frendly Fire:', data[port].FF)
                .addField('Modded:', data[port].Modded)
                .addField('Version:', data[port].Version)
            message.channel.send(emb)
        }
    });
})

function getonline() {
    return new Promise((resolve, reject) => {
        fetch(`https://api.scpslgame.com/serverinfo.php?id=${cfg.AccountID}&key=${cfg.ApiKey}&players=true&version=true&flags=true`).then(res => res.json()).then(out => {
            out = out.Servers;
            out.forEach(server => {
                servers[server.Port] = server;
            })
            fs.writeFileSync('./cache.json', JSON.stringify(servers))

            
            if (out[0])
                resolve([parseInt(out[0].Players.split("/")[0]), parseInt(out[0].Players.split("/")[1]), out[0].WL, out[0].FF, out[0].Modded, out[0].Version])
            else resolve('ERROR')
        });
    });
}

setInterval(async () => {
    await getonline();
}, 15000)

// other
function timeConverter(UNIX_timestamp) {let a = new Date(UNIX_timestamp); let months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']; let year = a.getFullYear(); let month = months[a.getMonth()]; let date = a.getDate(); let hour = a.getHours(); let min = a.getMinutes();if (date.length == 1)date = `0${date}`;let time = year + ':' + month + ':' + date + ':' + hour + ':' + min;return time;
}