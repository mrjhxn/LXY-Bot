//////////////////////////////////////////////////////
//========= Require all variable need use =========//
/////////////////////////////////////////////////////
const moment = require("moment-timezone");
const { readdirSync, readFileSync, writeFileSync, existsSync, unlinkSync, rm } = require("fs-extra");
const { join, resolve } = require("path");
const { execSync } = require('child_process');
const logger = require("./utils/log.js");
const config = require("./config.json");
//const login = require(config.raw);
const login = require('fca-horizon-remastered')


const axios = require("axios");
const listPackage = JSON.parse(readFileSync('./package.json')).dependencies;
const listbuiltinModules = require("module").builtinModules;

global.thanhdz = new Object({
  altp_url: "https://raidenapi.richardretada.repl.co/altp_data"
})

global.client = new Object({
    commands: new Map(),
    events: new Map(),
    cooldowns: new Map(),
    eventRegistered: new Array(),
    handleSchedule: new Array(),
    handleReaction: new Array(),
    handleReply: new Array(),
    mainPath: process.cwd(),
    configPath: new String(),
  getTime: function (option) {
        switch (option) {
            case "seconds":
                return `${moment.tz("Asia/Manila").format("ss")}`;
            case "minutes":
                return `${moment.tz("Asia/Manila").format("mm")}`;
            case "hours":
                return `${moment.tz("Asia/Manila").format("HH")}`;
            case "date": 
                return `${moment.tz("Asia/Manila").format("DD")}`;
            case "month":
                return `${moment.tz("Asia/Manila").format("MM")}`;
            case "year":
                return `${moment.tz("Asia/Manila").format("YYYY")}`;
            case "fullHour":
                return `${moment.tz("Asia/Manila").format("HH:mm:ss")}`;
            case "fullYear":
                return `${moment.tz("Asia/Manila").format("DD/MM/YYYY")}`;
            case "fullTime":
                return `${moment.tz("Asia/Manila").format("HH:mm:ss DD/MM/YYYY")}`;
        }
  }
});

global.data = new Object({
    threadInfo: new Map(),
    threadData: new Map(),
    userName: new Map(),
    userBanned: new Map(),
    threadBanned: new Map(),
    commandBanned: new Map(),
    threadAllowNSFW: new Array(),
    allUserID: new Array(),
    allCurrenciesID: new Array(),
    allThreadID: new Array()
});

global.utils = require("./utils");
global.nodemodule = new Object();
global.config = new Object();
global.configModule = new Object();
global.moduleData = new Array();
global.language = new Object();

//////////////////////////////////////////////////////////
//========= Find and get variable from Config =========//
/////////////////////////////////////////////////////////

var configValue;
try {
    global.client.configPath = join(global.client.mainPath, "config.json");
    configValue = require(global.client.configPath);
    logger.loader("Found file config: config.json");
}
catch {
    if (existsSync(global.client.configPath.replace(/\.json/g,"") + ".temp")) {
        configValue = readFileSync(global.client.configPath.replace(/\.json/g,"") + ".temp");
        configValue = JSON.parse(configValue);
        logger.loader(`Found: ${global.client.configPath.replace(/\.json/g,"") + ".temp"}`);
    }
    else return logger.loader("config.json not found!", "error");
}

try {
    for (const key in configValue) global.config[key] = configValue[key];
    logger.loader("Config Loaded!");
}
catch { return logger.loader("Can't load file config!", "error") }

const { Sequelize, sequelize } = require("./includes/database");

writeFileSync(global.client.configPath + ".temp", JSON.stringify(global.config, null, 4), 'utf8');

/////////////////////////////////////////
//========= Load language use =========//
/////////////////////////////////////////

