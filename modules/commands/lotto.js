'use strict';
module.exports.config = {
  name: "lotto",
  version: "1.0.4",
  hasPermssion: 0,
  credits: "DungUwU",
  description: "chơi loto",
  usages: "[create/join/start]\n---------o>\ncreate [amount] (minimum $50)\njoin (balance must be >= set by creator)\nstart (start) early game)\n---------o>",
  commandCategory: "Game",
  cooldowns: 5,
  envConfig: {
    maxPlayers: 10,//tối thiểu 2, tối đa 10
    getDelay: 8 //delay bốc số (giây)
  }
};


const fs = require("fs");

const loto = {
  "loto_pink.jpg": [
    [15, 30, 49, 60, 74],
    [7, 26, 33, 52, 69],
    [22, 41, 55, 71, 88],
    [11, 37, 64, 76, 90],
    [18, 38, 50, 78, 84],
    [3, 29, 43, 59, 61],
    [10, 48, 63, 75, 81],
    [1, 21, 35, 62, 77],
    [9, 16, 40, 54, 70]
  ],
  "loto_blue.jpg": [
    [25, 52, 60, 77, 83],
    [1, 30, 44, 51, 70],
    [11, 21, 47, 56, 62],
    [2, 33, 59, 68, 73],
    [23, 39, 42, 75, 80],
    [14, 26, 66, 79, 88],
    [19, 20, 37, 55, 81],
    [8, 13, 57, 61, 87],
    [28, 34, 58, 76, 82]
  ],
  "loto_cyan.jpg": [
    [11, 33, 69, 78, 85],
    [2, 14, 21, 35, 76],
    [8, 19, 41, 50, 84],
    [9, 15, 37, 44, 87],
    [6, 26, 65, 77, 82],
    [1, 18, 30, 59, 66],
    [10, 38, 47, 51, 80],
    [5, 13, 29, 52, 79],
    [3, 20, 54, 70, 88]
  ],
  "loto_green.jpg": [
    [6, 19, 27, 56, 63],
    [7, 30, 45, 69, 77],
    [1, 17, 47, 58, 81],
    [20, 37, 49, 53, 78],
    [5, 12, 28, 65, 71],
    [15, 22, 31, 57, 90],
    [3, 25, 35, 50, 64],
    [9, 33, 51, 60, 76],
    [36, 41, 55, 62, 85]
  ],
  "loto_orange.jpg": [
    [3, 10, 22, 58, 75],
    [26, 33, 60, 78, 86],
    [17, 27, 62, 71, 80],
    [15, 32, 47, 50, 69],
    [2, 30, 42, 77, 83],
    [11, 34, 67, 73, 81],
    [6, 14, 49, 66, 70],
    [29, 37, 44, 51, 85],
    [16, 23, 39, 54, 90]
  ],
  "loto_red.jpg": [
    [12, 41, 56, 72, 83],
    [9, 33, 40, 60, 86],
    [7, 15, 45, 51, 78],
    [18, 44, 53, 65, 90],
    [1, 21, 48, 54, 77],
    [6, 30, 59, 71, 87],
    [14, 25, 32, 47, 66],
    [5, 27, 55, 69, 73],
    [2, 10, 39, 52, 63]
  ],
  "loto_lawn.jpg": [
    [2, 15, 39, 46, 66],
    [7, 12, 53, 76, 88],
    [8, 34, 41, 70, 83],
    [33, 47, 59, 64, 86],
    [22, 30, 51, 69, 87],
    [5, 21, 49, 75, 80],
    [17, 28, 40, 55, 67],
    [9, 16, 43, 79, 84],
    [10, 44, 56, 60, 71]
  ],
  "loto_yellow.jpg": [
    [8, 19, 26, 57, 60],
    [6, 10, 39, 44, 81],
    [1, 20, 37, 75, 83],
    [7, 13, 56, 65, 88],
    [4, 28, 49, 51, 66],
    [22, 30, 43, 79, 80],
    [2, 29, 34, 59, 63],
    [5, 17, 46, 73, 89],
    [3, 15, 32, 40, 54]
  ],
  "loto_purple.jpg": [
    [9, 14, 59, 60, 89],
    [6, 22, 36, 47, 79],
    [4, 27, 51, 66, 74],
    [7, 21, 42, 55, 81],
    [5, 11, 39, 52, 88],
    [1, 17, 44, 68, 75],
    [20, 56, 63, 73, 87],
    [3, 19, 26, 58, 76],
    [10, 24, 33, 67, 85]
  ],
  "loto_teal.jpg": [
    [4, 31, 46, 66, 75],
    [8, 12, 35, 53, 89],
    [1, 25, 40, 50, 65],
    [14, 47, 52, 61, 71],
    [9, 19, 34, 55, 81],
    [3, 22, 49, 72, 82],
    [11, 33, 57, 69, 87],
    [2, 24, 39, 44, 78],
    [5, 29, 51, 67, 80]
  ]
};

