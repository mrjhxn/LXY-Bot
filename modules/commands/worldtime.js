module.exports.config = {
  name: "worldtime",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "TuanDz",
  description: "Dates and times of cities",
  commandCategory: "Tiện Ích",
  cooldowns: 60
};
module.exports.run = async ({ api, event }) => {
  const axios = require('axios');
  const fetch = global.nodemodule["node-fetch"];
  const request = require('request');
  const fs = require("fs");
  const moment = require("moment-timezone");
  var phtime = moment.tz("Asia/Manila").format("HH:mm:ss || D/MM/YYYY");
  var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || D/MM/YYYY");
  var gio2 = moment.tz("Europe/Lodon").format("HH:mm:ss || D/MM/YYYY");
  var gio1 = moment.tz("America/Brasília").format("HH:mm:ss || D/MM/YYYY");
  var gio3 = moment.tz("Asia/Seoul").format("HH:mm:ss || D/MM/YYYY");
  var gio4 = moment.tz("Asia/Tokyo").format("HH:mm:ss || D/MM/YYYY");
  var gio5 = moment.tz("America/New_York").format("HH:mm:ss || D/MM/YYYY");
  var gio6 = moment.tz("Asia/Kuala_Lumpur").format("HH:mm:ss || D/MM/YYYY");var gio1 = moment.tz("America/New_York").format("HH:mm:ss || D/MM/YYYY");
  var gio7 = moment.tz("Europe/Paris").format("HH:mm:ss || D/MM/YYYY");//do tui lười nên ko thêm các nước vô nữa còn nếu các ông muốn thêm thì tùy kk :>>
  axios.get('https://apituandz1407.herokuapp.com/api/itachi.php').then(res => {
 let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
  let callback = function () {
  api.sendMessage({
  body: `𝗪𝗢𝗥𝗟𝗗 𝗧𝗜𝗠𝗘\n-🇵🇭 𝐌𝐚𝐧𝐢𝐥𝐚: ${phtime}\n-🇻🇳 𝐇𝐚̀ 𝐍𝐨̣̂𝐢: ${gio}\n-🇬🇧 𝐋𝐨𝐧𝐝𝐨𝐧: ${gio2}\n-🇺🇸 𝐍𝐞𝐰 𝐘𝐨𝐫𝐤: ${gio5}\n-🇰🇷 𝐒𝐞𝐨𝐮𝐥: ${gio3}\n-🇯🇵 𝐓𝐨𝐤𝐲𝐨: ${gio4}\n-🇧🇷 𝐁𝐫𝐚𝐬𝐢́𝐥𝐢𝐚: ${gio1}\n-🇲🇾 𝐊𝐮𝐚𝐥𝐚 𝐋𝐮𝐦𝐩𝐮𝐫: ${gio6}\n-🇫🇷 𝐏𝐚𝐫𝐢𝐬: ${gio7}`,
  attachment: fs.createReadStream(__dirname + `/cache/anh.${ext}`)
  }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/anh.${ext}`), event.messageID);
   };
  request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/anh.${ext}`)).on("close", callback);
  })
}
