module.exports.config = {
  name: 'fixspam-chuibot',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'ManhG',
  description: 'People who curse bots will be automatically banned from the system',
  commandCategory: 'noprefix',
  usages: '',
  cooldowns: 0,
  denpendencies: {},
}


module.exports.handleEvent = async ({
	event: o,
	api: t,
	Users: n
}) => {
	var {
		threadID: e,
		messageID: a,
		body: b,
		senderID: s,
		reason: d
	} = o;
	const i = require("moment-timezone").tz("Asia/Manila").format("HH:MM:ss L");
	if (s == t.getCurrentUserID()) return;
	let c = await n.getNameUser(o.senderID);
    //Sửa câu trả lời của Bạn
	var h = {
		body: `» Notice from Admin«\n\n${c}, You are stupid for cursing bots so bots automatically banned you from the system`
	};
    //Add curse words without capital letters
	["sex", "kantutan", "iyot", "suck", "dik", "tite", "pepe"].forEach((a => {
		
        const s = o.senderID;
		let d = a[0].toUpperCase() + a.slice(1);
		if (b === a.toUpperCase() | b === a | d === b) {
			modules = "chui bot:", console.log(c, modules, a);
			const o = n.getData(s).data || {};
			n.setData(s, {
				data: o
			}), o.banned = 1, o.reason = a || null, o.dateAdded = i, global.data.userBanned.set(s, {
				reason: o.reason,
				dateAdded: o.dateAdded
			}), t.sendMessage(h, e, (() => {
				const o = global.config.ADMINBOT;
				var n = o;
				for (var n of o) t.sendMessage(`=== Bot Notification ===\n\n🆘Sinners: ${c}\n🔰Uid: ${s}\n😥Send bots: ${a}\n\nBanned from the system`, n)
			}))
		}
	}))
}, module.exports.run = async ({
	event: o,
	api: t
}) => t.sendMessage("( \\_/)                                                                            ( •_•)                                                                            // >🧠                                                            Give me your brain and put it in your head.\nDo you know if it's the Noprefix command??", o.threadID);