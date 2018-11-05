<template lang="pug">
aside.menu
 p.menu-label Categorias
 ul.menu-list(v-for="c in categories") 
   RpLevel(:id="c.id" :level="c")
    //- .categories
    //-  ul.menu(v-for="c in categories") 
    //-    
    //- transition(name="move")
    //- rp-loader(v-show="isLoading")
   
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
      this.categories = categoryService.search(this.searchQuery, this.apiUrl)
    }
  }
</script>

<style lang="scss" scoped >
.menu2 {
  display: run-in;
  top: 10;
  right: 100; 
  z-index: 10009;
}

.li {
    display: list-item;
    text-align: -webkit-match-parent;
}
</style>
