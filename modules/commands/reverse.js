module.exports.config = {
	name: "reverse",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Plue",
	description: "reverse text",
	commandCategory: "word",
	cooldowns: 1
};

module.exports.run = async ({ api, event,args }) => {
const axios = global.nodemodule["axios"];
let sim = args.join(" ");
const res = await axios.get(`https://api.popcat.xyz/reverse?text=${sim}`);
  var  response  =  res.data.text;

  
return api.sendMessage(`${response}`, event.threadID, event.messageID)
}