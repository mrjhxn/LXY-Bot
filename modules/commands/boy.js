  module.exports.config = {
  name: "boy",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "HungCho",
  description: "Random boy picturesl",
  commandCategory: "Image",
  usages: "boy",
  cooldowns: 5,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
    
};

module.exports.run = async({api,event,args,Users,Threads,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
  var link = [
	 "https://i.postimg.cc/N01tYTKr/006amxlyly1fmpz7md3iqj31jk2bc7wk-1537769329620518488446.jpg",
"https://i.postimg.cc/ydjz3HX1/006amxlyly1fmpz8lvp6pj31jk2bckjn-1537769526231706388446-153900434989481543419.jpg",
"https://i.postimg.cc/J0hCb2Pb/006amxlyly1fqeay6n9gij31a20yjk2p-1537769329623782523772.jpg",
"https://i.postimg.cc/VLS3mMTL/0223-52609139-2210277149192385-2811100977640243200-n.jpg","https://i.postimg.cc/W1gCJVTB/0225-52688560-2210277012525732-5248890463133368320-n.jpg",
"https://i.postimg.cc/TPxSVsPp/0227-52827991-2210277082525725-4678801204619247616-n.jpg",
"https://i.postimg.cc/KjCpRqVc/236079641-161311159469472-8113468838576383906-n.jpg",
"https://i.postimg.cc/nrXwVb3w/2625707.jpg",
"https://i.postimg.cc/QxWnRD9F/335404961716358035326773451176350285561856n-15369288683531516983484.jpg",
"https://i.postimg.cc/vBFmtbV5/4-275x300.jpg",
"https://i.postimg.cc/ncgfDT7D/40eebb0f0752400bfbd928ffb2eafc41.jpg",
"https://i.postimg.cc/DwGkdsdY/42.jpg",
"https://i.postimg.cc/fRcqRvvZ/445180571247150085090405116013198721417216n-15404467912531070074506.jpg",
"https://i.postimg.cc/CKC39g2G/49d54920ee24ac11e13619d7c907050d.jpg",
"https://i.postimg.cc/vBQJsKRp/50dd1f84acf66abe28ce3147e2c446f5.jpg",
"https://i.postimg.cc/j2vdTfkh/5cc322982cb8ca7a34ad6b50-m.jpg",
"https://i.postimg.cc/0QYytFYF/5cc51938d6981-a9929d3b702c585868c246292fa96f32-600x450.jpg",
"https://i.postimg.cc/dQfxH31M/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f.jpg",
"https://i.postimg.cc/tCYHJ81b/6OfXCUP.jpg",
"https://i.postimg.cc/0NC4cC6Z/767e782bc1566e5336a56faf210b05d4.jpg",
"https://i.postimg.cc/vBHNj6fy/819bfffb9c1f6ac39e4c6951878e865c.jpg",
"https://i.postimg.cc/XJHz07kC/987tdfcghjiu6.jpg",
"https://i.postimg.cc/KYmqkg9T/a7d6e7e7cadb4f468162f0d94fd39702.jpg",
"https://i.postimg.cc/0NZtp23B/a832e5161862f049301b11b8f4d40b42.jpg",
"https://i.postimg.cc/B66mNffQ/anh-boy-dep-dau-nam-cute-3.jpg",
"https://i.postimg.cc/NGycfW2c/anh-trai-dep-10x-viet-nam-085754527.jpg",
"https://i.postimg.cc/wvG0G495/Anh-Trai-Dep-2-K-1.jpg",
"https://i.postimg.cc/vTx3F7mJ/anh-trai-dep-2k1.jpg",
"https://i.postimg.cc/Wbgc0g7Y/anh-trai-dep-han-quoc-0-1.jpg",
"https://i.postimg.cc/0yvRnjWk/anh-trai-dep-viet-nam.jpg",
"https://i.postimg.cc/jShVFTmz/anh-trai-dep-viet-nam-8.jpg",
"https://i.postimg.cc/DmV52WJ8/anh-trai-dep8.jpg",
"https://i.postimg.cc/3wJMM6Qz/avadoc.jpg",
"https://i.postimg.cc/DzC97g20/b1234f469905705b2914.jpg",
"https://i.postimg.cc/RFNjhHFR/bi-che-la-yeu-duoi-420439.jpg",
"https://i.postimg.cc/hj6NdtQq/c28dbaa8ly1fcwuxzfayxj20qo0ziaii-1510386044668.jpg",
"https://i.postimg.cc/fWSGhm1W/dau-nam-hot-boy-Taihinhanh-Vn-6.jpg",
"https://i.postimg.cc/m2x0ZhGY/EEAF5-D7-C-3765-469-B-94-D6-C85-F5-E4-A6-C79.jpg",
"https://i.postimg.cc/pLR487ry/ef6654a8a83dbe7451ca1aeb147308c2.jpg",
"https://i.postimg.cc/Sxd5GrYd/gokugochu3.png",
"https://i.postimg.cc/MGGL3QyS/hinh-anh-trai-cool-ngau-18.jpg",
"https://i.postimg.cc/nh3RmhNw/hinh-anh-trai-de-thuong-14.jpg",
"https://i.postimg.cc/8Cn02zHr/hinh-anh-trai-dep.jpg",
"https://i.postimg.cc/4dDF32jf/hinh-anh-trai-dep-4.jpg",
"https://i.postimg.cc/m2G5fqQV/hinh-anh-trai-dep-han-quoc.jpg",
"https://i.postimg.cc/K8Gp4MpM/hinh-anh-trai-dep-han-quoc-voi-than-tuong-noi-tieng.jpg",
"https://i.postimg.cc/hjz5cRyZ/hinh-anh-trai-dep-dau-nam-hot-boy-2k-Wap102-25.jpg",
"https://i.postimg.cc/zvT2HS1n/hinh-anh-trai-depdau-nam-hot-boy-2k-Wap102-11.jpg",
"https://i.postimg.cc/mrhdyGsZ/hinh-nen-dien-thoai-trai-han-quoc-1.jpg",
"https://i.postimg.cc/yN5Lfr1m/hoi-ban-than-cuc-pham-2.jpg",
"https://i.postimg.cc/Pxw20zJB/hoi-fangirl-dieu-dung-vi-2-hotboy-qua-dep-trai-ngo-dau-lai-la-2-chi-em-sinh-doi-e7798e.jpg",
"https://i.postimg.cc/WzcXVFJt/hot-boy-2k5-so-huu-guong-mat-dien-trai-cung-nu-cuoi-ngot-ngao.jpg",
"https://i.postimg.cc/xdkRbyvc/imager-11384.jpg",
"https://i.postimg.cc/h4V2rrHm/imager-2-141319-700.jpg",
"https://i.postimg.cc/FsmDnS4B/imager-5-5917-700.jpg",
"https://i.postimg.cc/15HJxzR5/imager-5-64074-700.jpg",
"https://i.postimg.cc/q79GchwQ/images.jpg",
"https://i.postimg.cc/50LSs4kJ/lo-tuan-anh-la-ai-1-35express.jpg",
"https://i.postimg.cc/Y07fV5JW/mk-HHGDP0n-DXEg36-Ro26-G6u-MDjc-Szr7-L2y-Qpep6hz.jpg",
"https://i.postimg.cc/7hNMyBkQ/my-nam-tik-tok-9.jpg",
"https://i.postimg.cc/Wpm7r4k6/my-nam-tik-tok-91.jpg",
"https://i.postimg.cc/Yqbfny8v/Nam-Vi-t-Nam-che-m-t-cute.jpg",
"https://i.postimg.cc/159rKZ0x/namsinhdhluathanoihadithamdoithucdeptrainhugiangthan20190821021723-ab59875e.jpg",
"https://i.postimg.cc/K8j7drsJ/nb-2-WSZS.jpg",
"https://i.postimg.cc/Qdzgs92s/nguyen-phuoc-nguyen.jpg",
"https://i.postimg.cc/63Jd4s6m/nguyen-phuoc-nguyen-y-696x687.jpg",
"https://i.postimg.cc/LXtjzyn6/photo-5-16030716267891349992191.jpg",
"https://i.postimg.cc/901Tkrd6/screen-shot-2018-09-14-at-72254-pm-15369290081751198242027.png",
"https://i.postimg.cc/CM4j563c/tieu-su-tiktok-pham-anh-tuan-3.jpg",
"https://i.postimg.cc/jddy74Kt/tieu-su-tiktok-pham-anh-tuan-4.jpg",
"https://i.postimg.cc/MpnRsZvL/trai-dep-02-1046.jpg",
"https://i.postimg.cc/bvbnh60H/Trai-dep-2k7-6.jpg",
"https://i.postimg.cc/FzbkL1Cf/trai-dep-2k7-2k8-pi102.jpg",
"https://i.postimg.cc/J41GFrdq/Trai-dep-che-mat-chat-21.jpg",
"https://i.postimg.cc/8PtjQ22V/trai-dep-trung-quoc.jpg",
"https://i.postimg.cc/MpLHXyZP/trai-dep-trung-quoc-2.jpg",
"https://i.postimg.cc/rptm4KK8/trai-dep-trung-quoc-tren-tik-tok.jpg",
"https://i.postimg.cc/2jd1TbTy/traidep03-1595384144.jpg"
];
  var max = Math.floor(Math.random() * 6);  
var min = Math.floor(Math.random() * 2);
  var data = await Currencies.getData(event.senderID);
  var exp =  data.exp;
  var money = data.money
      if(money < 200) api.sendMessage("You need 200$ to see the photo!",event.threadID,event.messageID)
          else {
   Currencies.setData(event.senderID, options = {money: money -200})
   var callback = () => api.sendMessage({body:`Pictures of handsome boy\nNumber of Photos: ${link.length}\n-200 dollars !`,attachment: fs.createReadStream(__dirname + "/cache/1.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.jpg"), event.messageID); 
      return request(encodeURI(link[Math.floor(Math.random() * link.length)] + (max - min))).pipe(fs.createWriteStream(__dirname+"/cache/1.jpg")).on("close",() => callback());
     }
   };