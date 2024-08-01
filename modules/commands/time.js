module.exports.config = {
  name: "time",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "TuanDz",
  description: "See the date and time",
  commandCategory: "Tools",
  usages: "",
  cooldowns: 0,
  dependencies: []
};

module.exports.run = async function ({ api, event, args, Currencies, Users }) {
  const moment = require("moment-timezone");
  var ngay = moment.tz('Asia/Manila').format('D/MM/YYYY');
  var gio = moment.tz('Asia/Manila').format('HH:mm:ss');
  var thu = moment.tz('Asia/Manila').format('dddd');
  if (thu == 'Sunday') thu = 'Sunday'
  if (thu == 'Monday') thu = 'Monday'
  if (thu == 'Tuesday') thu = 'Tuesday'
  if (thu == 'Wednesday') thu = 'Wednesday'
  if (thu == "Thursday") thu = 'Thursday'
  if (thu == 'Friday') thu = 'Friday'
  if (thu == 'Saturday') thu = 'Saturday'
  let name = await Users.getNameUser(event.senderID);
  return api.sendMessage(`🎀───── •🌸• ─────🎀\n👋 𝗛𝗲𝗹𝗹𝗼! ${name}\nㅤWish you a good day\nㅤ⏰ World Time: ${gio}\nㅤ📅 World Date: ${ngay} (${thu})\n🎀───── •🌸• ─────🎀`, event.threadID, event.messageID)
}