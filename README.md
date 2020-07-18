SCPDiscordBotOnline
---------------------

Это бот для показа количества игроков на сервере игры SCP:SL!

Support: https://sdbo.kindtech.ru/

Функционал
---------------------

Показ количества игроков в статусе бота

![alt-statuscount](https://i.imgur.com/pkCTSYxl.png)

Команда `Info @Server#0000`

![alt-commandimg](https://i.imgur.com/M3FNNwJ.png)

Настройка
---------------------
1. Надо достать токен бота в [Discord Developer Portal](https://discordapp.com/developers/applications)
 * Выбери Бота.
 * Зайди в пункт Bot.
 * Copy Token.

| Option | Type | Description |
| ------ | ------ | ------ |
| bot | object | Объект с настройками бота |
| prefix | string | Префикс бота. Пример: `;` |
| commandName | string | Название команды `info` |
| api | object | Объект с настройками api |
| ApiKey | string | API Ключ. Впиши `!api` в твою консоль сервера |
| AccountID | string | Твой AccontID Нати можно в [ServerList](https://servers.scpslgame.com/) |
| servers | obj | Объект c информацией о серверах |
| list | array | Массив/Список ваших серверов |
| port | int | Порт сервера |
| token | string | Токен бота |
## Пример:
```js
{
    "bot": {
        "prefix": ";",
        "commandName": "serverInfo"
    },

    "api": {
        "key": " DaY35rubLeyPJ",
        "AccountID": "32156"
    },

    "servers": {
        "list": [
            { "port": 7777, "token": "NTYzNzA3NAGVADA5NTA2ODI2.SoSi.XuYImWKun-gfaJl7qF2r7_842Ww" },
            { "port": 7778, "token": "NTc5MjI4MAGVADM2NzI3Mjk3.NaHy.InIdIopjs9BGJiu-gyA0a9rWBog" },
            { "port": 7779, "token": "NzA1MTI5OAGVAjMzNjIxNTQ1.GnaRh.pV5odWuVKbrKWAShKAhdjkACU" }
        ]
    },

    "logs": {
        "FolderName": "logs"
    }
}
```
3. В консоле пишете `npm i`
4. И последнее, в консоле пишите `npm start` или `npm run start`

Надеюсь этот бот вам поможет и будет удобен для вас!)


SCPDiscordBotOnline [ENG]
---------------------

This is a bot for showing the number of players on the game server SCP: SL!

Functional
---------------------

Showing the number of players in bot status

![alt-statuscount](https://i.imgur.com/pkCTSYxl.png)

Command `Info @Server#0000`

![alt-commandimg](https://i.imgur.com/M3FNNwJ.png)

Settings
---------------------
1. We need to get the bot token in [Discord Developer Portal](https://discordapp.com/developers/applications)
 * Choose a bot.
 * Go to Bot.
 * Copy Token.
 

| Option | Type | Description |
| ------ | ------ | ------ |
| bot | object | Object with bot settings |
| prefix | string | Bot prefix. Example: `;` |
| commandName | string | Command name `info` |
| api | object | Object with settings api |
| ApiKey | string | API Key. Enter !api in your server console |
| AccountID | int | Your AccontID. Can be in [ServerList](https://servers.scpslgame.com/) |
| servers | obj | Object with information about servers |
| list | array | Array/List of your servers |
| port | int | Server port |
| token | string | Bot token |
## Explame:
```js
{
    "bot": {
        "prefix": ";",
        "commandName": "serverInfo"
    },

    "api": {
        "key": " DaY35rubLeyPJ",
        "AccountID": "32156"
    },

    "servers": {
        "list": [
            { "port": 7777, "token": "NTYzNzA3NAGVADA5NTA2ODI2.SoSi.XuYImWKun-gfaJl7qF2r7_842Ww" },
            { "port": 7778, "token": "NTc5MjI4MAGVADM2NzI3Mjk3.NaHy.InIdIopjs9BGJiu-gyA0a9rWBog" },
            { "port": 7779, "token": "NzA1MTI5OAGVAjMzNjIxNTQ1.GnaRh.pV5odWuVKbrKWAShKAhdjkACU" }
        ]
    },

    "logs": {
        "FolderName": "logs"
    }
}
```
3. In the console, write `npm i`
4. Finally, in the console write `npm start` or `npm run start`

I hope this bot will help you and be convenient for you!)
