module.exports.config = {
	name: "setbio",
	version: "1.0.0",
	hasPermssion: 3,
	credits: "Lợi",
	description: "Change bio",
	commandCategory: "Tiện ích",
	usages: "setbio [bio]",
	cooldowns: 3
};

module.exports.run = async function({ api, event, args }) {
	 api.changeBio(`${args.join(" ")}`);
	  api.sendMessage(`Changed bot's profile to : ${args.join(" ")}`, event.threadID);
}