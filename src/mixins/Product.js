const productMixin = {
  methods: {
    addProduct (product) { this.$store.commit('addProduct', {product}) },
    removeProduct (product) { this.$store.commit('removeProduct', {product}) },
    showAllInfo () { this.isShowAllInfo = true },
    hideAllInfo () { this.isShowAllInfo = false },
    setProductFind ({products}) { this.$store.commit('setProductFind', {products}) },
    setLevel ({level}) { this.$store.commit('setLevel', {level}) }
  },

  filters: {
    absolutePath (str) {
      // return str + ' things'
      return 'https://img.rappi.com/products/low/' + str
    },

    extractDescription  (str) {
    // return str + ' things'
      return str.split('.')[0]
    }

  }
}

export default productMixin
