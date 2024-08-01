module.exports.config = {
	name: "elements",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Joshua Sy",
	description: "search elements",
	commandCategory: "code",
	cooldowns: 1
};

module.exports.run = async ({ api, event,args }) => {
const axios = global.nodemodule["axios"];
let element = args.join(" ");
const res = await axios.get(`https://api.popcat.xyz/periodic-table?element=${element}`);
  
var  name  =  res.data.name;
var  symbol  =  res.data.symbol;
var  atomic_number  =  res.data.atomic_number;
var  atomic_mass  =  res.data.atomic_mass;
var  period  =  res.data.period;
var  phase  =  res.data.phase;
var  discovered_by  =  res.data.discovered_by;
var  summary =  res.data.summary; 

  return api.sendMessage(`=== ELEMENTS ===\n► Name: ${name}\n► Symbol:${symbol}\n► Atomic Number:${atomic_number}\n► Atomic Mass: ${atomic_mass}\n► Period: ${period}\n► Phase: ${phase}\n► Discovered by: ${discovered_by}\n► Summary: ${summary}`, event.threadID, event.messageID)

}