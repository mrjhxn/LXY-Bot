var cred = "Chard";
module.exports.config = {
    name: "art",
    version: "1.0.0",
    hasPermsion: 0,
    credits: `${cred}`,
    description: "art",
    usages: "Reanimate Image!!!",
    commandCategory: "...",
    cooldowns: 30,
};

module.exports.run = async function({api, event, args, utils, Users, Threads}) {
        const axios = require('axios');
        const fs = require("fs-extra");
        const request = require("request");
  
    try {
        let {threadID, senderID, messageID} = event;
      if ((this.config.credits) != `${cred}`) { return api.sendMessage(`HAHAHAHAHA `, event.threadID, event.messageID)
     }
      if (event.type !== "message_reply") return api.sendMessage(`Just reply to image using ${global.config.PREFIX}art`, event.threadID, event.messageID);
	if (!event.messageReply.attachments || event.messageReply.attachments.length == 0) return api.sendMessage(`Just reply to image using ${global.config.PREFIX}art`, event.threadID, event.messageID);
	if (event.messageReply.attachments.length > 1) return api.sendMessage(`Just reply to image using ${global.config.PREFIX}art`, event.threadID, event.messageID);
 // let qwerty = "2" || args[0];

//const img = await axios.get(`https://goatbotserver.onrender.com/taoanhdep/art?image=${event.messageReply.attachments[0].url}`);
    //let iimg = img.data.data.effect_img
    const rest = await axios.get(`https://apiuwuapi.richardretadaof.repl.co/imgurupload?link=${encodeURIComponent(event.messageReply.attachments[0].url)}`);
      var img = rest.data.uploaded.image;
      
    const res = await axios.get(`https://goatbotserver.onrender.com/taoanhdep/art?image=${img}`);

      console.log(event.messageReply.attachments[0])
      const imageUrl = res.data.data.effect_img
  const t = (await axios.get(`${imageUrl}`, {
                responseType: "stream"
            })).data;
      return api.sendMessage({body: "=== REANIMATE ===", attachment: t}, event.threadID, event.messageID)
      
      
}catch (err) {
        console.log(err)
        return api.sendMessage(`${event.messageReply.attachments[0].url}`, event.threadID, event.messageID)
      }
}