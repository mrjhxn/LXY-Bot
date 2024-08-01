module.exports.config = {
    name:"simv4",
    version: "1.0.2",
    hasPermssion: 0,
    credits: "DungUwU",
    description: "sim",
    commandCategory: "sim [text]",
    usages: "[sim]/[on,off]",
    cooldowns: 5
};

const axios = require('axios');

module.exports.onLoad = function() {
    const { writeFileSync, existsSync } = global.nodemodule["fs-extra"];
    const { resolve } = global.nodemodule["path"];
    const log = require(process.cwd() + '/utils/log');
    const path = resolve(__dirname, 'cache', 'sim.json');
    if (!existsSync(path)) {
        const obj = {
            sim: {}
        };
        writeFileSync(path, JSON.stringify(obj, null, 4));
    } else {
        const data = require(path);
        if (!data.hasOwnProperty('sim')) data.sim = {};
        writeFileSync(path, JSON.stringify(data, null, 4));
    }
}

module.exports.handleEvent = async ({ api, event, args, Threads }) => {
    const { threadID, messageID } = event;
    const { resolve } = global.nodemodule["path"];
    const path = resolve(__dirname, '../commands', 'cache', 'sim.json');
    const { sim} = require(path);

    if (sim.hasOwnProperty(threadID) && sim[threadID] == true) {
      if (event.senderID !== api.getCurrentUserID()) {
      axios.get(encodeURI(`https://sanuw-api.herokuapp.com/docs/other/simi?text=${event.body}&lang=ph&apikey=sanuwa`)).then(res => {
            if (res.data.output == "null" || res.data.output == "I don't know what your'e saying please teach me") {
                api.sendMessage("I don't know what your'e saying please teach me",threadID,messageID)
            } else {
                return api.sendMessage(res.data.output, threadID, messageID);
            }
    })
    }  
    }
}

module.exports.run = async ({ api, event, args, Threads }) => {
    const { writeFileSync } = global.nodemodule["fs-extra"];
    const { resolve } = global.nodemodule["path"];
    const path = resolve(__dirname, 'cache', 'sim.json');
    const { threadID, messageID } = event;
    const database = require(path);
    const { sim } = database;

    if (!args[0]) { api.sendMessage("I don't know what your'e saying please teach me", threadID, messageID) } else {
        switch(args[0]) {
            case "on": {
                sim[threadID] = true;
                api.sendMessage("Sim on!", threadID);
                break;
            }
            case "off": {
                sim[threadID] = false;
                api.sendMessage("Sim off", threadID);
                break;
            }
            default:
            axios.get(encodeURI(`https://sanuw-api.herokuapp.com/docs/other/simi?text=${args.join(" ")}&lang=ph&apikey=sanuwa`)).then(res => {
            if (res.data.output == "null" || res.data.output == "I don't know what your'e saying please teach me.") {
                api.sendMessage("I don't know what your'e saying please teach me",threadID,messageID)
            } else {
                return api.sendMessage(res.data.output, threadID, messageID);
            }
            });
            break;
        }
        writeFileSync(path, JSON.stringify(database, null, 4));
    }
}