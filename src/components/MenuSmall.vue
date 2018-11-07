<template lang="pug">
aside.menu
 p.menu-label Categorias
  .menuList
    ul.menu-list(v-for="c in categories") 
      RpLevel(:id="c.id" :level="c")
</template>
<script>
  import RpLevel from '@/components/Level.vue'
  import categoryService from '@/services/categories'

  export default {
    components: { RpLevel },
    data () {
      return {
        categories: []
      }
    },

    created () {
      this.categories = categoryService.search()
    }
  }
</script>

<style lang="scss" scoped >

</style>
