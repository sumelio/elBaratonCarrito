const productMixin = {
  methods: {
    addProduct (product) { this.$store.commit('addProduct', {product}) },
    removeProduct (product) { this.$store.commit('removeProduct', {product}) },
    showAllInfo () { this.isShowAllInfo = true },
    hideAllInfo () { this.isShowAllInfo = false },
    setProductFind ({productFilter}) { this.$store.commit('setProductFind', {productFilter}) },
    setProduct ({products}) { this.$store.commit('setProduct', {products}) },
    setLevel ({level}) {
      this.$store.commit('setLevel', {level})
    }
  },

  filters: {
    absolutePath (str) {
      // return str + ' things'
      return 'https://img.rappi.com/products/low/' + str
    }

  }
}

export default productMixin
