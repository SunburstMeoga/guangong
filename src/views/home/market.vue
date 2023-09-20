<template>
  <div>
    <div class="pt-24 text-white">
      <div class="relative w-full">
        <div class="module">
          <module-title titleWord="NFT市场" />
        </div>
        <div class="absolute left-0">
          <img src="@/assets/shop-bg2.png" alt="">
        </div>
        <div class="mt-10 py-20 relative z-10">
          <!-- <div class="w-11/12 mr-auto ml-auto mt-4">
            <div v-for="(item, index) in nftRoleCards" :key="index" class="mb-4" @click="toMarketDetails(item)">
              <market-card :imageUrl="item.infor.imageUrl" :name="item.infor.name" :owner="item.owner"
                :amount="filterAmount(item.amount)" />
            </div>
          </div> -->
          <van-tabs v-model:active="active" swipeable sticky title-active-color="#E20F2A" background="#121212"
            color="#E20F2A">
            <van-tab title="NFT角色卡" class="mt-2">
              <div class="w-11/12 mr-auto ml-auto text-center pt-8 text-icon-gray text-xl"
                v-if="nftRoleCards.length == 0">
                暂无玩家出售NFT角色卡
              </div>
              <div class="w-11/12 mr-auto ml-auto">
                <div v-for="(item, index) in nftRoleCards" :key="index" @click="toMarketDetails(item)">
                  <market-card :imageUrl="item.infor.imageUrl" :name="item.infor.name" :owner="item.owner"
                    :card_type="item.infor.card_type" :amount="filterAmount(item.amount)" />
                </div>
              </div>
            </van-tab>
            <van-tab title="合成道具卡" class="mt-2">
              <div class="w-11/12 mr-auto ml-auto text-center pt-8 text-icon-gray text-xl"
                v-if="synthesisPropsCards.length == 0">
                暂无玩家出售合成道具卡
              </div>
              <div class="w-11/12 mr-auto ml-auto">
                <div v-for="(item, index) in synthesisPropsCards" :key="index" @click="toMarketDetails(item)">
                  <market-card :imageUrl="item.infor.imageUrl" :name="item.infor.name" :owner="item.owner"
                    :amount="filterAmount(item.amount)" :card_type="item.infor.card_type" />
                </div>
              </div>
            </van-tab>
            <van-tab title="战法道具卡" class="mt-2">
              <div class="w-11/12 mr-auto ml-auto text-center pt-8 text-icon-gray text-xl"
                v-if="tacticsPropCards.length == 0">
                暂无玩家出售战法道具卡
              </div>
              <div class="w-11/12 mr-auto ml-auto">
                <div v-for="(item, index) in tacticsPropCards" :key="index" @click="toMarketDetails(item)">
                  <market-card :imageUrl="item.infor.imageUrl" :name="item.infor.name" :owner="item.owner" :amount="Math.ceil(Number(item.amount * ($store.state.WGTPoint *
                    1.03)).toFixed(4))" :card_type="item.infor.card_type" />
                </div>
              </div>
            </van-tab>
            <van-tab title="出征令牌" class="mt-2">
              <div class="w-11/12 mr-auto ml-auto text-center pt-8 text-icon-gray text-xl"
                v-if="campaignProps.length == 0">
                暂无玩家出售出征令牌
              </div>
              <div class="w-11/12 mr-auto ml-auto">
                <div v-for="(item, index) in campaignProps" :key="index" @click="toMarketDetails(item)">
                  <market-card :imageUrl="item.infor.imageUrl" :name="item.infor.name" :owner="item.owner" :amount="Math.ceil(Number(item.amount * ($store.state.WGTPoint *
                    1.03)).toFixed(4))" :card_type="item.infor.card_type" />
                </div>
              </div>
            </van-tab>
          </van-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModuleTitle from '@/components/ModuleTitle'
import MarketCard from '@/components/MarketCard'
import nfts_list from '@/nft_datas/nfts_list'
import { Tab, Tabs, Popover, showToast } from 'vant';
import { marketList } from '@/request/api_request'
import { filterAmount } from '@/utils/filterValue';

