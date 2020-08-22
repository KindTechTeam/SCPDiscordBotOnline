const Discord = require("discord.js");
const client = new Discord.Client();

let cache;

const config = require("../config");

client.on("ready", () => {
    process.send("Logged as " + client.user.tag);
})

client.on('message', (message) => {
    if (message.content === `<@!${client.user.id}>` || message.content.includes(config.BOTS.globalPrefix + config.BOTS.globalCommand + ` <@!${client.user.id}>`)) {
        if (message.author.id === "278539838561452032") return message.reply("Для получения доступа к команде отправьте 210 рублей на QIWI \`S3rxio || +79998214902 или напиши мне в дс если найдёшь его я был руководителем арии проджект (если хочешь спроси сеамского).\`\nВ комментариях платежа укажите DisableDefenderForDoctor");
        const embed = new Discord.MessageEmbed()
            .setTitle("Information")
            .setColor("RANDOM")
            .setAuthor(client.user.tag, client.user.displayAvatarURL({ size: 4096 }), "https://sdbo.kindtech.ru")
            .setFooter(message.guild.name, message.guild.iconURL())
            .setTimestamp()
            .setThumbnail(message.guild.iconURL())
            if(cache)
                // cache.BOOLEAN ? "Enabled" : "Disabled"
                embed.addFields(
                    { name: 'Online', value: cache.Players, inline: true },
                    { name: 'Version', value: cache.Version, inline: true },
                    { name: 'Pastebin', value: `[${cache.Pastebin}](https://pastebin.com/${cache.Pastebin})`, inline: true },
                    { name: 'Whitelist', value: cache.WL ? "Enabled" : "Disabled", inline: true },
                    { name: 'Modded', value: cache.Modded ? "Enabled" : "Disabled", inline: true },
                    { name: '\u200B', value: '\u200B', inline: true },
                    { name: 'Friendly Fire', value: cache.FF ? "Enabled" : "Disabled", inline: true },
                    { name: 'AntiTeamKill?', value: cache.AutoSuppress ? "Enabled" : "Disabled", inline: true },
                    { name: 'AntiTeamKill MAX', value: cache.Suppress ? cache.Suppress : "Disabled", inline: true },
                )
            else {
                embed.addField("Please, wait before first data fetch", "...");
            }

        message.channel.send(embed)
    }
})

process.on("message", (message) => {
    if(typeof message === "string") {
        process.send("Updating activity: " + message);
        if(client.user) return client.user.setActivity(message);
        else return;
    }
    else {
        if(message.status === "cache") {
            cache = message.data;
        }
    }
})

client.login(process.argv[2])