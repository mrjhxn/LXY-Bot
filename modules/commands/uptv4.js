module.exports.config = {
	name:"uptv4",
	version: "1.5.0",
	hasPermssion: 2,
	credits: "Chard",
	description: "Random images by api - uptime",
	commandCategory: "Utilities",
	cooldowns: 2,
  dependencies: {
		"pidusage": ""
	}
};
function byte2mb(bytes) {
	const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	let l = 0, n = parseInt(bytes, 10) || 0;
	while (n >= 1024 && ++l) n = n / 1024;
	return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}
module.exports.run = async ({ api, event, args }) => {
const time = process.uptime() + global.config.UPTIME,
		hours = Math.floor(time / (60 * 60)),
		minutes = Math.floor((time % (60 * 60)) / 60),
		seconds = Math.floor(time % 60);
  var z_1 = (hours < 10) ? '0' + hours : hours;
    var x_1 = (minutes < 10) ? '0' + minutes : minutes;
    var y_1 = (seconds < 10) ? '0' + seconds : seconds;
    const axios = require('axios')
	const pidusage = await global.nodemodule["pidusage"](process.pid);
	const timeStart = Date.now();
  const fs = require('fs-extra');
  const { commands } = global.client;
  const moment = require("moment-timezone");
    var gio = moment.tz("Asia/Manila").format(" HH:mm:ss D/MM/YYYY ");   
        if (!fs.existsSync(__dirname +
        `/tad/UTM-Avo.ttf`)) {
        let getfont = (await axios.get(`https://github.com/hanakuUwU/font/raw/main/UTM%20Avo.ttf`, { responseType: "arraybuffer" })).data;
        fs.writeFileSync(__dirname + `/tad/UTM-Avo.ttf`, Buffer.from(getfont, "utf-8"));
      }
         if (!fs.existsSync(__dirname +
      `/tad/phenomicon.ttf`)) {
      let getfont2 = (await axios.get(`https://github.com/hanakuUwU/font/raw/main/phenomicon.ttf`, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(__dirname + `/tad/phenomicon.ttf`, Buffer.from(getfont2, "utf-8"));
    };
  if (!fs.existsSync(__dirname +
      `/tad/CaviarDreams.ttf`)) {
      let getfont3 = (await axios.get(`https://github.com/hanakuUwU/font/raw/main/CaviarDreams.ttf`, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(__dirname + `/tad/CaviarDreams.ttf`, Buffer.from(getfont3, "utf-8"));
    };
   const { loadImage, createCanvas, registerFont } = require("canvas");
  
  let k = args[0];
   if(args[0] == "list"){
    const alime = (await axios.get('https://run.mocky.io/v3/6aa59c3e-ff9f-41cd-8611-07a1b870042d')).data
    var count = alime.listAnime.length;
      var data = alime.listAnime
      var page = 1;
      page = parseInt(args[1]) || 1;
      page < -1 ? page = 1 : "";
      var limit = 20;
      var numPage = Math.ceil(count/limit);
      var msg = ``;
      for(var i = limit*(page - 1); i < limit*(page-1) + limit; i++){
         if(i >= count) break;
        msg += `[ ${i+1} ] - ${data[i].ID} | ${data[i].name}\n`;
      }
      msg += `Page (${page}/${numPage})\nUse ${global.config.PREFIX}${this.config.name} list <page number>`;
      return api.sendMessage(msg, event.threadID,event.messageID);
   }
  if(!k){
  var id = Math.floor(Math.random() * 848) +1
  } else {
    var id = k
  }
    const loz = ["https://i.imgur.com/lacZKzL.jpg","https://i.imgur.com/lacZKzL.jpg"]
  
    const lengthchar = (await axios.get('https://run.mocky.io/v3/4ae0208e-ce2a-48c9-a6c2-b1c84aaddfc5')).data
    console.log(lengthchar.length)
  const Canvas = require('canvas');
    let pathImg = __dirname + `/tad/avatar_1111231.png`;
    let pathAva = __dirname + `/tad/avatar_3dsc11.png`;
    let background = (await axios.get(encodeURI((loz[Math.floor(Math.random() * loz.length)])), { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));
    let ava = (await axios.get(encodeURI(`${lengthchar[id - 1].imgAnime}`), { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathAva, Buffer.from(ava, "utf-8"));
    const request = require('request');
    const path = require('path');

  //const a = Math.floor(Math.random() * 820) + 1
  
  
let l1 = await loadImage(pathAva);
    let a = await loadImage(pathImg);
    let canvas = createCanvas(a.width, a.height);
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = lengthchar[id].colorBg;
    ctx.fillRect(2400, 0, canvas.width, canvas.height);
  
    ctx.drawImage(a, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(l1, 700, -200, 1200, 1200);
     registerFont(__dirname + `/tad/phenomicon.ttf`, {
      family: "phenomicon"
    });
      registerFont(__dirname + `/tad/NeonRaveItalic-GOD2g.ttf`, {
      family: "Neon"
    });
    ctx.textAlign = "start";
    ctx.strokeStyle = lengthchar[id].colorBg;
    ctx.filter = "brightness(90%) contrast(110%)";
    ctx.font = "130px Neon";
    ctx.fillStyle = lengthchar[id].colorBg;
    ctx.fillText(`BOT - ${global.config.BOTNAME}`, 100, 330);
    ctx.beginPath();

    ctx.textAlign = "start";
    ctx.strokeStyle = lengthchar[id].colorBg;
    ctx.filter = "brightness(90%) contrast(110%)";
    ctx.font = "130px Neon";
    ctx.fillStyle = "#fff";
    ctx.fillText(`BOT - ${global.config.BOTNAME}`, 100, 350);
    ctx.beginPath();
    
  ////////////////////////////////////////
   registerFont(__dirname + `/tad/NeonRave-z82z4.ttf`, {
      family: "UTM"
    });
    ctx.textAlign = "start";
    ctx.font = "70px UTM";
    ctx.fillStyle = "#000000";
    ctx.fillText(`${z_1} : ${x_1} : ${y_1} `, 178, 430);
    ctx.restore();
    ctx.save();
registerFont(__dirname + `/tad/CaviarDreams.ttf`, {
      family: "time"
    });
    ctx.textAlign = "start";
    ctx.font = "45px time";
    ctx.fillStyle = lengthchar[id].colorBg;
    ctx.fillText("Richard Retada", 250, 515)
    ctx.fillText("NaN", 250, 580)
    ctx.restore();
    ctx.save();
    ctx.beginPath();
    const imageBuffer = canvas.toBuffer();
   fs.writeFileSync(pathImg, imageBuffer);
  return api.sendMessage({
    body: `=== 𝗨𝗣𝗧𝗜𝗠𝗘 𝗕𝗢𝗧 ===\n❯ ${hours} hours ${minutes} minutes ${seconds} seconds\n•━━━━━━━━━━•\n❯ Bo𝐭 Name: ${global.config.BOTNAME}\n❯ Bot Prefix: ${global.config.PREFIX}\n❯ Commands count: ${commands.size}\n❯ Total users: ${global.data.allUserID.length}\n❯ Total Group: ${global.data.allThreadID.length}\n❯ CPU in use: ${pidusage.cpu.toFixed(1)}%\n❯ General Command: ${commands.size}\n❯ Ram in use: ${byte2mb(pidusage.memory)}\n❯ Ping: ${Date.now() - timeStart}ms\n❯ Character ID: ${id}\n❯ Character Name: ${lengthchar[id - 1].dm}\n•━━━━━━━━━━•\n[ ${gio} ]`,
    attachment: fs.createReadStream(pathImg)
  },
    event.threadID,
    () => fs.unlinkSync(pathImg),
    fs.unlinkSync(pathAva),
    event.messageID
  );
}
