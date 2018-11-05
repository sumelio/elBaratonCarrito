<template lang="pug">
  #app
    rappi-header

    router-view(:apiUrl="apiUrl")

    rappi-footer
</template>

<script>

import RappiFooter from '@/components/layout/Footer.vue'
import RappiHeader from '@/components/layout/Header.vue'

export default {
  name: 'app',

  components: { RappiFooter, RappiHeader },

  data () {
    return {
      apiUrl: 'https://www.rappi.com/api-services/windu/sub_corridors/store/6660307/corridor/125841'
    }
  },

  created () {
    console.log('Create..................................................')
    this.$bus.$on('set-url-api', (url) => {
      console.log('App ... ' + url)
      this.apiUrl = url
      // this.apiUrl = url
    })
  }
}
</script>

<style lang="scss">
@import './scss/main.scss';
</style>
