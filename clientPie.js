let { Client, MessageEmbed } = require('discord.js');
let client = new Client();

client.on('ready', () => {
    process.send({ action: 'hello', message: "Ready!" });
});

process.on('exit', () => {
    process.send({ action: 'hello', message: "Bye-bye!" });
});


client.on('message', (message) => {
    if (message.content.includes(`${client.prefix}${client.serverInfo}`)) {
        if(!message.content.includes(client.user.id)) return;
        data = client.datassss || {};

        if(!data.FF && data.FF !== false) data.FF = "Loading..";
        if(!data.WL && data.WL !== false) data.WL = "Loading..";
        let emb = new MessageEmbed()
            .setTitle(`Server Info`)
            .setColor("RANDOM")
            .addFields(
                { name: 'Players Count', value: `${data.Players ||  "Loading..."}` },
                { name: 'WhiteList', value: `${data.WL}` },
                { name: 'Frendly Fire', value: `${data.FF}` },
                { name: 'Modded', value: data.Modded ||  "Loading..." },
                { name: 'Version', value: data.Version || "Loading..." }
            );

        message.channel.send(emb);
    };
});

client.on('error', (err) => {
    process.send({ action: 'help', message: err.message });
});

process.on('message', message => {

    if (typeof message == 'object' && message.init === true) {
        client.serverInfo = message.command;
        client.prefix = message.prefix;
        client.login(message.token);
    };
    
    if(typeof message == 'string' && message === 'stop') {
        client.destroy();
        process.send('Shutting down');
        process.exit();
    };

    if(typeof message == 'object' && message.update === true) {
        client.datassss = message.data;
        client.user.setActivity(`${message.online || '0/0'}`);
    };

});