module.exports.config = {
	name: "setmoneyv2",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "CatalizCS",
	description: "Adjust user's information",
	commandCategory: "Admin",
	usages: "[add/set/clean] [Amount of money] [User Tag]",
	cooldowns: 5
};

module.exports.run = async function ({ event, api, Currencies, args }) {
    const { threadID, messageID, senderID } = event;
    const { throwError }          = global.utils;
    const mentionID               = Object.keys(event.mentions);
    const money                   = parseInt(args[1]);

    var message                   = [];
    var error                     = [];

    switch (args[0]) {
        case "add": {
            if (mentionID.length != 0) {
                for (singleID of mentionID) {
                    if (!money || isNaN(money)) return throwError(this.config.name, threadID, messageID);
                    try {
                        await Currencies.increaseMoney(singleID, money);
                        message.push(singleID);
                    } catch (e) { error.push(e);  console.log(e) };
                }
                return api.sendMessage(`[Money] Added ${money}$ for ${message.length} people`, threadID, function () { if (error.length != 0) return api.sendMessage(`[Error] Cannot add money to ${error.length} people!`, threadID) }, messageID);
            } else {
                if (!money || isNaN(money)) return throwError(this.config.name, threadID, messageID);
                try {
                    await Currencies.increaseMoney(senderID, money);
                    message.push(senderID);
                } catch (e) { error.push(e) };
                return api.sendMessage(`[Money] Added ${money}$ to myself`, threadID, function () { if (error.length != 0) return api.sendMessage(`[Error] Cannot add money to yourself!`, threadID) }, messageID);
            }
        }

        case "set": {
            if (mentionID.length != 0) {
                for (singleID of mentionID) {
                    if (!money || isNaN(money)) return throwError(this.config.name, threadID, messageID);
                    try {
                        await Currencies.setData(singleID, { money });
                        message.push(singleID);
                    } catch (e) { error.push(e) };
                }
                return api.sendMessage(`[Money] Successfully set ${money}$ for ${message.length} people`, threadID, function () { if (error.length != 0) return api.sendMessage(`[Error] Cannot set money for ${error.length} person!`, threadID) }, messageID);
            } else {
                if (!money || isNaN(money)) return throwError(this.config.name, threadID, messageID);
                try {
                    await Currencies.setData(senderID, { money });
                    message.push(senderID);
                } catch (e) { error.push(e) };
                return api.sendMessage(`[Money] Successfully set ${money}$ for myself`, threadID, function () { if (error.length != 0) return api.sendMessage(`[Error] Unable to set money for yourself!`, threadID) }, messageID);
            }
        }

        case "clean": {
            if (mentionID.length != 0) {
                for (singleID of mentionID) {
                    try {
                        await Currencies.setData(singleID, { money: 0 });
                        message.push(singleID);
                    } catch (e) { error.push(e) };
                }
                return api.sendMessage(`[Money] Successfully deleted all money of ${message.length} people`, threadID, function () { if (error.length != 0) return api.sendMessage(`[Error] Can't delete the full amount of ${error.length} person!`, threadID) }, messageID);
            } else {
                try {
                    await Currencies.setData(senderID, { money: 0 });
                    message.push(senderID);
                } catch (e) { error.push(e) };
                return api.sendMessage(`[Money] Successfully deleted my own money`, threadID, function () { if (error.length != 0) return api.sendMessage(`[Error] Can't delete all my money!`, threadID) }, messageID);
            }
        }
        
        default: {
            return global.utils.throwError(this.config.name, threadID, messageID);
        }
    }
}