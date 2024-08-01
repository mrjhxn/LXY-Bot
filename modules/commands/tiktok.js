const axios = require("axios")
const fs = require("fs-extra")
const request = require("request");

module.exports.config = {
  name: "tiktok",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Sen", //mod
  description: "Information from the TikTok platform",
  commandCategory: "game",
  usages: "",
  cooldowns: 5,
};

const roof = n => +n != +Math.floor(n) ? +Math.floor(n) + 1 : +n;
const localeStr = n => ((+n).toLocaleString()).replace(/,/g, '.');

module.exports.handleReply = async ({ api, event, handleReply }) => {
  const { threadID, messageID, body } = event;
  if (handleReply.author != event.senderID || !body) return;
  let args = body.split(' ');
  switch (handleReply.type) {
    case 'trending':
      const lower1 = args[0].toLowerCase();
      const lower2 = !args[1] ? '' : args[1].toLowerCase();
      if (lower1 == 'trang') {
        if (isFinite(lower2) && lower2 <= roof(handleReply.data.data.length / 6)) return runInfoTrending(handleReply.data, api, event, this.config.name, 6, +lower2)
        else return api.sendMessage(`Page ${lower2} not found in the list`, threadID, messageID);
      }
      if (isFinite(lower1) && !!lower2 && !['wm'].includes(lower2)) return api.sendMessage(`Please enter the correct format`, threadID, messageID);
      const data = handleReply.data.data[(+lower1) - 1];
      const info = { url: data[(!lower2 ? '' : lower2) + 'play'], msg: infoVideo(data) };
      axios.get(info.url, { responseType: 'stream' }).then(response => api.sendMessage({ body: info.msg, attachment: response.data }, threadID, messageID)).catch(e => api.sendMessage(e, threadID, messageID));
    case 'search':
      if (isNaN(body)) return;
      const { videoInfo } = handleReply;
      const index = parseInt(body) - 1;
      if (index < 0 || index >= videoInfo.length) return api.sendMessage("Invalid serial number", threadID, messageID);

      api.unsendMessage(handleReply.messageID);

      const { title, nickname } = videoInfo[index];
      axios.get(videoInfo[index].nowatermark, { responseType: "stream" }).then(res => {
        res.data.pipe(fs.createWriteStream(__dirname + "/cache/tiktok.mp4"));
        res.data.on("end", () => {
          api.sendMessage({ body: `====== 𝐓𝐈𝐊𝐓𝐎𝐊 ======\n\n[ ${nickname} ] ${title}`, attachment: fs.createReadStream(__dirname + "/cache/tiktok.mp4") }, threadID, () => fs.unlinkSync(__dirname + "/cache/tiktok.mp4"), messageID);
        });
      }).catch(err => console.log(err));
      break;
  }
};

