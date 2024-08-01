module.exports.config = {
  name: "mentionall",
  version: "1.0.0", 
  hasPermssion: 0,
  credits: "Chards Bot",
  description: "List name",
  commandCategory: "System", 
  usages: "", 
  cooldowns: 0
};
module.exports.run = async function({ api, event,Threads, Users }) {
        const axios = global.nodemodule["axios"];
        const fs = global.nodemodule["fs-extra"];
        let msg = "=== MENTION ===\n\n";
        
        console.log(event.participantIDs)
        for (const i of await event.participantIDs) {
        //console.log(`${i}\n`);
        var name = (await Users.getData(`${i}`)).name
        msg += `@${name}\n`;
        }
        api.sendMessage(msg, event.threadID, event.messageID)
}