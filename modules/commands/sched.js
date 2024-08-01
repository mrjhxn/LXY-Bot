const fonts = "/cache/Play-Bold.ttf"
const downfonts = "https://drive.google.com/u/0/uc?id=1uni8AiYk7prdrC7hgAmezaGTMH5R8gW8&export=download"
const fontsLink = 20
const fontsInfo = 20
const colorName = "#000000"
module.exports.config = {
  name: "sched",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "ChardsBot",//Don't change credits Edit your pictures :(
  description: "Schedule",
  commandCategory: "info",
  usages: "",
  cooldowns: 5,
  dependencies: {
    canvas: "",
    axios: "",
    "fs-extra": "",
  },
};

module.exports.circle = async (image) => {
  const jimp = global.nodemodule["jimp"];
  image = await jimp.read(image);
  image.circle();
  return await image.getBufferAsync("image/png");
}
module.exports.run = async function ({ api, event, args, Users }) {
  if ((this.config.credits) != "ChardsBot") { return api.sendMessage(`⚡️Detected credits have been changed`, event.threadID, event.messageID)}
  let { senderID, threadID, messageID } = event;
  const { loadImage, createCanvas } = require("canvas");
  const request = require('request');
  const fs = global.nodemodule["fs-extra"];
  const axios = global.nodemodule["axios"];
  const Canvas = global.nodemodule["canvas"];
  const moment = require("moment-timezone");
var time= moment.tz("Asia/Manila").format("E");
  let pathImg = __dirname + `/cache/${senderID}123${threadID}.png`;
  let pathAvata = __dirname + `/cache/avtuserrd.png`;
  let pathAvatabg = __dirname + `/cache/avtbgwhite.png`;
  /*                 */
  if(event.type == "message_reply") { uid = event.messageReply.senderID }

  else uid = event.senderID;
  const res = await api.getUserInfoV2(uid);

  if(args.join(" ") == "all" || args.join(" ") == "ALL") {
      let getAvatarOne = (await axios.get(`https://graph.facebook.com/${uid}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
      let getAvatarbg = (await axios.get(`https://i.postimg.cc/8cFwwhWp/2048px-White-square-50-transparency-svg.jpg`, { responseType: 'arraybuffer' })).data;
  let bg = (
    await axios.get(encodeURI(`https://i.postimg.cc/gjkkpjx7/Blue-White-Playful-Class-Schedule-1.png`), {
      responseType: "arraybuffer",
    })
  ).data;
  fs.writeFileSync(pathAvata, Buffer.from(getAvatarOne, 'utf-8'));
  fs.writeFileSync(pathAvatabg, Buffer.from(getAvatarbg, 'utf-8'));
  avataruser = await this.circle(pathAvata);
  avataruserbg = await this.circle(pathAvatabg);
  fs.writeFileSync(pathImg, Buffer.from(bg, "utf-8"));

/*-----------------download----------------------*/
if(!fs.existsSync(__dirname+`${fonts}`)) { 
      let getfont = (await axios.get(`${downfonts}`, { responseType: "arraybuffer" })).data;
       fs.writeFileSync(__dirname+`${fonts}`, Buffer.from(getfont, "utf-8"));
    };
/*---------------------------------------------*/

  let baseImage = await loadImage(pathImg);
  let baseAvata = await loadImage(avataruser);
  let baseAvatabg = await loadImage(avataruserbg);
  let canvas = createCanvas(baseImage.width, baseImage.height);
  let ctx = canvas.getContext("2d");
  ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(baseAvatabg, 62, 72, 126, 126);
  ctx.drawImage(baseAvata, 65, 75, 120, 120);
  Canvas.registerFont(__dirname+`${fonts}`, {
        family: "Play-Bold"
    });
  ctx.font = `20px Play-Bold`;
  ctx.fillStyle = "#000000";
  ctx.textAlign = "start";
  ctx.fillText(`${res.name}`, 285, 195);
  ctx.font = `18px Play-Bold`;
  ctx.fillStyle = "#000000";
  ctx.textAlign = "start";
  ctx.fillText(`BSIT - 2H`, 560, 195);
  ctx.fillText(`Second`, 800, 195);
  ctx.beginPath();
  const imageBuffer = canvas.toBuffer();
  fs.writeFileSync(pathImg, imageBuffer);
  fs.removeSync(pathAvata);
  
  return api.sendMessage(
    { attachment: fs.createReadStream(pathImg) },
    threadID,
    () => fs.unlinkSync(pathImg),
    messageID
  );
      

  }
    //=============================
    
      let getAvatarOne = (await axios.get(`https://graph.facebook.com/${uid}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
      let getAvatarbg = (await axios.get(`https://i.postimg.cc/8cFwwhWp/2048px-White-square-50-transparency-svg.jpg`, { responseType: 'arraybuffer' })).data;
  let bg = (
    await axios.get(encodeURI(`https://i.postimg.cc/fRK85WFr/Brown-Peach-Cute-Daily-Planner-Instagram-Story.png`), {
      responseType: "arraybuffer",
    })
  ).data;
  fs.writeFileSync(pathAvata, Buffer.from(getAvatarOne, 'utf-8'));
  fs.writeFileSync(pathAvatabg, Buffer.from(getAvatarbg, 'utf-8'));
  avataruser = await this.circle(pathAvata);
  avataruserbg = await this.circle(pathAvatabg);
  fs.writeFileSync(pathImg, Buffer.from(bg, "utf-8"));

  

  var times = "";
  var sched = "";
  if (time == 1) {var times = "MONDAY"
                  var sched = `
╭┈ ⦿ [ NET 1 ]
╰┈➤ 7:00 to 8:00 AM

╭┈ ⦿ [ IPT ]
╰┈➤ 8:00 to 10:00 AM

╭┈ ⦿ [ ACSS ]
╰┈➤ 10:00 to 11:00 AM

╭┈ ⦿ [ GE 5 ]
╰┈➤ 11:30 to 1:00 PM

╭┈ ⦿ [ PE 4 ]
╰┈➤ 1:00 to 3:00 PM
                  `
                 }
  if (time == 2) {var times = "TUESDAY"
                  var sched = `
╭┈ ⦿ [ VACANT ]
╰┈➤ NO SCHEDULE TODAY
                  `
                 }
  if (time == 3) {var times = "WEDNESDAY"
                  var sched = `
╭┈ ⦿ [ IPT ]
╰┈➤ 7:00 to 10:00 AM

╭┈ ⦿ [ ACSS ]
╰┈➤ 10:00 to 11:00 AM

╭┈ ⦿ [ NET 1 ]
╰┈➤ 11:00 to 2:00 PM
                  `
                 }
  if (time == 4) {var times = "THURSDAY"
                  var sched = `
╭┈ ⦿ [ VACANT ]
╰┈➤ NO SCHEDULE TODAY
                  `
                 }
  if (time == 5) {var times = "FRIDAY"
                  var sched = `
╭┈ ⦿ [ ACSS ]
╰┈➤ 7:00 to 10:00 AM

╭┈ ⦿ [ FDBS ]
╰┈➤ 10:00 to 1:00 PM

╭┈ ⦿ [ FDBS ]
╰┈➤ 1:00 to 3:00 PM

╭┈ ⦿ [ GE 5 ]
╰┈➤ 4:00 to 5:30 PM

╭┈ ⦿ [ NET 1 ]
╰┈➤ 5:30 to 6:30 PM
                  `
                 }
  if (time == 6) {var times = "SATURDAY"
                  var sched = `
╭┈ ⦿ [ SSD ]
╰┈➤ 9:00 to 12:00 AM

╭┈ ⦿ [ SSD ]
╰┈➤ 12:00 to 2:00 PM

╭┈ ⦿ [ ELECT 2 ]
╰┈➤ 2:30 to 4:30 PM

╭┈ ⦿ [ SSD ]
╰┈➤ 4:30 to 7:30 PM
`
                 }
  if (time == 7) {var times = "SUNDAY"
                  var sched = `
╭┈ ⦿ [ VACANT ]
╰┈➤ NO SCHEDULE TODAY
                  `
                 }

/*-----------------download----------------------*/
if(!fs.existsSync(__dirname+`${fonts}`)) { 
      let getfont = (await axios.get(`${downfonts}`, { responseType: "arraybuffer" })).data;
       fs.writeFileSync(__dirname+`${fonts}`, Buffer.from(getfont, "utf-8"));
    };
/*---------------------------------------------*/

  let baseImage = await loadImage(pathImg);
  let baseAvata = await loadImage(avataruser);
  let baseAvatabg = await loadImage(avataruserbg);
  let canvas = createCanvas(baseImage.width, baseImage.height);
  let ctx = canvas.getContext("2d");
  ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
  
  ctx.drawImage(baseAvatabg, 324, 44, 113, 113);
  ctx.drawImage(baseAvata, 327, 47, 107, 107);
   
  Canvas.registerFont(__dirname+`${fonts}`, {
        family: "Play-Bold"
    });
  ctx.font = `${fontsInfo}px Play-Bold`;
  ctx.fillStyle = "#fcfcfc";
  ctx.textAlign = "start";
  ctx.fillText(`${res.name}`, 127, 168);
  ctx.fillText(`${times}`, 127, 188);

  ctx.font = `19px Sans-serif`;
  ctx.fillStyle = "#000000";
  ctx.textAlign = "start";
  fontSize = 20;  
  ctx.fillText(`${sched} `, 140, 197)
  ctx.beginPath();
  const imageBuffer = canvas.toBuffer();
  fs.writeFileSync(pathImg, imageBuffer);
  fs.removeSync(pathAvata);

  
  
  return api.sendMessage({
    body: `== CLASS SCHED CHECK ==\n`+ "⦿ DAY: " + times + "\n\n❒ Today Schedule ❒\n" + sched,
    attachment: fs.createReadStream(pathImg) 
    
    },
    threadID,
    () => fs.unlinkSync(pathImg),
    messageID
  );
};
