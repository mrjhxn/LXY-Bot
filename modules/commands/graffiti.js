module.exports.config = {
  name: "graffiti1",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Plue",
  description: "text generator",
  commandCategory: "image",
  usages: "[text]",
  cooldowns: 5
};

module.exports.run = async (
{
  api,
  event,
  args
}) =>
{
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  var test = args.join(" ");
  if (!test) return api.sendMessage(`Add text lmao`, event.threadID, event.messageID);
  else
  {
    var msg3 = {
		body: "== RESULT ==",
		attachment: (await global.nodemodule["axios"]({
			url: `https://chards-bot-api.richardretada.repl.co/api/textpro/graffiti1?text=${test}`,
			method: "GET",
			responseType: "stream"
		})).data
	};

    return api.sendMessage(msg3, event.threadID, event.messageID)
  }
}

//https://textpro.me/create-3d-sci-fi-text-effect-online-1050.html