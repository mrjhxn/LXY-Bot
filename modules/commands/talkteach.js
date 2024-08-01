module.exports.config = {
    name:"shunteach",
    version: "1.0.2",
    hasPermssion: 0,
    credits: "DungUwU",
    description: "Teach cute nino :>",
    commandCategory: "General",
    usages: "the question you want to ask nino => the question you want nino to answer",
    cooldowns: 5
};

const axios = require('axios');

module.exports.run = async ({ api, event, args }) => {
    let { messageID, threadID } = event;
    let work = args.join(" ");
    let fw = work.indexOf(" => ");
    if (fw == -1) {
        api.sendMessage("wrong format",threadID,messageID);
    } else {
        let ask = work.slice(0, fw);
        let answer = work.slice(fw + 4, work.length);
        if (ask=="") {api.sendMessage("there is no question ;-;",threadID,messageID)} else {
            if (!answer) {api.sendMessage("missing answer ;-;",threadID,messageID)} else {
                    axios.get(encodeURI(`https://randomlinkapi.richardretadaof.repl.co/sim/add/${ask}&&${answer}`)).then(res => {
                        if (res.data.reply == "Key and value have all cmnr, add the cc"){
                            api.sendMessage("Question, answer already exists ;-;",threadID,messageID)} else {
                                if (res.data.reply == "There's something wrong with cc, I don't know") {api.sendMessage('Unknown error ;-;',threadID,messageID)} else {
                                    api.sendMessage("teach success!",threadID,messageID);
                                }
                            }
                    })
            }
        }
    }
}