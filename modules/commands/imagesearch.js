
module.exports.config = {
	name: "googleimage",
	version: "2.0.0",
	hasPermssion: 0,
	credits: "Plue",
	description: "Search Image",
	commandCategory: "image",
	usages: "imagesearch text - count",
	cooldowns: 60,
	dependencies: {
		  "axios":"",
		  "fs-extra":"",
		  "googlethis":"",
      "cloudscraper":""
	}
};




module.exports.run = async ({matches, event, api, extra, args}) => {
    
    const axios = global.nodemodule['axios'];
    const google = global.nodemodule["googlethis"];
const cloudscraper = global.nodemodule["cloudscraper"];
const fs = global.nodemodule["fs"];

var query = (event.type == "message_reply") ? event.messageReply.body : args.join(" ")
  const text1 = query.substr(0, query.indexOf(' - '));
  const length = parseInt(text1.length)
  const text2 = query.split(" - ").pop()
  const length_2 = parseInt(text2.length);
  //let query = args.join(" ");
  api.sendMessage(`🔎 Searching for ${text1}...`, event.threadID, event.messageID);
  
  let result = await google.image(query, {safe: false});
  if(result.length === 0) {
    api.sendMessage(`⚠️ Your image search did not return any result.`, event.threadID, event.messageID)
    return;
  }
  
  let streams = [];
  let counter = 0;
  
  console.log(result)
  
  for(let image of result) {
    // Only show 6 images
    if(counter >= `${text2}` )
      break;
      
    console.log(`${counter}: ${image.url}`);
    
    // Ignore urls that does not ends with .jpg or .png
    let url = image.url;
    if(!url.endsWith(".jpg") && !url.endsWith(".png"))
      continue;
    
   let path = __dirname + `/cache/search-image-${counter}.jpg`;
    let hasError = false;
    await cloudscraper.get({uri: url, encoding: null})
      .then((buffer) => fs.writeFileSync(path, buffer))
      .catch((error) => {
        console.log(error)
        hasError = true;
      });
      
    if(hasError)
      continue;
    
    console.log(`Pushed to streams: ${path}`) ;
    streams.push(fs.createReadStream(path).on("end", async () => {
      if(fs.existsSync(path)) {
        fs.unlink(path, (err) => {
          if(err) return console.log(err);
            
          console.log(`Deleted file: ${path}`);
        });
      }
    }));
    
    counter += 1;
  }
  
  api.sendMessage("⏳ Sending search result...", event.threadID, event.messageID)
  
  let msg = {
    body: `===== 𝗚𝗢𝗢𝗚𝗟𝗘 𝗜𝗠𝗔𝗚𝗘 =====\n\n🔎 You searched: ${text1}\nSending: ${text2}/ ${result.length} image${result.length > 1 ? 's' : ''}\n\n========================`,
    attachment: streams
  };
  
  api.sendMessage(msg, event.threadID, event.messageID);
};



  