module.exports.config = {
    name: "leave",
    eventType: ["log:unsubscribe"],
    version: "1.0.0",
    credits: "Ranz",
    description: "Thông báo Bot hoặc người dùng rời khỏi nhóm có random gif/ảnh/video",
    dependencies: {
        "fs-extra": "",
        "path": ""
    }
};

const checkttPath = __dirname + '/../commands/checktuongtac/';

module.exports.circle = async (image) => {
  const jimp = global.nodemodule["jimp"];
  image = await jimp.read(image);
  image.circle();
  return await image.getBufferAsync("image/png");
}

module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

	const path = join(__dirname, "cache", "leaveGif");
	if (existsSync(path)) mkdirSync(path, { recursive: true });	

	const path2 = join(__dirname, "cache", "leaveGif", "randomgif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });

    return;
}

module.exports.run = async function ({ api, event, Users, Threads }) {
    if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
    const { createReadStream, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];
    const { threadID } = event;
    const moment = require("moment-timezone");
    const time = moment.tz("Asia/Manila").format("DD/MM/YYYY || HH:mm:ss");
    const hours = moment.tz("Asia/Manila").format("HH");
    const data = global.data.threadData.get(parseInt(threadID)) || (await Threads.getData(threadID)).data;
    const iduser = event.logMessageData.leftParticipantFbId;
    const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
    const type = (event.author == event.logMessageData.leftParticipantFbId) ? "Biglang lumipad" : "Pinalipad ng Admin";
	const path = join(__dirname, "cache", "leaveGif");
	const gifPath = join(path, `${threadID}.gìf`);

  let pathImg = __dirname + "/cache/leavenoti.png";
  let pathAvata = __dirname + `/cache/leaveavt.png`;
  let pathIcon = __dirname + `/cache/joinavtuserthread.png`;

  //-------------------------------------
  var threadInfos = await api.getThreadInfo(threadID);
  let threadNames = threadInfos.threadName;
  const fs = global.nodemodule["fs-extra"];
  const request = require('request');
  const axios = global.nodemodule["axios"];
  const Canvas = global.nodemodule["canvas"];
  const { loadImage, createCanvas } = require("canvas");
  const knights = require("knights-canvas");
  const Str = require('@supercharge/strings')

  let Avatar = (
    await axios.get(`https://graph.facebook.com/${event.logMessageData.leftParticipantFbId}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,
      { responseType: "arraybuffer" }
    )
  ).data;
  fs.writeFileSync(pathAvata, Buffer.from(Avatar, "utf-8"));
  avataruser = await this.circle(pathAvata);

    var bgimg = [
"https://www.al.com/resizer/KsZaj46Thx9ARTCiYaMEfX6kHiw=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/NSDL77J3KJFZXCK3MFWAV7HMUE.JPG"
];
    var rdmbg = bgimg[Math.floor(Math.random() * bgimg.length)]

  let getWanted = (
    await axios.get(`https://api.popcat.xyz/welcomecard?background=${rdmbg}&text1=${name}&text2=LEFT+IN+${threadNames}&text3=ISSUE:+${type}&avatar=https://cdn.discordapp.com/embed/avatars/0.png`, {
      responseType: "arraybuffer",
    })
  ).data;
  fs.writeFileSync(pathImg, Buffer.from(getWanted, "utf-8"));

  let baseImage = await loadImage(pathImg);
  let baseAva = await loadImage(avataruser);
  let canvas = createCanvas(baseImage.width, baseImage.height);
  let ctx = canvas.getContext("2d");
  ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(baseAva, 389, 44, 245, 245);
  ctx.beginPath();
  const imageBuffer = canvas.toBuffer();
  fs.writeFileSync(pathImg, imageBuffer);
  fs.removeSync(pathAvata);
  
  
	var msg, formPush

  if (existsSync(checkttPath + threadID + '.json')) {
        const threadData = JSON.parse(readFileSync(checkttPath + threadID + '.json'));
        const userData_week_index = threadData.week.findIndex(e => e.id == event.logMessageData.leftParticipantFbId);
        const userData_day_index = threadData.day.findIndex(e => e.id == event.logMessageData.leftParticipantFbId);
        const userData_total_index = threadData.total.findIndex(e => e.id == event.logMessageData.leftParticipantFbId);
        if (userData_total_index != -1) {
            threadData.total.splice(userData_total_index, 1);
        }
        if (userData_week_index != -1) {
            threadData.week.splice(userData_week_index, 1);
        }
        if (userData_day_index != -1) {
            threadData.day.splice(userData_day_index, 1);
        }

        writeFileSync(checkttPath + threadID + '.json', JSON.stringify(threadData, null, 4));
    }
  
	if (existsSync(path)) mkdirSync(path, { recursive: true });

	(typeof data.customLeave == "undefined") ? msg = `====== 𝗥. 𝗜. 𝗣. ======\n\nName: {name}\nIssue: {type}\n\nFly High Like A Buterfly` : msg = data.customLeave;
	msg = msg.replace(/\{name}/g, name).replace(/\{type}/g, type);

	return api.sendMessage({body: msg, attachment: fs.createReadStream(pathImg) }, event.threadID, () => fs.unlinkSync(pathImg)); 

}