module.exports.config = {
	name: "bugtong",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Chard",
	description: "bugtong",
	commandCategory: "games",
	usages: "",
	cooldowns: 5,
	dependencies: {
		"axios":""}
	
};

module.exports.run = async ({ api, event,args }) => {
  
  const fs = require('fs-extra');
const pathFile = __dirname + '/cache/bugtong/bugtong.json';
const axios = require("axios");

const res = await axios.get(`https://api-pinoy-bugtong.vercel.app/`);
  var a = res.data;
  var b = res.data.b;
  var s = res.data.s;
  
  api.sendMessage(`=== BUGTONG ===\n\nBugtong-bugtong:
-  ${b}\n\n${global.config.PREFIX}sagot ______\n${global.config.PREFIX}sagot pass`, event.threadID, event.messageID);
  
  fs.writeFileSync(pathFile, JSON.stringify(a, null, 4), 'utf8');
  
  
}