module.exports.config = {
	name: "setgroupemoji",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Lợi",
	description: "Change emoji in group",
	commandCategory: "Group",
	usages: "setemoji [emoji]",
	cooldowns: 3
};

module.exports.run = async function({ api, event, args }) {
	const emoji = args.join(" ")
	return api.setTitle(`${args.join(" ")}`, event.threadID, event.messagaID);
}