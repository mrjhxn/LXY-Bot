module.exports.config = {
	name: "null",
	version: "1.0.9",
	hasPermssion: 0,
	credits: "Plue",
	description: "Search result for a Bulk Link & Title",
	commandCategory: "ai",
	usages: "Search",
	cooldowns: 5
};

module.exports.run = async ({ api, event,args }) => {
const axios = global.nodemodule["axios"];
  const serp = require("serp");
  let text = args.toString().replace(/,/g,  '  ');
  var options = {
  host : "google.fr",
  qs : {
    q : `${text}`,
    filter : 0,
    pws : 0
  },
  num : 10
};
const links = await serp.search(options);
return api.sendMessage(JSON.stringify(links,null,"\t"),event.threadID)
}