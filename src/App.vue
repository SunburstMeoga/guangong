<template>
  <div>
    <top-bar />
    <router-view />

    <footer-bar />
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

