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
3. Открывай файл `start.bat`
4. Далее вы можете радоваться! Ведь ваш бот работает!)

Надеюсь этот бот вам поможет и будет удобен для вас!)
