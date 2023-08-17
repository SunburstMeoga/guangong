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


export default {
  name: 'App',
  components: { TopBar, FooterBar }
}
</script>
<style scoped></style>

