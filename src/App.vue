<template>
  <div>
    <top-bar v-if="this.$route.meta.showTopBar" />
    <router-view class="min-h-screen" />
    <footer-bar v-if="this.$route.meta.showBottomInfor" />
  </div>
</template>

<script>
import TopBar from '@/components/TopBar'
import FooterBar from '@/components/FooterBar'
import { userIncome } from '@/request/api_request'
import wgtContractApi from '@/request/ether_request/wgt'
import { config } from "@/const/config";
import { showDialog } from 'vant'

export default {
  name: 'App',
  components: { TopBar, FooterBar, [showDialog.name]: showDialog },
  mounted() {
    this.accountHasChanged()
    this.$store.commit('updateUserInfor', { address: window.ethereum.selectedAddress })

    this.getWgtBalance()
    this.getUserIncome()
    if (window.ethereum) {

      this.accountHasChanged()

    }
    if (window.ethereum && window.ethereum.selectedAddress) {
      this.$store.commit('updateUserInfor', { address: window.ethereum.selectedAddress })

      this.getWgtBalance()
      this.getUserIncome()
    }
  },
  methods: {
    //获取wgt余额
    async getWgtBalance() {
      const wgt = await wgtContractApi.wgtAssets(window.ethereum.selectedAddress)
      this.$store.commit('updatWgtBalance', wgt)
      console.log(this.$store.state)
    },
    //账户状态发生变化
    async accountHasChanged() {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length !== 0) {
          this.$store.commit('updateUserInfor', { address: accounts[0] })
          this.$confirm.show({
            title: "提示",
            content: "账户发生变化，请重新获取账户信息",
            showCancelButton: false,
            onConfirm: () => {
              this.$router.go(0)
            },
          });
        }
      })
    },
    //切换网络
    async switchNetwork() {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: config.chainId }],
        })
      } catch (err) {
        console.error(err)
        if (err.code === 4902) {
          try {
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: config.chainId,
                  chainName: config.chainName,
                  rpcUrls: [config.rpcUrls,],
                  blockExplorerUrls: [config.blockExplorerUrls],
                  nativeCurrency: {
                    name: 'WGT',
                    symbol: 'WGT',
                    decimals: 18
                  }
                },
              ],
            });
          } catch (addError) {
            console.log(addError)
          }

        }
      }
    },
    //已连接的网络发生变化
    async networkHasChanged() {
      window.ethereum.on('chainChanged', (chainChanged) => {
        console.log('当前链id', chainChanged)
        if (chainChanged !== config.chainId) {
          this.$confirm.show({
            title: "提示",
            content: "目前此页面仅在WGT中受支持，如果切换网络失败，请手动切换网络",
            showCancelButton: false,
            onConfirm: () => {
              this.switchNetwork()
            },
          });


        }
      })
    },
    getUserIncome() {
      userIncome(window.ethereum.selectedAddress)
        .then(res => {
          console.log('res', res)
          const { income_card, income_deposit, income_personal, income_pool, income_sum, income_team, personal } = res.data
          let obj = {
            address: window.ethereum.selectedAddress,
            income_card: income_card,
            income_deposit: income_deposit, income_personal: income_personal, income_pool: income_pool, income_sum: income_sum, income_team: income_team, personal: personal
          }

          this.$store.commit('updateUserInfor', obj)
          // console.log(this.$store.state.userInfor)
        })
        .catch(err => {
          console.log('err', err)
        })
    }
  }
}
</script>
<style scoped></style>

