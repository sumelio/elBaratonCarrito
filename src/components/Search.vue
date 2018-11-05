<template lang="pug">
main
  .sectionSearch
       rp-car.shoppingCar()
       rp-notification(v-show="isShowNotification")
        p(slot="body") No se encontrarón resultados
       .centerTitle Carrito
       .sectionFilter
         .contentfilter
           .searchText
             input.input.search-input(
                type="text", placeholder="Busca productos en el baratón"
                v-model="searchQuery" )
             button.button.search-button.iconf-ico-buscar(
                  @click="search" )
         .item.center-item
            button.button(v-show="!showFilter",  @click="showFilterOn") Ocultar filtros
            button.button-green(v-show="showFilter",  @click="hideFilter") Mostrar filtros
         transition(name="slide-fade")
           .contentfilter.green(:class="{'hide':false}", v-show="!showFilter")
              .filters
                .contentfilter
                  .item Disponible:
                  .item
                    label(for="availableFalse") Si
                    span.space-between
                    input(type="radio", v-model="isavailable", :value="true", id="is_available", name="is_available", @click="search")
                    span.space-between
                    label(for="availableTrue") No
                    span.space-between
                    input(type="radio", v-model="isavailable", id="is_available", name="is_available", @click="search"  )
                .contentfilter
                  .item Cantidad <= {{quantity}}
                  .item
                    input(type="range", v-model="quantity", :min="0", :max="1000")
              .filters
                .contentfilter
                  .item Precio entre $
                    input(type="number", v-model="minPrice", :min="1000000.00", :max="1000000.00")
                    span.space-between
                    span y $
                    input(type="number", v-model="maxPrice", :min="1000000.00", :max="1000000.00")
                .contentfilter
                  .item
                    label(:for="orderBy") Ordernar por:
                  .item
                    select( v-model="orderBy" id="orderBy" )
                     option( :value="1" ) Nombre
                     option( :value="2" ) Precio descendente
                     option( :value="3" ) Precio ascendente
       transition(name="move")
         rp-loader(v-show="isLoading")
       .productcontainer
        .productClass(v-for="p in orderedProducts")
          transition-group(name="card")
            rp-product.card(
                  v-blur="p.popularity",
                  :key="p.id"
                  :class="{ '': p.id === selectedProduct  }",
                  :product="p")
</template>

