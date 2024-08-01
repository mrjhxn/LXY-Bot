module.exports.config = {
	name: "avtidlist",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Plue",
	description: "avt id list",
	commandCategory: "word",
	cooldowns: 1
};

module.exports.run = async ({ api, event,args }) => {
const axios = global.nodemodule["axios"];
let id = args.join(" ");
const res = await axios.get(`https://www.nguyenmanh.name.vn/api/searchAvt?key=${id}`);
  var  resname  =  res.data.result.name;
  var  resid  =  res.data.result.ID;
  var  rescol  =  res.data.result.color;

  
return api.sendMessage(`Name: ${resname}\nId: ${resid}\nColor: ${rescol}\n\nId list 1-820`, event.threadID, event.messageID)
}