import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import Lodash from 'lodash'

Vue.use(Vuex)
var localStorage
const vuexPersist = new VuexPersist({
  key: 'my-app',
  storage: localStorage
})

const store = new Vuex.Store({
  state: {
    dataStore: {
      shippingCar: { products: [], quantity: 0, totalPrice: 0 },
      productsFind: [],
      products: [],
      level: {Object}
    }
  },
  plugins: [vuexPersist.plugin],

  mutations: {
    addProduct (state, {product}) {
      var productInCar = state.dataStore.shippingCar.products.filter(element => (element.id === product.id))

      if (productInCar.length === 0) {
        state.dataStore.shippingCar.products.push(product)
        product.count_buy += 1
      } else {
        state.dataStore.shippingCar.products.forEach(element => {
          if (element.id === product.id) {
            element.count_buy += 1
          }
        }
        )
      }

      state.dataStore.shippingCar.totalPrice += product.priceInt
      state.dataStore.shippingCar.quantity += 1
    },

    removeProduct (state, {product}) {
      if ((product.count_buy) > 0) {
        product.count_buy -= 1

        state.dataStore.shippingCar.totalPrice -= product.priceInt
        state.dataStore.shippingCar.quantity -= 1
        if (product.count_buy === 0) {
          let index = state.dataStore.shippingCar.products.indexOf(product)
          state.dataStore.shippingCar.products.splice(index, 1)
        }
      }
    },

    removeProductAll (state, {product}) {
      if ((product.count_buy) > 0) {
        state.dataStore.shippingCar.totalPrice -= product.count_buy * product.priceInt
        state.dataStore.shippingCar.quantity -= product.count_buy
        product.count_buy = 0
        let index = state.dataStore.shippingCar.products.indexOf(product)
        state.dataStore.shippingCar.products.splice(index, 1)
      }
    },
    setProduct (state, {products}) {
      state.dataStore.products = []
      products.forEach(element => {
        state.dataStore.products.push(element)
      })
    },

    setProductFind (state, {products}) {
      state.dataStore.productsFind = []
      products.forEach(element => {
        state.dataStore.productsFind.push(element)
      })
    },

    setLevel (state, {level}) {
      state.dataStore.level = level
      state.dataStore.productsFind = []
      let filter = state.dataStore.products.filter((element) => element.sublevel_id === state.dataStore.level.id)
      filter = Lodash.orderBy(filter, 'name')
      filter.forEach(element => {
        state.dataStore.productsFind.push(element)
      })
    },

    buy (state) {
      state.dataStore.shippingCar.products = []
      state.dataStore.shippingCar.quantity = 0
      state.dataStore.shippingCar.totalPrice = 0
      state.dataStore.productsFind = []
      state.dataStore.level = {}
    }
  }
})

export default store
