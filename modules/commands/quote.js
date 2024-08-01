module.exports.config = {
	name: "quote",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Plue",
	description: "random quotes",
	commandCategory: "word",
	cooldowns: 1
};

module.exports.run = async ({ api, event,args }) => {
const axios = global.nodemodule["axios"];
let lyric = args.join(" ");
const res = await axios.get(`https://api.popcat.xyz/quote`);
  var  quote  =  res.data.quote;

  
return api.sendMessage(`===QUOTES===\n ${quote}`, event.threadID, event.messageID)
}