module.exports.run = async ({ api, event, args }) => {
  const PREFIX = config.PREFIX;
if (!args[0]) return api.sendMessage({body:`= 𝐔𝐒𝐄𝐑 𝐌𝐀𝐍𝐔𝐀𝐋 =\n\n${PREFIX}𝘁𝗶𝗸𝘁𝗼𝗸𝗶𝗻𝗳𝗼: info search by name\n${PREFIX}𝘁𝗶𝗸𝘁𝗼𝗸 𝗶𝗻𝗳𝗼 < id >: View user info\n${PREFIX}𝘁𝗶𝗸𝘁𝗼𝗸 𝘃𝗶𝗱𝗲𝗼 <copy link>: Download video\n${PREFIX}𝘁𝗶𝗸𝘁𝗼𝗸 𝗺𝘂𝘀𝗶𝗰 <copy link>: Download audio of video\n${PREFIX}𝘁𝗶𝗸𝘁𝗼𝗸 𝘀𝗲𝗮𝗿𝗰𝗵 <keyword>: Search videos by keyword\n${PREFIX}𝘁𝗶𝗸𝘁𝗼𝗸 𝘁𝗿𝗲𝗻𝗱𝗶𝗻𝗴: Random trending videos`,attachment: fs.createReadStream(__dirname + `/cache/tiktok.jpg`) }, event.threadID,event.messageID);
  const { threadID, messageID } = event;
  const type = args[0];
  const keyword = args[1];
  switch (type.toLowerCase()) {
    case "-i":
    case "info":
      if (!args[1]) return api.sendMessage("You have not entered the account name of the user you need to view information", threadID);
      try {
        axios.get(encodeURI(`https://TIKTOKAPI-ThanhAli.thanhali.repl.co/tikin4.php?username=@${keyword}`)).then(async (res) => {
          if (res.data.erro == 1) return api.sendMessage("Account name does not exist", threadID);
          const { id, name, url, avatar, verified, privateAccount, followerCount, followingCount, videoCount, heartCount, description } = res.data;
          await axios.get(encodeURI(avatar), { responseType: 'arraybuffer' }).then((ress) => {
            const buffer = Buffer.from(ress.data, 'utf8');
            const tempDir = __dirname + "/cache/tikinfo" + id + ".png";
            fs.writeFileSync(tempDir, buffer);
            let msg = `
                        ==== 𝐈𝐍𝐅𝐎 𝐓𝐈𝐊𝐓𝐎𝐊 ====\n
                    → Account name: ${args[1]}
                    → ID: ${id}
                    → User name: ${name}
                    → URL: ${url}
                    → Description: ${description}
                    → Account Verification: ${verified ? "Turn on" : "Turn off"}
                    → Private account: ${privateAccount ? "Turn on" : "Turn off"}
                    → Followers: ${followerCount}
                    → Following: ${followingCount}
                    → Total video: ${videoCount}
                    → Heart Hits: ${heartCount}
                        `.replace(/^ +/gm, '')
            return api.sendMessage({
              body: msg,
              attachment: fs.createReadStream(tempDir),
            }, threadID, () => fs.unlinkSync(tempDir));
          })
        })
      } catch (error) { console.log(error) }
      break
    case 'search':
      args.shift();
      const search = args.join(" ");
      if (!search) return api.sendMessage("You have not entered a keyword", threadID);
      axios.get(`https://TIKTOKAPI-ThanhAli.thanhali.repl.co/tiksearch.php?keyword=${encodeURI(search)}`).then(res => {
        const { result } = res.data;
        if (result.length == 0) return api.sendMessage("No result is found", threadID);

        const lengthResult = result.length > 10 ? 10 : result.length;
        let videoInfo = [];
        let msg = `→ System found ${lengthResult} results matching your keyword:\n`;
        for (let i = 0; i < lengthResult; i++) {
          const { nickname, title, nowatermark } = result[i];
          msg += `\n\n${i + 1}. [ ${nickname} ]\n${title}`;
          videoInfo.push({ nickname, title, nowatermark });
        }
        msg += '\n\n→ Reply to this message by the number of the video to download';

        api.sendMessage(msg, threadID, (err, info) => {
          if (err) return console.log(err);
          global.client.handleReply.push({
            name: this.config.name,
            author: event.senderID,
            messageID: info.messageID,
            videoInfo,
            type: "search"
          })
        })
      }).catch(err => console.log(err));
      break
    case "-v":
    case "video":
      try {
        const res = await axios.get(`https://api-caochungdat.bokdepzai.repl.co/tiktok/download?url=${keyword}`);
        const { play, author, digg_count, comment_count, play_count, share_count, download_count, title, duration, region } = res.data.data;
        var callback = () => api.sendMessage({ body: `→ Country: ${region}\n→ Title: ${title}\n→ Channel Name: ${author.nickname}\n→ Hits: ${digg_count}\n→ Total Comments: ${ comment_count}\n→ Views: ${play_count}\n→ Shares: ${share_count}\n→ Downloads: ${download_count}\n→ Time: ${duration} seconds`, attachment: fs.createReadStream(__dirname + "/cache/tkvd.mp4") }, threadID, () => fs.unlinkSync(__dirname + "/cache/tkvd.mp4"), messageID);
        request(encodeURI(`${play}`)).pipe(fs.createWriteStream(__dirname + '/cache/tkvd.mp4')).on('close', () => callback());
      }
      catch (err) {
        console.log(err)
        return api.sendMessage("Error! An error occurred. Please try again later...", event.threadID);
      }
      break;

    case "-m":
    case "music":
      try {
        const res = await axios.get(`https://api-caochungdat.bokdepzai.repl.co/tiktok/download?url=${keyword}`);
        const { music, music_info } = res.data.data;
        var callback = () => api.sendMessage({ body: `→ Audio title: ${music_info.title}\n→ Album: ${music_info.album}\n→ Author: ${music_info.author}\n→ Time: ${music_info.duration} seconds`, attachment: fs.createReadStream(__dirname + "/cache/tkvd.mp3") }, threadID, () => fs.unlinkSync(__dirname + "/cache/tkvd.mp3"), messageID);
        request(encodeURI(`${music}`)).pipe(fs.createWriteStream(__dirname + '/cache/tkvd.mp3')).on('close', () => callback());
      }
      catch (err) {
        console.log(err)
        return api.sendMessage("Đã xảy ra lỗi...", event.threadID);
      }
      break;
    case "-tr":
    case "trending":
      axios.get(`https://docs-api.nguyenhaidang.ml/tiktok/trending`).then(response_api => {
        runInfoTrending(response_api.data, api, event, this.config.name, 6, args[1] && isNaN(args[1]) ? args[1] : 1)
      }).catch(e => api.sendMessage(e, event.threadID, event.messageID));
    default:
      break
  }
}

