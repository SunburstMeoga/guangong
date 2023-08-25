const nfts = {
    //nft角色卡
    nfts_roles: [
        {
            stage: '武聖出山',
            roles: [
                {
                    id: 1,
                    name: '美髯公',
                    imageUrl: require('../assets/guangong1.png'),
                    upgrade_requirements: '',
                    price: '400U',
                    outbound_tokens: '關公令',
                    token_value: '150U',
                    cycle: '1週',
                    monthly_interest_rate: '24%',
                    loss_period: '135 次',
                },
                {
                    id: 2,
                    name: '漢壽侯',
                    imageUrl: require('../assets/guangong1.png'),
                    upgrade_requirements: '美髯公 + 赤兔馬 + 青龍偃月刀',
                    price: '600U',
                    outbound_tokens: '關公令',
                    token_value: '150U',
                    cycle: '1週',
                    monthly_interest_rate: '32%',
                    loss_period: '150 次',
                },
                {
                    id: 3,
                    name: '武聖',
                    imageUrl: require('../assets/guangong1.png'),
                    upgrade_requirements: '漢壽侯 + 周倉 + 關平 + 廖化',
                    price: '900U',
                    outbound_tokens: '關公令',
                    token_value: '150U',
                    cycle: '1週',
                    monthly_interest_rate: '44%',
                    loss_period: '165 次',
                }
            ]
        },
        {
            stage: '百戰封神',
            role: [
                {
                    name: '桃園結義',
                    upgrade_requirements: '武聖 + 張飛 + 劉備',
                    price: '1500U',
                    outbound_tokens: '結義令',
                    token_value: '600U',
                    cycle: '1月',
                    monthly_interest_rate: '28%',
                    loss_period: '36 次',
                },
                {
                    name: '水淹七军',
                    upgrade_requirements: '武圣+曹仁+于禁+庞德',
                    price: '1800U',
                    outbound_tokens: '擒将令',
                    token_value: '600U',
                    cycle: '1 月',
                    monthly_interest_rate: '36%',
                    loss_period: '34 次',
                },
                {
                    name: '五虎上将',
                    upgrade_requirements: '武圣+张飞+赵云+马超+黄忠',
                    price: '2100U',
                    outbound_tokens: '拜将令',
                    token_value: '700U',
                    cycle: '1 月',
                    monthly_interest_rate: '40%',
                    loss_period: '20 次',
                },
                {
                    name: '威震华夏',
                    upgrade_requirements: '武圣+华雄+颜良+文丑+庞德',
                    price: '2100U',
                    outbound_tokens: '斩将令',
                    token_value: '800U',
                    cycle: '1 月',
                    monthly_interest_rate: '40%',
                    loss_period: '27 次',
                },
                {
                    name: '千里单骑',
                    upgrade_requirements: '武圣+孔秀+孟坦+韩福+卞喜+王植+秦琪+蔡阳',
                    price: '3000U',
                    outbound_tokens: '通关令',
                    token_value: '1000U',
                    cycle: '1 月',
                    monthly_interest_rate: '38%',
                    loss_period: '20 次',
                }
            ]
        },
        {
            stage: '萬世流芳',
            role: [
                {
                    name: '忠義仁勇武財神',
                    upgrade_requirements: '武圣+忠+义+仁+勇',
                    price: '4500U',
                    outbound_tokens: '财神令',
                    token_value: '2000U',
                    cycle: '2月',
                    monthly_interest_rate: '60%',
                    loss_period: '20 次',
                }
            ]
        }
    ],
    //戰法道具卡
    tactics_props: [
        {
            name: '華佗',
            card_type: 'tactics_props',
            number_of_issues: '100萬張',
            prop_features: '获得“刮骨疗毒”战法 1 次；使用本战法，可花费角色价值的 70%USDT，将“关公荣耀卡”的损耗周期重置。',
            target: '無限制',
            price: '100U',
            tips: '注意：增益道具卡的收益率增幅降幅均以出征令牌价格为基准。'
        },
        {
            name: '张角',
            card_type: 'tactics_props',
            number_of_issues: '10 万张',
            prop_features: '获得“太平道法”战法 1 次；可让自己第一代被推荐账户中所有角色下次出征时长增加 5%；出征收益增加 2%，且其中 1%划归自己。已经获得过增益效果的账户获得 1 次免疫期。',
            target: '只能对自己使用',
            price: '300U',
            tips: '注意：增益道具卡的收益率增幅降幅均以出征令牌价格为基准。'
        },
        {
            name: '诸葛亮',
            card_type: 'tactics_props',
            number_of_issues: '10 万张',
            prop_features: '获得“草船借箭”战法 1 次；使用后可使自身账户和旗下直属第一代排名前 3 的被推荐账户的所有角色损耗周期延长 1 次（但该次出征时长延长 30%）；每个角色在每个损耗周期中只能接受 1 次“草船借箭”。',
            target: '無限制',
            price: '1000U',
            tips: '注意：增益道具卡的收益率增幅降幅均以出征令牌价格为基准。'
        },
        {
            name: '孟获',
            card_type: 'tactics_props',
            number_of_issues: '10 万张',
            prop_features: '获得“南蛮入侵”战法 1 次；使用本卡可窃取遭受“南蛮入侵”的账号及旗下第一代推荐账户中所有角色下次出征收益的 1%。遭受过“南蛮入侵”的账号享有 3 次免疫期。',
            target: '只能对他人使用',
            price: '500U',
            tips: '注意：增益道具卡的收益率增幅降幅均以出征令牌价格为基准。'
        },
        {
            name: '袁术',
            card_type: 'tactics_props',
            number_of_issues: '10 万张',
            prop_features: '可获得“窃印称帝”战法 1 次；使用后，账号中的所有角色下次出征收益提升 6%（该次出征时长增加 2 天）；第一代推荐账号的所有角色下一次出征损失 2%收益，减少 5%出征时间；获得过本效果的账号具有 2 次免疫期。',
            target: '无限制',
            price: '200U',
            tips: '注意：增益道具卡的收益率增幅降幅均以出征令牌价格为基准。'
        }
    ],
    //出征令
    expedition_order: [
        {
            name: '关公令',
            price: '150U'
        },
        {
            name: '结义令',
            price: '600U'
        },
        {
            name: '擒将令',
            price: '600U'
        },
        {
            name: '拜将令',
            price: '700U'
        },
        {
            name: '斩将令',
            price: '800U'
        },
        {
            name: '通关令',
            price: '1000U'
        },{
            name: '财神领',
            price: '2000U'
        }
    ],
    //合成道具卡
    synthesis_props: [
        {
            name: '赤兔马',
            price: '100U'
        },
        {
            name: '青龙偃月刀',
            price: '100U'
        },
        {
            name: '周仓',
            price: '100U'
        },
        {
            name: '关平',
            price: '100U'
        },
        {
            name: '廖化',
            price: '100U'
        },
        {
            name: '廖化',
            price: '100U'
        },
        {
            name: '张飞',
            price: '300U'
        },
        {
            name: '刘备',
            price: '300U'
        },
        {
            name: '曹仁',
            price: '300U'
        },
        {
            name: '于禁',
            price: '300U'
        },
        {
            name: '庞德',
            price: '300U'
        },
        {
            name: '赵云',
            price: '300U'
        },
        {
            name: '马超',
            price: '300U'
        },
        {
            name: '黄忠',
            price: '300U'
        },
        {
            name: '华雄',
            price: '300U'
        },
        {
            name: '颜良',
            price: '300U'
        },
        {
            name: '文丑',
            price: '300U'
        },
        {
            name: '庞德',
            price: '300U'
        },
        {
            name: '孔秀',
            price: '300U'
        },
        {
            name: '孟坦',
            price: '300U'
        },
        {
            name: '韩福',
            price: '300U'
        },
        {
            name: '卞喜',
            price: '300U'
        },
        {
            name: '王植',
            price: '300U'
        },
        {
            name: '秦琪',
            price: '300U'
        },
        {
            name: '蔡阳',
            price: '300U'
        },
        {
            name: '忠',
            price: '900U'
        },
        {
            name: '义',
            price: '900U'
        },
        {
            name: '仁',
            price: '900U'
        },
        {
            name: '勇',
            price: '900U'
        },
        // 道具: 赤兔马,青龙偃月刀,周仓,关平,廖化,张飞,刘备,曹仁,于禁,庞德,张飞,赵云,马超,黄忠,华雄,颜良,文丑,庞德
    //      孔秀,孟坦,韩福,卞喜,王植,秦琪,蔡阳,忠,义,仁,勇,华佗,张角,诸葛亮,孟获,袁术
    ]
}
export default nfts