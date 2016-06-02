'use strict'

import React, {
  Dimensions,
} from 'react-native';
const { width, height } = Dimensions.get('window');

export const longitudeDelta = 0.005;
export const latitudeDelta = longitudeDelta*width/height;

export const DefaultAvatar={uri:'http://139.129.23.20:5000/avatarLib/avatar.jpg'}

const sip = '139.129.23.20'//

export const IP = 'http://'+sip+':5000/'

export const SOCKET_IP = 'ws://'+sip+':4201'

export const CHINA={
  beijing:{
    name:'北京',
    city:['东城','西城','崇文','宣武','朝阳','丰台','石景山','海淀','门头沟','房山','通州','顺义','昌平','大兴','平谷','怀柔','密云','延庆'],
  },
  shanghai:{
    name:'上海',
    city:['崇明','黄浦','卢湾','徐汇','长宁','静安','普陀','闸北','虹口','杨浦','闵行','宝山','嘉定','浦东','金山','松江','青浦','南汇','奉贤','朱家角'],
  },
  tianjin:{
    name:'天津',
    city:['天津','和平','东丽','河东','西青','河西','津南','南开','北辰','河北','武清','红挢','塘沽','汉沽','大港','宁河','静海','宝坻','蓟县'],
  },
  chongqing:{
    name:'重庆',
    city:['万州','涪陵','渝中','大渡口','江北','沙坪坝','九龙坡','南岸','北碚','万盛','双挢','渝北','巴南','黔江','长寿','綦江','潼南','铜梁','大足','荣昌','壁山','梁平','城口','丰都','垫江','武隆','忠县','开县','云阳','奉节','巫山','巫溪','石柱','秀山','酉阳','彭水','江津','合川','永川','南川']
  },
  hebei:{
    name:'河北',
    city:['石家庄','唐山','秦皇岛','邯郸','邢台','保定','张家口','承德','沧州','廊坊','衡水'],
  },
  shanxi:{
    name:'山西',
    city:['太原','大同','阳泉','长治','晋城','朔州','晋中','运城','忻州','临汾','吕梁'],
  },
  neimenggu:{
    name:'内蒙古',
    city:['呼和浩特','包头','乌海','赤峰','通辽','鄂尔多斯','呼伦贝尔','巴彦淖尔','乌兰察布','兴安','锡林郭勒','阿拉善'],
  },
  liaoning:{
    name:'辽宁',
    city:['沈阳','大连','鞍山','抚顺','本溪','丹东','锦州','营口','阜新','辽阳','盘锦','铁岭','朝阳','葫芦岛'],
  },
  jilin:{
    name:'吉林',
    city:['长春','吉林','四平','辽源','通化','白山','松原','白城','延边'],
  },
  heilongjiang:{
    name:'黑龙江',
    city:['哈尔滨','齐齐哈尔','鸡西','鹤岗','双鸭山','大庆','伊春','佳木斯','七台河','牡丹江','黑河','绥化','大兴安岭'],
  },
  jiangsu:{
    name:'江苏',
    city:['南京','无锡','徐州','常州','苏州','南通','连云港','淮安','盐城','扬州','镇江','泰州','宿迁'],
  },
  zhejiang:{
    name:'浙江',
    city:['杭州','宁波','温州','嘉兴','湖州','绍兴','金华','衢州','舟山','台州','丽水'],
  },
  anhui:{
    name:'安徽',
    city:['合肥','芜湖','蚌埠','淮南','马鞍山','淮北','铜陵','安庆','黄山','滁州','阜阳','宿州','巢湖','六安','亳州','池州','宣城'],
  },
  fujian:{
    name:'福建',
    city: ['福州','厦门','莆田','三明','泉州','漳州','南平','龙岩','宁德'],
  },
  jiangxi:{
    name: '江西',
    city: ['南昌','景德镇','萍乡','九江','新余','鹰潭','赣州','吉安','宜春','抚州','上饶'],
  },
  shandong:{
    name:'山东',
    city:['济南','青岛','淄博','枣庄','东营','烟台','潍坊','威海','济宁','泰安','日照','莱芜','临沂','德州','聊城','滨州','菏泽'],
  },
  henan:{
    name:'河南',
    city:['郑州','开封','洛阳','平顶山','焦作','鹤壁','新乡','安阳','濮阳','许昌','漯河','三门峡','南阳','商丘','信阳','周口','驻马店'],
  },
  hubei:{
    name:'湖北',
    city:['武汉','黄石','襄樊','十堰','荆州','宜昌','荆门','鄂州','孝感','咸宁','随州','恩施'],
  },
  hunan:{
    name:'湖南',
    city:['长沙','株洲','湘潭','衡阳','邵阳','岳阳','常德','张家界','益阳','郴州','永州','怀化','娄底','湘西'],
  },
  guangdong:{
    name:'广东',
    city:['广州','深圳','珠海','汕头','韶关','佛山','江门','湛江','茂名','肇庆','惠州','梅州','汕尾','河源','阳江','清远','东莞','中山','潮州','揭阳','云浮'],
  },
  guangxi:{
    name:'广西',
    city:['南宁','柳州','桂林','梧州','北海','防城港','钦州','贵港','玉林','百色','贺州','河池','来宾','崇左'],
  },
  hainan:{
    name:'海南',
    city:['海口','三亚'],
  },
  sichuan:{
    name:'四川',
    city:['成都','自贡','攀枝花','泸州','德阳','绵阳','广元','遂宁','内江','乐山','南充','宜宾','广安','达州','眉山','雅安','巴中','资阳',"阿坝","甘孜","凉山"],
  },
  guizhou:{
    name:'贵州',
    city:['贵阳',"六盘水","遵义","安顺","铜仁","毕节","黔西南","黔东南","黔南"],
  },
  yunnan:{
    name:'云南',
    city:['昆明','曲靖','玉溪',"保山","昭通","丽江","普洱","临沧","文山","红河","西双版纳","楚雄","大理","德宏","怒江","迪庆"],
  },
  xizang:{
    name:'西藏',
    city:["拉萨","昌都","山南","日喀则","那曲","阿里","林芝"],
  },
  sha3nxi:{
    namee:'陕西',
    city:['西安','铜川','宝鸡','咸阳','渭南','延安','汉中','榆林','安康','商洛'],
  },
  gansu:{
    name:'甘肃',
    city:["兰州","嘉峪关","金昌","白银","天水","武威","张掖","平凉","酒泉","庆阳","定西","陇南","临夏","甘南"],
  },
  qinghai:{
    name:'青海',
    city:["西宁","海东","海北","黄南","海南","果洛","玉树","海西"],
  },
  ningxia:{
    name:'宁夏',
    city:['银川',"石嘴山","吴忠","固原","中卫"],
  },
  xinjiang:{
    name:'新疆',
    city:['乌鲁木齐',"克拉玛依","吐鲁番","哈密","和田","阿克苏","喀什","克孜勒苏柯尔克孜","巴音郭楞蒙古","昌吉","博尔塔拉蒙古","伊犁哈萨克","塔城","阿勒泰"],
  },
  xianggang:{
    name:'香港',
    city:[''],
  },
  aomen:{
    name:'澳门',
    city:[''],
  },
  taiwan:{
    name:'台湾',
    city:["台北","高雄","基隆","台中","台南","新竹","嘉义"]
  }
}

