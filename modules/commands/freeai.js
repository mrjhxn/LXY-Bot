module.exports.config = {
	name: "freeai",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Chards Bot",
	description: "REMOD OPENAI",
	commandCategory: "words",
	usages: "[text]",
	cooldowns: 30
};

module.exports.run = async function({ api, event,args,client }) {
const axios = global.nodemodule["axios"];

  let text = args.join(" ");
const res = await axios.get(`https://chards-bot-api.richardretada.repl.co/api/tools/ai?content=${text}`);

  return api.sendMessage({body: `${res.data.result.content}`}, event.threadID, event.messageID)
  
}
