<template lang="pug">
  #app
    rappi-header

    router-view()

    rappi-footer
</template>

<script>

import RappiFooter from '@/components/layout/Footer.vue'
import RappiHeader from '@/components/layout/Header.vue'

export default {
  name: 'app',

  components: { RappiFooter, RappiHeader }
}
</script>

<style lang="scss">
@import './scss/main.scss';
</style>
