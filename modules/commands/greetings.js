module.exports.config = {
	name: "greet",
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
	if (typeof thread["greet"] !== "undefined" && thread["greet"] == false) return;

	let name = await Users.getNameUser(event.senderID);
	if (senderID == api.getCurrentUserID()) return;

	function out(data) {
		api.sendMessage(data, threadID, messageID)
	}

  var morning = ["Goodmorning!", "Goodmorning don't forget to eat your breakfast <3"];
  var rdmmorning = morning[Math.floor(Math.random() * morning.length)];

  var noon = ["Goodafternoon!", "Goodaftieee","Lamon na!!!","tara kain us","aftieeee, wag na kumain magugutom din naman.","Goodaftieee mwaaahh"];
  var rdmnoon = noon[Math.floor(Math.random() * noon.length)];

  var evening = ["Goodevening!", "Kumain ka naba? kung hindi edi don't","Evening mwaaah","Goodeve HAHAHAHA","GOODEVENING, Ako na nalang mag gogoodeve labyu mwahhh"];
  var rdmevening = evening[Math.floor(Math.random() * evening.length)];
  
  var night = ["Goodnight", "Goodnight sleep kana mwahhh!","Goodnight mwahhhh","Goodnight!!! ang aga mo naman matulog"];
  var rdmnight = night[Math.floor(Math.random() * night.length)];

  
var hichthi = ["Hello", "Haiii","Haloo","Hii","Heluuu","Hai"];
  var hellochthi = hichthi[Math.floor(Math.random() * hichthi.length)];


  
	//trả lời
	var msg = {
		body: `${hellochthi} ${name} ${rdmmorning}`,
		attachment: (await global.nodemodule["axios"]({
			url: (await global.nodemodule["axios"]('https://RandomLinkAPI.richardretadaof.repl.co/anya')).data.data,
			method: "GET",
			responseType: "stream"
		})).data
	};

  var msg1 = {
		body: `${hellochthi} ${name} ${rdmnoon}`,
		attachment: (await global.nodemodule["axios"]({
			url: (await global.nodemodule["axios"]('https://RandomLinkAPI.richardretadaof.repl.co/anya')).data.data,
			method: "GET",
			responseType: "stream"
		})).data
	};

  var msg2 = {
		body: `${hellochthi} ${name} ${rdmevening}`,
		attachment: (await global.nodemodule["axios"]({
			url: (await global.nodemodule["axios"]('https://RandomLinkAPI.richardretadaof.repl.co/anya')).data.data,
			method: "GET",
			responseType: "stream"
		})).data
	};

  var msg3 = {
		body: `${hellochthi} ${name} ${rdmnight}`,
		attachment: (await global.nodemodule["axios"]({
			url: (await global.nodemodule["axios"]('https://RandomLinkAPI.richardretadaof.repl.co/anya')).data.data,
			method: "GET",
			responseType: "stream"
		})).data
	};
  
	// Gọi bot
	var arr = ["morning", "goodmorning", "good morning", "magandang umaga"];
	arr.forEach(i => {
		let str = i[0].toUpperCase() + i.slice(1);
		if (body === i.toUpperCase() | body === i | str === body) return out(msg)
	});
  
  var arr1 = ["afternoon", "goodafternoon", "good afternoon", "magandang tanghali"];
	arr1.forEach(i => {
		let str = i[0].toUpperCase() + i.slice(1);
		if (body === i.toUpperCase() | body === i | str === body) return out(msg1)
	});


  var arr2 = ["evening", "goodevening", "good evening", "magandang gabi"];
	arr2.forEach(i => {
		let str = i[0].toUpperCase() + i.slice(1);
		if (body === i.toUpperCase() | body === i | str === body) return out(msg2)
	});


  var arr3 = ["night", "goodnight", "good night"];
	arr3.forEach(i => {
		let str = i[0].toUpperCase() + i.slice(1);
		if (body === i.toUpperCase() | body === i | str === body) return out(msg3)
	});
};

module.exports.languages = {
	"vi": {
		"on": "Bật",
		"off": "Tắt",
		"successText": "greet thành công",
	},
	"en": {
		"on": "on",
		"off": "off",
		"successText": "greet success!",
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

	if (typeof data["greet"] == "undefined" || data["greet"] == true) data["greet"] = true;
	else data["greet"] = true;

	await Threads.setData(threadID, {
		data
	});
	global.data.threadData.set(threadID, data);
	return api.sendMessage(`${(data["greet"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
        }