const langFile = (readFileSync(`${__dirname}/languages/${global.config.language || "en"}.lang`, { encoding: 'utf-8' })).split(/\r?\n|\r/);
const langData = langFile.filter(item => item.indexOf('#') != 0 && item != '');
for (const item of langData) {
    const getSeparator = item.indexOf('=');
    const itemKey = item.slice(0, getSeparator);
    const itemValue = item.slice(getSeparator + 1, item.length);
    const head = itemKey.slice(0, itemKey.indexOf('.'));
    const key = itemKey.replace(head + '.', '');
    const value = itemValue.replace(/\\n/gi, '\n');
    if (typeof global.language[head] == "undefined") global.language[head] = new Object();
    global.language[head][key] = value;
}

global.getText = function (...args) {
    const langText = global.language;    
    if (!langText.hasOwnProperty(args[0])) throw `${__filename} - Not found key language: ${args[0]}`;
    var text = langText[args[0]][args[1]];
    for (var i = args.length - 1; i > 0; i--) {
        const regEx = RegExp(`%${i}`, 'g');
        text = text.replace(regEx, args[i + 1]);
    }
    return text;
}

try {
    var appStateFile = resolve(join(global.client.mainPath, global.config.APPSTATEPATH || "appstate.json"));
    var appState = require(appStateFile);
    logger.loader(global.getText("mirai", "foundPathAppstate"))
}
catch { return logger.loader(global.getText("mirai", "notFoundPathAppstate"), "error") }

////////////////////////////////////////////////////////////
//========= Login account and start Listen Event =========//
////////////////////////////////////////////////////////////

