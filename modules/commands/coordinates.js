const request = require('request');

module.exports.config = {
  name: "coordinates",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "BerVer",
  description: "See the coordinates where the spaceship is wandering",
  commandCategory: "news",
  usages: "iss",
  cooldowns: 5,
  dependencies: {
    "request": ""
  }
};

module.exports.run = function({
  api,
  event,
  args,
  client,
  __GLOBAL
}) {
  return request(`http://api.open-notify.org/iss-now.json`, (err, response, body) => {
    if (err) throw err;
    var jsonData = JSON.parse(body);
    api.sendMessage(`Current location of International Space Station 🌌🌠🌃\n► Latitude: ${jsonData.iss_position.latitude}\n► Longitude: ${jsonData.iss_position.longitude}`, event.threadID, event.messageID);
  });
}