<script>
  import productService from '@/services/Products'
  import RpProduct from '@/components/Product.vue'
  import RpNotification from '@/components/shared/Notification.vue'
  import RpLoader from '@/components/shared/Loader.vue'
  import RpCar from '@/components/Car.vue'
  import RpProductDetail from '@/components/ProductDetail.vue'
  import Lodash from 'lodash'
  import { mapState } from 'vuex'

  export default {
    name: 'app',

    components: { 'rp-prod-detail': RpProductDetail, RpCar, RpProduct, RpLoader, RpNotification },

    data () {
      return {
        searchQuery: '',
        products: [],
        productsFilter: [],
        isLoading: false,
        isShowNotification: false,
        selectedProduct: '',
        categoryIndex: 0,
        isavailable: true,
        quantity: 10000,
        popularity: 1000000,
        minPrice: 1000,
        maxPrice: 100000.0,
        orderBy: 1,
        showFilter: true
      }
    },

    props: { apiUrl: '' },

    created () {
      this.isLoading = true
      let res = productService.search(this.searchQuery, this.apiUrl)
      this.products = res
      this.$store.commit('setProductFind', {products: res})
      this.isLoading = false
      this.productsFilter = this.products
      this.isavailable = true
    },

    watch: {
      isShowNotification () {
        this.isShowNotification = true
        if (this.isShowNotification) {
          setTimeout(() => {
            this.isShowNotification = false
          }, 3000)
        }
      },

      isavailable (newVal, oldVal) {
        this.isavailable = newVal
        this.search()
      },

      quantity (newVal, oldVal) {
        this.quantity = newVal
        this.search()
      },

      popularity (newVal, oldVal) {
        this.popularity = newVal
        this.search()
      },

      minPrice (newVal, oldVal) {
        this.minPrice = newVal
        this.search()
      },

      maxPrice (newVal, oldVal) {
        this.maxPrice = newVal
        this.search()
      },

      searchQuery (newVal, oldVal) {
        this.searchQuery = newVal
        this.search()
      }

    },

    methods: {
      search () {
        this.isLoading = true// var sefl = this
        this.products = this.productsFilter.filter(product => {
          console.log(`${product.available} === ${this.isavailable}`)
          return product.available === this.isavailable &&
          product.quantity <= this.quantity &&
          product.price >= this.minPrice &&
          product.price <= this.maxPrice &&
          (this.searchQuery === '' || product.name.toUpperCase().includes(this.searchQuery.toUpperCase()))
        })
        console.log(this.products)
        this.isLoading = false
        this.$store.commit('setProductFind', {products: this.products})
      },

      showFilterOn () {
        this.showFilter = true
      },

      hideFilter () {
        this.showFilter = false
      },

      showAllInfo () {
        this.isShowAllInfo = true
      },

      hideAllInfo () {
        this.isShowAllInfo = false
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


  .contarnerMain {
   padding: 60px 0 0 0;
  }
  .sectionSearch {
    //position: absolute;
    //border: yellow solid 2px;
    width: 100%;
    padding: 20px;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
  }

  .sectionFilter {
     // border: purple 2px solid;
  }

  .centerTitle {
    position: relative;
    text-align: center;
    font-weight: bold;
    padding: 10px 0 0 0;
  }

  @media screen and (max-width: 600px) {

    .centerTitle.responsive {
      display: none;
      text-align: center;
      font-weight: bold;
      padding: 10px 0 0 0;
    }

  }

  .filters {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    justify-content: space-evenly;
  } // fiters

  .contentfilter {
    padding: 20px;
    border-bottom: rgb(158, 211, 191) 1px solid;
  }
  .green {
    background-color: rgb(158, 211, 191);
  }
  .item {
    margin-bottom: 1px;
    border-color: green 1px solid;
  }

  @media screen and (max-width: 600px) {
    .contentfilter {
      padding: 20px;
      border-bottom: rgb(158, 211, 191) 1px solid;
      width: 100%;
    }

    .item {
      margin-bottom: 1px;
      border-color: green 1px solid;
    }
  }

  .filterItem {
    //border: rgb(255, 113, 117) solid 1px;
    border: rgb(158, 211, 191) solid;
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


   @media only screen and (max-width: 700px){
     .productClass {
       // border: 2px solid;
       border-radius: 0px;
       width: 290px;
       min-width: 290px;
       height: 360px;
       padding: 0px 0px 0px 0px;
       margin: 10px;
       box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
       border-radius: 16px;
     }
   }

  html, body {
    //background-color: #eee;
    font-family: calibri, sans-serif;
  }




  .searchText {
    display: flex;
    justify-content: space-between;
  }

  .search-input-container{
     width: 80%;
     position: relative;
     display: inline-block;
     vertical-align: middle;
     padding: 0 0 0 100px;
     zoom: 1;
    }
  .search-input {
    position: relative;
    height: 40px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    line-height: 30px;
    background: #fff;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    font-size: 20px;
    }

    .search-button {
        background: #FF7175;
        color: #9faab7;
        right: 0;
        top: 0;
        width: 150px;
        height: 40px;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        color: #fff;
        font-size: 24px;
        text-align: center;
        border: 0;
    }

    .button {
        background: #FF7175;
        color: #9faab7;
        right: 0;
        top: 0;
        width: 100%;
        max-width: 300px;
        height: 40px;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        color: #fff;
        font-size: 24px;
        text-align: center;
        border: 0;
    }

    .button-green {
      background-color: rgb(158, 211, 191);
      color: #9faab7;
      right: 0;
      top: 0;
      width: 100%;
      max-width: 300px;
      height: 40px;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      color: #fff;
      font-size: 24px;
      text-align: center;
      border: 0;
    }

    @media only screen and (max-width: 600px){
      .search-button {
          width: 40px;
          background-color: transparent;
          color: #9faab7;
      }
      .search-input {
        border: 12xp red solid;
      }
      input.input {
        margin-left: 50px;
        font-size: 16px;
      }
    }


    @media only screen and (max-width: 400px){
      .search-button {
          width: 40px;
          background-color: transparent;
          color: #9faab7;
      }
      .search-input {
        border: 12xp red solid;
      }
      input.input {
        margin-left: 0px;
        font-size: 16px;
      }
    }

    .iconf-ico-buscar:before {
      content: "🔍";
     }


    label.title {
      color: rgb(163, 213, 194 );
    }


    .box {
      background-color: white;
      border-radius: 0px;
      /* box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1); */
      box-shadow:  0 0px 0px rgba(0, 0, 0, 0.0), 0 0 0 0px rgba(0, 0, 0, 0.0);
      color: white;
      display: block;
      padding: 10px;
   }

   .shoppingCar{
     position: fixed;
     top: 120px;

   }

    @media only screen and (max-width: 400px){
      .shoppingCar{
        position: fixed;
        top: 150px;
        left: 0px;

      }
    }

   .space-between{
    padding: 10px;
   }

   .center-item{
     display: flex;
     justify-content: center;
   }

   .hide {
     display: none;
   }



</style>