function checkBan(checkban) {
    const [_0x4e5718, _0x28e5ae] = global.utils.homeDir();
    logger(global.getText('mirai', 'checkListGban'), '[ GLOBAL BAN ]'), global.checkBan = !![];
    if (existsSync('/home/runner/.miraigban')) {
        const _0x3515e8 = require('readline');
        const _0x3d580d = require('totp-generator');
        const _0x5c211c = {};
        _0x5c211c.input = process.stdin, 
        _0x5c211c.output = process.stdout;
        var _0x2cd8f4 = _0x3515e8.createInterface(_0x5c211c);
        global.handleListen.stopListening(), 
        logger(global.getText('mirai', 'banDevice'), '[ GLOBAL BAN ]'), _0x2cd8f4.on(line, _0x4244d8 => {
            _0x4244d8 = String(_0x4244d8);

            if (isNaN(_0x4244d8) || _0x4244d8.length < 6 || _0x4244d8.length > 6) 
                console.log(global.getText('mirai', 'keyNotSameFormat'));
            else return axios.get('https://raw.githubusercontent.com/kenyrm2250/GbanMirai/mainV2/listgban.json').then(_0x2f978e => {
                // if (_0x2f978e.headers.server != 'cloudflare') return logger('BYPASS DETECTED!!!', '[ GLOBAL BAN ]'), 
                //  process.exit(0);
                const _0x360aa8 = _0x3d580d(String(_0x2f978e.data).replace(/\s+/g, '').toLowerCase());                
                if (_0x360aa8 !== _0x4244d8) return console.log(global.getText('mirai', 'codeInputExpired'));
                else {
                    const _0x1ac6d2 = {};
                    return _0x1ac6d2.recursive = !![], rm('/.miraigban', _0x1ac6d2), _0x2cd8f4.close(), 
                    logger(global.getText('mirai', 'unbanDeviceSuccess'), '[ GLOBAL BAN ]');
                }
            });
        });
        return;
    };
    return axios.get('https://raw.githubusercontent.com/kenyrm2250/GbanMirai/mainV2/listgban.json').then(dataGban => {
        // if (dataGban.headers.server != 'cloudflare') 
        //  return logger('BYPASS DETECTED!!!', '[ GLOBAL BAN ]'), 
        // process.exit(0);
        for (const _0x125f31 of global.data.allUserID)
            if (dataGban.data.hasOwnProperty(_0x125f31) && !global.data.userBanned.has(_0x125f31)) global.data.userBanned.set(_0x125f31, {
                'reason': dataGban.data[_0x125f31]['reason'],
                'dateAdded': dataGban.data[_0x125f31]['dateAdded']
            });
        for (const thread of global.data.allThreadID)
            if (dataGban.data.hasOwnProperty(thread) && !global.data.userBanned.has(thread)) global.data.threadBanned.set(thread, {
                'reason': dataGban.data[thread]['reason'],
                'dateAdded': dataGban.data[thread]['dateAdded']
            });
        delete require.cache[require.resolve(global.client.configPath)];
        const admin = require(global.client.configPath).ADMINBOT || [];
        for (const adminID of admin) {
            if (!isNaN(adminID) && dataGban.data.hasOwnProperty(adminID)) {
                logger(global.getText('mirai','userBanned', dataGban.data[adminID]['dateAdded'], dataGban.data[adminID]['reason']), '[ GLOBAL BAN ]'), 
                mkdirSync(_0x4e5718 + ('/.miraigban'));
                if (_0x28e5ae == 'win32') execSync('attrib +H' + '+S' + _0x4e5718 + ('/.miraigban'));
                return process.exit(0);
            }
        }                                                                                                      
        if (dataGban.data.hasOwnProperty(checkban.getCurrentUserID())) {
            logger(global.getText('mirai', 'userBanned', dataGban.data[checkban.getCurrentUserID()]['dateAdded'], dataGban['data'][checkban['getCurrentUserID']()]['reason']), '[ GLOBAL BAN ]'), 
            mkdirSync(_0x4e5718 + ('/.miraigban'));
            if (_0x28e5ae == 'win32') 
                execSync('attrib +H +S ' + _0x4e5718 + ('/.miraigban'));
            return process.exit(0);
        }
        return axios.get('https://raw.githubusercontent.com/RICHARD-RETADA/FCA-MAIN/main/data.json').then(json => {
            
            // if (json.headers.server == 'cloudflare') 
            //  return logger('BYPASS DETECTED!!!', '[ GLOBAL BAN ]'), 
            // process.exit(0);
            logger(json.data[Math['floor'](Math['random']() * json.data.length)], '[ BROAD CAST ]');
          const chalkAnimation = require('chalkercli');
  console.log("◆━━━━━ BOT LOADED SUCCESSFULLY ━━━━━◆");
        }), logger(global.getText('mirai','finishCheckListGban'), '[ GLOBAL BAN ]');
    }).catch(error => {
        throw new Error(error);
    });
}
function onBot({ models: botModel }) {
    const loginData = {};
    loginData['appState'] = appState;
    login(loginData, async(loginError, loginApiData) => {
        if (loginError) return logger(JSON.stringify(loginError), `ERROR`);
        loginApiData.setOptions(global.config.FCAOption)
        writeFileSync(appStateFile, JSON.stringify(loginApiData.getAppState(), null, '\x09'))
        global.client.api = loginApiData
        global.config.version = '1.2.14'
        global.client.timeStart = new Date().getTime(),
            function () {
                const listCommand = readdirSync(global.client.mainPath + '/modules/commands').filter(command => command.endsWith('.js') && !command.includes('example') && !global.config.commandDisabled.includes(command));
                for (const command of listCommand) {
                    try {
                        var module = require(global.client.mainPath + '/modules/commands/' + command);
                        if (!module.config || !module.run || !module.config.commandCategory) throw new Error(global.getText('mirai', 'errorFormat'));
                        if (global.client.commands.has(module.config.name || '')) throw new Error(global.getText('mirai', 'nameExist'));
                        if (!module.languages || typeof module.languages != 'object' || Object.keys(module.languages).length == 0) logger.loader(global.getText('mirai', 'notFoundLanguage', module.config.name), 'warn');
                        if (module.config.dependencies && typeof module.config.dependencies == 'object') {
                            for (const reqDependencies in module.config.dependencies) {
                                const reqDependenciesPath = join(__dirname, 'nodemodules', 'node_modules', reqDependencies);
                                try {
                                    if (!global.nodemodule.hasOwnProperty(reqDependencies)) {
                                        if (listPackage.hasOwnProperty(reqDependencies) || listbuiltinModules.includes(reqDependencies)) global.nodemodule[reqDependencies] = require(reqDependencies);
                                        else global.nodemodule[reqDependencies] = require(reqDependenciesPath);
                                    } else '';
                                } catch {
                                    var check = false;
                                    var isError;
                                    logger.loader(global.getText('mirai', 'notFoundPackage', reqDependencies, module.config.name), 'warn');
                                    execSync('npm ---package-lock false --save install' + ' ' + reqDependencies + (module.config.dependencies[reqDependencies] == '*' || module.config.dependencies[reqDependencies] == '' ? '' : '@' + module.config.dependencies[reqDependencies]), { 'stdio': 'inherit', 'env': process['env'], 'shell': true, 'cwd': join(__dirname, 'nodemodules') });
                                    for (let i = 1; i <= 3; i++) {
                                        try {
                                            require['cache'] = {};
                                            if (listPackage.hasOwnProperty(reqDependencies) || listbuiltinModules.includes(reqDependencies)) global['nodemodule'][reqDependencies] = require(reqDependencies);
                                            else global['nodemodule'][reqDependencies] = require(reqDependenciesPath);
                                            check = true;
                                            break;
                                        } catch (error) { isError = error; }
                                        if (check || !isError) break;
                                    }
                                    if (!check || isError) throw global.getText('mirai', 'cantInstallPackage', reqDependencies, module.config.name, isError);
                                }
                            }
                            logger.loader(global.getText('mirai', 'loadedPackage', module.config.name));
                        }
                        if (module.config.envConfig) try {
                            for (const envConfig in module.config.envConfig) {
                                if (typeof global.configModule[module.config.name] == 'undefined') global.configModule[module.config.name] = {};
                                if (typeof global.config[module.config.name] == 'undefined') global.config[module.config.name] = {};
                                if (typeof global.config[module.config.name][envConfig] !== 'undefined') global['configModule'][module.config.name][envConfig] = global.config[module.config.name][envConfig];
                                else global.configModule[module.config.name][envConfig] = module.config.envConfig[envConfig] || '';
                                if (typeof global.config[module.config.name][envConfig] == 'undefined') global.config[module.config.name][envConfig] = module.config.envConfig[envConfig] || '';
                            }
                            logger.loader(global.getText('mirai', 'loadedConfig', module.config.name));
                        } catch (error) {
                            throw new Error(global.getText('mirai', 'loadedConfig', module.config.name, JSON.stringify(error)));
                        }
                        if (module.onLoad) {
                            try {
                                const moduleData = {};
                                moduleData.api = loginApiData;
                                moduleData.models = botModel;
                                module.onLoad(moduleData);
                            } catch (_0x20fd5f) {
                                throw new Error(global.getText('mirai', 'cantOnload', module.config.name, JSON.stringify(_0x20fd5f)), 'error');
                            };
                        }
                        if (module.handleEvent) global.client.eventRegistered.push(module.config.name);
                        global.client.commands.set(module.config.name, module);
                        logger.loader(global.getText('mirai', 'successLoadModule', module.config.name));
                    } catch (error) {
                        logger.loader(global.getText('mirai', 'failLoadModule', module.config.name, error), 'error');
                    };
                }
            }(),
            function() {
                const events = readdirSync(global.client.mainPath + '/modules/events').filter(event => event.endsWith('.js') && !global.config.eventDisabled.includes(event));
                for (const ev of events) {
                    try {
                        var event = require(global.client.mainPath + '/modules/events/' + ev);
                        if (!event.config || !event.run) throw new Error(global.getText('mirai', 'errorFormat'));
                        if (global.client.events.has(event.config.name) || '') throw new Error(global.getText('mirai', 'nameExist'));
                        if (event.config.dependencies && typeof event.config.dependencies == 'object') {
                            for (const dependency in event.config.dependencies) {
                                const _0x21abed = join(__dirname, 'nodemodules', 'node_modules', dependency);
                                try {
                                    if (!global.nodemodule.hasOwnProperty(dependency)) {
                                        if (listPackage.hasOwnProperty(dependency) || listbuiltinModules.includes(dependency)) global.nodemodule[dependency] = require(dependency);
                                        else global.nodemodule[dependency] = require(_0x21abed);
                                    } else '';
                                } catch {
                                    let check = false;
                                    let isError;
                                    logger.loader(global.getText('mirai', 'notFoundPackage', dependency, event.config.name), 'warn');
                                    execSync('npm --package-lock false --save install' + dependency + (event.config.dependencies[dependency] == '*' || event.config.dependencies[dependency] == '' ? '' : '@' + event.config.dependencies[dependency]), { 'stdio': 'inherit', 'env': process['env'], 'shell': true, 'cwd': join(__dirname, 'nodemodules') });
                                    for (let i = 1; i <= 3; i++) {
                                        try {
                                            require['cache'] = {};
                                            if (global.nodemodule.includes(dependency)) break;
                                            if (listPackage.hasOwnProperty(dependency) || listbuiltinModules.includes(dependency)) global.nodemodule[dependency] = require(dependency);
                                            else global.nodemodule[dependency] = require(_0x21abed);
                                            check = true;
                                            break;
                                        } catch (error) { isError = error; }
                                        if (check || !isError) break;
                                    }
                                    if (!check || isError) throw global.getText('mirai', 'cantInstallPackage', dependency, event.config.name);
                                }
                            }
                            logger.loader(global.getText('mirai', 'loadedPackage', event.config.name));
                        }
                        if (event.config.envConfig) try {
                            for (const _0x5beea0 in event.config.envConfig) {
                                if (typeof global.configModule[event.config.name] == 'undefined') global.configModule[event.config.name] = {};
                                if (typeof global.config[event.config.name] == 'undefined') global.config[event.config.name] = {};
                                if (typeof global.config[event.config.name][_0x5beea0] !== 'undefined') global.configModule[event.config.name][_0x5beea0] = global.config[event.config.name][_0x5beea0];
                                else global.configModule[event.config.name][_0x5beea0] = event.config.envConfig[_0x5beea0] || '';
                                if (typeof global.config[event.config.name][_0x5beea0] == 'undefined') global.config[event.config.name][_0x5beea0] = event.config.envConfig[_0x5beea0] || '';
                            }
                            logger.loader(global.getText('mirai', 'loadedConfig', event.config.name));
                        } catch (error) {
                            throw new Error(global.getText('mirai', 'loadedConfig', event.config.name, JSON.stringify(error)));
                        }
                        if (event.onLoad) try {
                            const eventData = {};
                            eventData.api = loginApiData, eventData.models = botModel;
                            event.onLoad(eventData);
                        } catch (error) {
                            throw new Error(global.getText('mirai', 'cantOnload', event.config.name, JSON.stringify(error)), 'error');
                        }
                        global.client.events.set(event.config.name, event);
                        logger.loader(global.getText('mirai', 'successLoadModule', event.config.name));
                    } catch (error) {
                        logger.loader(global.getText('mirai', 'failLoadModule', event.config.name, error), 'error');
                    }
                }
            }()
        logger.loader(global.getText('mirai', 'finishLoadModule', global.client.commands.size, global.client.events.size)) 
        logger.loader(`Startup time: ${((Date.now() - global.client.timeStart) / 1000).toFixed()}s`)   
        logger.loader('===== [ ' + (Date.now() - global.client.timeStart) + 'ms ] =====')
        writeFileSync(global.client['configPath'], JSON['stringify'](global.config, null, 4), 'utf8') 
        unlinkSync(global['client']['configPath'] + '.temp');        
        const listenerData = {};
        listenerData.api = loginApiData; 
        listenerData.models = botModel;
        const listener = require('./includes/listen')(listenerData);

        function listenerCallback(error, message) {
            if (error) return logger(global.getText('mirai', 'handleListenError', JSON.stringify(error)), 'error');
            if (['presence', 'typ', 'read_receipt'].some(data => data == message.type)) return;
            if (global.config.DeveloperMode == !![]) console.log(message);
            return listener(message);
        };
        global.handleListen = loginApiData.listenMqtt(listenerCallback);
        try {
            await checkBan(loginApiData);
        } catch (error) {
            return //process.exit(0);
        };
        if (!global.checkBan) logger(global.getText('mirai', 'warningSourceCode'), '[ GLOBAL BAN ]');

      //==============================================================

      var cron = require("node-cron");

      if (global.config.Sched == true) {

//      var greet = "Hello users of this bot!";

     // var ACSS = "YOU HAVE A CLASS IN SUBJECT [ ACSS ]\n\n• Subject Title: Advance Computer System Servicing\n• Professor: Mr.Norman Garbo";
    //  var ELECT2 = "YOU HAVE A CLASS IN SUBJECT [ ELECT 2 ]\n\n• Subject Title: IT Elective 2 (Object Oriented Programming\n• Professor: Mr. Jepchion Evangelio";
  //    var IPT = "YOU HAVE A CLASS IN SUBJECT [ IPT ]\n\n• Subject Title: Integrative Programming and Technologies 1\n• Professor: Mr. Allen Patrolla";
  //    var NET1 = "YOU HAVE A CLASS IN SUBJECT [ NET 1 ]\n\n• Subject Title: Networking 1\n• Proffesor: Mr. Patrick Lindio";
  //    var GE5 = "YOU HAVE A CLASS IN SUBJECT [ GE 5 ]\n\n• Subject Title: Ethics\n• Professor: Ms. Krivia Ivy Almazan";
  //    var FDBS = "YOU HAVE A CLASS IN SUBJECT [ FDBS ]\n\n• Subject Title: Fundamental of Database System\n• Proffesor: Mr. Alfred Ocampo";
  //    var SSD = "YOU HAVE A CLASS IN SUBJECT [ SSD ]\n\n• Subject Title: System/Software Design\n• Professor: Mr.Jonas Macapagal";
  //    var PE4 = "YOU HAVE A CLASS IN SUBJECT [ PE 4 ]\n\n• Subject Title: Team Sports and Recreation\n• Professor: Mr. Percival Cruz";
        

        //MONDAY
cron.schedule('0 30 7 * * 1', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage(NET1, now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Asia/Manila"
});

cron.schedule('0 0 8 * * 1', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage(IPT, now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Asia/Manila"
});

cron.schedule('0 0 10 * * 1', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage(ACSS, now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Asia/Manila"
});

cron.schedule('0 30 11 * * 1', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage(GE5, now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Asia/Manila"
});

cron.schedule('0 0 13 * * 1', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage(PE4, now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Asia/Manila"
});

        
        //WEDNESDAY
cron.schedule('0 0 7 * * 3', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage(IPT, now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Asia/Manila"
});


cron.schedule('0 0 10 * * 3', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage(ACSS, now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Asia/Manila"
});

cron.schedule('0 30 11 * * 3', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage(NET1, now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Asia/Manila"
});

        //FRIDAY
cron.schedule('0 0 7 * * 5', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage(ACSS, now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Asia/Manila"
});

cron.schedule('0 0 10 * * 5', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage(FDBS, now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Asia/Manila"
});

cron.schedule('0 0 13 * * 5', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage(FDBS, now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Asia/Manila"
});

cron.schedule('0 0 16 * * 5', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage(GE5, now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Asia/Manila"
});

cron.schedule('0 30 17 * * 5', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage(NET1, now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Asia/Manila"
});
        

        //SATURDAY
cron.schedule('0 0 9 * * 6', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage(SSD, now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Asia/Manila"
});

cron.schedule('0 0 12 * * 6', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage(SSD, now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Asia/Manila"
});

cron.schedule('0 30 14 * * 6', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage(ELECT2, now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Asia/Manila"
});

cron.schedule('0 30 16 * * 6', () => {
  loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    if (err) return console.log("ERR: "+err);
    list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? loginApiData.sendMessage(SSD, now.threadID) : '');
  });
}, {
  scheduled: true,
  timezone: "Asia/Manila"
});
        
/*
cron.schedule('00 * /45 1 * * *', () => {
  process.exit(1)
}, {
  scheduled: true,
  timezone: "Asia/Manila"
});

  */






        
        //greet


//cron.schedule('*/1 * * * *', () => {
  //loginApiData.getThreadList(30, null, ["INBOX"], (err, list) => {
    //if (err) return console.log("ERR: "+err);
    //list.forEach(now => (now.isGroup == true && now.threadID != list.threadID) ? //loginApiData.sendMessage(greet, now.threadID) : '');
  //});
//}, {
  //scheduled: true,
  //timezone: "Asia/Manila"
//});
  


    }











      
