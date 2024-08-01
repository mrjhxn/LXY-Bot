module.exports.config = {
	name: "aidetect",
	version: "3.2.1",
	hasPermssion: 0,
	credits: "Chards Bot",
	description: "Ask anything!",
	commandCategory: "education",
	usages: "text",
	cooldowns: 30
};

module.exports.run = async function({ api, event,args,client }) {

  const check4ai = require("check4ai")()
const targetText = args.join(" ");
const result = await check4ai.checkText({text: targetText})

  var resn = result.author;
  var resp = result.percent;
console.log(result)

  return api.sendMessage("This is " + resp +"% " + resn + " Made", event.threadID, event.messageID)

}