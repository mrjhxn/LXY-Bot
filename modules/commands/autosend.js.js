module.exports.config = {
    name: 'autosend',
    version: '10.02',
    hasPermssion: 0,
    credits: 'MAVERICK',
    description: 'Automatically send messages according to the set time!',
    commandCategory: 'ADMIN',
    usages: '[]',
    cooldowns: 3
};
const nam = [{
    timer: '11:00:00 PM',
    message: [`Good night everyone, I'm a Bot and you're the one in late night, you should go to sleep. See you again tomorrow.`]
},
{
    timer: '1:00:00 PM',
    message: [`Have a nice afternoon everyone., Have a nice afternoon and have enough energy to fight through today.`]
},
{
    timer: '6:00:00 AM',
    message: [`Good morning everyone, Have a nice day.`]
},
{
    timer: '11:30:00 AM',
    message: [`Wishing everyone a good afternoon rest, If you're tired from fighting in the morning, you should rest for a while.`]
}];
module.exports.onLoad = o => setInterval(() => {
    const r = a => a[Math.floor(Math.random()*a.length)];
    if (á = nam.find(i => i.timer == new Date(Date.now()+25200000).toLocaleString().split(/,/).pop().trim())) global.data.allThreadID.forEach(i => o.api.sendMessage(r(á.message), i));
}, 1000);
module.exports.run = o => {};