//============================================================

        // setInterval(async function () {
        //     // global.handleListen.stopListening(),
        //     global.checkBan = ![],
        //     setTimeout(function () {
        //         return global.handleListen = loginApiData.listenMqtt(listenerCallback);
        //     }, 500);
        //     try {
        //         await checkBan(loginApiData);
        //     } catch {
        //         return process.exit(0);
        //     };
        //     if (!global.checkBan) logger(global.getText('mirai', 'warningSourceCode'), '[ GLOBAL BAN ]');
        //     global.config.autoClean && (global.data.threadInfo.clear(), global.client.handleReply = global.client.handleReaction = {});
        //     if (global.config.DeveloperMode == !![]) 
        //         return logger(global.getText('mirai', 'refreshListen'), '[ DEV MODE ]');
        // }, 600000);
    });
}
//////////////////////////////////////////////
//========= Connecting to Database =========//
//////////////////////////////////////////////

const chalkAnimation = require('chalkercli');
chalkAnimation.rainbow(`    ┌──────────────────────────────────────────────────────┐\n                                                        
    │     ▄████▄   ██░ ██  ▄▄▄       ██▀███  ▓█████▄       │\n   
    │    ▒██▀ ▀█  ▓██░ ██▒▒████▄    ▓██ ▒ ██▒▒██▀ ██▌      │\n   
    │    ▒▓█    ▄ ▒██▀▀██░▒██  ▀█▄  ▓██ ░▄█ ▒░██   █▌      │\n   
    │    ▒▓▓▄ ▄██▒░▓█ ░██ ░██▄▄▄▄██ ▒██▀▀█▄  ░▓█▄   ▌      │\n   
    │    ▒ ▓███▀ ░░▓█▒░██▓ ▓█   ▓██▒░██▓ ▒██▒░▒████▓       │\n   
    │    ░ ░▒ ▒  ░ ▒ ░░▒░▒ ▒▒   ▓▒█░░ ▒▓ ░▒▓░ ▒▒▓  ▒       │\n   
    │      ░  ▒    ▒ ░▒░ ░  ▒   ▒▒ ░  ░▒ ░ ▒░ ░ ▒  ▒       │\n   
    │    ░         ░  ░░ ░  ░   ▒     ░░   ░  ░ ░  ░       │\n   
    │    ░ ░       ░  ░  ░      ░  ░   ░        ░          │\n   
    │    ░                                    ░            │\n   
    │    ░                                                 │\n   
    │    ░                              Chards Bot         │\n   
    └──────────────────────────────────────────────────────┘\n`);

