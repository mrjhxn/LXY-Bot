module.exports.config = {
	name: "setgroupname",
	version: "1.0.0", 
	hasPermssion: 0,
	credits: "HungCatMoi",
	description: "Rename your group",
	commandCategory: "Box", 
	usages: "[name]", 
	cooldowns: 0,
	dependencies: [] 
};

module.exports.run = async function({ api, event, args }) {
	var name = args.join(" ")
	if (!name) api.sendMessage("❌ You have not entered the group name you want to change", event.threadID, event.messageID)
	else api.setTitle(name, event.threadID, () => api.sendMessage(`🔨 The bot changed the group name to: ${name}`, event.threadID, event.messageID));
}
