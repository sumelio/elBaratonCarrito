import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    dataStore: {
      shippingCar: { products: [], quantity: 0, totalPrice: 0 },
      productsFind: [],
      products: [],
      level: {Object}
    }
  },

  mutations: {
    addProduct (state, {product}) {
      product.count_buy += 1

      var productInCar = state.dataStore.shippingCar.products.filter(element => (element.id === product.id))

      if (productInCar.length === 0) {
        state.dataStore.shippingCar.products.push(product)
      }

      state.dataStore.shippingCar.totalPrice += product.priceInt
      state.dataStore.shippingCar.quantity += 1
    },

    removeProduct (state, {product}) {
      product.count_buy -= 1
      state.dataStore.shippingCar.totalPrice -= product.priceInt
      state.dataStore.shippingCar.quantity -= 1
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
      filter.forEach(element => {
        state.dataStore.productsFind.push(element)
      })
    }
  }
})

export default store
