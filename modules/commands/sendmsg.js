module.exports.config = {
	name: "sendmsg",
	version: "0.0.2",
	hasPermssion: 2,
	credits: "Dũng UwU",
	description: "sendmsg",
	commandCategory: "general",
	usages: "sendmsg [user]/[thread] id msg",
    cooldowns: 5,
};

module.exports.run = async function({ api, event, args, utils }) {
    var msg = args.splice(2).join(" ");
    if (args[0]=='user') {
        return api.sendMessage('==== From Admin ====\n' + msg, args[1]).then(
            api.sendMessage('Message sent to member ' + args[1] + ' successful', event.threadID, event.messageID));
    } else {
            if (args[0]=='thread') { return api.sendMessage('==== From Admin ====\n' + msg, args[1]).then(
            api.sendMessage('Sent a message to the group ' + args[1] + ' successful', event.threadID, event.messageID))
            }
                else return utils.throwError("sendmsg", event.threadID, event.messageID);
        }
    }