const fs = require("fs");
module.exports.config = {
	name: "12tenses",
    version: "1.1.8",
	hasPermssion: 0,
	credits: "BLACK", 
	description: "Watch 12 tenses in English",
	commandCategory: "Knowledge Learn",
	usages: "12 strokes",
    cooldowns: 5, 
};

module.exports.handleReply = async ({ api, event, handleReply }) => {
const { threadID, messageID, senderID } = event;
    switch(handleReply.type) {
        case "choosee": {
            switch(event.body) {

					case "1":
			api.sendMessage({
				body: "1.The Present Simple - Present Simple \nIdentifier\nAlways\nUsually\nRegularly\nFrequently\nOften\nSometimes\nOccationally\nRarely\nNever\nUsage\n* Describes an event that happened in a time a long time or a hobby in the present.\nExample: Mary often goes to school by bicycle.\n* Describes a repetitive event that has become a habit at present or a person's ability.\nExample : I get up early every morning.\n* Describe a phenomenon that is always true, truth, obvious truth.\nExample: The sun rises in the East.\n4. Expresses a prearranged future plan or schedule, especially with moving verbs.\nExample: The plane takes off at 3 p.m this afternoon.\nRules\nConjugation rules 3rd person singular in simple present tense:\n Regular: => verb + s (example: reads)\nEnd in S, SS, SH, X, O => verb + ES (ex. : goes)\nEnd with consonant + Y => change to I + ES (e.g. fly => flies)\nEnd with vowel + Y => verb + S (ex: plays)\nEnd equals F, FE => change F, FE to VES (eg dwarf => dwarves)", 
			}, event.threadID, event.messageID);
			break;
		case "2":
			api.sendMessage({
				body: "2.The Present Continuous -Present Continuous\nIdentifier\nNow\nRight\n now\nAt the moment\nAt this moment\nAt present\nImperative Sentences (Look!, Listen!)\nHow to use\n * Use the present continuous to talk about the present: \nDescribe an action that is happening in the present. For example:\nThe children are playing football now.\nThis is also usually followed by a request or command. Example:\nLook! The child is crying.\nBe quiet! The baby is sleeping in the next room.\nThis tense also describes an action that happens repeatedly using the adverb ALWAYS. Example:\nHe is always borrowing our books and then he doesn't remember.\nDescribes an action that is happening before and after a given time period. Example:\nAt eight o'clock we are usually having breakfast.\nDescribe a trend, a recent event. Example:\nThese days most people are using email instead of writing letters.\nWhat sort of clothes are teenagers wearing nowadays?\nWhat sort of music are they listening to?*Use the present continuous to talk about the future:\ n Expresses an action that is about to happen – has a very high probability of happening (in the near future). Example:\nHe is coming tomorrow.\nSomething is both planned or arranged. Example:\nMary is going to a new school next term.\nWhat are you doing next week?\n*Used to tell a story, when summarizing the story of a book, movie…\nThe movie ends when Thor is wondering where to land the ship.\nI'm reading a novel to the chapter when the main character is losing everything he has built.\nSome continuous verbs\nThinking verbs: believe, see, recognize, imagine, remember, forget, understand, realize, know, suppose…\nEmotion verbs: like, love, dislike, prefer, hate, want…\nCognitive verbs: see, taste, hear, smell, feel…\nOther verbs: to be, need, seem, belong to, include, have…\nExample:\nI am tired now.She wants to go for a walk at the moment.Do you understand your lesson?\nConstruction rules V-ing\nCommon => verb + ing. (eg: stand => standing)\nEnd with E => verb drop E and + ing. (eg: write => writing)\nOne-syllable verb ends with a consonant followed by a vowel => double the final consonant and + ing. (eg swim => swimming)\n2-syllable verb, the stress falls on the second syllable, ends with a consonant, preceded by a vowel => double the final consonant and + ing. (eg: pre'fer => preferring)", 
			}, event.threadID, event.messageID);
			break;
		case "3":
			api.sendMessage({
				body: "3.The Present Perfect – Present Perfect\nIdentifier\nAlready\nJust\nRecently\nLately\nNot…yet\nEver\nNever\nStill\nSeveral times\nUp to now\nMany times\nSo far\nNever before \nFor + 1 time period (e.g. for 5 years)\nSince + 1 time period (ex: since 2012)For so long/a long time\nUsage\n*Describe an event that happened occurred in the past, but its results are still relevant to the present. Example:\nThey've been married for nearly fifty years./nShe has lived in Liverpool all her life.\nDescribe an action that was frequently done in the past and continues to the present. Example:\nI've played the guitar ever since I was a teenager.\nHe has written three books and he is working on another one.\n*We often use a clause with “since” when an event begins. in the past. Example:\nI have worked here since I left school.\nTalk about your past experience. Note: Often used the word ever to talk about experiences, things that have been experienced up to the present. Example:\nMy last birthday was the worst day I have ever had.\nAnd never use the negative with ever. Example:\nHave you ever met George?\nYes, but I've never met his wife.\n*Describe an action that happened in the past but is very important at the moment of speaking. Example:\nI can't get in the house.I've lost my keys.\nI'm tired out.I've been working all day.\n*Usually use the 2 participle of “be” when ai that just went somewhere and came back. Example:\nA: Where have you been?\nB: I've just been out to the supermarket.\nA: Have you ever been to San Francisco?\nB: No, but I've been to Los Angeles.\ nBut when that person hasn't returned, we use have/has gone:\nA: Where is Maria? I haven't seen her for weeks.\nB: She's gone to Paris for a week. She'll be back tomorrow.\n7. Often use the present perfect with adverbs of time to talk about recent times: just, only just, recently. Example:\nScientists have recently discovered a new breed of monkey.\nWe have just got back from our holidays.\nOr adverbial up to now: ever (in question), so far, until now, up to now, yet (in question and negative). Example:\nHave you ever seen a ghost?\nWhere have you been up to now?\nHave you finished your homework yet?\nNo, so far I've only done my history.\nNote: Do not use present perfect with adverbs of the past with finished things:\nI have seen that film |yesterday|.\nWe have just bought a new car |last week|.\n|When we were| children we have been to California.\nBut can be used with unfinished business:\nHave you seen Helen today?\nWe have bought a new car this week.", 
			}, event.threadID, event.messageID); 
			break;
		case "4":
			api.sendMessage({
				body: "4.The Present Perfect Continuous – Present Perfect Continuous\nIdentifier\nAll day\nAll week\nFor a long time\nAlmost\nThis week\nRecently\nAll day long\nThe whole week\nLately\nIn the past week\nIn recent years\nUp until now\nSo far\nFor + 1 period of time\nSince + 1 timeline\n(This period usually goes with the verbs wait, stay, live, work, learn, sit, stand…)\nUsing\n*Used to emphasize the continuity of an action that started in the past, continues to the present and continues into the future. Example:\nI have been waiting for you since 4 p.m.\nShe has been working for more than 2 hours.\n2. Is the cause of the present result.\nCompare the present perfect and the present perfect continuous\nEmphasize the outcome of the action, the quantity obtained.\nExample: I have taught for 4 hours today. (action completed at the time of speaking, emphasize the result “4 hours”)\n Present Perfect Continuous\nEmphasize continuity of action.\nExample: I have been teaching since 2 p.m ( incomplete action, emphasis on continuity)", 
			}, event.threadID, event.messageID); 
			break;
		case "5":
			api.sendMessage({
				body: "5. The Simple Past – Simple Past Tense\nIdentifier\nYesterday\nLast (night, week…)\nDuration + ago\nTime in the past. Example: 2 weeks ago; In 1945\nUsage\n*Describe an action, an event that happened in the past, unrelated to the present and future.\nHe worked at McDonald's.\n*Used in If conditional sentences , make a hypothesis and a wish statement. Example:\nHe could get a new job if he really tried.\nI would always help someone who really needed help.\nI wish it wasn't so cold.\n*Can use the past simple in the present when want to show politeness.\nI just hope you would be able to help me.\nV-ed construction rules (Only for regular verbs)\nCommon => verb+ ED (example : want => wanted)\nEnd with E => verb + D (ex: like => liked)\nEnd with consonant + Y => change to I + ED (ex: fly => flied) \nEnd with a vowel + Y => verb + ED (eg play => played)\nOne-syllable verb ends with a consonant, preceded by a vowel => double the final consonant and + ED (eg: refer => referred)\n 2-syllable verb, the stress falls on the 2nd syllable, ends with a consonant, before it is a vowel => double the last consonant and + ED (eg: prefer => preferred)\nNote:\nVisit => Visited\nListen => Listened\nOpen=>Opened\nEnter => Entered", 
			}, event.threadID, event.messageID); 
			break;
		case "6":
			api.sendMessage({
				body: "6. The Past Continous – Past Continuous\nIdentifiers\nDefinite time in the past. Example: at 8 p.m yesterday; at this time last yesterday.\nWhen clause + simple past with regular verb.\nWhile clause + past continuous.\nAt this morning (afternoon).\nAt that very moment.\nHow to use\n* Describe an event that was happening at a specific time in the past. Example:\nThey were meeting secretly after school.\n*Describe an event that was taking place in the past when another incident interrupted. Example:\nThe children were doing their homework when I got home.\nI often get home when the children are doing their homework.\n*Describe two actions that were being performed at the same time in the past. Example:\nI was cooking dinner while my son was playing with our dog.", 
			}, event.threadID, event.messageID); 
			break;
		case "7":
			api.sendMessage({
				body: "7.The Past Perfect – Past Perfect\ Identification sign \nBy/until + past time. Example: By 2005, he had written 5 books.\nBefore + past time\nAfter + past clause\nAs soon as\nBy the time\nWhen\nAlready\nJust\nHow to use\nDescribe an action action, something that happened and completed before a time or another event in the past. Example:\nI had done all my homework before 9 p.m yesterday.\nHe phoned me after he had passed the exam.", 
			}, event.threadID, event.messageID); 
			break;
		case "8":
			api.sendMessage({
				body: "8. The Past Perfect Continous –Past Perfect Continuous\nIdentifier\nUntil then\nBy the time\nPrior to that time\nBefore\nAfter\nHow to use\nEmphasize the duration of an action was happening in the past and ended before another action started and also ended in the past.\nExample:\nEverything was wet.It had been raining for hours.\nHe was a wonderful guitarist.He had been playing ever since he was a teenager.\nShe didn't want to move.She had been living in Liverpool all her life.\nI had been watching the program every week, but I missed the last episode.", 
			}, event.threadID, event.messageID); 
			break;
    case "9":
			api.sendMessage({
				body: "9. The Simple Future – Simple Future Tense\nIdentifier\nTonight\nTomorrow\nNext (day, week, month, year)\nLater\nSoon\nIn + 1 period\nFuture time\nIn a sentence there are opinion verbs like: think, believe, suppose, perhaps, probably\nHow to use\nWhen you guess (predict, guess), use will or be going to. For example:\nI think the United will win the game.\nI think the United is going to win the game.\n*When planning ahead, use be going to. Example: \nWe're going to have a meal.\n* To express willingness or willingness, use will. Example: \nOh, I've left the door open. I will go and shut it.", 
			}, event.threadID, event.messageID); 
			break;
    case "10":
			api.sendMessage({
				body: "10. The Future Continuous time in the future\nUsage\n*Used to express an action or event in progress at a specified time in the future. For example:\nDon't ring at 8 o'clock. I'll be watching “Who Wants to be a Millionaire.”\nThis time tomorrow we'll be sitting on the beach. I can't wait!\n* Used to express an action, an event that is happening, then another action or event interferes in the future. Example:\nWhen you come tomorrow, they will be playing badminton.\nHe will be waiting for me when I arrive tomorrow.\nIn sentences that are not about the future but we can use the future continuous to talk about what we assume is happening at the moment. Example:\nDon't phone grandma now, she'll be having dinner.\nThe kids are very quiet. They'll be doing something wrong, I know it!", 
			}, event.threadID, event.messageID); 
						break;
      case "11":
			api.sendMessage({
				body: "11. The Future Perfect – Future Perfect\nIdentifier\nBy the time\nPrior to the time\nBy + future time\nBy the end of + future time\nBefore + time in future\nUsage\n*Used to express an action or event completed before a time in the future. Example:\nDo you think you will have finished it by next Thursday?\nIn 5 years time I'll have finished university.\n*Used to express an action or event completed before an action or event other in the future. Example: \nI will have made the meal ready before the time you come tomorrow.", 
			}, event.threadID, event.messageID); 
			break;
      case "12":
			api.sendMessage({
				body: "12. The Future Perfect Continuous – Future Perfect Continuous\nIdentifier\nFor + time period + by/before + future timeline. For example: For 2 hours by the time she arrives.\nUsage\nUsed to express an action that happened in the past and continues until a given time in the future. Example:\nI will have been studying English for 10 year by the end of next month.\nTomorrow, when you come back, I will have been watching that football match on TV for half an hour.", 
			}, event.threadID, event.messageID); 
			      break;
					default:
				const choose = parseInt(event.body);
            	if (isNaN(event.body)) return api.sendMessage("💟 Please enter number", event.threadID, event.messageID);
            	if (choose > 12 || choose < 1) return api.sendMessage("🔰 Select from the list.", event.threadID, event.messageID); 
		    
			}
		}
	}
}

