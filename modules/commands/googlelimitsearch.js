module.exports.config = {
	name: "googlelimitsearch",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "plue",
	description: "google search with limitation",
	commandCategory: "word",
	usages: "google [search]",
	cooldowns: 5
};

module.exports.run = async ({ api, event,args }) => {
const axios = global.nodemodule["axios"];
let text = args.toString().replace(/,/g,  '  ');
const res = await axios.get(`https://zenzapis.xyz/searching/gsearch?query=${text}&apikey=5b4755554a`);
var title = res.data.result[1].title;
var url = res.data.result[1].url;
var result = res.data.result[1].desc;
return api.sendMessage(`► 𝗚𝗢𝗢𝗚𝗟𝗘 𝗦𝗘𝗔𝗥𝗖𝗛\n\n► Title: ${title}\n► Result: ${result}\n► Link: ${url}`, event.threadID, event.messageID)
}
