/**
 * @author D-Jukie
 * @warn Do not edit code or edit credits
 * @src Disme Project
 */
module.exports = function ({ api, models, Users, Threads, Currencies }) {
    const logger = require("../../utils/log.js");
    return async function ({ event }) {
        const { threadID, logMessageType, logMessageData } = event;
        const { setData, getData, delData, createData } = Threads;
        try {
            let dataThread = (await getData(threadID)).threadInfo;
            switch (logMessageType) {
                case "log:thread-admins": {
                    if (logMessageData.ADMIN_EVENT == "add_admin") {
                        dataThread.adminIDs.push({
                            id: logMessageData.TARGET_ID
                        })
                    } else if (logMessageData.ADMIN_EVENT == "remove_admin") {
                        dataThread.adminIDs = dataThread.adminIDs.filter(item => item.id != logMessageData.TARGET_ID);
                    }
                    logger('Làm mới list admin tại nhóm ' + threadID, '[UPDATE DATA]')
                    await setData(threadID, { threadInfo: dataThread });
                    break;
                }
                case "log:thread-name": {
                    logger('Cập nhật tên tại nhóm ' + threadID, '[UPDATE DATA]')
                    dataThread.threadName = event.logMessageData.name
                    await setData(threadID, { threadInfo: dataThread });
                    break;
                }
                //<----khong co cung dc--->//
                /*
                case "log:subscribe": {
                    if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
                        await new Promise(resolve => setTimeout(resolve, 2000));
                        try {
                            require('./handleCreateDatabase.js');
                        } catch(e) {
                            console.log(e)
                        }
                        return;
                    }
                    break;
                }
                */
                case 'log:unsubscribe': {
                    if (logMessageData.leftParticipantFbId == api.getCurrentUserID()) {
                        logger('Perform data deletion of the group ' + threadID, '[DELETE DATA]')
                        const index = global.data.allThreadID.findIndex(item => item == threadID);
                        global.data.allThreadID.splice(index, 1);
                        await delData(threadID);
                        return
                    } else {
                        const index = dataThread.participantIDs.findIndex(item => item == logMessageData.leftParticipantFbId);
                        dataThread.participantIDs.splice(index, 1);
                        if (dataThread.adminIDs.find(i => i.id == logMessageData.leftParticipantFbId)) {
                            dataThread.adminIDs = dataThread.adminIDs.filter(item => item.id != logMessageData.leftParticipantFbId);
                        }
                        logger('Perform user deletion ' + logMessageData.leftParticipantFbId, '[DELETE DATA]')
                        await setData(threadID, { threadInfo: dataThread });
                    }
                    break;
                }
            }
        } catch (e) {
            console.log('An update data error occurred: ' + e)
        }
        return;
    };
}