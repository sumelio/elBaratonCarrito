<template lang="pug">
#main
  .sectionSearch
       rp-car.shoppingCar()
        p(slot="body") No se encontrarón resultados
       .centerTitle Carrito
       .sectionFilter
         rp-filter.filter()          
         transition(name="move")
         rp-loader(v-show="isLoading")
       .categories
        span(v-for="c in categories") 
          RpLevel(:id="c.id" :level="c") 
          // span {{ c.name }}
          // RpLevel.level(v-for="level in c.sublevels" :id="level.id" :level="level") 
        transition(name="move")
         rp-loader(v-show="isLoading")
       .productcontainer
        .productClass(v-for="p in orderedProducts")
          transition-group(name="card")
          rp-product.card( v-blur="p.popularity", :key="p.id" :product="p")
</template>

<script>
  import productService from '@/services/Products'
  import categoryService from '@/services/categories'
  import RpProduct from '@/components/Product.vue'
  import RpFilter from '@/components/Filter.vue'
  import RpLevel from '@/components/Level.vue'
  import RpNotification from '@/components/shared/Notification.vue'
  import RpLoader from '@/components/shared/Loader.vue'
  import RpCar from '@/components/Car.vue'
  import RpProductDetail from '@/components/ProductDetail.vue'
  import Lodash from 'lodash'
  import { mapState } from 'vuex'

  export default {
    name: 'app',

    components: { 'rp-prod-detail': RpProductDetail, RpCar, RpLevel, RpProduct, RpFilter, RpLoader, RpNotification },

    data () {
      return {
        searchQuery: '',
        products: [],
        categories: [],
        productsFilter: []
      }
    },

    props: { apiUrl: '' },

    created () {
      this.isLoading = true
      this.categories = categoryService.search(this.searchQuery, this.apiUrl)
      this.products = productService.search(this.searchQuery, this.apiUrl)
      this.$store.commit('setProductFind', {products: this.products})
      this.isLoading = false
    },

    watch: {
      isShowNotification () {
        this.isShowNotification = true
        if (this.isShowNotification) {
          setTimeout(() => {
            this.isShowNotification = false
          }, 3000)
        }
      }
    },

    computed: {
      ...mapState(['dataStore']),
      orderedProducts: function () {
        if (this.orderBy === 1) {
          return Lodash.orderBy(this.dataStore.productsFind, 'name')
        } else if (this.orderBy === 2) {
          return Lodash.orderBy(this.dataStore.productsFind, ['price'], ['desc'])
        } else {
          return Lodash.orderBy(this.dataStore.productsFind, ['price'], ['asc'])
        }
      }
    }
  }
</script>

<style lang="scss">
 .categories {
    display: flex;
    flex-flow: row wrap;
    //flex-wrap: wrap;
    //justify-content: space-evenly;
 }
 .category {
    border: 1px solid black;
    margin: 10px;
    background-color: white;
 }

 .level {
    border: 1px solid black;
    margin: 10px;  
    background-color: green;
    // flex-direction: column;
    display: flex;
    flex-flow: row wrap;
 }

   .productcontainer {
    position: relative;
    padding: 0px 0 0px 0;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
  .productClass {
    border-radius: 25px;
    width: 290px;
    height: 360px;
    padding: 10px 0px 30px 0px;
    margin: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    border-radius: 16px;
  }
</style>
