module.exports.config = {
	name: "list",
	version: "1.0.0",
	credits: "Him",
	hasPermssion: 2,
	description: "list box of bots",
	commandCategory: "System",
	usages: "allbox",
	cooldowns: 5
};

module.exports.run = function({ api, event, clientL }) {
	var num = 0, box = "";
	api.getThreadList(100, null, ["INBOX"], (err, list) => {
		list.forEach(info => {
			if (info.isGroup && info.isSubscribed) {
				box += `${num+=1}. ${info.name} - ${info.threadID}\n`;
			}			
		})
		return api.sendMessage(box, event.threadID, event.messageID);
	})
}