module.exports.languages = {
  "vi": {
    "missingInput": "[ LOTTO ] Bet amount cannot be empty or negative",
    "moneyBetNotEnough": "[ LOTTO ] Your balance is not enough, you need %1 dollar!",
    "limitBet": "[ LOTTO ] The number of coins placed cannot be less than 50$!",
    "noGame": "[ LOTTO ] Your team has no bingo going on!",
    "alreadyHave": "There is 1 bingo going on in this group!",
    "openSuccess": "Successfully opened! (%1/%2)\nTo join, use:\n%3 join",
    "alreadyJoined": "You are already in the room",
    "out_of_room": "It's out of space...",
    "alreadyStarted_1": "Game has started, can't join!",
    "joinSuccess": "Entered successfully! (%1/%2)",
    "playersNotEnough": "Not enough players, min: 2, existing: 1",
    "not_author": "You are not the owner of the room",
    "alreadyStarted_2": "The match is on!",
    "testInbox": "Checking player inbox status..",
    "checkInbox_noti": "The bot will send votes to each person, please check your inbox/spam/waiting message",
    "cannotInbox": "%1, bot can't inbox you, please inbox bot first to unlock bot inbox",
    "notJoined": "You haven't joined yet!",
    "getReady": "Start!\nEvery %1 seconds, the bot will draw a number!",
    "gotNum": "Number %1",
    "BINGO": "Congratulations %1 for SUCCESSFUL (winning) and received the bonus amount: %2 COINS",
    "notReady": "The bot can't inbox some people, or the bot itself has been blocked in inbox, can't start.",
    "info": "[ LOTTERY ]\n- Yes, it's a lotto xD -\n+ When using the order to create a room, the amount set will be the amount needed if others want to enter, for example, if you put 100 dollars, others want to enter. must have 100 dollars!\n+ The bot will count the numbers after a period of time, for example, every 5 seconds the bot will draw numbers and send them to the group, the participant polls with the bot sent in the inbox, when there are enough numbers in a row On any level, the player will win and the bonus is all the money that other players have placed and the losers lose only what they have placed."
  }
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports.onLoad = async () => {
  await require('axios').get("https://raw.githubusercontent.com/RFS-ADRENO/mirai-modules/main/version.json").then(res => {
    if (res.data["loto_x024"] != this.config.version) console.log("-LOTO HAS A NEW VERSION, CONTACT OWNER FOR UPDATE-");
  });
  let path = __dirname + '/loto/';
  if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });
  await require("axios").get("https://raw.githubusercontent.com/RFS-ADRENO/lotoData/main/data.json").then(async (res) => {
    for (let e in res.data) {
      if (fs.existsSync(path + e)) continue;
      await fs.writeFileSync(path + e, res.data[e], 'base64');
    }
  });
  if (!global.client.loto) global.client.loto = {};
  //console.log("-- BOT LOADED SUCCESSFULLY --");
};


