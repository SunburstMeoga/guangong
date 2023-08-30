import { config } from "@/const/config";

const nfts_list = [
  // 1.nft角色卡
  // 2.战法道具卡
  // 3.出征令牌
  // 4.合成道具卡
  //nft角色卡
  //武圣出山阶段
  {
    id: 1,
    name: "美髯公",
    stage: "武聖出山",
    card_type: "nft_role",
    next_nft_id: 2,
    next_need_nfts: [1, 31, 32],
    outbound_tokens_id: 81,
    imageUrl: `${config.api}/role/1.png`,
    upgrade_requirements: "",
    price: "400U",
    outbound_tokens: "關公令",
    token_value: "150U",
    cycle: "1週",
    monthly_interest_rate: "24%",
    loss_period: "135 次",
  },
  {
    id: 2,
    name: "漢壽侯",
    stage: "武聖出山",
    card_type: "nft_role",
    next_nft_id: 3,
    next_need_nfts: [2, 33, 34, 35],
    outbound_tokens_id: 81,
    imageUrl: `${config.api}/role/2.png`,
    upgrade_requirements: "美髯公 + 赤兔馬 + 青龍偃月刀",
    price: "600U",
    outbound_tokens: "關公令",
    token_value: "150U",
    cycle: "1週",
    monthly_interest_rate: "32%",
    loss_period: "150 次",
  },
  {
    id: 3,
    name: "武聖",
    stage: "武聖出山",
    card_type: "nft_role",
    next_nft_id: 4,
    next_need_nfts: [3, 36, 37],
    outbound_tokens_id: 81,
    imageUrl: `${config.api}/role/3.png`,
    upgrade_requirements: "漢壽侯 + 周倉 + 關平 + 廖化",
    price: "900U",
    outbound_tokens: "關公令",
    token_value: "150U",
    cycle: "1週",
    monthly_interest_rate: "44%",
    loss_period: "165 次",
  },
  //nft角色卡百战封神阶段
  {
    id: 4,
    name: "桃園結義",
    stage: "百戰封神",
    card_type: "nft_role",
    next_nft_id: 5,
    next_need_nfts: [3, 38, 39, 40],
    outbound_tokens_id: 82,
    imageUrl: `${config.api}/role/4.png`,
    upgrade_requirements: "武聖 + 張飛 + 劉備",
    price: "1500U",
    outbound_tokens: "結義令",
    token_value: "600U",
    cycle: "1月",
    monthly_interest_rate: "28%",
    loss_period: "36 次",
  },
  {
    id: 5,
    name: "水淹七军",
    stage: "百戰封神",
    card_type: "nft_role",
    next_nft_id: 6,
    next_need_nfts: [3, 36, 41, 42, 43],
    outbound_tokens_id: 83,
    imageUrl: `${config.api}/role/5.png`,
    upgrade_requirements: "武圣+曹仁+于禁+庞德",
    price: "1800U",
    outbound_tokens: "擒将令",
    token_value: "600U",
    cycle: "1 月",
    monthly_interest_rate: "36%",
    loss_period: "34 次",
  },
  {
    id: 6,
    name: "五虎上将",
    stage: "百戰封神",
    card_type: "nft_role",
    next_nft_id: 7,
    next_need_nfts: [3, 40, 44, 45, 46],
    outbound_tokens_id: 84,
    imageUrl: `${config.api}/role/6.png`,
    upgrade_requirements: "武圣+张飞+赵云+马超+黄忠",
    price: "2100U",
    outbound_tokens: "拜将令",
    token_value: "700U",
    cycle: "1 月",
    monthly_interest_rate: "40%",
    loss_period: "20 次",
  },
  {
    id: 7,
    name: "威震华夏",
    stage: "百戰封神",
    card_type: "nft_role",
    next_nft_id: 8,
    next_need_nfts: [3, 48, 49, 50, 51, 52, 53, 54],
    outbound_tokens_id: 85,
    imageUrl: `${config.api}/role/7.png`,
    upgrade_requirements: "武圣+华雄+颜良+文丑+庞德",
    price: "2100U",
    outbound_tokens: "斩将令",
    token_value: "800U",
    cycle: "1 月",
    monthly_interest_rate: "40%",
    loss_period: "27 次",
  },
  {
    id: 8,
    name: "千里单骑",
    stage: "百戰封神",
    card_type: "nft_role",
    next_nft_id: 9,
    next_need_nfts: [3, 55, 56, 57, 58],
    outbound_tokens_id: 86,
    imageUrl: `${config.api}/role/8.png`,
    upgrade_requirements: "武圣+孔秀+孟坦+韩福+卞喜+王植+秦琪+蔡阳",
    price: "3000U",
    outbound_tokens: "通关令",
    token_value: "1000U",
    cycle: "1 月",
    monthly_interest_rate: "38%",
    loss_period: "20 次",
  },
  // nft角色卡 万世流芳阶段
  {
    id: 9,
    name: "忠義仁勇武財神",
    stage: "萬世流芳",
    card_type: "nft_role",
    outbound_tokens_id: 87,
    imageUrl: `${config.api}/role/9.png`,
    upgrade_requirements: "武圣+忠+义+仁+勇",
    price: "4500U",
    outbound_tokens: "财神令",
    token_value: "2000U",
    cycle: "2月",
    monthly_interest_rate: "60%",
    loss_period: "20 次",
  },

  //战法道具卡
  {
    id: 59,
    name: "華佗",
    tag: "战法道具卡",
    card_type: "tactics_props",
    imageUrl: "",
    number_of_issues: "100萬張",
    prop_features:
      "获得“刮骨疗毒”战法 1 次；使用本战法，可花费角色价值的 70%USDT，将“关公荣耀卡”的损耗周期重置。",
    target: "無限制",
    price: "100U",
    tips: "注意：增益道具卡的收益率增幅降幅均以出征令牌价格为基准。",
  },
  {
    id: 60,
    name: "张角",
    tag: "战法道具卡",
    card_type: "tactics_props",
    imageUrl: "",
    number_of_issues: "10 万张",
    prop_features:
      "获得“太平道法”战法 1 次；可让自己第一代被推荐账户中所有角色下次出征时长增加 5%；出征收益增加 2%，且其中 1%划归自己。已经获得过增益效果的账户获得 1 次免疫期。",
    target: "只能对自己使用",
    price: "300U",
    tips: "注意：增益道具卡的收益率增幅降幅均以出征令牌价格为基准。",
  },
  {
    id: 61,
    name: "诸葛亮",
    tag: "战法道具卡",
    card_type: "tactics_props",
    imageUrl: "",
    number_of_issues: "10 万张",
    prop_features:
      "获得“草船借箭”战法 1 次；使用后可使自身账户和旗下直属第一代排名前 3 的被推荐账户的所有角色损耗周期延长 1 次（但该次出征时长延长 30%）；每个角色在每个损耗周期中只能接受 1 次“草船借箭”。",
    target: "無限制",
    price: "1000U",
    tips: "注意：增益道具卡的收益率增幅降幅均以出征令牌价格为基准。",
  },
  {
    id: 62,
    name: "孟获",
    tag: "战法道具卡",
    card_type: "tactics_props",
    imageUrl: "",
    number_of_issues: "10 万张",
    prop_features:
      "获得“南蛮入侵”战法 1 次；使用本卡可窃取遭受“南蛮入侵”的账号及旗下第一代推荐账户中所有角色下次出征收益的 1%。遭受过“南蛮入侵”的账号享有 3 次免疫期。",
    target: "只能对他人使用",
    price: "500U",
    tips: "注意：增益道具卡的收益率增幅降幅均以出征令牌价格为基准。",
  },
  {
    id: 63,
    name: "袁术",
    card_type: "tactics_props",
    imageUrl: "",
    tag: "战法道具卡",
    number_of_issues: "10 万张",
    prop_features:
      "可获得“窃印称帝”战法 1 次；使用后，账号中的所有角色下次出征收益提升 6%（该次出征时长增加 2 天）；第一代推荐账号的所有角色下一次出征损失 2%收益，减少 5%出征时间；获得过本效果的账号具有 2 次免疫期。",
    target: "无限制",
    price: "200U",
    tips: "注意：增益道具卡的收益率增幅降幅均以出征令牌价格为基准。",
  },

  //出征令牌
  {
    id: 81,
    imageUrl: `${config.api}/token/81.png`,
    tag: "出征令牌",
    name: "关公令",
    price: "150U",
    card_type: "expedition_order",
  },
  {
    id: 82,
    imageUrl: `${config.api}/token/82.png`,
    tag: "出征令牌",
    name: "结义令",
    price: "600U",
    card_type: "expedition_order",
  },
  {
    id: 83,
    imageUrl: `${config.api}/token/83.png`,
    tag: "出征令牌",
    name: "擒将令",
    price: "600U",
    card_type: "expedition_order",
  },
  {
    id: 84,
    imageUrl: `${config.api}/token/84.png`,
    tag: "出征令牌",
    name: "拜将令",
    price: "700U",
    card_type: "expedition_order",
  },
  {
    id: 85,
    imageUrl: `${config.api}/token/85.png`,
    tag: "出征令牌",
    name: "斩将令",
    price: "800U",
    card_type: "expedition_order",
  },
  {
    id: 86,
    imageUrl: `${config.api}/token/86.png`,
    tag: "出征令牌",
    name: "通关令",
    price: "1000U",
    card_type: "expedition_order",
  },
  {
    id: 87,
    imageUrl: `${config.api}/token/87.png`,
    tag: "出征令牌",
    name: "财神令",
    price: "2000U",
    card_type: "expedition_order",
  },

  //合成道具卡
  {
    id: 31,
    imageUrl: `${config.api}/prop_synth/31.png`,
    tag: "合成道具卡",
    card_type: "synthesis_props",
    name: "赤兔马",
    price: "100U",
  },
  {
    id: 32,
    imageUrl: `${config.api}/prop_synth/32.png`,
    tag: "合成道具卡",
    card_type: "synthesis_props",
    name: "青龙偃月刀",
    price: "100U",
  },
  {
    id: 33,
    imageUrl: `${config.api}/prop_synth/33.png`,
    tag: "合成道具卡",
    card_type: "synthesis_props",
    name: "周仓",
    price: "100U",
  },
  {
    id: 34,
    name: "关平",
    imageUrl: `${config.api}/prop_synth/34.png`,
    tag: "合成道具卡",
    card_type: "synthesis_props",
    price: "100U",
  },
  {
    id: 35,
    imageUrl: `${config.api}/prop_synth/35.png`,
    tag: "合成道具卡",
    card_type: "synthesis_props",
    name: "廖化",
    price: "100U",
  },
  {
    id: 36,
    imageUrl: `${config.api}/prop_synth/36.png`,
    tag: "合成道具卡",
    card_type: "synthesis_props",
    name: "张飞",
    price: "300U",
  },
  {
    id: 37,
    imageUrl: `${config.api}/prop_synth/37.png`,
    tag: "合成道具卡",
    card_type: "synthesis_props",
    name: "刘备",
    price: "300U",
  },
  {
    id: 38,
    imageUrl: `${config.api}/prop_synth/38.png`,
    tag: "合成道具卡",
    card_type: "synthesis_props",
    name: "曹仁",
    price: "300U",
  },
  {
    id: 39,
    imageUrl: `${config.api}/prop_synth/39.png`,
    tag: "合成道具卡",
    card_type: "synthesis_props",
    name: "于禁",
    price: "300U",
  },
  {
    id: 40,
    imageUrl: `${config.api}/prop_synth/40.png`,
    tag: "合成道具卡",
    card_type: "synthesis_props",
    name: "庞德",
    price: "300U",
  },
  {
    id: 41,
    imageUrl: `${config.api}/prop_synth/41.png`,
    tag: "合成道具卡",
    card_type: "synthesis_props",
    name: "赵云",
    price: "300U",
  },
  {
    id: 42,
    name: "马超",
    imageUrl: `${config.api}/prop_synth/42.png`,
    card_type: "synthesis_props",
    tag: "合成道具卡",
    price: "300U",
  },
  {
    id: 43,
    imageUrl: `${config.api}/prop_synth/43.png`,
    card_type: "synthesis_props",
    name: "黄忠",
    tag: "合成道具卡",
    price: "300U",
  },
  {
    id: 44,
    imageUrl: `${config.api}/prop_synth/44.png`,
    card_type: "synthesis_props",
    tag: "合成道具卡",
    name: "华雄",
    price: "300U",
  },
  {
    id: 45,
    name: "颜良",
    imageUrl: `${config.api}/prop_synth/45.png`,
    card_type: "synthesis_props",
    tag: "合成道具卡",
    price: "300U",
  },
  {
    id: 46,
    name: "文丑",
    imageUrl: `${config.api}/prop_synth/46.png`,
    card_type: "synthesis_props",
    tag: "合成道具卡",
    price: "300U",
  },
  {
    id: 47,
    name: "庞德",
    imageUrl: `${config.api}/prop_synth/47.png`,
    card_type: "synthesis_props",
    tag: "合成道具卡",
    price: "300U",
  },
  {
    id: 48,
    imageUrl: `${config.api}/prop_synth/48.png`,
    card_type: "synthesis_props",
    name: "孔秀",
    tag: "合成道具卡",
    price: "300U",
  },
  {
    id: 49,
    imageUrl: `${config.api}/prop_synth/49.png`,
    card_type: "synthesis_props",
    tag: "合成道具卡",
    name: "孟坦",
    price: "300U",
  },
  {
    id: 50,
    name: "韩福",
    imageUrl: `${config.api}/prop_synth/50.png`,
    card_type: "synthesis_props",
    tag: "合成道具卡",
    price: "300U",
  },
  {
    id: 51,
    name: "卞喜",
    imageUrl: `${config.api}/prop_synth/51.png`,
    card_type: "synthesis_props",
    tag: "合成道具卡",
    price: "300U",
  },
  {
    id: 52,
    name: "王植",
    imageUrl: `${config.api}/prop_synth/52.png`,
    card_type: "synthesis_props",
    tag: "合成道具卡",
    price: "300U",
  },
  {
    id: 53,
    name: "秦琪",
    imageUrl: `${config.api}/prop_synth/53.png`,
    card_type: "synthesis_props",
    tag: "出征令牌",
    price: "300U",
  },
  {
    id: 54,
    name: "蔡阳",
    imageUrl: `${config.api}/prop_synth/54.png`,
    card_type: "synthesis_props",
    tag: "合成道具卡",
    price: "300U",
  },
  {
    id: 55,
    name: "忠",
    imageUrl: `${config.api}/prop_synth/55.png`,
    card_type: "synthesis_props",
    tag: "合成道具卡",
    price: "900U",
  },
  {
    id: 56,
    name: "义",
    imageUrl: `${config.api}/prop_synth/56.png`,
    card_type: "synthesis_props",
    tag: "合成道具卡",
    price: "900U",
  },
  {
    id: 57,
    name: "仁",
    imageUrl: `${config.api}/prop_synth/57.png`,
    card_type: "synthesis_props",
    tag: "合成道具卡",
    price: "900U",
  },
  {
    id: 58,
    name: "勇",
    imageUrl: `${config.api}/prop_synth/58.png`,
    card_type: "synthesis_props",
    tag: "合成道具卡",
    price: "900U",
  },
];

export default nfts_list;
