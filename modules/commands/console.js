module.exports.config = {
    name: "console",
    version: "1.0.0",
    hasPermssion: 3,
    credits: "???",//Mod by H.Thanh
    description: "",
    commandCategory: "Hệ thống",
    usages: "",
    cooldowns: 0
};
module.exports.handleEvent = async function ({ api, args, Users, event, Threads, utils, client }) {
    let { messageID, threadID, senderID, mentions } = event;
    const chalk = require('chalk');
     const moment = require("moment-timezone");
var time= moment.tz("Asia/Manila").format("LLLL");   
  const thread = global.data.threadData.get(event.threadID) || {};
  if (typeof thread["console"] !== "undefined" && thread["console"] == true) return;
  if (event.senderID == global.data.botID) return;
  var nameBox = global.data.threadInfo.get(event.threadID).threadName || "Name does not exist";
  var nameUser = await Users.getNameUser(event.senderID)
    var msg = event.body||"Photos, videos or special characters";
    var job = ["f7f49c", "fcd553", "cbfc4e", "97fc4e", "4efc8e", "4efcbd", "4ec8fc", "4e91fc", "a04efc", "fc4eeb", "f5788b"];
    var random = 
job[Math.floor(Math.random() * job.length)]      
    var random1 = job[Math.floor(Math.random() * job.length)]
   var random2 = job[Math.floor(Math.random() * job.length)]
  var random3 = job[Math.floor(Math.random() * job.length)]
    console.log(chalk.bold.hex("#" + random)(`Group name: ${nameBox}`) + "\n" + chalk.bold.hex("#" + random1)(`User name: ${nameUser}`) + "\n" + chalk.hex("#" + random2)(`Content: ${msg}`) + `\n` + chalk.hex("#" + random3)(`[ ${time} ]`) + `\n` + chalk.bold.hex("#9966CC")(`◆━━━━━━━━━━━ 𝙔𝙐𝙏𝙊 𝘽𝙊𝙏 ━━━━━━━━━━━━◆`)); 
}
module.exports.run = async function ({ api, args, Users, event, Threads, utils, client }) {
  
}