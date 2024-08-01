module.exports.config = {
    name: 't01',
    version: '10.02',
    hasPermssion: 0,
    credits: 'DC-Nam', // Bok idea thời tiết
    description: 'Automatically send messages according to the set time!',
    commandCategory: 'Nhóm messenger',
    usages: '[]',
    cooldowns: 3
};
const nam = [{
    timer: '10:00:00 AM',
    message: ['\n{abc}']
},
    {

    timer: '8:00:00 AM',
    message: ['\n{abc}']
},
             {
    timer: '6:00:00 AM',
    message: ['\n{abc}']
},
    {
    timer: '8:30:00 PM',
    message: ['\n{abc}']
},
             {
    timer: '6:00:00 PM',
    message: ['\n{abc}']
},
             {
    timer: '4:00:00 PM',
    message: ['\n{abc}']
},
    {
    timer: '2:00:00 PM',
    message: ['\n{abc}']
},
    {
    timer: '12:00:00 PM',
    message: ['\n{abc}']
},
             {
    }];
module.exports.onLoad = o => setInterval(async() => {
    const r = a => a[Math.floor(Math.random()*a.length)];
    if (á = nam.find(i => i.timer == new Date(Date.now()+25200000).toLocaleString().split(/,/).pop().trim())){
  const axios = require('axios');
const time = process.uptime();
		 var hours = Math.floor(time / (60 * 60));
		var minutes = Math.floor((time % (60 * 60)) / 60);
	var seconds = Math.floor(time % 60);
  var msg = r(á.message);
  const res = await axios.get(`https://api.popcat.xyz/weather?q=${encodeURI('Manila')}`);
    var abc =`===「 NEWS 」===\n━━━━━━━━━━━━━━\n→ weather updates in ${res.data[0].location.name}\n→ Date: ${res.data[0].current.day} ${res.data[0].current.date}\n→temperature: ${res.data[0].current.temperature}°${res.data[0].location.degreetype}\n→ Desc: ${res.data[0].current.skytext}\n→ Humidity: ${res.data[0].current.humidity}\n→ Winddisplay: ${res.data[0].current.winddisplay}\n→ Observationtime: ${res.data[0].current.observationtime} 𝗧𝘂̛̀ 𝘁𝗿𝗮̣𝗺 𝘃𝘂̃ 𝘁𝗿𝘂̣ 𝗻𝗮𝘀𝗮 🧸`;
    msg = msg.replace(/{abc}/,abc);
msg = msg.replace(/{hours}/g, hours)
  msg = msg.replace(/{minutes}/g, minutes)
  msg = msg.replace(/{seconds}/g, seconds)
    msg = msg.replace(/{time}/g, require("moment-timezone").tz("Asia/Manila").format("HH:mm:ss (D/MM/YYYY) (dddd)")).replace(/{thinh}/g, (await axios.get(`https://chinle-api.herokuapp.com/poem`)).data.data)
            msg = {
                body: msg, attachment: (await axios.get((await axios.get(`https://randomlinkapi.haiphung2.repl.co/animevd`)).data.data, {
                    responseType: 'stream'
                })).data
            };
   global.data.allThreadID.forEach(i => o.api.sendMessage(msg, i));
    };
}, 1000);

module.exports.run = async o => {
  try{
  const axios = global.nodemodule["axios"];
  const fs = global.nodemodule["fs-extra"];
  const request = global.nodemodule["request"];
  const { api, event, args } = o;
	const { threadID, messageID } = event;
  var bok = args.join(" ");
  if(!bok) return api.sendMessage("Enter the province/city to see the weather", threadID);
  const res = await axios.get(`https://api.popcat.xyz/weather?q=${encodeURI(bok)}`);
  const bokk = res.data[0].forecast;
  var text = `Weather of: ${bok} on days`;
  for (let i = 0; i < 5; i++) {
    text += `\n${i+1}-> ${bokk[i].day} ${bokk[i].date}\n=>Forecast temperature: from ${bokk[i].low} to ${bokk[i].high}\n=>Description: ${bokk[i].skytextday}\n=>Rain rate: ${bokk[i].precip}\n`
  };
  api.sendMessage(text, threadID, messageID)
  }catch(err){api.sendMessage(`${err}`, threadID)}
  }