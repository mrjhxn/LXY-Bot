const sendWaiting = true; // bật hoặc tắt gửi tin nhắn "đang tạo hình ảnh, vui ồng chờ đợi...";
const textWaiting = "Image initialization, please wait a moment";
const fonts = "/cache/Play-Bold.ttf"
const downfonts = "https://drive.google.com/u/0/uc?id=1uni8AiYk7prdrC7hgAmezaGTMH5R8gW8&export=download"
const fontsLink = 20
const fontsInfo = 28
const colorName = "#00FFFF"

module.exports.config = {
  name: "cardid",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "D-Jukie",
  description: "Create a facebook user information card",
  commandCategory: "Thông tin",
  usages: "cardinfo",
  cooldowns: 10,
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
  if ((this.config.credits) != "D-Jukie") { return api.sendMessage(`⚡️Detected credits have been changed`, event.threadID, event.messageID)}
  let { senderID, threadID, messageID } = event;
  const { loadImage, createCanvas } = require("canvas");
  const request = require('request');
  const fs = global.nodemodule["fs-extra"];
  const axios = global.nodemodule["axios"];
  const Canvas = global.nodemodule["canvas"];
  let pathImg = __dirname + `/cache/1.png`;
  let pathAvata = __dirname + `/cache/2.png`;
  /*                 */
  if(event.type == "message_reply") { uid = event.messageReply.senderID }
    else uid = event.senderID;
    const res = await api.getUserInfoV2(uid); 
  let getAvatarOne = (await axios.get(`https://graph.facebook.com/${uid}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
  let bg = (
    await axios.get(encodeURI(`https://i.postimg.cc/Xq32cVTy/20220918-155316.png`), {
      responseType: "arraybuffer",
    })
  ).data;
  fs.writeFileSync(pathAvata, Buffer.from(getAvatarOne, 'utf-8'));
  fs.writeFileSync(pathImg, Buffer.from(bg, "utf-8"));

/*-----------------download----------------------*/
if(!fs.existsSync(__dirname+`${fonts}`)) { 
      let getfont = (await axios.get(`${downfonts}`, { responseType: "arraybuffer" })).data;
       fs.writeFileSync(__dirname+`${fonts}`, Buffer.from(getfont, "utf-8"));
    };
/*---------------------------------------------*/

  let baseImage = await loadImage(pathImg);
  let baseAvata = await loadImage(pathAvata);
  let canvas = createCanvas(baseImage.width, baseImage.height);
  let ctx = canvas.getContext("2d");
  ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(baseAvata, 105, 85, 250, 245);
    var gender = res.gender == 'male' ? "Male" : res.gender == 'female' ? "Female" : "Not found";
    var birthday = res.birthday == 'Không Có Dữ Liệu' ? "Not found" : res.birthday ? `${res.birthday}`: "Not Found";
    var love = res.relationship_status == 'Không Có Dữ Liệu' ? "Private" : res.relationship_status ? `${res.relationship_status}`: "Not Found";
    var location = res.location.name ? `${res.location.name}`: "Private";
    var hometown = res.hometown.name ? `${res.hometown.name}` : "Private";
    var follow = res.follow == 'Không Có Dữ Liệu' ? "None" : res.follow ? `${res.follow}` : "Private";
    var usern = res.username == 'Không Có Dữ Liệu' ? "None" : res.username ? `${res.username}` : "Private";
    var first_name = res.first_name == 'Không Có Dữ Liệu' ? "None" : res.first_name ? `${res.first_name}` : "Private";
  Canvas.registerFont(__dirname+`${fonts}`, {
        family: "Sans-Serif"
    });
  ctx.font = `${fontsInfo}px Sans-Serif`;
  ctx.fillStyle = "#2e2e2e";
  ctx.textAlign = "start";
  fontSize = 20;
  ctx.fillText(`• 𝐍𝐚𝐦𝐞: ${res.name}`, 500, 172);
  ctx.fillText(`• 𝐆𝐞𝐧𝐝𝐞𝐫: ${gender}`, 500, 208);
  ctx.fillText(`• 𝐅𝐨𝐥𝐥𝐨𝐰: ${follow}`, 500, 244);
  ctx.fillText(`• 𝐒𝐭𝐚𝐭𝐮𝐬: ${love}`, 500, 281);
  ctx.fillText(`• 𝐁𝐢𝐫𝐭𝐡𝐝𝐚𝐲: ${birthday}`, 500, 320);
  ctx.fillText(`• 𝐋𝐨𝐜𝐚𝐭𝐢𝐨𝐧: ${location}`, 500, 357);
  ctx.fillText(`• 𝐇𝐨𝐦𝐞𝐭𝐨𝐰𝐧: ${hometown}`, 500, 390);
  ctx.fillText(`• 𝐔𝐈𝐃: ${uid}`, 500, 425);
  ctx.font = `${fontsLink}px Sans-Serif`;
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "start";
  fontSize = 20;  
  ctx.fillText(`» Profile: ${res.link}`, 19, 468);
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
};

 