async function runInfoTrending(res, api, event, name, length, limit) {
  let dirTD = `${__dirname}/cache/tiktok_trending_${event.senderID}`;
  if (!fs.existsSync(dirTD)) fs.mkdirSync(dirTD, { recursive: true });
  const attachment = [];
  var txt = `= 𝐓𝐑𝐄𝐍𝐃𝐈𝐍𝐆 𝐓𝐈𝐊𝐓𝐎𝐊 =\n\n`

  for (var i = (length * limit) - length; i < length * limit; i++) {
    if (!res.data || !res.data[i]) break;
    const { title, origin_cover, duration, video_id } = res.data[i];
    // const arrSp = origin_cover.split('/');
    const dest = `${dirTD}/${video_id}.jpg`
    txt += `${i + 1}. ${title.split(' ').filter(i => !i.startsWith('#')).join(' ')}\n→ Hashtag: ${title.split(' ').filter(i => i.startsWith('#')).join(', ')}\n→ Time: ${duration} secs\n\n`;
    await DownloadImage(origin_cover, dest);
    attachment.push(fs.createReadStream(dest));
  };
  txt += `\n→ Page number [ ${limit}/${roof(res.data.length / length)} ]\n→ Reply to this message with serial number to download video without logo or sequence number + wm to download video with logo\n→ Reply to this message <page + page number> to switch pages`;

  api.sendMessage({ body: txt, attachment }, event.threadID, (err, info) => {
    if (err) return console.log(err);
    const obj = {
      name: name,
      messageID: info.messageID,
      author: event.senderID,
      data: res,
      type: 'trending'
    }
    global.client.handleReply.push(obj);
    fs.rmdirSync(dirTD, { recursive: true });
  });
};

function DownloadImage(url, path) {
  return new Promise((resolve, reject) => {
    request(url)
      .pipe(fs.createWriteStream(path))
      .on('close', () => resolve())
      .on('error', reject);
  });
}

function infoVideo(data) {
  return `==== 𝐈𝐍𝐅𝐎 𝐕𝐈𝐃𝐄𝐎 ====\n\n→ Country: ${data.region}\n→ Title: ${data.title.split(' ').filter(i => !i.startsWith('#')).join(' ' )}\n→ Hashtag: ${data.title.split(' ').filter(i => i.startsWith('#')).join(', ')}\n→ Hits: ${localeStr (data.digg_count)}\n→ Total comments: ${localeStr(data.comment_count)}\n→ Shares: ${localeStr(data.share_count)}\n→ Downloads: ${localeStr(data. download_count)}\n→ Time: ${data.duration} seconds\n→ User ID: ${data.author.unique_id}\n→ Username: ${data.author.nickname}`;
};
function infoAudio(data) {
  return `==== 𝐈𝐍𝐅𝐎 𝐀𝐔𝐃𝐈𝐎 ====\n\n→ Audio Title: ${data.music_info.title}\n→ Time: ${data.music_info.duration} seconds\n→ Author Name: ${data.music_info.author}\n→ Original audio: ${data.music_info.original == true ? 'Yes' : 'No'}`;
};