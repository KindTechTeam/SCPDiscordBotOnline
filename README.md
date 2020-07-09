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
| tokens | array | Токены Ботов |
| prefix | string | Префикс бота. Пример: `;` |
| ApiKey | string | API Ключ. Впиши `!api` в твою консоль сервера |
| AccountID | int | Твой AccontID Нати можно в [ServerList](https://servers.scpslgame.com/) |
| IP | string | Айпи Твоего сервера |
| PORTS | array | Порты ваших серверов |
## Пример:
```js
{
    "tokens": [
        "NTYzNzA3NAGVADA5NTA2ODI2.SoSi.XuYImWKun-gfaJl7qF2r7_842Ww",
        "NTc5MjI4MAGVADM2NzI3Mjk3.NaHy.InIdIopjs9BGJiu-gyA0a9rWBog",
        "NzA1MTI5NAGVAzQ0ODI0OTc2.SoSA.TMChLENDwJ_asr-e5N-zCam52Uk",
        "NzA1MTI5OAGVATQyMTkxMjA1.MNewL.ENxChbOTOdPRiDyMIVaTuyuJKw",
        "NzA1MTI5OAGVAzE1MDQyNDM0.AdР8С.E3AdCBG9SB1DAhDSkXt6bdv0ZY",
        "NzA1MTI5OAGVAjMzNjIxNTQ1.GnaRh.pV5odWuVKbrKWAShKAhdjkACU"],
    "prefix": ";",

    "ApiKey": "DaY69rubLeyPJ",
    "AccountID": "14280",

    "IP": "128.123.52.123",
    "PORTS": ["7777", "7778", "7779", "7780", "7781", "7782"]
}
```
3. Запускаем файл `start.bat` или если у вас Linux то вписываете в terminal `nodejs ./`
4. Далее вы можете радоваться! Ведь ваш бот работает!)

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
| tokens | array | Bot Tokens |
| prefix | string | Bot prefix. Example: `;` |
| ApiKey | string | API Key. Enter !api in your server console |
| AccountID | int | Your AccontID. Can be in [ServerList](https://servers.scpslgame.com/) |
| IP | string | IP of your server |
| PORTS | array | Ports of your servers |
## Explame:
```js
{
    "tokens": [
        "NTYzNzA3NAGVADA5NTA2ODI2.SoSi.XuYImWKun-gfaJl7qF2r7_842Ww",
        "NTc5MjI4MAGVADM2NzI3Mjk3.NaHy.InIdIopjs9BGJiu-gyA0a9rWBog",
        "NzA1MTI5NAGVAzQ0ODI0OTc2.SoSA.TMChLENDwJ_asr-e5N-zCam52Uk",
        "NzA1MTI5OAGVATQyMTkxMjA1.MNewL.ENxChbOTOdPRiDyMIVaTuyuJKw",
        "NzA1MTI5OAGVAzE1MDQyNDM0.AdР8С.E3AdCBG9SB1DAhDSkXt6bdv0ZY",
        "NzA1MTI5OAGVAjMzNjIxNTQ1.GnaRh.pV5odWuVKbrKWAShKAhdjkACU"],
    "prefix": ";",

    "ApiKey": "DaY69rubLeyPJ",
    "AccountID": "14280",

    "IP": "128.123.52.123",
    "PORTS": ["7777", "7778", "7779", "7780", "7781", "7782"]
}
```
3. Start file `start.bat` or if you have Linux then type in terminal `nodejs ./`
4. Then you can rejoice! After all, your bot works!)

I hope this bot will help you and be convenient for you!)
