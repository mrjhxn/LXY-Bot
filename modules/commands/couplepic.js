module.exports.config = {
  name: "couplepic",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Plue",
  description: "Couple Pic",
  commandCategory: "image",
  usages: "",
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
    axios.get(`https://nguyen-chard-api.joshuag06.repl.co/api/randomgambar/couplepp`).then(res =>
    {
      var result1 = res.data.result.male;
      var result2 = res.data.result.female;
      
      let callback = function ()
      {
        var imglove = [];
              imglove.push(fs.createReadStream(__dirname + "/cache/covidtk1.png"));
              imglove.push(fs.createReadStream(__dirname + "/cache/covidtk2.png"));
        
        var msg = {attachment: imglove};
        
      return api.sendMessage(msg, event.threadID, event.messageID);
        
      };

      request(encodeURI(result1)).pipe(fs.createWriteStream(__dirname + `/cache/covidtk1.png`)).on("close", callback);
request(encodeURI(result2)).pipe(fs.createWriteStream(__dirname + `/cache/covidtk2.png`)).on("close", callback);
      
    })
  
}