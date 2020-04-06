SCPDiscordBotOnline
---------------------

Это бот для показа количества игроков на сервере игры SCP:SL!

Функционал
---------------------

Показ количества игроков в статусе бота

![alt-statuscount](https://kindtech.ru/img/github/Count.png)

Команда `Info @Server#0000`

![alt-commandimg](https://kindtech.ru/img/github/Info.png)

Настройка
---------------------
1. Надо достать токен бота в [Discord Developer Portal](https://discordapp.com/developers/applications)
 * Выбери Бота.
 * Зайди в пункт Bot.
 * Copy Token.
2. Открой файл cfg.json и: 
 * вместо BotToken вписывай свой
 * вместо BotPrefix вписывай свой префикс бота(Желательно чтобы префикс был не таким как у публичных ботов)
 * вместо ServerIP вписывай IP Своего сервера
 * вместо PORT вписывай порт сервера
```js
{
    "token": "BotToken",
    "prefix": "BotPrefix",

    "UpdateInterval": 1000,
    "IP": "ServerIP",
    "PORT": 7777
}
```
3. Запускаем файл `start.bat`
4. Далее вы можете радоваться! Ведь ваш бот работает!)

Надеюсь этот бот вам поможет и будет удобен для вас!)


SCPDiscordBotOnline [ENG]
---------------------

This is a bot for showing the number of players on the game server SCP: SL!

Functional
---------------------

Showing the number of players in bot status

![alt-statuscount](https://kindtech.ru/img/github/Count.png)

Command `Info @Server#0000`

![alt-commandimg](https://kindtech.ru/img/github/Info.png)

Настройка
---------------------
1. We need to get the bot token in [Discord Developer Portal](https://discordapp.com/developers/applications)
 * Choose a bot.
 * Go to Bot.
 * Copy Token.
2. Open file cfg.json and: 
 * instead of BotToken enter your
 * instead of BotPrefix, enter your bot prefix (It is desirable that the prefix is ​​not the same as public bots)
 * instead of ServerIP enter the IP of your server
 * instead of PORT enter the server port
```js
{
    "token": "BotToken",
    "prefix": "BotPrefix",

    "UpdateInterval": 1000,
    "IP": "ServerIP",
    "PORT": 7777
}
```
3. Start file `start.bat`
4. Then you can rejoice! After all, your bot works!)

I hope this bot will help you and be convenient for you!)
