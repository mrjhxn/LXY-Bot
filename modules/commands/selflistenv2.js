module.exports.config = {
	name: "selflisten",	
       version: "1.0.0",
	hasPermssion: 2,
	credits: "Chard",
	description: "Self Listen",
	commandCategory: "admin",
	usages: "true/false",
	cooldowns: 5,
};

module.exports.run = async function({ global, api, event, args, client }) {
var config = require(client.dirConfig);
var fs = require("fs-extra");
      config.FCAOption.selfListen = `${args.join("")}`;
  fs.writeFileSync(client.dirConfig, JSON.stringify(config, "utf-8"));
    	api.sendMessage("loading...", event.threadID, () => require("node-cmd").run("pm2 restart 0"));		
}