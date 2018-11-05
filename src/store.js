import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    dataStore: {
      shippingCar: { products: [], quantity: 0, totalPrice: 0 },
      productsFind: []
    }
  },

  mutations: {
    addProduct (state, {product}) {
      product.count_buy += 1

      var productInCar = state.dataStore.shippingCar.products.filter(element => (element.id === product.id))

      if (productInCar.length === 0) {
        state.dataStore.shippingCar.products.push(product)
      }

      state.dataStore.shippingCar.totalPrice += product.price
      state.dataStore.shippingCar.quantity += 1
    },

    removeProduct (state, {product}) {
      product.count_buy -= 1
      state.dataStore.shippingCar.totalPrice -= product.price
      state.dataStore.shippingCar.quantity -= 1
    },

    setProductFind (state, {products}) {
      state.dataStore.productsFind = []
      products.forEach(element => {
        state.dataStore.productsFind.push(element)
      })
    }
  }
})

export default store
