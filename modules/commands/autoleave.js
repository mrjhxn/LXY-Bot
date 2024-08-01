/*
* Author: DC-Nam
* Có lỗi liên hệ fb https://www.facebook.com/levy.nam.2k5
*/


module.exports.onLoad = function() {
    if (!global.cmds_autoleave) global.cmds_autoleave = {};
};
module.exports.config = {
    name: 'autoleave',
    version: '1.1.1',
    hasPermssion: 2,
    credits: 'MAVERICK',
    description: 'Leave the group automatically when the group has a smaller number of members than you set.',
    commandCategory: 'For Admins',
    usages: '[...|number]',
    cooldowns: 0
};
module.exports.run = function({
    api, event
}) {
    const {
        threadID: tid,
        messageID: mid,
        senderID: sid,
        isGroup,
        args
    } = event;
    const {
        sendMessage: send,
        removeUserFromGroup: rm,
        getCurrentUserID: botID
    } = api;
    if (!isGroup) return;
    const mdl = global.cmds_autoleave;
    if (isFinite(args[1])) {
        mdl.num = +args[1];
        send(`» Has set itself to leave groups under ${mdl.num} members.`, tid, mid);
    } else if (!mdl.num) return send(`» The condition for leaving the group has not been established.`, tid, mid); else {
        mdl.status = !mdl.status ? true: false,
        mdl.sid = sid;
        send(`» ${mdl.status ? 'Turn on': 'Turn off'} leave the group itself under ${mdl.num}.`, tid, mid);
    };
};
module.exports.handleEvent = function({
    api, event
}) {
    const {
        threadID: tid,
        senderID: sid,
        participantIDs: allID,
        isGroup
    } = event;
    const {
        sendMessage: send,
        removeUserFromGroup: rm,
        getCurrentUserID: botID
    } = api
    if (!isGroup) return;
    const mdl = global.cmds_autoleave;
    if (!mdl.status) return;
    if (allID.length < mdl.num && sid != botID()) return send(`» 𝐌𝐀𝐕𝐄𝐑𝐈𝐂𝐊 NOTICE «\n ◆═════════════◆ \n» The bot only works in chat groups with ${mdl.num} or more members.`, tid, async function() {
        await rm(botID(), tid, n => !!n ? console.error(n): send(`» Leave the group under ${mdl.num} members.\n»TID: ${tid}.`, mdl.sid));
        });
};