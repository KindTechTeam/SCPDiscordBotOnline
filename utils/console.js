const { log } = console;
const chalk = require("chalk");

console.log = function () {
    log.apply(console, [`[${chalk.cyan("LOG")}]`,...arguments])
}

console.raw = function () {
    log.apply(console, arguments);
}

console.warn = function () {
    log.apply(console, [`[${chalk.yellow("WARN")}]`,...arguments])
}

console.error = function () {
    log.apply(console, [`[${chalk.red("ERROR")}]`,...arguments])
}