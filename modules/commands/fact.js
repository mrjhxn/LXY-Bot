module.exports.config = {
	name: "fact",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Plue",
	description: "fact",
	commandCategory: "word",
	cooldowns: 1
};

module.exports.run = async ({ api, event,args }) => {
const axios = global.nodemodule["axios"];
let fact = args.join(" ");
const res = await axios.get(`https://api.popcat.xyz/fact`);
var a = res.data.fact;
return api.sendMessage(`${a}`, event.threadID, event.messageID)
}