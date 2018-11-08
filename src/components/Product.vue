<template lang="pug">
.box
  i.addProduct.fa.fa-plus(@click="addProduct(product)")
  .countBuyProduct.fa(:class="{'hide': countBuy < 1 }" ) {{ countBuy }}
  img.item_data.img(:src="imagesFakeProduct")
  .headerBox
    .label
      .titleBox {{ product.name }}
      .price {{ product.price}}
    .labelBox Cant. {{product.quantity}} - {{ product.available ? 'D' : 'No d' }}isponible
  .image
    .showDetail
      a 🔍
    .position
      .detail
      .info
        ul
          li Nombre: {{ product.name }}
          li sublevel_id: {{ product.sublevel_id }}
          li precio: {{ product.price}}
          li {{ product.available ? 'D' : 'No d' }}isponible
          li Cantidad: {{ product.quantity }} 
  .showAllInfo
</template>

<script>
import image from '../assets/product.jpg'
import productMixin from '@/mixins/Product'
import { mapState } from 'vuex'

export default {
  mixins: [ productMixin ],

  name: 'product',

  props: {
    product: { type: Object, requiered: true },
    car: { type: Object, requiered: true }
  },

  data () {
    return {
      isShowAllInfo: false,
      imagesFakeProduct: image
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
    z-index: 3;
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
    z-index: 1005;
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
    .labelBox {
      font-size: 12px;
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
    min-width: 250px;
    max-width: 250px;
    min-height: 250px;
    max-height: 250px;
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
      top: -198px;
      right: -124px;
      text-align: left;
      z-index: 1;
    }
    .detail {
      position: absolute;
      left: 223px;
      top: -200px;
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
      z-index: 1;
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
      z-index: 2;
    }
    &:hover {
      .detail {
        // top: -220px;
        // left: -165px;
        left: -10px;
        top: -290px;
        height: 370px;
        width: 290px;
        color: red;
        background: rgba(163, 213, 194, 0.92);
        // border: red solid 1px;
      }

      .info {
        top: -210px;
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
  font-size: 110%;
  font-weight: bold;
  color: #fff;
  text-align: center;
  line-height: 1.5em;
  transition: all .2s ease-out;
  content: '+';
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