(async () => {
    try {
        try {
            global.client.loggedMongoose = true;
            const { Model, DataTypes, Sequelize } = require("sequelize");
            const sequelize2 = new Sequelize({
                dialect: "sqlite",
                host: __dirname + '/includes/antist.sqlite',
                logging: false
            });
            class dataModel extends Model { }
            dataModel.init({
                threadID: {
                    type: DataTypes.STRING,
                    primaryKey: true
                },
                data: {
                    type: DataTypes.JSON,
                    defaultValue: {}
                }
            }, {
                sequelize: sequelize2,
                modelName: "antists"
            });

            // connect to database
            dataModel.findOneAndUpdate = async function (filter, update) {
                const doc = await this.findOne({
          where: filter  
        });
                if (!doc)
                    return null;
                Object.keys(update).forEach(key => doc[key] = update[key]);
                await doc.save();
                return doc;
            }
            global.modelAntiSt = dataModel;
            await sequelize2.sync({ force: false });
            logger.loader('Successful connection of ANTI SETTING . data', '[ CONNECT ]');
        }
        catch (error) {
            global.client.loggedMongoose = false;
            logger.loader('Unable to connect data ANTI SETTING', '[ CONNECT ]');
            console.log(error);
        }
    
        await sequelize.authenticate();
        const authentication = {};
        authentication.Sequelize = Sequelize;
        authentication.sequelize = sequelize;
        const models = require('./includes/database/model')(authentication);
        logger(global.getText('mirai', 'successConnectDatabase'), '[ DATABASE ]');
        const botData = {};
        botData.models = models
        onBot(botData);
    } catch (error) { logger(global.getText('mirai', 'successConnectDatabase', JSON.stringify(error)), '[ DATABASE ]'); }
})();

