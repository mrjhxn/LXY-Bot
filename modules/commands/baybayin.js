module.exports.config = {
	name: "baybayin",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Chards",
	description: "convert text to baybayin",
	commandCategory: "Word",
	usages: "[text]",
	cooldowns: 5
};

module.exports.run = async ({ api, event,args }) => {
const axios = global.nodemodule["axios"];
let text = args.join(" ");
const res = await axios.get(`https://api-baybayin-transliterator.vercel.app/?text=${text}`);
var userName = res.data.baybay;
return api.sendMessage(`${userName}`, event.threadID, event.messageID)
}
