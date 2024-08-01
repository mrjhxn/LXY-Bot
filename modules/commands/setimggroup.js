module.exports.config = {
	name: "setimggroup",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Loi",
	description: "Remove group photos by replying to pictures",
	commandCategory: "Group",
	usages: "setimgbox",
	cooldowns: 5,
};
const fs = require('fs')
const axios = require('axios')
module.exports.run = async function({ api, event, client, models, Threads }) {
    	if (event.type !== "message_reply") return api.sendMessage("❌ You have to reply to a photo", event.threadID, event.messageID);
	if (event.messageReply.attachments.length > 1) return api.sendMessage(`Please reply only one photo!`, event.threadID, event.messageID);
    	if (!event.messageReply.attachments || event.messageReply.attachments.length == 0) return api.sendMessage("❌ You have to reply to a photo", event.threadID, event.messageID);
      var abc = event.messageReply.attachments[0].url;
    let pathImg = __dirname + '/cache/loz.png';
    let getdata = (await axios.get(`${abc}`, { responseType: 'arraybuffer' })).data;
  fs.writeFileSync(pathImg, Buffer.from(getdata, 'utf-8'));
    return api.changeGroupImage(fs.createReadStream(__dirname + '/cache/loz.png'), event.threadID, () => fs.unlinkSync(pathImg), event.messageID);
  }