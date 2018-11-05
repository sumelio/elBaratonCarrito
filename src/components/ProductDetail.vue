<template lang="pug">
.productDetail {{productDetail.name}}
  ul(v-for="(v, k) in productDetail")
    li
      strong {{k}}&nbsp;
      span {{v}}
</template>

<script>

export default {
  name: 'product-detail',

  props: {
    productDetail: { type: Object, requiered: true }
  }

}
</script>

<style lang="scss" scoped>
</style>
