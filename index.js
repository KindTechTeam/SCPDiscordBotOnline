console.clear();

const chalk = require("chalk");
const fetch = require("node-fetch");
const moment = require("moment");


const child = require("child_process");
const fs = require("fs");
const path = require("path");

let date = moment().format("DD-MM-YYYY hh-mm-ss");
const config = require("./config.json");

// CONSOLE CODE PIE

global.cmd = {
  colors: {
    log: "#3498db",
    logText: "#2980b9",

    warn: "#e67e22",
    warnText: "#d35400",

    sys: "#9b59b6",
    sysText: "#8e44ad",

    err: "#e74c3c",
    errText: "#c0392b",
  },

  log: (...params) => {
    console.log(
      `[${chalk.hex(cmd.colors.log)("LOG")}] ${chalk.hex(cmd.colors.logText)(params.join(" "))}`
    );
    writeLog(params.join(" "));
  },

  warn: (...params) => {
    console.log(
      `[${chalk.hex(cmd.colors.warn)("WARN")}] ${chalk.hex(cmd.colors.warnText)(params.join(" "))}`
    );
    writeLog(`WARN: ${params.join(" ")}`);
  },

  sys: (...params) => {
    console.log(
      `[${chalk.hex(cmd.colors.sys)("SYSTEM")}] ${chalk.hex(cmd.colors.sysText)(params.join(" "))}`
    );
  },

  err: (...params) => {
    console.log(
      `[${chalk.hex(cmd.colors.err)("ERROR")}] ${chalk.hex(cmd.colors.errText)(params.join(" "))}`
    );
    writeLog(`ERROR: ${params.join(" ")}`);
  },

  info: (...params) => {
    console.log(
      `[${chalk.hex(cmd.colors.log)("INFO")}] ${chalk.hex(cmd.colors.logText)(params.join(" "))}`
    );
  },
};

cmd.log("All Modules Loaded!");

function writeLog(text) {
  let filename = date + ".log";
  const folder = path.join(__dirname, config["logs"]["FolderName"]);
  let pathname = path.join(__dirname, config["logs"]["FolderName"], filename);

  if (!fs.existsSync(folder)) {
    cmd.sys(
      `[${chalk.hex(cmd.colors.warn)(
        "WARN"
      )}] Log folder not found. Creating...`
    );
    fs.mkdirSync(folder);
  };

  if (!fs.existsSync(pathname)) {
    fs.writeFileSync(pathname, "\t");
  };

  fs.appendFileSync(pathname, date + "  " + text + "\n");
};

// CONSOLE CODE PIE

const servers = config["servers"]["list"];

let clients = {};

servers.forEach((server) => {
  function initClient(token, online) {
    var client = child.fork("clientPie");
    clients[server.port] = client;

    client.send({
      init: true,
      online: online,
      token: token,
      command: config["bot"]["command"],
      prefix: config["bot"]["prefix"],
    });

    client.on("message", (message) => {
      if (typeof message === "object") {
        if (message.action == "hello") {
          cmd.log(`[${chalk.cyan(server.port)}]`, message.message);
        }
        if (message.error) {
          cmd.error(server.port, message.message);
        }
      }
    });
  }

  try {
    initClient(server.token, "0/0");
  } catch (error) {
    cmd.log(error);
  };
});

// CONSOLE CODE PIE

setInterval(async () => {
  updateOnline();
}, 15000);

setTimeout(() => {
  updateOnline();
}, 3000);
async function updateOnline() {
  let fetched = await fetchOnline();
  try {
    Object.keys(clients).forEach((c) => {
      if (!fetched[c]) return;
      var client = clients[c];
      client.send({
        update: true,
        online: fetched[c].Players || "0/0",
        data: fetched[c],
      });
    });
  } catch (error) {}
}

function fetchOnline() {
  return new Promise((resolve) => {
    fetch(
      `https://api.scpslgame.com/serverinfo.php?id=${config["api"]["AccountID"]}&key=${config["api"]["key"]}&players=true&version=true&flags=true`
    )
      .then((res) => res.json())
      .then((out) => {
        if (out.Success === false) {
          if (out.Error == "Rate limit exceeded") {
            cmd.warn(`API ratelimited is used. Retrying in 15 seconds..`);
            resolve({});
            return;
          }
        }
        out = out.Servers;
        let cache = {};
        out.forEach((server) => {
          cache[server.Port] = server;
        });

        cmd.log(`${chalk.green("FETCHED OK!")}`);

        resolve(cache);
      });
  });
}
