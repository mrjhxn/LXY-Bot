module.exports.config = {
	name: "cony",
	version: "1.0.1", 
	hasPermssion: 0,
	credits: "⚡D-Jukie",
	description: "Your Ny rate this year",
	commandCategory: "Trò Chơi", 
	usages: "", 
	cooldowns: 0,
	dependencies: 
	{
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};
module.exports.run = async function({ api,event,args,client,Users,Threads,__GLOBAL,Currencies }) {

    var tle = Math.floor(Math.random() * 101);
    var name = (await Users.getData(event.senderID)).name
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
  var link = [
"https://i.imgur.com/AM8dK12.gif",
"https://i.imgur.com/aNl8mIb.gif",
"https://i.imgur.com/UCmHAty.gif",
"https://i.imgur.com/MFaeP78.gif",
"https://i.postimg.cc/xjGxQfqW/Damp-Offbeat-Cuckoo-size-restricted.gif",
"https://i.postimg.cc/L5SxP7QC/Fg-SQXwn-U0-GEln-Z3-SNg-HOi-ECx7-Toh-P3-Mu-Hfavsfw-WZKXI0-Uo2-MDt-LQvn-KATQs-HDiv-WMX-e-BFwkcd-Av-QLk1-IIVd-Gd-Orn-QF2ip135q.gif",
"https://i.postimg.cc/hGHyDhLq/tumblr-06326cc87c2807008891104ee22ed943-0fd2e4f6-540.gif",
"https://i.postimg.cc/XvZ169y8/tumblr-60453c020ab1a1220e18395b0b7b2d58-937b2e9f-540.gif",
"https://i.postimg.cc/ZKTfKGd0/tumblr-e4f1fec723d0760d84f6557adcafd19c-3187d901-540.gif",
];
  var callback = () => api.sendMessage({body:`⚡congratulations ${name}\n⚡The bot has predicted your odds of having a lover this year is ${tle}% ❤`,attachment: fs.createReadStream(__dirname + "/cache/5.gif")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/5.gif")); 
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/5.gif")).on("close",() => callback());
   };