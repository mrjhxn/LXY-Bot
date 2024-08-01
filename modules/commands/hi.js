module.exports.config = {
	name: "hi",
	version: "1.0.1",
	hasPermssion: 2,
	credits: "ManhG",
	description: "",
	commandCategory: "Other",
	usages: "",
	cooldowns: 10,
	denpendencies: {
		"fs-extra": "",
		"request": ""
	}
};

module.exports.handleEvent = async ({
	event,
	api,
	Users
}) => {
	const fs = global.nodemodule["fs-extra"];
	var {
		threadID,
		messageID,
		body,
		senderID
	} = event;
	const thread = global.data.threadData.get(threadID) || {};
	if (typeof thread["hi"] !== "undefined" && thread["hi"] == false) return;

	let name = await Users.getNameUser(event.senderID);
	if (senderID == api.getCurrentUserID()) return;

	function out(data) {
		api.sendMessage(data, threadID, messageID)
	}

  var hicht = ["ako pa ba?", "G kaba sa kangkungan?", "miss u balik kana ah ah", "ang aesthetic mo ah", "baka walang magreply sayo ako nalang labeo", "ako nalang kasi", "ikaw naba ang icing sa ibabaw ng kapkeyk q?", "labeo mwahhhh", "wag mong kalimutan na kinalimutan kana HAHAHAH", "pandakkk", "crush ka daw nung admin","iniwan ka rin ba?","tapos ano? magiging friends tayo? lagi tayong mag-uusap mula umaga hanggang madaling araw? tas magiging close tayo? sa sobrang close natin nahuhulog na tayo sa isa't isa, tapos ano? liligawan moko? sasagutin naman kita. tas paplanuhin natin yung pangarap natin sa isa't isa, tapos mauuwi lng lahat sa heart break salamat nalang sa Hi mo!","tapos ano? may makikita kang iba. magsasawa ka na, iiwan mo na ako. tapos magmamakaawa ako sayo kasi mahal kita pero ano? wala kang gagawin, hahayaan mo lang akong umiiyak while begging you to stay. kaya wag na lang. thanks nalang sa hi mo."];
  var hellocht = hicht[Math.floor(Math.random() * hicht.length)];





  
  
var hichthi = ["Hello", "Haiii","Haloo","Hii","Heluuu","Hai"];
  var hellochthi = hichthi[Math.floor(Math.random() * hichthi.length)];

//https://RandomLinkAPI.richardretadaof.repl.co/anya
  
	//trả lời
	var msg = {
		body: `${hellochthi} ${name} ${hellocht}`,
		attachment: (await global.nodemodule["axios"]({
			url: (await global.nodemodule["axios"]('https://randomlinkapi.richardretadaof.repl.co/men')).data.data,
			method: "GET",
			responseType: "stream"
		})).data
	}
	// Gọi bot
	var arr = ["hi", "hello", "low", "Low helo", "Helu", "hai", "Hí", "loe", "haii"];
	arr.forEach(i => {
		let str = i[0].toUpperCase() + i.slice(1);
		if (body === i.toUpperCase() | body === i | str === body) return out(msg)
	});
};

module.exports.languages = {
	"vi": {
		"on": "Bật",
		"off": "Tắt",
		"successText": "hi thành công",
	},
	"en": {
		"on": "on",
		"off": "off",
		"successText": "hi success!",
	}
}

module.exports.run = async function({
	api,
	event,
	Threads,
	getText
}) {
	const {
		threadID,
		messageID
	} = event;
	let data = (await Threads.getData(threadID)).data;

	if (typeof data["hi"] == "undefined" || data["hi"] == true) data["hi"] = true;
	else data["hi"] = true;

	await Threads.setData(threadID, {
		data
	});
	global.data.threadData.set(threadID, data);
	return api.sendMessage(`${(data["hi"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
        }