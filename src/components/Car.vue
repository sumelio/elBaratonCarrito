<template lang="pug">
.content.boxCar
    .carShopping
    .tableCar
      table.scroll
        thead
        tbody
          tr(v-for="product in dataStore.shippingCar.products" v-show="product.count_buy > 0" )
            td
             .tooltip
              img.imgCar(:src="product.image | absolutePath")
              span.tooltiptext {{product.name}}, Precio: {{product.price | numberToCurrency}}
            td
              .counter
                .add
                  // i.addProduct.buttonSmall(@click="product.count_buy --" ) ➖
                  i.addProduct.buttonSmall(@click="addProduct(product)" ) ➕
                .count {{product.count_buy}}
                .remove
                  //i.removeProduct.buttonSmall(@click="product.count_buy ++") ➕
                  i.removeProduct.buttonSmall(@click="removeProduct(product)") ➖
            td.priceTable  {{product.count_buy * product.price | numberToCurrency}}
      .totalBuyCar Cant: {{ dataStore.shippingCar.quantity }} Total:{{ dataStore.shippingCar.totalPrice | numberToCurrency }}
    .quantity {{ dataStore.shippingCar.totalPrice | numberToCurrency }}
</template>

<script>
  import productMixin from '@/mixins/Product'
  import { mapState } from 'vuex'
  export default {
    mixins: [productMixin],

    computed: {
      ...mapState(['dataStore'])
    }
  }
</script>

<style lang="scss" scoped >
.boxCar {
  display: run-in;
  top: 2;
  right: 0;
  position: fixed;
  z-index: 10010;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  padding: 10px;
  width: 60px;
  height: 60px;
  transition: all 0.3s;
  background: rgba(255, 113, 117, 0.55);
 .carShopping{
   width: 40px;
   height: 40px;

   background-image: url('../assets/car_small.png');
 }
 .totalBuy{
   position: absolute;
   width: 100px;
   color: black;
   font-weight: bold;
   font-size: 12px;
   background: rgba(255, 255, 255, 0.55);
 }

 .quantity {
   position: absolute;
   width: 100px;
   color: red;
   top: 140%;
   font-weight: bold;
   font-size: 12px;
   background: rgba(255, 255, 255, 0.55);
 }

 .totalBuyCar {
   display: none;
 }

 @media only screen and (max-width: 600px){
   .totalBuy {
     display: none;
   }
 }

 .tableCar {
   padding: 10px;

   table.scroll {
     display: none;
     width: 100%;
     right: 100px;
     /* 140px * 5 column + 16px scrollbar width */
     border-spacing: 0;
     padding: 100px;
     //border: 2px solid black;
     tbody, thead tr {
       //display: block;
         background: rgba(255, 255, 255, 0.85);
     }
     tbody {
       height: 150px;
       overflow-y: auto;
       overflow-x: hidden;
       td {
         width: auto;
         border-right: 1px solid black;
         word-wrap: break-word;
         font-size: 16px;
       }

       td.priceTable {
         text-align: right;
       }

      }
     } // table.scroll
  } // tableCar

  &:hover {

          display: inline;
          z-index: 10010;
          background: rgba(255, 255, 255, 0.85);
          box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
          border-radius: 15px;
          padding: 20px 15px 0px 0px;
          width: 300px;
          height: 300px;
          .carShopping{
            display: none;
          }
          .totalBuyCar{
            display: block;
            position: absolute;
            padding: 20px;
            top: 250px;
            width: 220px;
            right: 80px;
            color: black;
            font-size: 16px;
          }

          .totalBuy, .quantity{
            display: none;
          }

         .tableCar {
           padding: 15px;
           height: 270px;

           table.scroll {
            display: inline;
            right: 100px;

             /* 140px * 5 column + 16px scrollbar width */
             border-spacing: 0;
             padding: 0px ;
             //border: 2px solid black;
             tbody, thead tr {
               display: block;
                 background: rgba(255, 255, 255, 0.85);
                 td {
                   min-width: 50px;
                   width: 10%;
                 }
             }
             tbody {
               display: flow-root;
               height: 160px;
               overflow-y: auto;
               overflow-x: hidden;
               td {
                 min-width: 50px;
                 width: 10%;
                 border-right: 1px solid black;
                 word-wrap: break-word;
                 font-size: 16px;
                 .tooltip {
                   position: relative;
                   display: inline-block;
                   border-bottom: 1px dotted black;

                   span.tooltiptext {
                     z-index: 100000000;
                     visibility: hidden;
                     width: 150px;
                     background-color: #555;
                     color: #fff;
                     text-align: center;
                     border-radius: 6px;
                     padding: 5px 0;
                     position: absolute;
                     bottom: -50px;
                     left: -5px;
                     margin-left: 60px;
                     opacity: 0;
                     transition: opacity 1s;
                     &::after {
                       content: "";
                       position: absolute;
                       top: 100%;
                       left: 50%;
                       border-width: 5px;
                       border-style: solid;
         @media only screen and (max-width: 600px){
   .totalBuy {
     display: none;
   }
 }               border-color: #555 transparent transparent transparent;
                       //border: 1px red solid;
                     }
                   }
                   &:hover .tooltiptext {
                     visibility: visible;
                     opacity: 1;
                   }
                 }
               }
              }
             } // table.scroll
          } // tableCar

  } // &:hover
} // boxCar

@media only screen and (max-width: 600px){
  .boxCar {
    padding: 3px;
    width: 30px;
    height: 30px;
    background: rgba(255, 255, 255, 0.00);
  }
}

img.imgCar{
  width: 80px;
  height: auto;
}

i.addProduct {
  z-index: 10002;
  width: 40px;
  height: 40px;
  background: rgb(119, 221, 119);
  color: #fff;
  border-radius: 20px;
  text-align: center;
  line-height: 40px;
  font-size: 1.4rem;
  box-shadow: 0 0 4px 2px rgba(80, 80, 80, 0.1);
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.15);
  }
}

i.removeProduct {
  z-index: 10002;
  width: 50px;
  height: 50px;
  background: #f24e4e;
  color: #fff;
  border-radius: 25px;
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


i.deleteProduct {
  z-index: 10002;
  width: 50px;
  height: 50px;
  background: #f24e4e;
  color: #fff;
  border-radius: 25px;
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

.counter{
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  justify-content: center;
  min-width: 5px;
}

</style>
