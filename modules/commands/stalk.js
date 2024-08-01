module.exports.config = {
    name: "stalk",
    version: "1.0.0",
    hasPermision: 0,
    usages: "reply or mention",
    credit: "Plue",
    description: "get info",
    commandCategory: "random-img",
    cooldowns: 0,
};

const translateRelationshipStatus = (relationshipStatus) => {
    switch (relationshipStatus) {
        case 'Độc thân':
            return 'Single';
        case 'Có mối quan hệ phức tạp':
            return 'It\'s complicated';
        case 'Đang hẹn hò':
            return 'In a relationship';
        case 'Đã kết hôn':
            return 'Married';
        case 'Đã ly hôn':
            return 'Divorced';
        case 'Đang ly thân':
            return 'Separated';
        case 'Quan hệ mở':
            return 'Open relationship';
        case 'Đã envi xảy ra':
            return 'Widowed';
        default:
            return relationshipStatus;
    }
};

module.exports.run = async function({ api, event, args, utils, Users, Threads }) {
    try {
        const moment = require("moment");
        let axios = require('axios');
        let fs = require("fs-extra");
        let request = require("request");
        let { threadID, senderID, messageID } = event;
        var uid = args.join(" ");
        if (!args[0]) { var uid = senderID }
        if (event.type == "message_reply") { uid = event.messageReply.senderID }
        if (args.join().indexOf('@') !== -1) { var uid = Object.keys(event.mentions) }
        const res = await axios.get(`https://www.nguyenmanh.name.vn/api/fbInfo?id=${uid}&apikey=LV7LWgAp`);
        const dt = await axios.get(`https://golike.com.vn/func-api.php?user=${uid}`);
        var data = res.data.result;
        var gender = data.gender == 'Nam' ? "Male" : data.gender == 'Nữ' ? "Female" : "Unknown";
        var birthday = data.birthday == "private" ? "Unknown" : data.birthday;
        var love = data.relationship == "private" ? "Unknown" : translateRelationshipStatus(data.relationship);
        var location = data.location == "private" ? "Unknown" : data.location;
        var hometown = data.hometown == "private" ? "Unknown" : data.hometown;
        var follow = data.follow == "None" ? "Unknown" : data.follow;
        var usern = data.vanity == "not set" ? "not set" : data.vanity;
        var first_name = data.firstName;
        
const d_t = moment(dt.data.data.date, "HH:mm DD/MM/YYYY").format("h:mm A, MMMM DD, YYYY");
const timeString = "𝐉𝐨𝐢𝐧 𝐓𝐢𝐦𝐞: " + d_t.split(", ")[0];
const dateString = "𝐉𝐨𝐢𝐧 𝐃𝐚𝐭𝐞: " + d_t.split(", ")[1] + d_t.split(",")[2];

      
        let callback = function () {
  return api.sendMessage({
    body: `𝗕𝗔𝗦𝗜𝗖 𝗜𝗡𝗙𝗢\n\n❖━━━━━━━━━━━━❖\n► 𝐍𝐢𝐜𝐤𝐍𝐚𝐦𝐞: ${first_name}\n► 𝐅𝐮𝐥𝐥 𝐍𝐚𝐦𝐞: ${data.name}\n► 𝐁𝐢𝐫𝐭𝐡𝐝𝐚𝐲: ${birthday}\n► 𝐆𝐞𝐧𝐝𝐞𝐫: ${gender}\n► 𝐔𝐈𝐃: ${uid}\n► 𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧𝐬𝐡𝐢𝐩: ${love}\n► 𝐅𝐨𝐥𝐥𝐨𝐰𝐞𝐫𝐬: ${follow}\n► 𝐋𝐨𝐜𝐚𝐭𝐢𝐨𝐧: ${location}\n► 𝐇𝐨𝐦𝐞𝐭𝐨𝐰𝐧: ${hometown}\n► 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐮𝐬𝐞𝐫𝐧𝐚𝐦𝐞: ${usern}\n► 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐔𝐑𝐋: ${data.profileUrl}\n► ${timeString}\n► ${dateString}\n❖━━━━━━━━━━━━❖`,
    attachment: fs.createReadStream(__dirname + `/cache/image.png`)
  }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/image.png`), event.messageID);
};
        return request(encodeURI(data.thumbSrc)).pipe(fs.createWriteStream(__dirname + `/cache/image.png`)).on("close", callback);
    } catch (err) {
        console.log(err)
        return api.sendMessage(`Error`, event.threadID)
    }
}