export const EMPTY_STATE={
  account:{},
  badge:{
    explore: 0,
    monolith: 0,
    social: 0,
    myself: 0,
    selectedTab: "explore"
  },
  monoliths:[],
  annotations:[],
  friendRequest:[],
  chats: [],
  cacheApe: [],
  region: {
    longitude: 116.5583498288126,
    latitude: 39.92007197337571,
    longitudeDelta: longitudeDelta,
    latitudeDelta: latitudeDelta,
  }
}

export const FAKE_STATE={
  account: {
    _id: "143",
    avatar: {uri:'http://139.129.23.20:5000/avatarLib/avatar.png'},
    name: "de",
    gender: "男",
    signature:"To be or not to be",
    district:{
      province:"A",
      city:"B",
      provinceKey: 'beijing',
      cityIndex: 0,
    },
    friendList: ["172"]
  },
  badge: {
    explore: 0,
    monolith: 0,
    social: 0,
    myself: 0,
    selectedTab: "explore"
  },
  monoliths: [{
    _id: "1024",
    media: "text",
    content: {
      cxt: 'see you again'
    },
    longitude: 116.4733102487449,
    latitude: 39.91251629141919,
    birthday: Date.now(),
    deathday: Date.now(),
    droped: true,
    comments: [],
    commented: false,
    authorID: "143",
    readerID: "172",
    favoured: false,
    deleted: false,
    reported: false,
    isPickKnown: false
  },{
    _id: "256",
    media: "image",
    content: {
      cxt: {uri:'http://192.168.1.109:5000/imageLib/ml.jpg'},
      size: {
        width: 500,
        height: 500
      }
    },
    longitude: 116.4733102487449,
    latitude: 39.91251629141919,
    birthday: Date.now(),
    deathday: Date.now(),
    droped: false,
    comments: [{
      commenterID: "143",
      content: "DDD"
    }],
    badge: 0,
    commented: false,
    authorID: "172",
    readerID: "143",
    favoured: false,
    deleted: false,
    reported: false,
    isPickKnown: false,
  }],
  annotations:[{
    id: "144",
    media: "text",
    content: {
      cxt: '我觉得生命乏善可陈'
    },
    longitude: 116.3408498745911,
    latitude: 40.07323303216248,
    birthday: Date.now(),
    droped: true,
    comments: [],
    commented: false,
    authorID: 0,
    readerID: 1,
    favoured: false,
    deleted: false
  }],
  friendRequest: [{
    out: false,
    _id: "111",
    fromID: "172",
    toID: "143",
    time: Date.now(),
    answer: false,
    isReadByTo: false,
    isAnsweredByTo: false,
    isAnswerReadByFrom: false
  },{
    out: true,
    _id: "112",
    fromID: "143",
    toID: "179",
    time: Date.now(),
    answer: false,
    isReadByTo: false,
    isAnsweredByTo: false,
    isAnswerReadByFrom: false
  }],
  chats: [{
    fid: "172",
    badge: 0,
    msg:[{
      fromID: "143",
      toID: "172",
      message: "Hi",
      time: Date.now()
    }]
  }],
  cacheApe:[{
    _id: "172",
    avatar: {uri:'http://139.129.23.20:5000/avatarLib/avatar.png'},
    name: "Bad",
    gender: "男",
    signature:"To be or not to be",
    district:{
      province:"A",
      city:"B"
    }
  },{
    _id: "200",
    avatar: {uri:'http://139.129.23.20:5000/avatarLib/avatar.png'},
    name: "Mod",
    gender: "男",
    signature:"To be or not to be",
    district:{
      province:"A",
      city:"B"
    }
  }],
  region: {
    longitude: 116.3408498745911,
    latitude: 40.07323303216248,
    longitudeDelta: longitudeDelta,
    latitudeDelta: latitudeDelta,
  }
}

// module.exports = {
//   CHINA:CHINADistrict,
//   longitudeDelta: LongDelta,
//   latitudeDelta: LatiDelta,
//   DefaultAvatar,
//   IP,
//   SOCKET_IP,
//   FAKE_STATE,
//   EMPTY_STATE
// }
