module.exports.config = {
  name: "request",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "",
  description: "request accepted",
  commandCategory: "Thông tin admin",
  usages: "adm",
  cooldowns: 5,
  dependencies: {
    "request":"",
    "fs-extra":"", 
    "axios":""
  }
};

module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
  var link = [
"https://media.wired.com/photos/5b6df22751297c21002b4536/master/pass/HackerBot.jpg",
  ];
  var callback = () => api.sendMessage({body:`「Bot」 request accepted`,attachment: fs.createReadStream(__dirname + "/cache/nah.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/nah.jpg")); 
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/nah.jpg")).on("close",() => callback());
   };