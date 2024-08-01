module.exports.config={
name:"prefix",
version:"1.0.0",
hasPermssion:0,
credits:"ManhG",
description:"See the prefix of BOT",
commandCategory:"tiện ích",
usages:"",
cooldowns:5
},

module.exports.handleEvent=async({event:e,api:a,Threads:n})=>{var{threadID:o,messageID:r,body:s,senderID:t}=e;if("ManhG"!=this.config.credits)return a.sendMessage("Sai credits!",o,r);function i(e){a.sendMessage(e,o,r)}var d=(await n.getData(o)).data;const p=global.data.threadData.get(parseInt(o))||{};["mpre","mprefix","prefix","dấu lệnh","What is the prefix of the bot?","daulenh"].forEach((e=>{let a=e[0].toUpperCase()+e.slice(1);if(s===e.toUpperCase()|s===e|a===s){const e=p.PREFIX||global.config.PREFIX;return null==d.PREFIX?i(`╭┈ ❒ [ ${e} ] - Global Prefix\n╰┈➤ The group has not set a new prefix for the bot yet`):i("❒ The group prefix is: "+d.PREFIX)}}))},module.exports.run=async({event:e,api:a})=>a.sendMessage("❒ Do you know if this is a Noprefix command?",e.threadID);