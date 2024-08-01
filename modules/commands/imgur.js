module.exports.config = {
    name: "imgur",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "chard",
    description: "Upload image through imgur and get link",
    commandCategory: "group",
    usages: "reply image or use link",
    cooldowns: 30,
	dependencies: {
  "axios": "",}
};

module.exports.run = async ({ api, event }) => {
const axios = global.nodemodule['axios'];  
var linkanh = event.messageReply.attachments[0].url || args.join(" ");
	if(!linkanh) return api.sendMessage('Please reply or enter a link 1 picture!!!', event.threadID, event.messageID)
const res = await axios.get(`https://chardsbot-api.joshuag06.repl.co/imgur?link=${encodeURIComponent(linkanh)}`);    
var img = res.data.uploaded.image;
    return api.sendMessage(`${img}`, event.threadID, event.messageID);
	
}