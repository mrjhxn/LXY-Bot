module.exports.config = {
    name: "userinfo",
    version: "1.0.0",
    hasPermision: 0,
    usages: "reply or mention",
    credit: "Plue",
    description: "get info",
    commandCategory: "random-img",
    cooldowns: 0,
};

module.exports.run = async function({api, event, args, utils, Users, Threads}) {
    try {
        let axios = require('axios');
        let fs = require("fs-extra");
        let request = require("request");
        let {threadID, senderID, messageID} = event;
        var uid = args.join(" ");
         if (!args[0]) { var uid = senderID}
  if(event.type == "message_reply") { uid = event.messageReply.senderID }
  if (args.join().indexOf('@') !== -1){ var uid = Object.keys(event.mentions) } 
	const res = await api.getUserInfoV2(uid); 
   var gender = res.gender == 'male' ? "Male" : res.gender == 'female' ? "Female" : "Not found";
    var birthday = res.birthday == 'Không Có Dữ Liệu' ? "Not found" : res.birthday ? `${res.birthday}`: "Not Found";
    var love = res.relationship_status == 'Không Có Dữ Liệu' ? "Private" : res.relationship_status ? `${res.relationship_status}`: "Not Found";
    var location = res.location.name ? `${res.location.name}`: "Private";
    var hometown = res.hometown.name ? `${res.hometown.name}` : "Private";
    var follow = res.follow == 'Không Có Dữ Liệu' ? "None" : res.follow ? `${res.follow}` : "Private";
    var usern = res.username == 'Không Có Dữ Liệu' ? "None" : res.username ? `${res.username}` : "Private";
    var first_name = res.first_name == 'Không Có Dữ Liệu' ? "None" : res.first_name ? `${res.first_name}` : "Private";

	let callback = function() {
            return api.sendMessage({
                body:`𝗕𝗔𝗦𝗜𝗖 𝗜𝗡𝗙𝗢\n\n❖━━━━━━━━━━━━❖\n► 𝐍𝐢𝐜𝐤𝐍𝐚𝐦𝐞: ${first_name}\n► 𝐅𝐮𝐥𝐥 𝐍𝐚𝐦𝐞: ${res.name}\n► 𝐁𝐢𝐫𝐭𝐡𝐝𝐚𝐲: ${birthday}\n► 𝐆𝐞𝐧𝐝𝐞𝐫: ${gender}\n► 𝐔𝐈𝐃: ${uid}\n► 𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧𝐬𝐡𝐢𝐩: ${love}\n► 𝐅𝐨𝐥𝐥𝐨𝐰𝐞𝐫𝐬: ${follow}\n► 𝐋𝐨𝐜𝐚𝐭𝐢𝐨𝐧: ${location}\n► 𝐇𝐨𝐦𝐞𝐭𝐨𝐰𝐧: ${hometown}\n► 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐮𝐬𝐞𝐫𝐧𝐚𝐦𝐞: ${usern}\n► 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐔𝐑𝐋: ${res.link}\n❖━━━━━━━━━━━━❖`,
                attachment: fs.createReadStream(__dirname + `/cache/image.png`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/image.png`), event.messageID);
        };
		return request(encodeURI(res.avatar)).pipe(fs.createWriteStream(__dirname + `/cache/image.png`)).on("close", callback);
		} catch (err) {
        console.log(err)
        return api.sendMessage(`Error`, event.threadID)
    }
     }