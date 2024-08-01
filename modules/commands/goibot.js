const fs = global.nodemodule["fs-extra"];
module.exports.config = {
  name: "goibot",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Plue",
  description: "For saying Bot word",
  commandCategory: "Noprefix",
  usages: "noprefix",
  cooldowns: 10,
};
module.exports.handleEvent = async function({ api, event, args, Threads }) {
  var { threadID, messageID, reason } = event;
  const moment = require("moment-timezone");
  const axios = global.nodemodule["axios"];
  const time = moment.tz("Asia/Manila").format("HH:MM:ss L");
  const PREFIX = config.PREFIX;
  var idgr = `${event.threadID}`;

  var tl = ["hello Mwuah❤️", "Bat moko tinatawag?", "I love you HAHAHAH", "Love you mwaaa<3", "Hi, hello baby ah ah", "Tawagin mo nalang ako pag ako na ulit", "gamitin mo yung calladmin para tawagin yung creator hmmp!", "Ikaw ang pinaka kyut sa lahat jk inuuto lang kita", "ha? hakdog", "I'm here ah ah charr!", "love kita labidabidabs" , "shotiii uwu", "love ko yung admin walang halong harot.", "ayoko na tampo nako", "ano na naman? lagi nalang akong mali", "mag isa kaba? tara sogo HAHAHA charot", "Good luck labeo hon HAHAHAAH ", "I'm just like my creator uto uto din kasi ako", "nahihiya nako y*wa" , "pede kaba making akin? hahaha char", "Don't spam me :sasapakin kita eh =.=", "Labeo like kahit inuuto mo lang ako", "love mo ba ako?", "Oh bakit? inaway ka na naman ba nya?","Ewan ko sayo bala ka jan!","ano na naman ha?","miss mo na naman ako?","hmmm, tapon kita sa ilog eh","Kiss muna","Kulang ka lng sa vvtime","wag moko matawag tawag baka kainin kita jan charrr!","Yes dadeh?","oh?","tara shabu","Hi? G kaba sa kangkungan?","G kaba sa bubungan?","sus crush mo lang ung admin eh","twerk ka muna 1 hour walang pahinga ah!","wait mag sasaing lang ako","kain ka muna gutom lang yan!","kwento mo sa pagong","tanong mo kay lolong","wait maglalaba lang ako","po?","wait maglalaba lang ako","wait magsasampay lng ako","wait maghuhugas muna ako ako ng bahay","wait wait maglalaba muna ako ng plato","wait magdadasal muna ako","hayf na yan","tabe ako na to","/*nagdasal (sfnesdjfesfdenf)","sako kita jan eh","wait iihi lang ako","Ha? hakdog.",
"bakit na naman?.",
"kanina kapa tawag ng tawag. may gusto ka saken?",
"di ako yan 🙄",
"wala akong piso!",
"che! wag moko kausapen 🙄",
"shooo! shooo!!!",
"che! may iba ka palang kalandian!",
"oh may chismis kaba jan? pabulong!",
"heh! dun ka sa kabet mo!",
"ha? halaman.",
"doc gising na po sya...",
"luhhh may siraulo po dito isugod nyo napo sya sa Jollibee",
"911 may reptiles po dito paki kuha nlng ty! ",
"sino ka? 😶",
"shhh nanghihina ako parang kelangan ko ng load.",
"ayoko na pinagtritripan nyo na naman ako",
"sayo na yung isang admin jan pili ka lang.",
"😳 turuan moko lumandi beh",
"tampo nako, kiss moko mga bente dapat",
"ako pa ba?",
"Kanino ka lang?",
"Wag koy",
"Hala si Koyaaa!",
"Tanong mo kay Shun",
"SML?",
"oh tapos?",
"Hi? u caught my attention "];
  var rand = tl[Math.floor(Math.random() * tl.length)];

  var lstct = ["LASTCHAT SALO KO NA", "AKO NA LAST CHAT", "╭────༺♡༻────╮\n               𝖲𝖺𝗀𝗈𝗍 𝗄𝗈𝗇𝖺\n        ✿╣𝐋𝐀𝐒𝐓 𝐂𝐇𝐀𝐓╠✿ \n╰────༺♡༻────\n👇🏿👇🏿👇🏿👇🏿👇🏿👇🏿👇🏿👇🏿👇🏿\n👉🏿👇🏾👇🏾👇🏾👇🏾👇🏾👇🏾👇🏾👈🏿\n👉🏿👉🏾👇🏽👇🏽👇🏽👇🏽👇🏽👈🏾👈🏿\n👉🏿👉🏾👉🏽👇🏼👇🏼👇🏼👈🏽👈🏾👈🏿\n👉🏿👉🏾👉🏽👉🏼👇🏻👈🏼👈🏽👈🏾👈🏿\n👉🏿👉🏾👉🏽👉🏼🖕👈🏼👈🏽👈🏾👈🏿\n👉🏿👉🏾👉🏽👉🏼👆🏻👈🏼👈🏽👈🏾👈🏿\n👉🏿👉🏾👉🏽👆🏼👆🏼👆🏼👈🏽👈🏾👈🏿\n👉🏿👉🏾👆🏽👆🏽👆🏽👆🏽👆🏽👈🏾👈🏿\n👉🏿👆🏾👆🏾👆🏾👆🏾👆🏾👆🏾👆🏾👈🏿\n👆🏿👆🏿👆🏿👆🏿👆🏿👆🏿👆🏿👆🏿👆🏿\n      •GOLDEN PAKEO•\n          𝐋𝐀𝐒𝐓 𝐂𝐇𝐀𝐓", "𝗟𝗔𝗦𝗧𝗖𝗛𝗔𝗧\n\nSalo ko na palibhasa mga iniwan, ghinost, pinaasa, di pinaglaban, pinagpalit sa malapit, di crinushback, rebound, pampalipas oras, pang drs, lastly marupok.", "Aq na lastchat pogi't magunthe namn kayu'", "Sagip q na LC MWAAH", "LASTCHAT REST IN PEACH MGA LODI!", "Laschat Ughh", "LC AKO NA\n\nHindi sana masarap ulam nyo.", "aq na lc mag ka anak sana kau limang bingot", "HAHAHA LC SAGIP Q NA mwahhhh.", "LC AKO NA PANGET NYO."];
  var lscht = lstct[Math.floor(Math.random() * lstct.length)];

  
  var morning = ["Hi GoodMorning", "AKO NA LAST CHAT"];
  var rndmmorning = morning[Math.floor(Math.random() * morning.length)];
  

  
  if ((event.body.toLowerCase() == "stupid bots")) {
    return api.sendMessage("The member intentionally cursed the bot, thus violating the bot law, so the bot will go out and want to add it again, please contact admin via Fb", threadID, () =>
      api.removeUserFromGroup(api.getCurrentUserID(), threadID));
  };

  if ((event.body.toLowerCase() == "bot out")) {
    return api.sendMessage("Bye bye ><", threadID, () =>
      api.removeUserFromGroup(api.getCurrentUserID(), threadID));
  };

   if ((event.body.toLowerCase() == "quail bot")) {
    return api.sendMessage("Oh yeah, oh salamat sa panandaliang saya btw wiwi muna aq ", threadID, () =>
      api.removeUserFromGroup(api.getCurrentUserID(), threadID));
  };

  if ((event.body.toLowerCase() == "panget bot") || (event.body.toLowerCase() == "bot panget")) {
    return api.sendMessage("ang sama mo sakin, sapakin kita eh", threadID);
  };

  if ((event.body.toLowerCase() == "Oh") || (event.body.toLowerCase() == "oi")) {
    return api.sendMessage("oliverrr", threadID);
  };

  if ((event.body.toLowerCase() == "oh") || (event.body.toLowerCase() == "ối")) {
    return api.sendMessage("ooooo sige", threadID);
  };

  if ((event.body.toLowerCase() == "yep") || (event.body.toLowerCase() == "oi")) {
    return api.sendMessage("oh my god", threadID);
  };

  if ((event.body.toLowerCase() == "Yes") || (event.body.toLowerCase() == "u")) {
    return api.sendMessage("Yes dadeh?", threadID);
  };

  if ((event.body.toLowerCase() == "yeah") || (event.body.toLowerCase() == "ua")) {
    return api.sendMessage("Yeah rock n roll", threadID);
  };


  if ((event.body.toLowerCase() == "love") || (event.body.toLowerCase() == "yeu")) {
    return api.sendMessage("i do love you <3", threadID);
  };

  if ((event.body.toLowerCase() == "damn") || (event.body.toLowerCase() == "dmm")) {
    return api.sendMessage("Swearing again, what do you say? :>", threadID);
  };

  if ((event.body.toLowerCase() == "dmm bot") || (event.body.toLowerCase() == "dmm bot")) {
    return api.sendMessage("Chửi tao hả,ăn ban nha pp", threadID);
  };

  if ((event.body.toLowerCase() == "curse") || (event.body.toLowerCase() == "chui cmm")) {
    return api.sendMessage("Who curses?", threadID);
  };

  if ((event.body.toLowerCase() == "cmm bot") || (event.body.toLowerCase() == "cmm bot")) {
    return api.sendMessage("ok you are the best", threadID);
  };

  if ((event.body.toLowerCase() == "hentai") || (event.body.toLowerCase() == "hentai")) {
    return api.sendMessage("Ha , I love watching it", threadID);
  };

  if ((event.body.toLowerCase() == "haha") || (event.body.toLowerCase() == "haha")) {
    return api.sendMessage("️haha labeo mwaah :>", threadID);
  };

  if ((event.body.toLowerCase() == "HAHAHAHA") || (event.body.toLowerCase() == "HAHAHAHA")) {
    return api.sendMessage("️HAHAHAHA landi mo", threadID);
  };

  if ((event.body.toLowerCase() == "HAHAHAHAHAH") || (event.body.toLowerCase() == "HAHAHAHAHAH")) {
    return api.sendMessage("️HAHAHAHA landi mo", threadID);
  }; 

  if ((event.body.toLowerCase() == "kkk") || (event.body.toLowerCase() == "kkk")) {
    return api.sendMessage("️kkk it's so funny :))", threadID);
  };


//LASTCHAT
  if ((event.body.toLowerCase() == "lc") ||
      (event.body.toLowerCase().includes("lastchat")) ||
      (event.body.toLowerCase() == "Lc") ) {
    var msg = {
      body: lscht
    }
    return api.sendMessage(msg, threadID, messageID);
  };
  
//REACTION HAHA
    if ((event.body.toLowerCase().includes("haha")) || 
        (event.body.toLowerCase().includes("gagi")) ||
        (event.body.toLowerCase().includes("ugh")) ||
        (event.body.toLowerCase().includes("happy")) ||
        (event.body.toLowerCase().includes("laptrip")) ||
        (event.body.toLowerCase().includes("saya")) ||
        (event.body.toLowerCase().includes("yawa")) ||
        (event.body.toLowerCase().includes("hakdog")) ||
        (event.body.toLowerCase().includes("hatdog")) ||
        (event.body.toLowerCase().includes("hotdog")) ||
        (event.body.toLowerCase().includes("amp")) ||
        (event.body.toLowerCase().includes("loko")) ||
        (event.body.toLowerCase().includes("sira")) ||
        (event.body.toLowerCase().includes("panget")) ||
        (event.body.toLowerCase().includes("😆")) ||
        (event.body.toLowerCase().includes("😂")) ||
        (event.body.toLowerCase().includes("🤣")) ||
        (event.body.toLowerCase().includes("😹")) ||
        (event.body.toLowerCase().includes("hapi"))
  
  ){
    return api.setMessageReaction('😆', event.messageID, err => (err) ? logger('setMessageReaction', 2) : '', !![]);
  };

  //REACTION SAD
    if ((event.body.toLowerCase().includes("sad")) || 
        (event.body.toLowerCase().includes("ouch")) ||
        (event.body.toLowerCase().includes("aray")) ||
        (event.body.toLowerCase().includes("sakit")) ||
        (event.body.toLowerCase().includes("hapdi")) ||
        (event.body.toLowerCase().includes("kirot")) ||
        (event.body.toLowerCase().includes("lungkot")) ||
        (event.body.toLowerCase().includes("iyak")) ||
        (event.body.toLowerCase().includes("tampo")) ||
        (event.body.toLowerCase().includes("malala")) ||
        (event.body.toLowerCase().includes("patay")) ||
        (event.body.toLowerCase().includes("😢")) ||
        (event.body.toLowerCase().includes("😭")) ||
        (event.body.toLowerCase().includes("😞")) ||
        (event.body.toLowerCase().includes("😣")) ||
        (event.body.toLowerCase().includes("😖")) ||
        (event.body.toLowerCase().includes("agoi"))
  
  ){
    return api.setMessageReaction('😢', event.messageID, err => (err) ? logger('setMessageReaction', 2) : '', !![]);
  };

  //REACTION LOVE
    if ((event.body.toLowerCase().includes("love")) || 
        (event.body.toLowerCase().includes("mahal")) ||
        (event.body.toLowerCase().includes("mwa")) ||
        (event.body.toLowerCase().includes("heart")) ||
        (event.body.toLowerCase().includes("kilig")) ||
        (event.body.toLowerCase().includes("ayie")) ||
        (event.body.toLowerCase().includes("ayii")) ||
        (event.body.toLowerCase().includes("inlab")) ||
        (event.body.toLowerCase().includes("labyu")) ||
        (event.body.toLowerCase().includes("touch")) ||
        (event.body.toLowerCase().includes("hart")) ||
        (event.body.toLowerCase().includes("mua")) ||
        (event.body.toLowerCase().includes("mwua")) ||
        (event.body.toLowerCase().includes("kiz")) ||
        (event.body.toLowerCase().includes("♥")) ||
        (event.body.toLowerCase().includes("💖")) ||
        (event.body.toLowerCase().includes("❤")) ||
        (event.body.toLowerCase().includes("😻")) ||
        (event.body.toLowerCase().includes("🥰")) ||
        (event.body.toLowerCase().includes("😍")) ||
        (event.body.toLowerCase().includes("💞")) ||
        (event.body.toLowerCase().includes("🤗")) ||
        (event.body.toLowerCase().includes("hug"))
  
  ){
    return api.setMessageReaction('❤', event.messageID, err => (err) ? logger('setMessageReaction', 2) : '', !![]);
  };

  //REACTION WOW
    if ((event.body.toLowerCase().includes("wow")) || 
        (event.body.toLowerCase().includes("naol")) ||
        (event.body.toLowerCase().includes("baok")) ||
        (event.body.toLowerCase().includes("woa")) ||
        (event.body.toLowerCase().includes("idol")) ||
        (event.body.toLowerCase().includes("lodi")) ||
        (event.body.toLowerCase().includes("lakas")) ||
        (event.body.toLowerCase().includes("🙀")) ||
        (event.body.toLowerCase().includes("😯")) ||
        (event.body.toLowerCase().includes("😮")) ||
        (event.body.toLowerCase().includes("😱")) ||
        (event.body.toLowerCase().includes("pro"))
  
  ){
    return api.setMessageReaction('😮', event.messageID, err => (err) ? logger('setMessageReaction', 2) : '', !![]);
  };

  //REACTION ANGRY
    if ((event.body.toLowerCase().includes("tangina")) || 
        (event.body.toLowerCase().includes("puta")) ||
        (event.body.toLowerCase().includes("pota")) ||
        (event.body.toLowerCase().includes("gago")) ||
        (event.body.toLowerCase().includes("tarantado")) ||
        (event.body.toLowerCase().includes("fuck")) ||
        (event.body.toLowerCase().includes("inamo")) ||
        (event.body.toLowerCase().includes("paky")) ||
        (event.body.toLowerCase().includes("gagu")) ||
        (event.body.toLowerCase().includes("bobo")) ||
        (event.body.toLowerCase().includes("angry")) ||
        (event.body.toLowerCase().includes("galit")) ||
        (event.body.toLowerCase().includes("🤬")) ||
        (event.body.toLowerCase().includes("😠")) ||
        (event.body.toLowerCase().includes("😡")) ||
        (event.body.toLowerCase().includes("inutil"))
  
  ){
    return api.setMessageReaction('😠', event.messageID, err => (err) ? logger('setMessageReaction', 2) : '', !![]);
  };

  //REACTION CHECK BOT
    if ((event.body.toLowerCase().includes("✓")) || 
        (event.body.toLowerCase().includes("✅"))
  
  ){
    return api.setMessageReaction('✅', event.messageID, err => (err) ? logger('setMessageReaction', 2) : '', !![]);
  };

  //REACTION CHECK BOT
    if ((event.body.toLowerCase().includes("botcheck")) || 
        (event.body.toLowerCase().includes("check bot"))
  
  ){
    return api.setMessageReaction('👍', event.messageID, err => (err) ? logger('setMessageReaction', 2) : '', !![]);
  };

  
  
  if (event.body.indexOf("bot") == 0 || (event.body.indexOf("Bot") == 0) || (event.body.indexOf("BOT") == 0) || (event.body.toLowerCase().includes(`${global.config.goibotname}`))) {

    if (event.body == "bot" || event.body == global.config.goibotname){
      return api.sendMessage(rand, event.threadID, event.messageID);
    } else {
    //if(event.body == "bot" || event.body == "Bot" || evend.body == "BOT" || event.body == global.config.goibot) {return api.sendMessage(rand,event.threadID,event.messageID)}
    let word = event.body.replace("bot ",'')
      .replace(" " + global.config.goibotname + " ",'').replace(global.config.goibotname + " ",'');
    console.log(word);
    //const res = await axios.get(encodeURI(`https://api.simsimi.net/v2/?text=${word}&lc=ph`));
    const res = await axios.get(encodeURI(`https://free-rest-api.richardretadaof.repl.co/api/sim/simv3?type=ask&ask=${word}`));
    //if (res.data.success == "ka") {return api.sendMessage(rand,event.threadID,event.messageID)}
    //var rest = res.data.success.replace("Hindi ko alam ang sinasabi mo. Pakiusap turuan mo ako.",`${rand}`).replace(`aww, si zyx noel taboada!
//GUAPO kay na siya nya BRAYT, JOKER nya CRUSH NA NAKO!`,`${rand}`);
    var rest = res.data.answer;
    
      return api.sendMessage(rest, event.threadID, event.messageID);

    //aww, si zyx noel taboada!
//GUAPO kay na siya nya BRAYT, JOKER nya CRUSH NA NAKO!
    
    //return api.sendMessage(msg, threadID, messageID);
    }};

}

module.exports.run = function({ api, event, client, __GLOBAL }) { }