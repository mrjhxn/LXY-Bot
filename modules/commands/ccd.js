module.exports.config = {
    name: "cccd",   
    version: "1.1.1", 
    hasPermssion: 0,
    credits: "DVB",
    description: "Create Fake cccd", 
    commandCategory: "DVFB",
    usages: "Name|Date of Birth|Gender|Residence",
    cooldowns: 5,
  dependencies: {tinyurl: ""}
};

const//////////////////////////////////////////////////////////////////////
  capi     = "https://s-api.richardretadaof.repl.co/api/fakecccd?", // API
  apikey   = "DVB",                                                      // API Key
  pathsave = __dirname + `/cache/banner.png`,                            // Lưu vào Cache
///////////// Hãy chỉnh msg theo ý bạn! ///////////////////////////////////
  msg1     = "You must Reply to the photo to get the image to create cccd!",
  msg2     = "Wrong image format!",
  msg3     = "Rendering images! Please wait a moment",
  msg4     = "Cccd here. Good luck to you";

module.exports.run = async function ({api,event,args}) {
const axios = require('axios');
const fs = require("fs-extra");
const qs = require("querystring");
const { threadID, messageID } = event;
if ("message_reply" !== event.type) return api.sendMessage(msg1,threadID,messageID);
if (!event.messageReply.attachments || 0 == event.messageReply.attachments.length)
  return api.sendMessage(msg2,threadID,messageID);
var urlimg = await global.nodemodule.tinyurl.shorten(event.messageReply.attachments[0].url);
const content = args.join(" ").split("|").map(item => item = item.trim());
const text1 = content[0],text2 = content[1],text3 = content[2],text4 = content[3];
let params = {apikey,text1,text2,text3,text4,urlimg};
    params = qs.stringify(params);
  api.sendMessage(msg3,threadID,messageID);
var inimg = await axios.get(capi + params,{responseType:"stream"});
  return api.sendMessage({body:msg4,attachment:inimg.data},threadID,messageID)};
module.exports.languages = {"en": {}}                                   // Chống báo nỗi languages!