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

console.log("========Support========".bgCyan);
console.log("Support: https://sdbo.kindtech.ru/".cyan)

let clientConsole = {
    log: async (client, ...data) => {
        console.log(`[${client.user.id} | ${client.user.username}]`.magenta + `${data}`);
    }
};

global.servers = {};

let ports = cfg.PORTS;
let tokens = cfg.tokens;

if(ports.length != tokens.length) {
    for(i = 0; i < 15; i++) {
        console.log(`Port length dont equal tokens length`.red);
    };
    process.exit();
} else if (!cfg.ApiKey) {
    for (i = 0; i < 15; i++) {
        console.log(`Paste ApiKey in cfg.json`.red);
    };
    process.exit();
} else if (!cfg.AccountID) {
    for (i = 0; i < 15; i++) {
        console.log(`Paste AccountID in cfg.json`.red);
    };
    process.exit();
} else if (!cfg.IP) {
    for (i = 0; i < 15; i++) {
        console.log(`Paste IP in cfg.json`.red);
    };
    process.exit();
};

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
                if(data[2]['Players']) {
                    data[0] = data[2]['Players'].split('/')[0];
                    data[1] = data[2]['Players'].split('/')[1];
                } else {
                    for (i = 0; i < 15; i++) {
                        console.log("Server on? Players undefined!!!!!!!".red);
                };
            };

            let online = `${data[0]}`.green;
            let max = `${data[1]}`.magenta;
            
            if (online && max) {
                if (parseInt(data[0]) != 0) {
                    client.user.setActivity(`за ${data[0]} игроками`, { type: "WATCHING" });
                } else {
                    online = '0'.red;
                    client.user.setActivity(`Server is empty`, { type: "WATCHING" });
                };
            }

            if(!data[2]['Players'])  {
                client.user.setActivity(`Server shutdown`, { type: "WATCHING" });
                client.user.setPresence({ status: "dnd" });
            } else console.log(`[${port}]`.green + ` Online: ${online}/${max}`.cyan);  
            };
        }, 5000);
    });

    client.on('message', async message => {
        if (message.content.startsWith(`${cfg.prefix}info`) && message.content.includes(client.user.id)) {
            let data = JSON.parse(fs.readFileSync('./cache.json'));
            let emb = new MessageEmbed()
                .setTitle(`Server Info`)
                .addFields(
                    { name: 'IP', value: `${cfg.IP}:${port}` },
                    { name: 'Players Count', value: `${data[port].Players}` },
                    { name: 'WhiteList', value: data[port].WL },
                    { name: 'Frendly Fire', value: data[port].FF },
                    { name: 'Modded', value: data[port].Modded },
                    { name: 'Version', value: data[port].Version }
                );
                
            message.channel.send(emb);
        };
    });
});

function getonline() {
    return new Promise((resolve, reject) => {
        fetch(`https://api.scpslgame.com/serverinfo.php?id=${cfg.AccountID}&key=${cfg.ApiKey}&players=true&version=true&flags=true`).then(res => res.json()).then(out => {
            out = out.Servers;
            out.forEach(server => {
                servers[server.Port] = server;
            });
            fs.writeFileSync('./cache.json', JSON.stringify(servers));
            if (out[0]) resolve([parseInt(out[0].Players), out[0].WL, out[0].FF, out[0].Modded, out[0].Version]);else resolve('ERROR');
        });
    });
};

setInterval(async()=>{await getonline();}, 18000);