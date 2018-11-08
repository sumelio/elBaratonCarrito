<template lang="pug">
#filter
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
          .item
            fieldset.fieldsetFilter
              legend Disponible
              label.radio(for="availableFalse") Todos
               input(type="radio", v-model="isavailable", :value="1", id="is_available", name="is_available", @click="search")
              span.space-between
              label.radio(for="availableFalse") Si
                input(type="radio", v-model="isavailable", :value="2", id="is_available", name="is_available", @click="search")
              span.space-between
              label.radio(for="availableTrue") No 
               input.radio(type="radio", v-model="isavailable", :value="3", id="is_available", name="is_available", @click="search"  )
        .contentfilter
          fieldset.fieldsetFilter
              legend Cantidad
              span.space-between
              .item 
                span.space-between
                label.radio(for="rangeQuantity") Menos de {{quantity}} 
                span.space-between
              .item 
                input.slider.is-large(type="range", id="rangeQuantity", v-model="quantity", :min="0", :max="1000")
                span.space-between
      .filters
        .contentfilter
          .item
           fieldset.fieldsetFilter 
            legend Precio 
            .item Entre 
              input(type="number", v-model="minPrice", :min="100", :max="100000")
              span.space-between
              span y
              span.space-between
              input(type="number", v-model="maxPrice", :min="100", :max="100000")
              span.space-between
        .contentfilter
          fieldset.fieldsetFilter 
              legend Ordenar 
              .item
                label(:for="orderBy")  por
                span.space-between
                select.select( v-model="orderBy" id="orderBy" )
                  option( :value="1" ) Nombre
                  option( :value="2" ) Precio descendente
                  option( :value="3" ) Precio ascendente    
                  option( :value="4" ) Cantidad
                  option( :value="5" ) Disponibilidad
              span.space-between    
      transition(name="move")
      rp-loader(v-show="isLoading")          
     
</template>

<script>
  import productService from '@/services/Products'
  import Lodash from 'lodash'
  import RpLoader from '@/components/shared/Loader.vue'
  import { mapState } from 'vuex'
  import productMixin from '@/mixins/Product'

  export default {
    name: 'filters',
    mixins: [ productMixin ],
    components: { RpLoader },

    data () {
      return {
        searchQuery: '',
        products: [],
        productsFilter: [],
        isLoading: false,
        isShowNotification: false,
        isavailable: true,
        quantity: 10000,
        minPrice: 1000,
        maxPrice: 100000.0,
        orderBy: 1,
        showFilter: true
      }
    },

    props: { apiUrl: '' },

    created () {
      this.isLoading = true
      if (this.dataStore.productsFind.length === 0) {
        let res = productService.search(this.searchQuery, this.apiUrl)
        let productsReady = res.map(p => { p.priceInt = getInt(p.price); p.name = p.name.toLowerCase(); return p })
        this.$store.commit('setProductFind', {products: productsReady})
        this.$store.commit('setProduct', {products: productsReady})
      }
      this.isLoading = false
      this.productsFilter = this.products
      this.isavailable = 1
      this.order()
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
      },

      orderBy (newVal, oldVal) {
        this.order()
      }

    },

    methods: {
      search () {
        this.isLoading = true

        let productsFilter = this.dataStore.products.filter(item => {
          console.log(`${item.available} === ${this.isavailable}`)
          let result = (item.sublevel_id === this.dataStore.level.id &&
          (this.isavailable === 1 || item.available === (this.isavailable === 2)) &&
          item.quantity <= this.quantity &&
          item.priceInt >= this.minPrice &&
          item.priceInt <= this.maxPrice &&
          (this.searchQuery === '' || item.name.toUpperCase().includes(this.searchQuery.toUpperCase())))

          return result
        }
        )
        this.isLoading = false
        this.$store.commit('setProductFind', {products: productsFilter})
        this.order()
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
      },

      order () {
        let productsFilter = []
        switch (this.orderBy) {
          case 2:
            productsFilter = Lodash.orderBy(this.dataStore.productsFind, ['priceInt'], ['desc'])
            break
          case 3:
            productsFilter = Lodash.orderBy(this.dataStore.productsFind, ['priceInt'], ['asc'])
            break
          case 4:
            productsFilter = Lodash.orderBy(this.dataStore.productsFind, ['quantity'], ['asc'])
            break
          case 5:
            productsFilter = Lodash.orderBy(this.dataStore.productsFind, ['available'], ['desc'])
            break
          case 1:
          default:
            productsFilter = Lodash.orderBy(this.dataStore.productsFind, 'name')
        }
        this.$store.commit('setProductFind', {products: productsFilter})
      }
    },

    computed: {
      ...mapState(['dataStore'])
    }
  }
function getInt (price) {
    return parseInt(price.replace('$', '').replace(',', ''))
}
</script>

<style lang="scss">

input{
  &::-webkit-inner-spin-button{
    opacity:1; // magic!
  } 
}
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
    padding: 5px;
    border-bottom: rgb(158, 211, 191) 1px solid;
  }
  .green {
    background-color: rgb(158, 211, 191);
  }
  .item {
    margin-bottom: 1px;
    border-color: green 1px solid;
  }

  .itemPadding5 {
    margin-bottom: 1px;
    border-color: green 1px solid;
    padding: 5px;
  }

  @media screen and (max-width: 600px) {
    .contentfilter {
      padding: 5px;
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

   .fieldsetFilter {
     width: 340px;
       @media only screen and (max-width: 600px){
        width: 100%;
      }  
   }

    input[type="number"] {
     max-width: 100px;
    }


</style>