export default {
  components: {
    ModuleTitle, MarketCard, [Tab.name]: Tab, [Tabs.name]: Tabs, [Popover.name]: Popover
  },
  data() {
    return {
      typeList: ['NFT角色卡', '合成道具卡', '战法道具卡', '出征令牌'],
      toggleStage: false,
      toggleTime: false,
      togglePrice: false,
      currentStage: [],
      closeOnClickAction: false,
      priceSort: '升序',
      actionsStage: [
        { text: '武圣出山', chlid: [{ text: '美髯公', checked: false }, { text: '汉寿侯', checked: false }, { text: '武圣', checked: false }] },
        { text: '百战封神', chlid: [{ text: '桃园结义', checked: false }, { text: '水淹七军', checked: false }, { text: '五虎上将', checked: false }, { text: '威震华夏', checked: false }, { text: '千里单骑', checked: false }] },
        { text: '万世流芳', chlid: [{ text: '忠义仁勇', checked: false }, { text: '武财神', checked: false }] },
      ],
      cardList: [],
      cardTypeIndex: 0,
      nftRoleCards: [],
      synthesisPropsCards: [],
      tacticsPropCards: [],
      campaignProps: []
    }
  },
  mounted() {
    // this.getMarketList()
  },
  methods: {
    filterAmount,
    getMarketList() {
      marketList()
        .then(res => {
          console.log('二手列表', res)
          let typeList = []
          res.data.map(item => {
            let obj = {}
            obj.typeID = item.nft_id > 100 ? item.nft_id % 100 : item.nft_id
            obj.tokenId = item.nft_id
            obj.amount = item.amount
            obj.owner = item.owner
            typeList.push(obj)
          })
          let newArr = typeList.filter((v) => nfts_list.some((val) => val.id == v.typeID))
          newArr.map(item => {
            nfts_list.map(_item => {
              if (item.typeID == _item.id) {
                item.infor = _item
              }
            })
          })
          newArr.map(item => {
            if (item.infor.card_type == 'nft_role') {
              this.nftRoleCards.push(item)
            } else if (item.infor.card_type == 'synthesis_props') {
              this.synthesisPropsCards.push(item)
            } else if (item.infor.card_type == 'tactics_props') {
              this.tacticsPropCards.push(item)
            } else if (item.infor.card_type == 'expedition_order') {
              this.campaignProps.push(item)
            }
          })
          // this.nftRoleCards = newArr
          console.log('newArr', newArr)

          console.log('nftRoleCards', this.nftRoleCards)
          console.log('synthesisPropsCards', this.synthesisPropsCards)
          console.log('tacticsPropCards', this.tacticsPropCards)
          console.log('campaignProps', this.campaignProps)

        })
        .catch(err => {
          console.log('err', err)
        })
    },
    onClickTab(item) {
      console.log(item.name)
      this.cardTypeIndex = item.name
      switch (item.name) {
        case 0: this.cardList = nfts_list.filter(item => {
          return item.card_type === 'nft_role'
        });
          break;
        //合成道具卡
        case 1: this.cardList = nfts_list.filter(item => {
          return item.card_type === 'synthesis_props'
        });
          break;
        // 战法道具卡
        case 2: this.cardList = nfts_list.filter(item => {
          return item.card_type === 'tactics_props'
        });
          break;
        // 出征令牌
        case 3: this.cardList = nfts_list.filter(item => {
          return item.card_type === 'expedition_order'
        });
      }
    },
    toMarketDetails(item) {
      console.log('item', item)
      if (!window.ethereum) {
        showToast('请使用钱包打开浏览器以获得更好的体验')
        return
      }
      if (!window.ethereum.selectedAddress) {
        showToast('请连接钱包')
        return
      }
      // return
      this.$router.push({
        path: '/market/' + item.tokenId
      })
    },
    handleConfirm() {
      let arr = []
      this.actionsStage.map(item => {
        item.chlid.map(_item => {
          arr.push(_item)
        })
      })
      this.currentStage = arr.filter(item => {
        return item.checked === true
      })
      this.toggleStage = false
      console.log(this.currentStage)
    },
    handleReset() {
      this.actionsStage.map(item => {
        item.chlid.map(_item => {
          _item.checked = false
        })
      })
      this.currentStage = []
    },
    uploadStage(_item) {
      _item.checked = !_item.checked
      console.log(_item)
    }
  }
}
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: contain
}

.module {
  @apply w-11/12 mr-auto ml-auto;
}

.buy-button {
  background: linear-gradient(90deg, rgba(250, 52, 168, 1) 9%, rgba(255, 150, 62, 1) 100%);
}

.button-word {
  @apply font-medium py-2 px-4 rounded text-sm flex justify-center items-center text-primary-word;
}

.campaign {
  background: rgb(89, 32, 116);
  background: linear-gradient(90deg, rgba(89, 32, 116, 1) 5%, rgba(115, 29, 120, 1) 37%, rgba(185, 20, 131, 1) 76%, rgba(226, 15, 138, 1) 100%);
}

.clicked {
  background: black;
  @apply shadow-lg;
}
</style>