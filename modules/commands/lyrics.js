module.exports.config = {
  name: "lyrics",
  version: "20.0.0",
  hasPermssion: 0,
  credits: "John Lester",
  description: "View lyrics with metadata",
  commandCategory: "media",
  usages: "[name of the song]",
  cooldowns: 30
};
module.exports.run = async function ({ api, args, event }) {
  const chalk = require("chalk");
  const axios = require("axios");
  const fs = require("fs")
  const request = require("request")
 await axios.get(`https://api.popcat.xyz/lyrics?song=${args.join(" ")}`).then(res => {
console.log(chalk.hex("#00FF00")(res.data.lyrics))
  let callback = function () {
          api.sendMessage({
            body: `${res.data.lyrics}`,
            attachment: fs.createReadStream(__dirname + `/data/lyrics.jpg`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/data/lyrics.jpg`), event.messageID);
    api.setMessageReaction("🎼", event.messageID, (err) => {}, true)
        };
        request(encodeURI(res.data.image)).pipe(fs.createWriteStream(__dirname + `/data/lyrics.jpg`)).on("close", callback);
      })
}