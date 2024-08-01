module.exports.config = {
    name: "ngl-spam",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "ChardsBot",
    description: "NGL LINKS ONLY",
    commandCategory: "entertainment",
    cooldowns: 5,
    dependencies: {
        "axios": ""
    }
}

module.exports.run = async ({ api, event, args }) => {
    const axios = global.nodemodule["axios"];
    const text = args.join(" ");
    const textArray = text.split(" | ");

    if (textArray.length !== 3) {
        // If there aren't exactly 3 parts separated by the pipe '|' character
        return api.sendMessage("Invalid arguments! Please provide exactly 3 parts separated by ' | ' (pipe)", event.threadID, event.messageID);
    }

    const [username, message, total] = textArray;

    const response = await axios.get(`https://nguyen-chard-api.joshuag06.repl.co/api/other/nglspam?username=${username}&message=${message}&total=${total}`);

    if (response.status !== 200) {
        // If the API returned an error status
        return api.sendMessage("Sorry, something went wrong. Please try again later.", event.threadID, event.messageID);
    }

    const result = `Success sending messages NGL to username '${username}', with message '${message}' and total count of '${total}'`;

    api.sendMessage(result, event.threadID, event.messageID);
};
