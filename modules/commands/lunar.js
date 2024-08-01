module.exports.config = {
	name: "lunar",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Hoài Bảo",
	description: "Countdown to Lunar New Year",
	commandCategory: "Công Cụ",
	cooldowns: 5
}

module.exports.run = function ({ event, api }) {
    const t = Date.parse("February 1, 2022 00:00:00") - Date.parse(new Date());
    const seconds = Math.floor( (t/1000) % 60 );
    const minutes = Math.floor( (t/1000/60) % 60 );
    const hours = Math.floor( (t/(1000*60*60)) % 24 );
    const days = Math.floor( t/(1000*60*60*24) );

    return api.sendMessage(`「𝐋𝐮𝐧𝐚𝐫 𝐍𝐞𝐰 𝐘𝐞𝐚𝐫」\n» ${days} days ${hours} hours ${minutes} mins ${seconds} secs «`, event.threadID, event.messageID);
}