module.exports.run = async ({ event, api, args, Currencies, Users, getText }) => {
  if (!global.client.loto) global.client.loto = {};
  const axios = require("axios");
  const { getData, increaseMoney, decreaseMoney } = Currencies;
  const { threadID, messageID, senderID } = event;
  const sendC = (msg, callback) => api.sendMessage(msg, threadID, callback, messageID);
  const sendTC = (msg, callback) => api.sendMessage(msg, threadID, callback);
  const sendT = (msg) => sendTC(msg, () => { });
  const send = (msg) => sendC(msg, () => { });
  const moneyUser = (await getData(senderID)).money;
  //getPrefix
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
  //checkValid_maxPlayer
  if (global.configModule[this.config.name].maxPlayers < 2 || global.configModule[this.config.name].maxPlayers > 10) global.configModule[this.config.name].maxPlayers = 5;
  switch (args[0]) {
    case 'create': {
      let moneyBet = parseInt(args[1]);
      if (isNaN(moneyBet) || moneyBet <= 0) return send(getText("missingInput"));
      if (moneyBet < 50) return send(getText("limitBet"));
      if (moneyBet > moneyUser) return send(getText("moneyBetNotEnough", moneyBet));
      if (threadID in global.client.loto) return send(getText("alreadyHave"));
      global.client.loto[threadID] = {
        author: senderID,
        data: {
          [senderID]: []
        },
        status: "pending",
        maximumBet: moneyBet
      };
      sendC(getText("openSuccess", Object.keys(global.client.loto[threadID].data).length, global.configModule[this.config.name].maxPlayers, prefix + this.config.name), async () => await decreaseMoney(senderID, moneyBet));
      break;
    }
    case 'join': {
      if (threadID in global.client.loto) {
        if (senderID in global.client.loto[threadID].data) return send(getText("alreadyJoined"));
        if (Object.keys(global.client.loto[threadID].data).length == global.configModule[this.config.name].maxPlayers) return send(getText("out_of_room"));
        if (global.client.loto[threadID].status == "started") return send(getText("alreadyStarted_1"));
        if (global.client.loto[threadID].maximumBet > moneyUser) return send(getText("moneyBetNotEnough", global.client.loto[threadID].maximumBet));
        global.client.loto[threadID].data[senderID] = [];
        sendC(getText("joinSuccess", Object.keys(global.client.loto[threadID].data).length, global.configModule[this.config.name].maxPlayers), async () => await decreaseMoney(senderID, global.client.loto[threadID].maximumBet));
      } else sendT(getText("noGame"));
      break;
    }
    case 'start': {
      if (Object.keys(global.client.loto[threadID].data).length < 2) return send(getText("playersNotEnough"));
      const fs = require("fs");

      var lotoKeys = Object.keys(loto);
      for (let i = lotoKeys.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lotoKeys[i], lotoKeys[j]] = [lotoKeys[j], lotoKeys[i]];
      }
      if (threadID in global.client.loto) {
        if (!(senderID in global.client.loto[threadID].data)) return send(getText("notJoined"));
        if ((senderID in global.client.loto[threadID].data) && global.client.loto[threadID].author != senderID) return send(getText("not_author"));
        if (global.client.loto[threadID].status == "started") return send(getText("alreadyStarted_2"));
        global.client.loto[threadID].status = "started";
        var check = false;
        function check_inbox(check) {
          return new Promise(async (resolve, reject) => {
            sendTC(getText("testInbox"), async () => {
              for (let p in global.client.loto[threadID].data) {
                if (p == api.getCurrentUserID()) continue;
                api.sendMessage("testing...", p, async (err) => {
                  if (err) {
                    check = true;
                    console.log(err);
                    let curName = await Users.getNameUser(p);
                    api.sendMessage({
                      body: getText("cannotInbox", curName),
                      mentions: [{
                        tag: curName,
                        id: p
                      }]
                    }, threadID);
                  }
                });
                await delay(2000);
              }
              resolve(check);
            });
          });
        }
        await check_inbox(check).then(ch => {
          if (ch) return sendTC(getText('notReady'), () => { global.client.loto[threadID].status = "pending" });

          sendTC(getText("checkInbox_noti"), async () => {
            for (let p in global.client.loto[threadID].data) {
              try {
                let randIndex = Math.floor(Math.random() * lotoKeys.length);
                global.client.loto[threadID].data[p] = lotoKeys.splice(randIndex, 1);
                api.sendMessage({
                  body: 'Phiếu của bạn: ',
                  attachment: fs.createReadStream(__dirname + `/loto/${global.client.loto[threadID].data[p]}`)
                }, p);
                await delay(300);
              } catch (e) {
                console.log(e);
              }
            }

            let data = global.client.loto[threadID].data;
            var allNum = [...Array(91).keys()].slice(1);
            var calledNum = [];
            function check_num(data) {
              return new Promise(async (resolve, reject) => {
                var chk = false;
                for (let p in data) {
                  let pMap = loto[data[p]];
                  for (let row of pMap) {
                    if (row.every(e => calledNum.includes(e))) {
                      chk = true;
                      let name = await Users.getNameUser(p);
                      let reward = global.client.loto[threadID].maximumBet * (Object.keys(global.client.loto[threadID].data).length - 1);
                      return sendTC(getText("BINGO", name, reward), async () => {
                        await increaseMoney(p, reward + global.client.loto[threadID].maximumBet);
                        delete global.client.loto[threadID];
                      });
                    }
                  }
                }
                resolve(chk);
              })
            }
            sendTC(getText('getReady', global.configModule[this.config.name].getDelay), () => {
              let getNumFunc = () => {
                setTimeout(async () => {
                  if (!(threadID in global.client.loto));
                  let randNI = Math.floor(Math.random() * allNum.length);
                  calledNum.push(allNum.splice(randNI, 1)[0]);
                  sendTC(getText("gotNum", calledNum[calledNum.length - 1]), async () => await check_num(data).then(c => {
                    if (!c) return getNumFunc();
                    else return;
                  }));
                }, global.configModule[this.config.name].getDelay * 1000)
              };
              return getNumFunc();
            });
          });
        })
      }
    }
    default: {
    	sendT(getText("info"));
    }
  }
}