module.exports.config = {
	name: "google",
	version: "2.0.0",
	hasPermssion: 0,
	credits: "Plue",
	description: "Basic Google",
	commandCategory: "ai",
	usages: "ai (question)",
	cooldowns: 5
};

module.exports.run = async ({ api, event,args }) => {
const axios = global.nodemodule["axios"];
  const google = require("googlethis");
  let searched = args.toString().replace(/,/g,  '  ');
  if (!searched) return api.sendMessage(`U!\n💡 Usage: openai <ask anything>)`, event.threadID, event.messageID);
  const options = {
  page: 0, 
  safe: false,
  additional_params: { 
    hl: 'en' 
  }
};
const response = await google.search(`${searched}`,options);
let result = response.results;
let msg = `===== 𝗚𝗢𝗢𝗚𝗟𝗘 𝗦𝗘𝗔𝗥𝗖𝗛 =====\n\n`;
    msg += `🔎 You searched: ${searched}\n`;
    msg += `\n==========================\n\n`;
    msg += `🔰 Title:\n ${result[0].title}\n`;
    msg += `\n📝 Description:\n [𝟭]. ${result[0].description}\n`;
    msg += `\n🔗 Reference:\n [𝟭]. ${result[0].url}`;
    msg += `\n==========================\n\n`;
    msg += `🔰 Title:\n ${result[1].title}\n`;
    msg += `\n📝 Description:\n [𝟮]. ${result[1].description}\n`;
    msg += `\n🔗 Reference:\n [𝟮]. ${result[1].url}`;
    msg += `\n==========================\n\n`;
    msg += `🔰 Title:\n ${result[2].title}\n`;
    msg += `\n📝 Description:\n [𝟯]. ${result[2].description}\n`;
    msg += `\n🔗 Reference:\n [𝟯]. ${result[2].url}`;
    msg += `\n==========================\n`;
    
  
return api.sendMessage(msg, event.threadID, event.messageID)
}