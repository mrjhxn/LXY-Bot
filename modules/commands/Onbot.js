module.exports.config = {
	name: "onbot",
	version: "1.0.0",
	hasPermssion: 1,
	credits: "HTHB",
	description: "Bật Bot.",
	commandCategory: "AdminBot",
	cooldowns: 0
        };
module.exports.run = ({event, api}) =>api.sendMessage("Bot is Online",event.threadID, () =>process.enter(0))
