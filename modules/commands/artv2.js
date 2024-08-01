module.exports.config = {
    name: "artv2",
    version: "1.0.0",
    hasPermssion: 2,
    credits: 'DC-NAM',//Tpk mod lại thành coveranime mod by Sumi team
    description: "Vẽ 3d",
    commandCategory: "Hệ thống support-bot",
    usages: "art [lamnet/video] or reply",
    cooldowns: 0,
'image-downloader': '',
        'tslib': '',
        'imgur': '',
        'request': ''
    }
const {ImgurClient} = require('imgur');
const {image} = require('image-downloader');
const {createReadStream, unlinkSyn} = require('fs-extra');
const {get} = require('request');
module.exports.run = async function ({ api, event, args, Users, Currencies, Threads }) {
  try {
      let axiso = require("axios")
let fs = require("fs-extra")
    let path = __dirname + "/cache/meitu.png"
let pathVideo = __dirname + "/cache/meitu.mp4"
let link = await global.nodemodule["tinyurl"].shorten(event.messageReply.attachments[0].url)
    if (!args[0]) {
let tpk = await axios.get(`https://stingray-app-chpom.ondigitalocean.app/meitu-image-v2?url=${link}`)
  await global.utils.downloadFile;tpk.data.image, path;
      var cc = `🔄===『 𝗖𝗢𝗩𝗘𝗥𝗔𝗡𝗜𝗠𝗘 』===🔄
 
[🔰]➜ 𝗧𝗿𝗮̣𝗻𝗴 𝘁𝗵𝗮́𝗶: ${tpk.data.message}
[⏰]➜ 𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻 𝗹𝗮̀𝗺: ${tpk.data.timeProcess}
[😻]➜ 𝗟𝗶𝗻𝗸 𝗮̉𝗻𝗵: ${tpk.data.image}
━━━━━━━━━━━━━━━━━━━━━━━━━
[👉]➜ 𝗕𝗮̣𝗻 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝗱𝘂̀𝗻𝗴 ${global.config.PREFIX}${this.config.name} + 𝘃𝗶𝗱𝗲𝗼/𝗿𝗲𝗽𝗹𝘆 𝘃𝗶𝗱𝗲𝗼 đ𝗲̂̉ 𝗯𝗼𝘁 𝗰𝗵𝘂𝘆𝗲̂̉𝗻 đ𝗼̂̉𝗶 𝘃𝗮̀ 𝗲𝗱𝗶𝘁
[💓]➜ ${global.config.PREFIX}${this.config.name} + 𝗹𝗮𝗺𝗻𝗲𝘁/𝗿𝗲𝗽𝗹𝘆 𝗮̉𝗻𝗵 𝗯𝗼𝘁 𝘀𝗲̃ 𝗹𝗮̀𝗺 𝗻𝗲́𝘁 𝗹𝗮̣𝗶 𝗮̉𝗻𝗵 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻`
   api.sendMessage({body: cc, attachment: fs.createReadStream(path)}, event.threadID, event.messageID)
  }
 if (args[0] == "video") {
let res = await axios.get(`https://stingray-app-chpom.ondigitalocean.app/meitu-image-v2?url=${link}`)
let cc = await axios.get(`https://stingray-app-chpom.ondigitalocean.app/meitu-video?url_1=${link}&url_2=${res.data.image}`)
await global.utils.downloadFile(cc.data.video, pathVideo)
   var tpk = `📸==『 𝗖𝗢𝗩𝗘𝗥𝗔𝗡𝗜𝗠𝗘 𝗘𝗗𝗜𝗧 』==📸
 
[🔰]➜ 𝗧𝗶̀𝗻𝗵 𝘁𝗿𝗮̣𝗻𝗴: ${cc.data.message}
[😻]➜ 𝗟𝗶𝗻𝗸 𝘀𝗮𝗼 𝗸𝗵𝗶 𝗰𝗵𝘂𝘆𝗲̂̉𝗻: ${cc.data.video}
━━━━━━━━━━━━━━━━━━━━━━
[👉]➜ 𝗖𝗼𝘃𝗲𝗿𝗮𝗻𝗶𝗺𝗲 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴 𝗰𝗵𝗼 𝗯𝗮̣𝗻 𝗱𝗮̣𝗻𝗴 𝗲𝗱𝗶𝘁 𝗰𝗵𝘂𝘆𝗲̂̉𝗻 đ𝗼̂̉𝗶 `
api.sendMessage({body: tpk, attachment: fs.createReadStream(pathVideo)}, event.threadID, event.messageID)
    } 
if (args[0] == "lamnet") {
     let axiso = require("axios")
let cc = await axios.get(`https://stingray-app-chpom.ondigitalocean.app/image-restoration?url=${link}`)
  await global.utils.downloadFile;cc.data.data.media_data, path;
  var tpk = `🖥️==『 𝗖𝗢𝗩𝗘𝗥𝗔𝗡𝗜𝗠𝗘 𝗡𝗘𝗧 』==🖥️
 
[🔰]➜ 𝗧𝗶̀𝗻𝗵 𝘁𝗿𝗮̣𝗻𝗴: ${cc.data.message}
[⏰]➜ 𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻 𝗹𝗼𝗮𝗱: ${cc.data.timeProcess}
[😻]➜ 𝗟𝗶𝗻𝗸 𝗮̉𝗻𝗵: ${cc.data.data.media_data}
━━━━━━━━━━━━━━━━━
[👉]➜ 𝗣𝗵𝗶́𝗮 𝗱𝘂̛𝗼̛́𝗶 𝗹𝗮̀ 𝗮̉𝗻𝗵 𝘃𝘂̛̀𝗮 𝗹𝗮̀𝗺 𝗻𝗲́𝘁 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴`
   api.sendMessage({body: tpk, attachment: fs.createReadStream(path)}, event.threadID, event.messageID)
}
  } catch(e) {
    console.log(e)
      api.sendMessage("Đã xảy ra lỗi, vui lòng thử lại", event.threadID)
  }
  }