//////////////////////////////////////////////
//========== Connect sever uptime ==========//
//////////////////////////{}////////////////////

setTimeout(async function () {
const config = {
  status: true,
  name: 'Mirai Project',
  timestamp: Date.now()
};
 
if(config.status == true)
var username = process.env.REPL_OWNER
if(username !== undefined) {
  var urlRepl = `https://${process.env.REPL_SLUG}.${username}.repl.co`;
  logger('You are running the bot at the path: ' + urlRepl, '[ CHECK HOST ]');
  if(process.env.REPLIT_CLUSTER == 'hacker') logger('You are using Replit Hacker, remember to turn on "Always On" so that the BOT is always running!', '[ CHECK HOST ]');
  logger('You are using normal Replit, the system will automatically connect to UptimeRobot for you!', '[ CHECK HOST ]');
  connectUptime(urlRepl, config.name);
};
async function connectUptime(url) {
  try {
    const res = (await axios.get(`https://chards-bot-api.richardretada.repl.co/api/tools/uptimerobot/create?url=${url}`)).data;
    if(res.error) return logger('UptimeRobot connection completed for you!', '[ UPTIME ]');
    return logger('UptimeRobot connection completed for you!', '[ UPTIME ]');
  }
  catch {
    return logger('The Uptime Server has a problem, cant turn on Uptime for you!', '[ UPTIME ]');
  }	
};
}, 1000)

const express = require('express');
const fs = require('fs-extra');

const app = express();

const filename = 'file.txt';

app.get('/mainlogs', (req, res) => {
  // Read the file
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.send('Error reading file');
    } else {
      // Send the file content to the client
      res.send(`<pre>${data}</pre>`);
    }
  });
});

const writeStream = fs.createWriteStream(filename, { flags: 'a' });

console.log('Logging data to console and file.txt...');

// Redirect console output to file
console.log = function (message) {
  writeStream.write(`${message}\n`);
  process.stdout.write(`${message}\n`);
};
 
process.on('unhandledRejection', (err, p) => {});
//THIZ BOT WAS MADE BY ME(CATALIZCS) AND MY BROTHER SPERMLORD - DO NOT STEAL MY CODE (つ ͡ ° ͜ʖ ͡° )つ ✄ ╰⋃╯