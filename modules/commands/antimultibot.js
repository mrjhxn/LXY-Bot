module.exports.config = {
  name: 'antimultiplebot',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'Chard',
  description: 'Anti Multiple bot in GC',
  commandCategory: 'noprefix',
  usages: '',
  cooldowns: 0,
  denpendencies: {},
}

module.exports.handleEvent = async ({ event: o, api: t, Users: n}) => {
  if (global.config.AntiMultipleBot == true) {
	var { threadID: e, messageID: a, body: b, senderID: s, reason: d } = o;
	const i = require("moment-timezone").tz("Asia/Manila").format("HH:MM:ss L");
	if (s == t.getCurrentUserID()) return;
	let c = await n.getNameUser(o.senderID);
	var h = {
		body: `==== 𝗔𝗡𝗧𝗜 𝗠𝗨𝗟𝗧𝗜𝗣𝗟𝗘 𝗕𝗢𝗧 ====\n\nName: ${c}\nReason: Multiple Bot\n\nAuto leave for Anti Multiple Bots.`
	};
    //Add curse words without capital letters
	["your keyboard hero level has reached level"].forEach((a => {
        const s = o.senderID;
    let str = o.body.toString();
	if (str.includes("your keyboard hero level has reached level") 
      || str.includes("The command you used doesn't exist, is that") 
      || str.includes("Im here senpai!") 
      || str.includes("Bot Notify 🇵🇭 Philippines") 
      || str.includes("Random bible verse every 60 minutes") 
      || str.includes("Random Fact every 60 minutes") 
      || str.includes("You have no permission to use command") 
      || str.includes("Page Cmds") 
      || str.includes("Random Bible Verse Per Hour") 
      || str.includes("It's 9:00PM time to sleep Goodnight everyone") 
      || str.includes("remove this message") 
      || str.includes("unsent this message") 
      || str.includes("removed 1 message") 
      || str.includes("Command not found")
      || str.includes("unsent this photo") 
      || str.includes("Reason: left the group") 
      || str.includes("Reason:Left the group.") 
      || str.includes("just removed 1 Attachments") 
      || str.includes("just removed 2 Attachments") 
      || str.includes("just removed 3 Attachments") 
      || str.includes("just removed 4 Attachments") 
      || str.includes("just removed 5 Attachments") 
      || str.includes("just removed 6 Attachments") 
      || str.includes("just removed 7 Attachments") 
      || str.includes("just removed 8 Attachments") 
      || str.includes("just removed 9 Attachments") 
      || str.includes("Update user nicknames")
      || str.includes("»» NOTICE ««")
      || str.includes("𝘀𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆 𝗰𝗼𝗻𝗻𝗲𝗰𝘁𝗲𝗱")
      || str.includes("member of this group")
      || str.includes("OTHERBOT DETECTED")
      || str.includes("My Prefix Is")
      || str.includes("Connected successfully!")
      || str.includes("Unable to re-add members")
      || str.includes("Module code by")
      || str.includes("Update the group name to")
      || str.includes("Active antiout mode")
      || str.includes("ang iyong kapangitan ay umabot na level")
      || str.includes("BOT CHECK :status")
      || str.includes("Oh it's already 8:00 pm, I need to charge")
      || str.includes("message removedcontent")
      || str.includes("UPDATE GROUP")
      || str.includes("Updated user alias")
      || str.includes("providing service in this group")
      || str.includes("nasa level na")
      || str.includes("members of this groupchat")
      || str.includes("_Notification from MainSever_")
     ) {
			modules = "[ BOT BAN ]", console.log(c, modules, a);
			const o = n.getData(s).data || {};
      
			n.setData(s, {
				data: o
			})/*, o.banned = 1, o.reason = a || null, o.dateAdded = i, global.data.userBanned.set(s, {reason: o.reason,dateAdded: o.dateAdded})*/, t.sendMessage(h, e, (() => {
				const o = global.config.ADMINBOT;
				var n = o;
				for (var n of o) t.sendMessage(`== 𝗔𝗡𝗧𝗜 𝗠𝗨𝗟𝗧𝗜𝗣𝗟𝗘 𝗕𝗢𝗧 ==\n\nName: ${c}\nUID: ${s}\nGC NAME: ${global.data.threadInfo.get(e).threadName}\nTID: ${e}\nLeave on Server`, n)

t.changeBlockedStatus(s, true);
t.removeUserFromGroup(`${t.getCurrentUserID()}`, e);

			}))
        
		} //d == b
	})) //for each 

}

}, module.exports.run = async ({
	event: o,
	api: t
}) => t.sendMessage("", o.threadID);