<template lang="pug">
#main
  .sectionSearch
       rp-car()
       .centerTitle
       .mainSection
        .menuCategory 
         rp-menu.menuBox()
        .subLevelTitle {{  dataStore.level.name? dataStore.level.name : 'Selecciona una categoria' }} {{dataStore.level.id? ', id:'+dataStore.level.id:''}} 
          .currentProducts(v-show="dataStore.level.name")
            .sectionFilter
              rp-filter.filter()           
            .productcontainer
              .productClass(v-for="p in dataStore.productsFind")
                transition-group(name="card")
                rp-product.card( :key="p.id" :product="p")
</template>

<script>
  import categoryService from '@/services/categories'
  import RpProduct from '@/components/Product.vue'
  import RpFilter from '@/components/Filter.vue'
  import RpMenu from '@/components/Menu.vue'
  import RpNotification from '@/components/shared/Notification.vue'
  import RpCar from '@/components/Car.vue'
  import { mapState } from 'vuex'

  export default {
    name: 'app',

    components: { RpMenu, RpCar, RpProduct, RpFilter, RpNotification },

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
      this.categories = categoryService.search()
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
      ...mapState(['dataStore'])
    }
  }
</script>

<style lang="scss">
  .mainSection {
    display: inline-flex;
    flex-flow: row;
    //flex-direction: column;
  }

  div.subLevelTitle { 
    width: 100%;
    text-align: center;
    font-weight: bold;
    font-size: 20px; 
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    @media only screen and (max-width: 600px){
       box-shadow: 0 0 0 rgba(0, 0, 0, 0);
       border-radius: 0px;
    }      
  }
 
  .menuCategory {
    min-width: 200px;
    max-width: 200px;
    @media only screen and (max-width: 600px){
      display: none;
    }  
  }
  .currentProducts {
  width: 100%;
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
  .menuBox {
    display: run-in;
    top: 120px;
    position: fixed;
    background: white;
    z-index: 10008;
  }

  .filter {
    font-size: 14px;
  }
</style>
