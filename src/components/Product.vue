<template lang="pug">
.box
  i.addProduct.fa.fa-plus(@click="addProduct(product)")
  .countBuyProduct.fa(:class="{'hide': countBuy < 1 }" ) {{ countBuy }}
  img.item_data.img(:src="product.image | absolutePath")
  .headerBox
    .label
      .titleBox {{ product.name }}
      .price {{ product.price}}
    .titleBox {{ product.available ? 'D' : 'No d' }}isponible
  .image
    .showDetail
      a 🔍
    .position
      .detail
      .info
        ul
          li sublevel_id: {{ product.sublevel_id }}
          li {{ product.price}}
          li {{ product.available ? 'D' : 'No d' }}isponible
          li Cantidad: {{ product.quantity }} 
  .showAllInfo
</template>

<script>
// import RpCar from '@/components/Car.vue'
import RpProductDetail from '@/components/ProductDetail.vue'
import productMixin from '@/mixins/Product'
import { mapState } from 'vuex'

export default {
  mixins: [ productMixin ],

  name: 'product',

  components: { 'rp-prod-detail': RpProductDetail },

  props: {
    product: { type: Object, requiered: true },
    car: { type: Object, requiered: true }
  },

  data () {
    return {
      isShowAllInfo: false
    }
  },

  computed: {
    ...mapState(['dataStore']),
    countBuy: function () {
      let currentProduct = this.dataStore.shippingCar.products.filter(e => e.id === this.product.id)
      let countBuy = 0
      if (currentProduct && currentProduct.length > 0) {
        countBuy = currentProduct[0].count_buy
      }
      return countBuy
    }
  },

  methods: {

    showAllInfo () {
      this.isShowAllInfo = true
    },

    hideAllInfo () {
      this.isShowAllInfo = false
    },

    getCountBuy () {
      let currentProduct = this.dataStore.shippingCar.products.filter(element => (element.id === this.product.id))
      this.countBuy = currentProduct.count_buy
    }
  },

  filters: {
    absolutePath (str) {
      return 'https://static.iris.net.co/semana/upload/images/2016/10/29/502564_1.jpg'
    }
  }

}
</script>

<style lang="scss" scoped>
.box {
  position: relative;
  width: 95%;
  height: 290px;
  // border: red solid 1px;
  i.addProduct {
    z-index: 10005;
    width: 40px;
    height: 40px;
    background: rgb(119, 221, 119);
    color: #fff;
    border-radius: 20px;
    text-align: center;
    line-height: 40px;
    font-size: 1.4rem;
    position: absolute;
    right: 4px;
    top: 140px;
    box-shadow: 0 0 4px 2px rgba(80, 80, 80, 0.1);
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      transform: scale(1.15);
    }
  }

  i.removeProduct {
    z-index: 10005;
    position: absolute;
    right: 4px;
    top: 220px;
    width: 38px;
    height: 38px;
    background: #f24e4e;
    color: #fff;
    border-radius: 19px;
    text-align: center;
    line-height: 38px;
    font-size: 1.4rem;
    box-shadow: 0 0 4px 2px rgba(80, 80, 80, 0.1);
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      transform: scale(1.15);
    }
  }
  i.fa-shopping-cart {
      z-index: 10000;
      position: absolute;
      top: -600px;
      right: 0px;
      width: 300px;
      background: url(../assets/Selection_366.png) 100 100;
  }
  .countBuyProduct{
    position: absolute;
    z-index: 10005;
    width: 50px;
    height: 50px;
    color: #f24e4e;
    font-size: 20px;
    right: -4px;
    top: 190px;
    bottom: 60px;
  }
  .headerBox{
   position: absolute;
   width: 260px;
     text-align: right;
    .titleBox {
      font-size: 16px;
      padding: 10px 0 0 10px;
      color: gray;
      line-height: normal;
    }
    .label {
      margin-left: 0px;
      font-size: 18px;
      padding: 0 0 0 10px;
      color: black;
      display: flex;
      justify-content: space-between;
    }
  }
  img {
    position: absolute;
    max-height: 350px;
    width: auto;
    top: 100px;
    right: 10px;
    padding: 10px;
    transition: all 1.5s ease-in-out;
  }
  .imgBox {
    position: absolute;
    top: 0px;
    max-height: 150px;
    transition: all 2.5s ease-in-out;
  }
  .image {
    width: 50%;
    //border: 2px red solid;
    .showDetail {
      position: absolute;
      top: 93px;
      right: -124px;
      text-align: left;
    }
    .detail {
      position: absolute;
      left: 223px;
      top: 87px;
      height: 32px;
      width: 32px;
      box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
      border-radius: 16px;
      padding: 20px 15px 0px 0px;
      background: rgba(163, 213, 194, 0.09);
      transition: 0.5s ease-in-out;
      margin-bottom: 0;
      font-size: 20px;
      color: black;
      border: 2px blue static;
    }
    .info {
      position: absolute;
      top: 0px;
      height: 0px;
      transition: all 1.5s ease-in-out;
      li {
        //display: none;
        font-size: 1px;
        color: rgb(255, 255, 255);
        transition: all 1.5s ease-in-out;
      }
    }
    &:hover {
      .detail {
        // top: -220px;
        // left: -165px;
        left: -10px;
        top: -22px;
        height: 370px;
        width: 290px;
        color: red;
        background: rgba(163, 213, 194, 0.92);
        // border: red solid 1px;
      }

      .info {
        top: 60px;
        left: 50px;
        height: 240px;
        width: 230px;
        padding: 40px, 0, 0, 0;
        ul {
          display: list-item;
          list-style: circle;
          li {
            display: list-item;
            line-height: 30px;
            color: rgb(26, 26, 26);
            font-size: 18px;
            text-align: left;
            margin: 0 20px 0 0;
            background: rgba(163, 213, 194, 0.22);
          }
        }
      }
    }
  }
}

.fa {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.fa-plus:before {
  content: '➕';
}

.fa-menus:before {
  content: '➖';
}


.true-available {
  color: green;
}

.false-available {
  color: red;
}

.active-show {
  display: none;
  bottom: 0;
  color: rgba(163, 213, 194, 0.85);
}

.hide {
  display: none;
}

.boxShowAll {
  //border: red 2px solid;
}

.showAllInfoBox {
   background-color: rgb(158, 211, 191);
   width: 260px;
   height: 260px;
   overflow: scroll;
}
.windowsAllInfo {
  position: absolute;
  z-index: 1000000;
  border: 1px black solid;
  top: 5px;
  width: 260px;
  height: 280px;
  text-align: left;
  background-color: black;
}
</style>
