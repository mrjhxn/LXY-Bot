module.exports.config = {
	name: "minion",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "plue",
	description: "text to minion language",
	commandCategory: "word",
	cooldowns: 1
};

module.exports.run = async ({ api, event,args }) => {
const axios = global.nodemodule["axios"];
let mini = args.join(" ");
const res = await axios.get(`https://api.funtranslations.com/translate/minion.json?text=${mini}`);
var a = res.data.contents.translated;
  
return api.sendMessage(`${a}`, event.threadID, event.messageID)
}