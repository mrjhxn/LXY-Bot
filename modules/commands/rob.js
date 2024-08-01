const cc = 33 // Success rate :>
module.exports.config = {
	name: "rob",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Khoa",
	description: "Rob a Person",
	commandCategory: "Money",
	usages: "@tag",
	cooldowns: 60
};

module.exports.run = async function({ api, event, Users, Threads, Currencies }) {
  var { threadID, messageID, senderID } = event;
  const data1 = await Currencies.getData(senderID);
  const money1 = data1.money;
  if (money1 < 1000 || isNaN(money1)) return api.sendMessage(`You must have at least $1000 to be able to steal!`, threadID, messageID);
  var mention = Object.keys(event.mentions)[0];
  if (!mention) return api.sendMessage(`Please mention a person to steal`, threadID, messageID);
 const botID = api.getCurrentUserID();
   if (mention == botID) return api.sendMessage("You are not allowed to steal bots -.-", threadID, messageID);
  var name = await Users.getNameUser(mention);
  const data2 = await Currencies.getData(mention);
  const money2 = data2.money;
  if (money2 < 1 || isNaN(money2)) return api.sendMessage(`Target ${name} is poor person`, threadID, messageID);
  var tile = Math.floor(Math.random() * 100) + 1;
  
  if (tile < cc) {
    if (money2 < 10000) {var phan = 4} else {var phan = 8};
    var sotien = Math.floor(Math.random() * money2/phan) + 1;
    Currencies.increaseMoney(senderID, sotien);
    Currencies.decreaseMoney(mention, sotien);
    return api.sendMessage(`You have successfully robbed ${sotien}$ name ${name}`, threadID, messageID);
  }
  else {
    if (money1 < 10000) {var phan = 4} else {var phan = 8};
    var sotienmat = Math.floor(Math.random() * money1/phan) + 1;
    Currencies.decreaseMoney(senderID, sotienmat);
    Currencies.increaseMoney(mention, sotienmat);
    return api.sendMessage(`You robbed ${name} but you got defeated and lose ${sotienmat} $`, threadID, messageID);
  }
}