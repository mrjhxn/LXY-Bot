const { spawn } = require("child_process");
const { readFileSync } = require("fs-extra");
const http = require("http");
const axios = require("axios");
const semver = require("semver");
const logger = require("./utils/log");

/////////////////////////////////////////////
//========= Check node.js version =========//
/////////////////////////////////////////////

// const nodeVersion = semver.parse(process.version);
// if (nodeVersion.major < 13) {
//     logger(`Your Node.js ${process.version} is not supported, it required Node.js 13 to run bot!`, "error");
//     return process.exit(0);
// };

///////////////////////////////////////////////////////////
//========= Create website for dashboard/uptime =========//
///////////////////////////////////////////////////////////

const express = require('express');
const fs = require('fs-extra');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const appStateFilePath = './appstate.json';
const configFilePath = './config.json';
const logFilePath = './file.txt';

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/config', (req, res) => {
  fs.readFile(configFilePath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('Failed to read the configuration.');
      return;
    }
    try {
      const config = JSON.parse(data);
      res.send(config);
    } catch (error) {
      console.log(error);
      res.status(500).send('Failed to parse the configuration.');
    }
  });
});

app.post('/save', (req, res) => {
  const { appState } = req.body;

  fs.writeFile(appStateFilePath, appState, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Failed to save the app state.');
      return;
    }
    res.send('App state saved successfully.');
  });
});

app.post('/save-config', (req, res) => {
  const config = req.body.config;

  try {
    const configObj = JSON.parse(config);

    fs.writeFile(configFilePath, JSON.stringify(configObj, null, 2), (err) => {
      if (err) {
        console.log(err);
        res.status(500).send('Failed to save the configuration.');
        return;
      }
      res.send('Configuration saved successfully.');
    });
  } catch (error) {
    console.log(error);
    res.status(400).send('Invalid configuration data.');
  }
});

app.post('/restart', (req, res) => {
  exec('pm2 restart index', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      res.status(500).send('Failed to restart server.');
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    res.send('Server restarted successfully.');
  });
});

app.get('/logs', (req, res) => {
  fs.readFile(logFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.send('Error reading file');
    } else {
      let logs = data.trim().split('\n');

      // If there are more than 100 lines, only keep the last 100
      if (logs.length > 100) {
        logs = logs.slice(logs.length - 100);
      }

      res.send(`<pre>${logs.join('\n')}</pre>`);
    }
  });
});

const writeStream = fs.createWriteStream(logFilePath, { flags: 'a' });

console.log('Logging data to console and file.txt...');

// Redirect console output to file
console.log = function (message) {
  writeStream.write(`${message}\n`);
  process.stdout.write(`${message}\n`);
};

app.listen(3000, () => {
  console.log('Server running on port 3000!');
});


/////////////////////////////////////////////////////////
//========= Create start bot and make it loop =========//
/////////////////////////////////////////////////////////

function startBot(message) {
    (message) ? logger(message, "[ START ]") : "";

    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "main.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    child.on("close", (codeExit) => {
        if (codeExit != 0 || global.countRestart && global.countRestart < 5) {
            startBot("Restarting...");
            global.countRestart += 1;
            return;
        } else return;
    });

    child.on("error", function (error) {
        logger("An error occurred: " + JSON.stringify(error), "[ START ]");
    });
};
////////////////////////////////////////////////
//========= Check update from Github =========//
////////////////////////////////////////////////


axios.get("https://raw.githubusercontent.com/RICHARD-RETADA/Richard/main/package.json").then((res) => {
    logger(res['data']['name'], "[ NAME ]");
    logger("Version: " + res['data']['version'], "[ VER ]");
    logger(res['data']['description'], "[ DESC ]");
});
startBot();

/*axios.get("https://raw.githubusercontent.com/d-jukie/miraiv2_fix/main/package.json").then((res) => {
    const local = JSON.parse(readFileSync('./package.json'));
    if (semver['lt'](local.version, res['data']['version'])) {
        if (local.autoUpdate == !![]) {
            logger('A new update is available, start update processing...', '[ UPDATE ]');
            const updateBot = {};
            updateBot.cwd = __dirname
            updateBot.stdio = 'inherit' 
            updateBot.shell = !![];
            const child = spawn('node', ['update.js'], updateBot);
            child.on('exit', function () {
                return process.exit(0);
            })
            child.on('error', function (error) {
                logger('Unable to update:' + JSON.stringify(error), '[ CHECK UPDATE ]');
            });
        } else logger('A new update is available! Open terminal/cmd and type "node update" to update!', '[ UPDATE ]'), 
        startBot();
    } else logger('You are using the latest version!', '[ CHECK UPDATE ]'), startBot();
}).catch(err => logger("Unable to check update.", "[ CHECK UPDATE ]"));*/
// THIZ BOT WAS MADE BY ME(CATALIZCS) AND MY BROTHER SPERMLORD - DO NOT STEAL MY CODE (つ ͡ ° ͜ʖ ͡° )つ ✄ ╰⋃╯
