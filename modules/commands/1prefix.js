module.exports.config = {
	name: "\n",
	version: "1.0.9",
	hasPermssion: 0,
	credits: "Plue",
	description: "prefix",
	commandCategory: "word",
	usages: "prefix",
	cooldowns: 10
};

module.exports.run = async ({ api, event, Threads}) => {
const axios = global.nodemodule['axios'];
  return api.sendMessage(`╭┈ ❒ [ ${global.config.PREFIX} ] : PREFIX
╰┈➤ Use ${global.config.PREFIX}help to show commands.
╰┈➤ Use ${global.config.PREFIX}helpall to view all commands.
╰┈➤ Use ${global.config.PREFIX}help (command name) to view their Description.
`, event.threadID, event.messageID)
}
