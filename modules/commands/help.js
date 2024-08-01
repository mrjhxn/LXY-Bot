module.exports.config = {
	name: "help",
	version: "1.0.3",
	hasPermssion: 0,
	credits: "Mirai Team",
	description: "Beginner's Guide",
	commandCategory: "system",
	usages: "[Module name]",
	cooldowns: 15,
	envConfig: {
		autoUnsend: true,
		delayUnsend: 30
	}
};

module.exports.languages = {
	"vi": {
		"moduleInfo": "「 %1 」\n%2\n\n❯ Cách sử dụng: %3\n❯ Thuộc nhóm: %4\n❯ Thời gian chờ: %5 giây(s)\n❯ Quyền hạn: %6\n\n» Module code by %7 «",
		"helpList": '[ Hiện tại đang có %1 lệnh có thể sử dụng trên bot này, Sử dụng: "%2help nameCommand" để xem chi tiết cách sử dụng! ]"',
		"user": "Người dùng",
        "adminGroup": "Quản trị viên nhóm",
        "adminBot": "Quản trị viên bot"
	},
	"en": {
		"moduleInfo": "╭┈ ❒ 𝗖𝗢𝗠𝗠𝗔𝗡𝗗 :「 %1 」\n╰┈➤ %2\n\n╰┈➤ Usage: %3\n╰┈➤ Category: %4\n╰┈➤ Waiting time: %5 seconds(s)\n╰┈➤ Permission: %6\n\n╰┈➤ Module code by Chard's Bot ",
		"helpList": '[ There are %1 commands on this bot, Use: "%2help nameCommand" to know how to use! ]',
		"user": "User",
        "adminGroup": "Admin group",
        "adminBot": "Admin bot"
	}
};

module.exports.handleEvent = function ({ api, event, getText }) {
	const { commands } = global.client;
	const { threadID, messageID, body } = event;

	if (!body || typeof body == "undefined" || body.indexOf("help") != 0) return;
	const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);
	if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const command = commands.get(splitBody[1].toLowerCase());
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
	return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
}

module.exports. run = function({ api, event, args, getText }) {
	const { commands } = global.client;
	const { threadID, messageID } = event;
	const command = commands.get((args[0] || "").toLowerCase());
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

	if (!command) {
		const arrayInfo = [];
		const page = parseInt(args[0]) || 1;
    const numberOfOnePage = 10;
    let i = 0;
    let msg = `═ 𝗕𝗢𝗧 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦 𝗟𝗜𝗦𝗧 ═\n\n❖━━━━━━━━━━━━❖\n╭┈ ❒ Use: ${prefix} \n╰┈➤ this prefix to run this commands\n❖━━━━━━━━━━━━❖\n\n━━━━━━━━━━━━\n`;
    
    for (var [name, value] of (commands)) {
    name += `\n╰┈➤ description: ${value.config.description}\n╰┈➤ Version: ${value.config.version}\n╰┈➤ Waiting time: ${value.config.cooldowns}s\n━━━━━━━━━━━━`;
      arrayInfo.push(name);
    }

    arrayInfo.sort((a, b) => a.data - b.data);
    
    const startSlice = numberOfOnePage*page - numberOfOnePage;
    i = startSlice;
    const returnArray = arrayInfo.slice(startSlice, startSlice + numberOfOnePage);
    
    for (let item of returnArray) msg += `╭┈ ❒ 〖 ${++i} 〗• ${item}\n`;
    
    const randomText = [ "Stanlxy"];
    
    const text = `\n\n\n❖━━━━━━━━━━━━❖\n╭┈ ❒ Page (${page}/${Math.ceil(arrayInfo.length/numberOfOnePage)}) \n╰┈➤ Type: "${prefix}help <command name>" for more details about that command \n╰┈➤ Currently available ${arrayInfo.length} command on bot\n╰┈➤ Use ${prefix}help <Number of pages>\n❖━━━━━━━━━━━━❖\n\nThis Bot Re-Make by: : ${randomText[Math.floor(Math.random()*randomText.length)]}`;
    return api.sendMessage(msg + "" + text, threadID, async (error, info) => {
			if (autoUnsend) {
				await new Promise(resolve => setTimeout(resolve, delayUnsend * 10000));
				return api.unsendMessage(info.messageID);
			} else return;
		});
	}

	return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
};