module.exports.run = async ({ api, event, handleReply }) => {
	const fs = require("fs");
	const { threadID, messageID, senderID } = event;
	return api.sendMessage({ body: "📚 12 Tenses In English 📚" +
                "\n𝟏. 𝐓𝐡𝐞 𝐏𝐫𝐞𝐬𝐞𝐧𝐭 𝐒𝐢𝐦𝐩𝐥𝐞 📓\n" +
                "\n𝟐. 𝐓𝐡𝐞 𝐏𝐫𝐞𝐬𝐞𝐧𝐭 𝐂𝐨𝐧𝐭𝐢𝐧𝐮𝐨𝐮𝐬 📔\n" +
                "\n𝟑. 𝐓𝐡𝐞 𝐏𝐫𝐞𝐬𝐞𝐧𝐭 𝐏𝐞𝐫𝐟𝐞𝐜𝐭 📒\n" +
                "\n𝟒. 𝐓𝐡𝐞 𝐏𝐫𝐞𝐬𝐞𝐧𝐭 𝐏𝐞𝐫𝐟𝐞𝐜𝐭 𝐂𝐨𝐧𝐭𝐢𝐧𝐮𝐨𝐮𝐬 📕\n" +
                "\n𝟓. 𝐓𝐡𝐞 𝐒𝐢𝐦𝐩𝐥𝐞 𝐏𝐚𝐬𝐭 📗\n" +
                "\n𝟔. 𝐓𝐡𝐞 𝐏𝐚𝐬𝐭 𝐂𝐨𝐧𝐭𝐢𝐧𝐨𝐮𝐬 📘\n" +
                "\n𝟕. 𝐓𝐡𝐞 𝐏𝐚𝐬𝐭 𝐏𝐞𝐫𝐟𝐞𝐜𝐭 📙\n" +
                "\n𝟖. 𝐓𝐡𝐞 𝐏𝐚𝐬𝐭 𝐏𝐞𝐫𝐟𝐞𝐜𝐭 𝐂𝐨𝐧𝐭𝐢𝐧𝐨𝐮𝐬 📚\n" +
                "\n𝟗. 𝐓𝐡𝐞 𝐒𝐢𝐦𝐩𝐥𝐞 𝐅𝐮𝐭𝐮𝐫𝐞 📖\n" +
                "\n𝟏𝟎. 𝐓𝐡𝐞 𝐅𝐮𝐭𝐮𝐫𝐞 𝐂𝐨𝐧𝐭𝐢𝐧𝐮𝐨𝐮𝐬 📝\n" +
                "\n𝟏𝟏. 𝐓𝐡𝐞 𝐅𝐮𝐭𝐮𝐫𝐞 𝐏𝐞𝐫𝐟𝐞𝐜𝐭 📰\n" +
                "\n𝟏𝟐. 𝐓𝐡𝐞 𝐅𝐮𝐭𝐮𝐫𝐞 𝐏𝐞𝐫𝐟𝐞𝐜𝐭 𝐂𝐨𝐧𝐭𝐢𝐧𝐮𝐨𝐮𝐬 🗞" + 
                "\n\n📚 Reply to message according to number if you want to see information"
            ,attachment: fs.createReadStream(__dirname + `/noprefix/12thi.jpg`)}, event.threadID, (error, info) => {
        global.client.handleReply.push({
            type: "choosee",
            name: this.config.name,
            author: event.senderID,
            messageID: info.messageID
        })  
    })
}