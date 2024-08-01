const totalPath = __dirname + '/cache/totalChat.json';
const _24hours = 86400000;
const fs = require("fs-extra");
const request = require("request");
module.exports.config = {
  name: "chatinfo",
  version: "2.2.0",
  hasPermssion: 0,
  credits: "Hung Cho (Khanh Milo Fix) mod added by TrucCute",//sản phẩm có tham khảo 1 ít code của mdl avt D-Jukie 
  description: "View thread/user information",
  commandCategory: "bổ não",
  usages: "[thread/user]",
  cooldowns: 5,
  dependencies: {
    "fs-extra": "",
    "request": ""
  }
}

module.exports.handleEvent = async ({ api, event, args }) => {
  if (!fs.existsSync(totalPath)) fs.writeFileSync(totalPath, JSON.stringify({}));
  let totalChat = JSON.parse(fs.readFileSync(totalPath));
  if (!totalChat[event.threadID]) return;
  if (Date.now() - totalChat[event.threadID].time > (_24hours * 2)) {
    let sl = (await api.getThreadInfo(event.threadID)).messageCount;
    totalChat[event.threadID] = {
      time: Date.now() - _24hours,
      count: sl,
      ytd: sl - totalChat[event.threadID].count
    }
      fs.writeFileSync(totalPath, JSON.stringify(totalChat, null, 2));
  }
}

