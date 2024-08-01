module.exports.config = {
	name: "ip",	
	version: "1.0.0", 
	hasPermssion: 0,
	credits: "NTKhang",
	description: "Xem thông tin ip của bạn hoặc ip khác", 
	commandCategory: "Công Cụ",
	usages: "",
	cooldowns: 5, 
	dependencies: "",
};

module.exports.run = async function({ api, args, event, __GLOBAL }) {
  const timeStart = Date.now();
  
    const axios = require("axios");
  if (!args[0]) {api.sendMessage("Please enter the ip you want to check",event.threadID, event.messageID);}
  else {
var infoip = (await axios.get(`http://ip-api.com/json/${args.join(' ')}?fields=66846719`)).data;
       if (infoip.status == 'fail')
         {api.sendMessage(`Error! An error occurred. Please try again later: ${infoip.message}`, event.threadID, event.messageID)}
          else {
            /////////////////
          //////////////////
 api.sendMessage({body:`======${(Date.now()) - timeStart}ms=====
 🗺️Continents: ${infoip.continent}
🏳️Country: ${infoip.country}
🎊CountryCode: ${infoip.countryCode}
🕋Region: ${infoip.region}
⛱️RegionName: ${infoip.regionName}
🏙️city: ${infoip.city}
🛣️district: ${infoip.district}
📮Zip: ${infoip.zip}
🧭lat: ${infoip.lat}
🧭lon: ${infoip.lon}
⏱️Timezone: ${infoip.timezone}
👨‍✈️Org: ${infoip.org}
💵Currency: ${infoip.currency}
`,location: {
				latitude: infoip.lat,
				longitude: infoip.lon,
				current: true
			}}
,event.threadID, event.masageID);}
        }
    
                  }

  
  
  
  
  
  
  