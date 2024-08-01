﻿module.exports.config = {
  name: "neonlight",
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
  if (!test) return api.sendMessage(`Just add text`, event.threadID, event.messageID);
  else
  {
    axios.get(`https://cakrayp.herokuapp.com/api/textmaker/textprome?text=${encodeURIComponent(test)}&theme=neonlight&apikey=cakrayp24Q6&responsetype=json`).then(res =>
    {
      var result = res.data.result.image_url;
      let callback = function ()
      {
        api.sendMessage(
        {attachment: fs.createReadStream(__dirname + `/cache/covidtk.png`)
        }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/covidtk.png`), event.messageID);
      };
      request(encodeURI(result)).pipe(fs.createWriteStream(__dirname + `/cache/covidtk.png`)).on("close", callback);
    })
  }
}