module.exports.run = async function({ api, event, args, Users, Threads }) {
  var token = `6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
  const { threadID, messageID, senderID, type, mentions, messageReply } = event;
  const moment = require("moment-timezone");
  const gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || DD/MM/YYYY");
  const threadSetting = (await Threads.getData(String(threadID))).data || {};
		  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
  if (args.length == 0) {
    return api.sendMessage(`You can use\n=> ${prefix}${this.config.name} thread to view box information\n=> ${prefix}${this.config.name} user to view user information`, threadID);
  }
  if (args[0] == "thread") {
    try {
      if (!fs.existsSync(totalPath)) fs.writeFileSync(totalPath, JSON.stringify({}));
      let totalChat = JSON.parse(fs.readFileSync(totalPath));
      let threadInfo = await api.getThreadInfo(args[1] || threadID); 
      let timeByMS = Date.now();
      var memLength = threadInfo.participantIDs.length;
      let threadMem = threadInfo.participantIDs.length;
      var nameMen = [];
      var gendernam = [];
      var gendernu = [];
      var nope = [];
      for (let z in threadInfo.userInfo) {
        var gioitinhone = threadInfo.userInfo[z].gender;
        var nName = threadInfo.userInfo[z].name;
        if (gioitinhone == "MALE") {
          gendernam.push(z + gioitinhone)
        } else if (gioitinhone == "FEMALE") {
          gendernu.push(gioitinhone)
        } else {
          nope.push(nName)
        }
      };
      var { adminIDs } = await api.getThreadInfo(args[1] || threadID);
      var adminName = [];
      for (const arrayAdmin of adminIDs) {
        const name = await Users.getNameUser(arrayAdmin.id)
        adminName.push(name)
      }
      var nam = gendernam.length;
      var nu = gendernu.length;
      let sl = threadInfo.messageCount;
      let u = threadInfo.nicknames;
      let icon = threadInfo.emoji;
      let threadName = threadInfo.threadName;
      let id = threadInfo.threadID;
      let sex = threadInfo.approvalMode;
      var pd = sex == false ? 'None' : sex == true ? 'turn on' : 'none';
      if (!totalChat[args[1] || threadID]) {
        totalChat[args[1] || threadID] = {
          time: timeByMS,
          count: sl,
          ytd: 0
        }
          fs.writeFileSync(totalPath, JSON.stringify(totalChat, null, 2));
      }
      let mdtt = Math.floor(Math.random() * 101);
      let preCount = totalChat[args[1] || threadID].count || 0;
      let ytd = totalChat[args[1] || threadID].ytd || 0;
      let hnay = (ytd != 0) ? (sl - preCount) : "no data";
      let hqua = (ytd != 0) ? ytd : "no data";
      if (timeByMS - totalChat[args[1] || threadID].time > _24hours) {
        if (timeByMS - totalChat[args[1] || threadID].time > (_24hours * 2)) {
          totalChat[args[1] || threadID].count = sl;
          totalChat[args[1] || threadID].time = timeByMS - _24hours;
          totalChat[args[1] || threadID].ytd = sl - preCount;
          fs.writeFileSync(totalPath, JSON.stringify(totalChat, null, 2));
        }
        getHour = Math.ceil((timeByMS - totalChat[args[1] || event.threadID].time - _24hours) / 3600000);
        if (ytd == 0) mdtt = 100;
          else mdtt = ((((hnay) / ((hqua / 24) * getHour))) * 100).toFixed(0);
        mdtt += "%";
      }
      var callback = () =>
        api.sendMessage({
          body: `⭐️Box: ${threadName || "no name"}\n🎮 ID: ${id}\n📱 Approve: ${pd}\n🐰 Emoji: ${icon || "👍"}\n📌 Information: ${threadMem} member\nNumber of male tv 🧑‍🦰: ${nam} member\nFemale TV number 👩‍🦰: ${nu} member\n🕵️‍♂️ QTV: ${adminName.join(', ')}\n💬 Total: ${sl} messages\n📈 Engagement: ${mdtt}\n🌟 Total messages yesterday: ${hqua}\n🌟 Total messages today: ${hnay}\n     『${gio}』`,
          attachment: fs.createReadStream(__dirname + `/cache/${threadID}.png`)
        },
                        threadID,
                        () => fs.unlinkSync(__dirname + `/cache/${threadID}.png`),
                        messageID
                        );
      return request(encodeURI(`${threadInfo.imageSrc}`))
        .pipe(fs.createWriteStream(__dirname + `/cache/${threadID}.png`))
        .on('close', () => callback());
    } catch (e) {
      return (
        console.log(e),
        api.sendMessage(`Can't get your group info!\n${e}`, threadID, messageID)
      )
    }
  }
  if (args[0] == "user") {
    if(!args[1]){
      if(type == "message_reply"){
        uid = messageReply.senderID
      } else {
          uid = senderID
      }
      let data = await api.getUserInfo(uid),
        { profileUrl, gender, isFriend } = data[uid];
      let name = await Users.getNameUser(uid)
      var callback = () => 
        api.sendMessage({
          body:
            `💦Name: ` + name +
            `\n🐧UID: ` + uid +
            `\n🙆‍♀️Status: ` + (isFriend == true ? "made friends with bots" : isFriend == false ? "Haven't made friends with bots yet" : "UNKOWN") +
            `\n🦋Sex: ` + (gender == 2 ? 'male' : gender == 1 ? 'female' : 'UNKNOWN') +
            `\n🏝Profile:\n` + profileUrl,
          attachment: fs.createReadStream(__dirname + `/cache/${uid}.png`)}, threadID, () => fs.unlinkSync(__dirname + `/cache/${uid}.png`), messageID);
      return request(encodeURI(`https://graph.facebook.com/${uid}/picture?height=750&width=750&access_token=`+ token)).pipe(fs.createWriteStream(__dirname+`/cache/${uid}.png`)).on('close',() => callback());
    } else {
      if (args.join().indexOf('@') !== -1){
        var uid = Object.keys(mentions)[0]
          let data = await api.getUserInfo(uid),
          { profileUrl, gender, isFriend } = data[uid];
        let name = await Users.getNameUser(uid)
          var callback = () => 
            api.sendMessage({
              body:
                `💦Name: ` + name +
                `\n🐧UID: ` + uid +
                `\n🙆‍♀️Status: ` + (isFriend == true ? "đã kết bạn với bot" : isFriend == false ? "Haven't made friends with bots yet" : "UNKOWN") +
                `\n🦋Sex: ` + (gender == 2 ? 'male' : gender == 1 ? 'female' : 'UNKNOWN') +
                `\n🏝Profile:\n` + profileUrl,attachment: fs.createReadStream(__dirname + `/cache/${uid}.png`)}, threadID, () => fs.unlinkSync(__dirname + `/cache/${uid}.png`), messageID);
        return request(encodeURI(`https://graph.facebook.com/${uid}/picture?height=750&width=750&access_token=`+ token)).pipe(fs.createWriteStream(__dirname+`/cache/${uid}.png`)).on('close',() => callback());
      } else {
        let data = await api.getUserInfo(args[1]),
        { profileUrl, gender, isFriend } = data[args[1]];
        let name = await Users.getNameUser(args[1])
      var callback = () => 
        api.sendMessage({
          body:
            `💦Name: ` + name +
            `\n🐧UID: ` + args[1] +
            `\n🙆‍♀️Status: ` + (isFriend == true ? "made friends with bots" : isFriend == false ? "Haven't made friends with bots yet" : "UNKOWN") +
            `\n🦋Sex: ` + (gender == 2 ? 'male' : gender == 1 ? 'female' : 'UNKNOWN') +
            `\n🏝Profile:\n` + profileUrl,attachment: fs.createReadStream(__dirname + `/cache/${args[1]}.png`)}, threadID, () => fs.unlinkSync(__dirname + `/cache/${args[1]}.png`), messageID);
            return request(encodeURI(`https://graph.facebook.com/${args[1]}/picture?height=750&width=750&access_token=` + token)).pipe(fs.createWriteStream(__dirname+`/cache/${args[1]}.png`)).on('close',() => callback());
      }
    }
  }
}