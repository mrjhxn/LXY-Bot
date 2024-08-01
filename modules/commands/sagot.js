module.exports.config = {
	name: "sagot",
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

  try {
  const fs = require('fs-extra');
  const fsp = fs.promises;
  const axios = require("axios");
  const pathFile = __dirname + '/cache/bugtong/bugtong.json';

//const res = await axios.get(`/cache/bugtong/bugtong.json`);
  var text = args.join(" ");
  var answer = "pass";
  let sagot = JSON.parse(fs.readFileSync(pathFile, "utf8"));
    var sagots = sagot.s;
    var d = `{"a":"NAKUHA NA ANG TAMANG SAGOT\n\n${global.config.PREFIX}bugtong\nupang umulit muli";"b":"NAKUHA NA ANG TAMANG SAGOT\n\n${global.config.PREFIX}bugtong\nupang umulit muli"`;
  //var sagots = require(pathFile).s;

  if (sagots.includes(text)){
    return api.sendMessage("TAMA", event.threadID, event.messageID);
  }
  
  console.log(sagots);
  //return api.sendMessage(sagot, event.threadID, event.messageID);
  let msg = "=== SAGOT ===\n\n";
  for (const i of sagots) {
    //console.log(`${i}\n`);
    msg += `${i}\n`;
  }
  //console.log(sagots);
    if (text == "pass") {
  return api.sendMessage(msg, event.threadID, event.messageID);
    }
    else{
    return api.sendMessage(`MALI\n\nType: ${global.config.PREFIX}sagot pass\npara makita ang sagot!`, event.threadID, event.messageID);
  }
}catch (e) {
          console.log(e);
        }
  
}