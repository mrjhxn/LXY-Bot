module.exports.config = {
	name: "pickuplines",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Plue",
	description: "pick up lines",
	commandCategory: "word",
	cooldowns: 1
};

module.exports.run = async ({ api, event,args }) => {
const axios = global.nodemodule["axios"];
let lyric = args.join(" ");
const res = await axios.get(`https://api.popcat.xyz/pickuplines`);
  var  pickupline  =  res.data.pickupline;

  
return api.sendMessage(`===PICKUPLINE===\n► ${pickupline}`, event.threadID, event.messageID)
}