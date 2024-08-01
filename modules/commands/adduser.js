module.exports.config = {
	name: "adduser",
	version: "2.4.3",
	hasPermssion: 0,
	credits: "BLACK",
	description: "Add user to group by link or id",
	commandCategory: "Box Chat",
	usages: "[args]",
	cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
	const { threadID, messageID } = event;
	const botID = api.getCurrentUserID();
	const out = msg => api.sendMessage(msg, threadID, messageID);
	var { participantIDs, approvalMode, adminIDs } = await api.getThreadInfo(threadID);
	var participantIDs = participantIDs.map(e => parseInt(e));
	if (!args[0]) return out("Please enter the link or user id you want to add to the group!");
	if (!isNaN(args[0])) return adduser(args[0], undefined);
	else {
		try {
			if (fail == true && id != null) return out(id);
			else if (fail == true && id == null) return out("user id not found")
			else {
				await adduser(id, name || "Facebook users");
			}
		} catch (e) {
			return out(`${e.name}: ${e.message}.`);
		}
	}

	async function adduser(id, name) {
		id = parseInt(id);
		if (participantIDs.includes(id)) return out(`${name ? name : "member"} was present in the group..`);
		else {
			var admins = adminIDs.map(e => parseInt(e.id));
			try {
				await api.addUserToGroup(id, threadID);
			}
			catch {
				return out(`can't add ${name ? name : "user"} join group.`);
			}
			if (approvalMode === true && !admins.includes(botID)) return out(`added ${name ? name : "member"} approved list !`);
			else return out(`Added ${name ? name : "member"} join group !`)
		}
	}
}