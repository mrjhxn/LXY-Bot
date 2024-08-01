module.exports = function ({ api, models }) {
  setInterval(function () {
		if(global.config.NOTIFICATION) {
			require("./handle/handleNotification.js")({ api });
		}
	}, 1000*60);
    const fs = require("fs");
    const Users = require("./controllers/users")({ models, api }),
        Threads = require("./controllers/threads")({ models, api }),
        Currencies = require("./controllers/currencies")({ models });
    const logger = require("../utils/log.js");
    const moment = require('moment-timezone');
    const axios = require("axios");
    var day = moment.tz("Asia/Manila").day();

  const checkttDataPath = __dirname + '/../modules/commands/_checktuongtac_nghia/';
    setInterval(async () => {
        const day_now = moment.tz("Asia/Manila").day();
        const _ADMINIDs = [...global.config.NDH, ...global.config.ADMINBOT];
      try {
        if (day != day_now) {
            day = day_now;
            const checkttData = fs.readdirSync(checkttDataPath).filter(file => {
              const _ID = file.replace('.json', '');
              return _ADMINIDs.includes(_ID) || global.data.allThreadID.includes(_ID);
            });
            console.log('Start new day interactive test');
            await new Promise(async resolve => {
                for (const checkttFile of checkttData) {
                    const checktt = JSON.parse(fs.readFileSync(checkttDataPath + checkttFile));
                    let storage = [], count = 1;
                    for (const item of checktt.day) {
                        const userName = await Users.getNameUser(item.id) || 'Name does not exist';
                        const itemToPush = item;
                        itemToPush.name = userName;
                        storage.push(itemToPush);
                    };
                    storage.sort((a, b) => {
                        if (a.count > b.count) {
                            return -1;
                        }
                        else if (a.count < b.count) {
                            return 1;
                        } else {
                            return a.name.localeCompare(b.name);
                        }
                    });
                    let checkttBody = '== 𝗧𝗢𝗣 𝟯 𝗨𝗦𝗘𝗥𝗦 𝗢𝗙 𝗧𝗛𝗘 𝗗𝗔𝗬 ==\n\n';
                    checkttBody += storage.slice(0, 3).map(item => {
                        return `${count++}. ${item.name} with ${item.count} messages`;
                    }).join('\n');
                    api.sendMessage(checkttBody, checkttFile.replace('.json', ''), (err) => err ? console.log(err) : '');
    
                    checktt.day.forEach(e => {
                        e.count = 0;
                    });
                    checktt.time = day_now;
                    fs.writeFileSync(checkttDataPath + checkttFile, JSON.stringify(checktt, null, 4));
                }
                resolve();
            })

            await new Promise(async resolve => {
                if (day_now == 1) {
                    console.log('Start new week interactive test');
                    for (const checkttFile of checkttData) {
                        const checktt = JSON.parse(fs.readFileSync(checkttDataPath + checkttFile));
                        let storage = [], count = 1;
                        for (const item of checktt.week) {
                            const userName = await Users.getNameUser(item.id) || 'Name does not exist';
                            const itemToPush = item;
                            itemToPush.name = userName;
                            storage.push(itemToPush);
                        };
                        storage.sort((a, b) => {
                            if (a.count > b.count) {
                                return -1;
                            }
                            else if (a.count < b.count) {
                                return 1;
                            } else {
                                return a.name.localeCompare(b.name);
                            }
                        });
                        let checkttBody = '== 𝗧𝗢𝗣 𝟯 𝗨𝗦𝗘𝗥𝗦 𝗢𝗙 𝗧𝗛𝗘 𝗗𝗔𝗬 ==\n\n';
                        checkttBody += storage.slice(0, 3).map(item => {
                            return `${count++}. ${item.name} with ${item.count} messages`;
                        }).join('\n');
                        api.sendMessage(checkttBody, checkttFile.replace('.json', ''), (err) => err ? console.log(err) : '');
                        checktt.week.forEach(e => {
                            e.count = 0;
                        });
                        fs.writeFileSync(checkttDataPath + checkttFile, JSON.stringify(checktt, null, 4));
                    }
                }
                resolve();
            })

            global.client.sending_top = false;
        }
      } catch(e) { console.error(e) }
    }, 1000 * 10);
    //////////////////////////////////////////////////////////////////////
    //========= Push all variable from database to environment =========//
    //////////////////////////////////////////////////////////////////////

    (async function () {

        try {
            logger(global.getText('listen', 'startLoadEnvironment'), '[ Data ]');
            let threads = await Threads.getAll(),
                users = await Users.getAll(['userID', 'name', 'data']),
                currencies = await Currencies.getAll(['userID']);
            for (const data of threads) {
                const idThread = String(data.threadID);
                global.data.allThreadID.push(idThread),
                    global.data.threadData.set(idThread, data['data'] || {}),
                    global.data.threadInfo.set(idThread, data.threadInfo || {});
                if (data['data'] && data['data']['banned'] == !![])
                    global.data.threadBanned.set(idThread,
                        {
                            'reason': data['data']['reason'] || '',
                            'dateAdded': data['data']['dateAdded'] || ''
                        });
                if (data['data'] && data['data']['commandBanned'] && data['data']['commandBanned']['length'] != 0)
                    global['data']['commandBanned']['set'](idThread, data['data']['commandBanned']);
                if (data['data'] && data['data']['NSFW']) global['data']['threadAllowNSFW']['push'](idThread);
            }
            logger.loader(global.getText('listen', 'loadedEnvironmentThread'));
            for (const dataU of users) {
                const idUsers = String(dataU['userID']);
                global.data['allUserID']['push'](idUsers);
                if (dataU.name && dataU.name['length'] != 0) global.data.userName['set'](idUsers, dataU.name);
                if (dataU.data && dataU.data.banned == 1) global.data['userBanned']['set'](idUsers, {
                    'reason': dataU['data']['reason'] || '',
                    'dateAdded': dataU['data']['dateAdded'] || ''
                });
                if (dataU['data'] && dataU.data['commandBanned'] && dataU['data']['commandBanned']['length'] != 0)
                    global['data']['commandBanned']['set'](idUsers, dataU['data']['commandBanned']);
            }
            for (const dataC of currencies) global.data.allCurrenciesID.push(String(dataC['userID']));
            logger.loader(global.getText('listen', 'loadedEnvironmentUser')), logger(global.getText('listen', 'successLoadEnvironment'), '[ DATA ]');
        } catch (error) {
            return logger.loader(global.getText('listen', 'failLoadEnvironment', error), 'error');
        }
    }());
    logger(`[ ${global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? "BOT" : global.config.BOTNAME}`, "[ BOT INFO ]");

    ///////////////////////////////////////////////
    //========= Require all handle need =========//
    //////////////////////////////////////////////

    const handleCommand = require("./handle/handleCommand")({ api, models, Users, Threads, Currencies });
    const handleCommandEvent = require("./handle/handleCommandEvent")({ api, models, Users, Threads, Currencies });
    const handleReply = require("./handle/handleReply")({ api, models, Users, Threads, Currencies });
    const handleReaction = require("./handle/handleReaction")({ api, models, Users, Threads, Currencies });
  const handleRefresh = require("./handle/handleRefresh")({  api, Threads, Users, Currencies, models });
    const handleEvent = require("./handle/handleEvent")({ api, models, Users, Threads, Currencies });
    const handleCreateDatabase = require("./handle/handleCreateDatabase")({ api, Threads, Users, Currencies, models });

    //DEFINE DATLICH PATH
    const datlichPath = __dirname + "/../modules/commands/cache/datlich.json";

    //FUNCTION HOẠT ĐỘNG NHƯ CÁI TÊN CỦA NÓ, CRE: DUNGUWU
    const monthToMSObj = {
        1: 31 * 24 * 60 * 60 * 1000,
        2: 28 * 24 * 60 * 60 * 1000,
        3: 31 * 24 * 60 * 60 * 1000,
        4: 30 * 24 * 60 * 60 * 1000,
        5: 31 * 24 * 60 * 60 * 1000,
        6: 30 * 24 * 60 * 60 * 1000,
        7: 31 * 24 * 60 * 60 * 1000,
        8: 31 * 24 * 60 * 60 * 1000,
        9: 30 * 24 * 60 * 60 * 1000,
        10: 31 * 24 * 60 * 60 * 1000,
        11: 30 * 24 * 60 * 60 * 1000,
        12: 31 * 24 * 60 * 60 * 1000
    };
    const checkTime = (time) => new Promise((resolve) => {
        time.forEach((e, i) => time[i] = parseInt(String(e).trim()));
        const getDayFromMonth = (month) => (month == 0) ? 0 : (month == 2) ? (time[2] % 4 == 0) ? 29 : 28 : ([1, 3, 5, 7, 8, 10, 12].includes(month)) ? 31 : 30;
        if (time[1] > 12 || time[1] < 1) resolve("Tháng của bạn có vẻ không hợp lệ");
        if (time[0] > getDayFromMonth(time[1]) || time[0] < 1) resolve("Ngày của bạn có vẻ không hợp lệ");
        if (time[2] < 2022) resolve("Bạn sống ở kỷ nguyên nào thế");
        if (time[3] > 23 || time[3] < 0) resolve("Giờ của bạn có vẻ không hợp lệ");
        if (time[4] > 59 || time[3] < 0) resolve("Phút của bạn có vẻ không hợp lệ");
        if (time[5] > 59 || time[3] < 0) resolve("Giây của bạn có vẻ không hợp lệ");
        yr = time[2] - 1970;
        yearToMS = (yr) * 365 * 24 * 60 * 60 * 1000;
        yearToMS += ((yr - 2) / 4).toFixed(0) * 24 * 60 * 60 * 1000;
        monthToMS = 0;
        for (let i = 1; i < time[1]; i++) monthToMS += monthToMSObj[i];
        if (time[2] % 4 == 0) monthToMS += 24 * 60 * 60 * 1000;
        dayToMS = time[0] * 24 * 60 * 60 * 1000;
        hourToMS = time[3] * 60 * 60 * 1000;
        minuteToMS = time[4] * 60 * 1000;
        secondToMS = time[5] * 1000;
        oneDayToMS = 24 * 60 * 60 * 1000;
        timeMs = yearToMS + monthToMS + dayToMS + hourToMS + minuteToMS + secondToMS - oneDayToMS;
        resolve(timeMs);
    });


    const tenMinutes = 10 * 60 * 1000;

    const checkAndExecuteEvent = async () => {

        /*smol check*/
        if (!fs.existsSync(datlichPath)) fs.writeFileSync(datlichPath, JSON.stringify({}, null, 4));
        var data = JSON.parse(fs.readFileSync(datlichPath));

        //GET CURRENT TIME
        var timeVN = moment().tz('Asia/Manila').format('DD/MM/YYYY_HH:mm:ss');
        timeVN = timeVN.split("_");
        timeVN = [...timeVN[0].split("/"), ...timeVN[1].split(":")];

        let temp = [];
        let vnMS = await checkTime(timeVN);
        const compareTime = e => new Promise(async (resolve) => {
            let getTimeMS = await checkTime(e.split("_"));
            if (getTimeMS < vnMS) {
                if (vnMS - getTimeMS < tenMinutes) {
                    data[boxID][e]["TID"] = boxID;
                    temp.push(data[boxID][e]); delete data[boxID][e];
                } else delete data[boxID][e];
                fs.writeFileSync(datlichPath, JSON.stringify(data, null, 4));
            };
            resolve();
        })

        await new Promise(async (resolve) => {
            for (boxID in data) {
                for (e of Object.keys(data[boxID])) await compareTime(e);
            }
            resolve();
        })
        for (el of temp) {
            try {
                var all = (await Threads.getInfo(el["TID"])).participantIDs;
                all.splice(all.indexOf(api.getCurrentUserID()), 1);
                var body = el.REASON || "🥰🥰🥰", mentions = [], index = 0;

                for (let i = 0; i < all.length; i++) {
                    if (i == body.length) body += " ‍ ";
                    mentions.push({
                        tag: body[i],
                        id: all[i],
                        fromIndex: i - 1
                    });
                }
            } catch (e) { return console.log(e); }
            var out = {
                body, mentions
            }
            if ("ATTACHMENT" in el) {
                out.attachment = [];
                for (a of el.ATTACHMENT) {
                    let getAttachment = (await axios.get(encodeURI(a.url), { responseType: "arraybuffer" })).data;
                    fs.writeFileSync(__dirname + `/../modules/commands/cache/${a.fileName}`, Buffer.from(getAttachment, 'utf-8'));
                    out.attachment.push(fs.createReadStream(__dirname + `/../modules/commands/cache/${a.fileName}`));
                }
            }
            console.log(out);
            if ("BOX" in el) await api.setTitle(el["BOX"], el["TID"]);
            api.sendMessage(out, el["TID"], () => ("ATTACHMENT" in el) ? el.ATTACHMENT.forEach(a => fs.unlinkSync(__dirname + `/../modules/commands/cache/${a.fileName}`)) : "");
        }

    }
    setInterval(checkAndExecuteEvent, tenMinutes / 10);
    //////////////////////////////////////////////////
    //========= Send event to handle need =========//
    /////////////////////////////////////////////////

    return async (event) => {
        if (event.type == "change_thread_image") api.sendMessage(`╭┈ ❒ [ 𝗡𝗢𝗧𝗜𝗙𝗬 ]\n╰┈➤ ${event.snippet}`, event.threadID);
        let data = JSON.parse(fs.readFileSync(__dirname + "/../modules/commands/cache/approvedThreads.json"));
    let adminBot = global.config.ADMINBOT
    if (!data.includes(event.threadID) && !adminBot.includes(event.senderID)) {
      //getPrefix
      const threadSetting = global.data.threadData.get(parseInt(event.threadID)) || {};
      const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

      //check body
      if (event.body && event.body == `${prefix}request`) {
        adminBot.forEach(e => {
          api.sendMessage(`❒ Approval Requested!\n\n${prefix}approve ${event.threadID}`, e);
        })
        return api.sendMessage(`╭┈ ❒ [ 𝗥𝗘𝗤𝗨𝗘𝗦𝗧 ]\n╰┈➤ Request submited successfully!`, event.threadID);
      }
      if (event.body && event.body.startsWith(prefix)) return api.sendMessage(`╭┈ ❒ [ 𝗥𝗘𝗤𝗨𝗘𝗦𝗧 ]\n╰┈➤ Submit request once before use commands!, use:\n╰┈➤ ${prefix}request`, event.threadID);
    };
        switch (event.type) {
            case "message_reply":
            handleCreateDatabase({event});
        handleCommand({event});
        handleReply({event});
        handleCommandEvent({event});
        var selfID = api.getCurrentUserID;
        var msg = event.body;
        var msg1 = event.messageReply.body;
        var senderID = event.senderID;
        var mrID = event.messageReply.senderID;
        var myids = global.config.MYUID;
        var autorep = global.config.AutoReply;
       // console.log(event)
        if (senderID != selfID){
          console.log(event.messageReply.senderID)
          
          if (senderID == myids) {
          console.log("CAN'T SAVE IF BOT TO BOT AUTO SIM")
            
          } else {
axios.get(encodeURI(`https://chards-bot-api.richardretada.repl.co/sim/add/${msg1}&&${msg}`)).then(res => {});

axios.get(encodeURI(`https://raidenapi.richardretada.repl.co/sim?type=teach&ask=${msg1}&ans=${msg}`)).then(res => {});

axios.get(encodeURI(`https://nguyen-chard-api.joshuag06.repl.co/api/sim/simv3?type=teach&ask=${msg1}&ans=${msg}`)).then(res => {});
        }
        

          
         // const res = await axios.get(encodeUri(`https://httpsteam-Choru-apicom-replcomphepcomchoruofficial.project-with-my-team.repl.co/sim/add/${msg1}&&${msg}`));
          if (myids == mrID){
            console.log("Bot Sender: " + myids + "\nUser Sender: " + mrID)
            //console.log(event.body);
            axios.get(encodeURI(`https://nguyen-chard-api.joshuag06.repl.co/api/sim/simv3?type=ask&ask=${msg}`)).then(res => {
             // console.log(res.data.reply)
//              var res1 = res.data.success == 'I don't know what you're saying. Please teach me.' ? "I don't understand" ;
              if (senderID != myids) {
              if (autorep == true){
              if (res.data.reply != ""){
                api.sendMessage(res.data.answer, event.threadID, event.messageID);
              };
                
              }
              }
              else{
                console.log("AUTO REPLY TO SELF [OFF]")
              }
            });
            //const rest = await axios.get(encodeUri(`https://httpsteam-Choru-apicom-replcomphepcomchoruofficial.project-with-my-team.repl.co/sim/get/${msg}`));
            
           // console.log(rest.data.reply);
            
          }else{
            
          };



        };
            break;
            case "message":
            case "message_unsend":
                handleCreateDatabase({ event });
                handleCommand({ event });
                handleReply({ event });
                handleCommandEvent({ event });

                break;
            case "change_thread_image":
            case "event":
                handleEvent({ event });
                handleRefresh({ event });
                if (event.type != "change_thread_image" && global.config.notiGroup) {
					var msg = '══ 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗧𝗜𝗢𝗡 ══\n» '
					msg += event.logMessageBody
					if(event.author == api.getCurrentUserID()) {
						msg = msg.replace('You', global.config.BOTNAME)
					}
					api.sendMessage(msg, event.threadID);
				}
                break;
            case "message_reaction":
                if(event.senderID == api.getCurrentUserID() && event.reaction == '❎') {
					api.unsendMessage(event.messageID)
				}
				handleReaction({ event });
                break;
            default:
                break;
        }
    };
};