module.exports.config = {
    name: "reportv1",
    version: "99",
    hasPermssion: 2,
    credits: "Horizon Premium", // =))
    description: "Become Tricker Report Cacthu Để Rip Acc = Link 13+",
    commandCategory: "Horizon Premium",
    usages: "",
    cooldowns: 5
};
module.exports.handleReply = async function({ api, event, handleReply,client }) {
    if (event.senderID != handleReply.author) return;
    switch (handleReply.Case) {
        case 1: {
            return api.sendMessage("Please Reply To This Message And Enter The Real Name Of Facebook Who You Want To Report !", event.threadID,(error, info) => global.client.handleReply.push({ Link: event.body, name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 2 }));
        }
        case 2: {
            return api.sendMessage("Reply To This Message And Enter Your Gmail To Receive Facebook Notifications !", event.threadID,(error, info) => global.client.handleReply.push({ Link: handleReply.Link, RealName: event.body,name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 3 }));
        }
        case 3: {
            return api.sendMessage("Please Reply To This Message And Enter The Text You Want To Report !", event.threadID,(error, info) => global.client.handleReply.push({ Link: handleReply.Link,RealName: handleReply.RealName,Gmail: event.body,name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 4 }));
        }
        case 4: {
            return api.sendMessage("Please Reply To This Message And Enter The Number Of Times You Want To Report To The Victim !", event.threadID,(error, info) => global.client.handleReply.push({ Link: handleReply.Link,RealName: handleReply.RealName,Gmail: handleReply.Gmail, Content: event.body,name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 5 }));
        }
        case 5: {
            var Time = parseInt(event.body);
            if (isNaN(event.body)) {
                return api.sendMessage("Please Re-Enter Number of Reported Victims !", event.threadID,(error, info) => global.client.handleReply.push({ Link: handleReply.Link,RealName: handleReply.RealName,Gmail: handleReply.Gmail, Content: handleReply.Gmail, Time: event.body,name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 5 }));
            }
            if (event.body > 100) {
                return api.sendMessage("Please Enter the Number of Times Reported to the Victim No More than 100 Times !", event.threadID,(error, info) => global.client.handleReply.push({ Link: handleReply.Link,RealName: handleReply.RealName,Gmail: handleReply.Gmail, Content: handleReply.Content, Time: event.body,name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 5 }));
            }
            if (event.body < 1) {
                return api.sendMessage("Please Enter the Number of Times Reported to the Victim No Less Than 1 Time !", event.threadID,(error, info) => global.client.handleReply.push({ Link: handleReply.Link,RealName: handleReply.RealName,Gmail: handleReply.Gmail, Content: handleReply.Content, Time: event.body,name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 5 }));
            }
            api.sendMessage("You Have Requested to Report Victim With The Following Information :\nReal Name :" + handleReply.RealName + "\nGmail(Yours): " + handleReply.Gmail + "\nContent : " + handleReply.Content + "\nNumber of Times Report : " +  (handleReply.Time || Time), event.threadID,(error, info) => api.sendMessage('Make Progress !',event.threadID));
            for (let i = 0; i < (handleReply.Time || Time); i++) {
                try {
                    var DataRp = await api.Premium('ReportV1',{ Link: handleReply.Link, RealName: handleReply.RealName, Content: handleReply.Content, Gmail: handleReply.Gmail });
                    console.log(i + "/Report" + DataRp);
                    await new Promise(resolve => setTimeout(resolve, 1 * 1000));
                }
                catch (e) {
                    console.log(e);
                    return api.sendMessage("An unknown error !\n"+e, event.threadID);
                }
            }
            return api.sendMessage(`Sent: ${ (handleReply.Time || Time)} Last Report To Victim ${handleReply.RealName} !`,event.threadID);
        }
    }
}
module.exports.run = async function({ api,event,client }) {
    return api.sendMessage("Please Reply To This Message And Enter The Facebook Link Of The Person You Want To Report !", event.threadID,(error, info) => global.client.handleReply.push({ name: this.config.name, messageID: info.messageID, author: event.senderID, Case: 1 }));
}