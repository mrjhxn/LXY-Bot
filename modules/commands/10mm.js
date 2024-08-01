module.exports.config = {
  name: "10mm",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "BLACK",
  description: "just get mail at 10mm",
  commandCategory: "Tools",
  usages: "",
  cooldowns: 2,
  dependencies: {"axios" : ""}
};
module.exports.run = async({api, event, args}) => {
	const axios = require('axios');
	if (args[0] == "new") {
		const res = await axios.get(`https://10minutemail.net/address.api.php?new=1`);
	var user = res.data.mail_get_user;
	var host = res.data.mail_get_host;
	var time = res.data.mail_get_time;
	var stime = res.data.mail_server_time;
	var kmail = res.data.mail_get_key;
	var ltime = res.data.mail_left_time;
	var mid = res.data.mail_list[0].mail_id;
var sub = res.data.mail_list[0].subject;
var date = res.data.mail_list[0].datetime2;
	return api.sendMessage(`» Email name: ${user}\n» Host: ${host}\n» Mail: ${user}@${host} (.)com\n» Time: ${time}\n» Time at the server: ${stime}\n» Key: ${kmail}\n» Time remaining: ${ltime}s\n» Email id: ${mid}\n» Content ${sub}\n» Date: ${date}`, event.threadID, event.messageID)
}
else if (args[0] == "list") {
	const res = await axios.get(`https://www.phamvandienofficial.xyz/mail10p/domain`);
	var list = res.data.domain
	return api.sendMessage(`List domain: \n${list}`, event.threadID, event.messageID)
}
else if (args[0] == "more") {
 const res = await axios.get(`https://10minutemail.net/address.api.php?more=1`);
	var user = res.data.mail_get_user;
	var host = res.data.mail_get_host;
	var time = res.data.mail_get_time;
	var stime = res.data.mail_server_time;
	var kmail = res.data.mail_get_key;
	var ltime = res.data.mail_left_time;
	var mid = res.data.mail_list[0].mail_id;
var sub = res.data.mail_list[0].subject;
var date = res.data.mail_list[0].datetime2;
	return api.sendMessage(`» 𝐔𝐬𝐞𝐫: ${user}\n» 𝐇𝐨𝐬𝐭: ${host}\n» 𝐌𝐚𝐢𝐥 ${user}@${host} (.)com\n» 𝐓𝐢𝐦𝐞: ${time}\n» 𝐓𝐢𝐦𝐞 𝐬𝐞𝐫𝐯𝐞𝐫: ${stime}\n» Key: ${kmail}\n» Time left: ${ltime}s\n» 𝐌𝐚𝐢𝐥 𝐢𝐝: ${mid}\n» Sub name ${sub}\n» Date: ${date}`, event.threadID, event.messageID)
}
else if (args[0] == "get") {
	 var get = await  axios.get(`https://10minutemail.net/address.api.php`)
      var data = get.data
      var mail = data.mail_get_mail,
        id = data.session_id,
        url = data.permalink.url,
        key_mail = data.permalink.key
      let urlMail = url.replace(/\./g,' . ')
      let maill = mail.replace(/\./g,' . ')
      return api.sendMessage(`» 𝐄𝐦𝐚𝐢𝐥: ${maill}\n» 𝐈𝐃 𝐌𝐚𝐢𝐥: ${id}\n» 𝐔𝐫𝐥 𝐌𝐚𝐢𝐥: ${urlMail}\n» 𝐊𝐞𝐲 𝐌𝐚𝐢l: ${key_mail}`, event.threadID, event.messageID)}
else if (args[0] == "check") {
	var get = await  axios.get(`https://10minutemail.net/address.api.php`)
      var data = get.data.mail_list[0]
      var email = get.data.mail_get_mail
      var id = data.mail_id,
        from = data.from,
        subject = data.subject,
        time = data.datetime2
      let formMail = from.replace(/\./g,' . ')
      let maill = email.replace(/\./g,' . ')
      return api.sendMessage(`» 𝐄𝐦𝐚𝐢𝐥: ${maill}\n» 𝐈𝐃 𝐌𝐚𝐢𝐥: ${id}\n» 𝐅𝐫𝐨𝐦: ${formMail}\n» 𝐒𝐮𝐛𝐣𝐞𝐜𝐭: ${subject}\n» ${time}`, event.threadID, event.messageID)}
else if (args.join() == "") { 
	  return api.sendMessage(`NEW - Create a new message \n
CHECK - Check your inbox \n
GET - Get current message \n
--------------------------\n\n
You can click on the mail url and enter the Mail Key to view the mail content. `, event.threadID, event.messageID)} 
    }