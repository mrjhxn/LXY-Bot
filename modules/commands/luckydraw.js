module.exports.config = {
	name: "luckydraw",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "plue",
	description: "Guess the lucky number from 0 to 5",
	commandCategory: "Economy",
	usages: "lucky 5",
    cooldowns: 5,
    dependencies: [],
};

module.exports.run = async ({ event, api, Currencies,args }) => {
 const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
  var data = await Currencies.getData(event.senderID);
  var money = data.money
  var i = 10000;
  var number = getRandomInt(0, 5)
  if(money < 5) api.sendMessage("You don't have enough money!",event.threadID,event.messageID)
    else {
      if(!args[0]) api.sendMessage("No predicted numbers.",event.threadID,event.messageID)
        else{
         if(args[0] > 5) api.sendMessage("Prediction should not be greater than 5.",event.threadID,event.messageID)
           else {
             if(args[0] == number){
                 api.sendMessage(number + " is the lucky number, you got 500 dollars.", event.threadID, () => Currencies.setData(event.senderID, options = {money: money + parseInt(i)}),event.messageID);
                }
         else api.sendMessage("Lucky number is " + number + "\n" + "Good luck next time !\n====Note====\nAfter each wrong guess, you will be deducted 10 dollars, if you are right you will get 100 dollars back.",event.threadID, () => Currencies.setData(event.senderID, options = {money: money - 2000}),event.messageID);
      }
    }
  }
};