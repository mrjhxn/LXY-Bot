module.exports.config = {
	name: "newyear",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "CatalizCS",
	description: "Countdown to NEW YEAR",
	commandCategory: "Tools",
	cooldowns: 5
}

module.exports.run = function ({ event, api }) {
    const t = Date.parse("January 1, 2023 00:00:00") - Date.parse(new Date());
    const seconds = Math.floor( (t/1000) % 60 );
    const minutes = Math.floor( (t/1000/60) % 60 );
    const hours = Math.floor( (t/(1000*60*60)) % 24 );
    const days = Math.floor( t/(1000*60*60*24) );

    return api.sendMessage(`🥳𝐇𝐀𝐏𝐏𝐘 𝐍𝐄𝐖 𝐘𝐄𝐀𝐑 in🥳\n» ${days} days ${hours} hours ${minutes} mins ${seconds} secs«`, event.threadID, event.messageID);
}