<template>
  <div>
    <top-bar v-if="this.$route.meta.showBar" />
    <router-view class="min-h-screen" />
    <footer-bar v-if="this.$route.meta.showBar" />
  </div>
</template>

<script>
import TopBar from '@/components/TopBar'
import FooterBar from '@/components/FooterBar'
import { userIncome } from '@/request/api_request'

export default {
  name: 'App',
  components: { TopBar, FooterBar },
  mounted() {
    this.$store.commit('updateUserInfor', { address: 'address' })
    this.getUserIncome()
  },
  methods: {
    getUserIncome() {
      userIncome(window.ethereum.selectedAddress)
        .then(res => {
          console.log(res)
          const { income_card, income_deposit, income_personal, income_pool, income_sum, income_team, personal } = res.data
          let obj = {
            address: window.ethereum.selectedAddress,
            income_card: income_card,
            income_deposit: income_deposit, income_personal: income_personal, income_pool: income_pool, income_sum: income_sum, income_team: income_team, personal: personal
          }

          this.$store.commit('updateUserInfor', obj)
          console.log(this.$store.state.userInfor)
        })
        .catch(err => {
          console.log('err', err)
        })
    }
  }
}
</script>
<style scoped></style>

