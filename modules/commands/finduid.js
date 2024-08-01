module.exports.config = {
  name: "finduid",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "HungCho",
  description: "Get the UID of the Profile's link.",
  commandCategory: "Utilities",
  usages: "finduid + link fb",
  cooldowns: 1
};

module.exports.run = async ({ api, event, Users, args }) => {
const axios = global.nodemodule["axios"];
let text = args.join("");
if(event.type == "message_reply") { text = event.messageReply.senderID }
const id = await axios.get(`https://chards-bot-api.richardretada.repl.co/api/tools/fuid?link=${text}`);

let name = await Users.getNameUser(`${id.data.result}`);

return api.sendMessage(`@[${id.data.result} : ${name}]`, event.threadID, event.messageID)
  
}

