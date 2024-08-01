module.exports.config = {
	name: "adminconfig",
	version: "1.0.5",
	hasPermssion: 0,
	credits: "Mirai Team",
	description: "Admin bot management",
	commandCategory: "Admin",
	usages: "[list/add/remove] [userID] or see more in menu",
    cooldowns: 5,
    dependencies: {
        "fs-extra": ""
    }
};

module.exports.languages = {
    "vi": {
        "listAdmin": '===『ADMINBOT』=== \n\n%1\n===「Người Điều Hành」===',
        "notHavePermssion": '⚡️ Bạn không đủ quyền hạn để có thể sử dụng chức năng "%1"',
        "addedNewAdmin": '⚡️ Đã thêm %1 người dùng trở thành người điều hành bot:\n\n%2',
        "removedAdmin": '⚡️Đã gỡ bỏ %1 người điều hành bot:\n\n%2'
    },
    "en": {
        "listAdmin": '[ Admin ] Admin list: \n\n%1',
        "notHavePermssion": '[ Admin ] You have no permission to use "%1"',
        "addedNewAdmin": '[ Admin ] Added %1 Admin :\n\n%2',
        "removedAdmin": '[ Admin ] Remove %1 Admin:\n\n%2'
    }
}
module.exports.onLoad = function() {
    const { writeFileSync, existsSync } = require('fs-extra');
    const { resolve } = require("path");
    const path = resolve(__dirname, 'cache', 'data.json');
    if (!existsSync(path)) {
        const obj = {
            adminbox: {}
        };
        writeFileSync(path, JSON.stringify(obj, null, 4));
    } else {
        const data = require(path);
        if (!data.hasOwnProperty('adminbox')) data.adminbox = {};
        writeFileSync(path, JSON.stringify(data, null, 4));
    }
}
module.exports.run = async function ({ api, event, args, Users, Threads, permssion, getText }) {
    const content = args.slice(1, args.length);
    const { threadID, messageID, mentions } = event;
    const { configPath } = global.client;
    const { ADMINBOT } = global.config;
    const { userName } = global.data;
    const { writeFileSync } = global.nodemodule["fs-extra"];
    const mention = Object.keys(mentions);
    let data = (await Threads.getData(threadID)).data;

    delete require.cache[require.resolve(configPath)];
    var config = require(configPath);

    switch (args[0]) {
        case "list":
        case "all":
        case "-a": {
            const listAdmin = ADMINBOT || config.ADMINBOT || [];
            var msg = [];

            for (const idAdmin of listAdmin) {
                if (parseInt(idAdmin)) {
                    const name = (await Users.getData(idAdmin)).name
                    msg.push(` •《${name}》\n➢ Facebook: https://facebook.com/${idAdmin}`);
                }
            }

            return api.sendMessage(getText("listAdmin", msg.join("\n")), threadID, messageID);
        }
        
        case "add": {
            if (permssion != 3) return api.sendMessage("Border rights", threadID, messageID);
            if(event.type == "message_reply") { content[0] = event.messageReply.senderID }
            if (mention.length != 0 && isNaN(content[0])) {
                var listAdd = [];

                for (const id of mention) {
                    ADMINBOT.push(id);
                    config.ADMINBOT.push(id);
                    listAdd.push(`[ ${id} ] » ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                ADMINBOT.push(content[0]);
                config.ADMINBOT.push(content[0]);
                const name = (await Users.getData(content[0])).name
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", 1, `[ 𝘼𝘿𝙈𝙄𝙉 ] » ${name}`), threadID, messageID);
            }
            else return global.utils.throwError(this.config.name, threadID, messageID);
        }

        case "remove":
        case "rm":
        case "delete": {
            if (permssion != 2) return api.sendMessage("Border rights", threadID, messageID);
            if(event.type == "message_reply") { content[0] = event.messageReply.senderID }
            if (mentions.length != 0 && isNaN(content[0])) {
                const mention = Object.keys(mentions);
                var listAdd = [];

                for (const id of mention) {
                    const index = config.ADMINBOT.findIndex(item => item == id);
                    ADMINBOT.splice(index, 1);
                    config.ADMINBOT.splice(index, 1);
                    listAdd.push(`[ ${id} ] » ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("removedAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                const index = config.ADMINBOT.findIndex(item => item.toString() == content[0]);
                ADMINBOT.splice(index, 1);
                config.ADMINBOT.splice(index, 1);
                const name = (await Users.getData(content[0])).name
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("removedAdmin", 1, `[ ${content[0]} ] » ${name}`), threadID, messageID);
            }
            else global.utils.throwError(this.config.name, threadID, messageID);
        }
        case 'boxonly': {
            if (permssion != 3) return api.sendMessage("Border rights", threadID, messageID);
        const { resolve } = require("path");
        const pathData = resolve(__dirname, 'cache', 'data.json');
        const database = require(pathData);
        const { adminbox } = database;   
        if (adminbox[threadID] == true) {
            adminbox[threadID] = false;
            api.sendMessage("» Successfully turned off admin mode (everyone can use bots)", threadID, messageID);
        } else {
            adminbox[threadID] = true;
            api.sendMessage("» Successfully enabled admin mode (only Admin with Qtv box can use bot)", threadID, messageID);
        }
        writeFileSync(pathData, JSON.stringify(database, null, 4));
        break;
        }
   case 'only':
   case '-o': {
        //---> CODE ADMIN ONLY<---//
        if (permssion != 3) return api.sendMessage("⚡️ Border rights", threadID, messageID);
        if (config.adminOnly == false) {
            config.adminOnly = true;
            api.sendMessage("» Successfully enabled admin only (Only admin can use bot)", threadID, messageID);
        } else {
            config.adminOnly = false;
            api.sendMessage("» Successfully turned off admin only (everyone can use bots)", threadID, messageID);
        }
            writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
              break;
        }
    case 'paonly':
    case 'personalonly':
    case '-pa': {
        //---> CODE ADMIN PERSONAL ONLY<---//
        if (permssion != 3) return api.sendMessage("Border rights", threadID, messageID);
        if (config.adminPersonalOnly == false) {
            config.adminPersonalOnly = true;
            api.sendMessage("» Successfully enabled admin personal only", threadID, messageID);
        } else {
            config.adminPersonalOnly = false;
            api.sendMessage("» Successfully turned off admin personal only", threadID, messageID);
        }
            writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
              break;
        }
        case 'autoreply':
    case 'mesrep':
    case '-ap': {
        //---> CODE ADMIN PERSONAL ONLY<---//
        if (permssion != 3) return api.sendMessage("Border rights", threadID, messageID);
        if (config.AutoReply == false) {
            config.AutoReply = true;
            api.sendMessage("» Auto response in reply [ ON ]", threadID, messageID);
        } else {
            config.AutoReply = false;
            api.sendMessage("» Auto response in reply [ OFF ]", threadID, messageID);
        }
            writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
              break;
        }
        case 'selflisten':
    case 'listen':
    case '-sl': {
        //---> CODE ADMIN PERSONAL ONLY<---//
        if (permssion != 3) return api.sendMessage("Border rights", threadID, messageID);
        if (config.FCAOption.selfListen == false) {
            config.FCAOption.selfListen = true;
            api.sendMessage("» selfListen [ true ]", threadID, messageID);
        } else {
            config.FCAOption.selfListen = false;
            api.sendMessage("» selfListen [ false ]", threadID, messageID);
        }
            writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
              break;
        }
        case 'autoleave':
    case 'autol':
    case '-al': {
        //---> CODE ADMIN PERSONAL ONLY<---//
        if (permssion != 3) return api.sendMessage("Border rights", threadID, messageID);
        if (config.AutoLeave == false) {
            config.AutoLeave = true;
            api.sendMessage("» AutoLeave [ true ]", threadID, messageID);
        } else {
            config.AutoLeave = false;
            api.sendMessage("» AutoLeave [ false ]", threadID, messageID);
        }
            writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
              break;
        }
        case 'antimultiplebot':
    case 'antimb':
    case '-amb': {
        //---> CODE ADMIN PERSONAL ONLY<---//
        if (permssion != 3) return api.sendMessage("Border rights", threadID, messageID);
        if (config.AntiMultipleBot == false) {
            config.AntiMultipleBot = true;
            api.sendMessage("» AntiMultipleBot [ true ]", threadID, messageID);
        } else {
            config.AntiMultipleBot = false;
            api.sendMessage("» AntiMultipleBot [ false ]", threadID, messageID);
        }
            writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
              break;
        }
        case 'autogreet':
    case 'autg':
    case '-ag': {
        //---> CODE ADMIN PERSONAL ONLY<---//
        if (permssion != 3) return api.sendMessage("Border rights", threadID, messageID);
        if (config.AutoGreet == false) {
            config.AutoGreet = true;
            api.sendMessage("» AutoGreet [ true ]", threadID, messageID);
        } else {
            config.AutoGreet = false;
            api.sendMessage("» AutoGreet [ false ]", threadID, messageID);
        }
            writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
              break;
        }
        case 'show': {

          var rankup = data.rankup;
          var resend = data.resend;
          var antiout = data.antiout;

          rankup == null ? rankup = `false` : rankup = `${rankup}`;
          resend == null ? resend = `false` : resend = `${resend}`;
          antiout == null ? antiout = `true` : antiout = `${antiout}`;
          
        //---> CODE ADMIN PERSONAL ONLY<---//
        return api.sendMessage(`
=== 𝗦𝗬𝗦𝗧𝗘𝗠 𝗖𝗢𝗡𝗙𝗜𝗚 ===

𝘼𝙐𝙏𝙊𝙍𝙀𝙋𝙇𝙔 : ${config.AutoReply}
𝙎𝙀𝙇𝙁𝙇𝙄𝙎𝙏𝙀𝙉 : ${config.FCAOption.selfListen}
𝘼𝙐𝙏𝙊𝙂𝙍𝙀𝙀𝙏 : ${config.AutoGreet}
𝘼𝙐𝙏𝙊𝙇𝙀𝘼𝙑𝙀 : ${config.AutoLeave}
𝘼𝙉𝙏𝙄𝙈𝙐𝙇𝙏𝙄𝙋𝙇𝙀𝘽𝙊𝙏 : ${config.AntiMultipleBot}

=== 𝗧𝗛𝗥𝗘𝗔𝗗 𝗖𝗢𝗡𝗙𝗜𝗚 ===

𝘼𝙉𝙏𝙄𝙊𝙐𝙏 : ${antiout}
𝙍𝘼𝙉𝙆𝙐𝙋 : ${rankup}
𝙍𝙀𝙎𝙀𝙉𝘿 : ${resend}
        
        `, threadID, messageID);
              break;
        }
        default: {
          return api.sendMessage(`You can use: 
  » 𝘼𝘿𝙈𝙄𝙉𝘾𝙊𝙉𝙁𝙄𝙂 𝙇𝙄𝙎𝙏 -> see admin list
  » 𝘼𝘿𝙈𝙄𝙉𝘾𝙊𝙉𝙁𝙄𝙂 𝘼𝘿𝘿 -> add admin bot
  » 𝘼𝘿𝙈𝙄𝙉𝘾𝙊𝙉𝙁𝙄𝙂 𝙍𝙀𝙈𝙊𝙑𝙀 -> remove admin bot
  » 𝘼𝘿𝙈𝙄𝙉𝘾𝙊𝙉𝙁𝙄𝙂 𝘽𝙊𝙓𝙊𝙉𝙇𝙔 -> Turn on the mode that only admin box can use bot
  » 𝘼𝘿𝙈𝙄𝙉𝘾𝙊𝙉𝙁𝙄𝙂 𝙊𝙉𝙇𝙔 -> Enable bot admin mode only can use bot
  » 𝘼𝘿𝙈𝙄𝙉𝘾𝙊𝙉𝙁𝙄𝙂 𝙋𝙀𝙍𝙎𝙊𝙉𝘼𝙇𝙊𝙉𝙇𝙔 -> Only admins can chat privately with bots
  » 𝘼𝘿𝙈𝙄𝙉𝘾𝙊𝙉𝙁𝙄𝙂 𝘼𝙐𝙏𝙊𝙍𝙀𝙋𝙇𝙔 -> On/Off autoreply simsimi
  » 𝘼𝘿𝙈𝙄𝙉𝘾𝙊𝙉𝙁𝙄𝙂 𝙎𝙀𝙇𝙁𝙇𝙄𝙎𝙏𝙀𝙉 -> On/Off bot selflisten
  » 𝘼𝘿𝙈𝙄𝙉𝘾𝙊𝙉𝙁𝙄𝙂 𝘼𝙐𝙏𝙊𝙂𝙍𝙀𝙀𝙏 -> On/Off bot autogreet
  » 𝘼𝘿𝙈𝙄𝙉𝘾𝙊𝙉𝙁𝙄𝙂 𝘼𝙐𝙏𝙊𝙇𝙀𝘼𝙑𝙀 -> On/Off bot autoleave

  » 𝘼𝙉𝙏𝙄𝙊𝙐𝙏 -> On/Off Antiout User
  » 𝙍𝘼𝙉𝙆𝙐𝙋 -> On/Off Rankup Noti
  » 𝙍𝙀𝙎𝙀𝙉𝘿 -> On/Off Resend unsend messages
          
  » User Manual: 𝘼𝘿𝙈𝙄𝙉𝘾𝙊𝙉𝙁𝙄𝙂 <case>`, threadID, messageID);
        }
    };
}