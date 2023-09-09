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
import { wgtAssets } from '@/request/ether_request/wgt'
import { showDialog } from 'vant'

export default {
  name: 'App',
  components: { TopBar, FooterBar, [showDialog.name]: showDialog },
  mounted() {

    this.$store.commit('updateUserInfor', { address: 'address' })
    this.getUserIncome()
    this.accountHasChanged()
    this.getWgtBalance()

  },
  methods: {
    //获取wgt余额
    async getWgtBalance() {
      const wgt = await wgtAssets(window.ethereum.selectedAddress)
      this.$store.commit('updatWgtBalance', wgt)
      console.log(this.$store.state)
    },
    //账户状态发生变化
    async accountHasChanged() {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length !== 0) {
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
    getUserIncome() {
      userIncome(window.ethereum.selectedAddress)
        .then(res => {
          // console.log(res)
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

