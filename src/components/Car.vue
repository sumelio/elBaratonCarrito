<template lang="pug">
.content.boxCar
    .carShopping
    .tableCar
      table.scroll.is-scrollable
        thead
        tbody
          tr(v-for="product in dataStore.shippingCar.products" v-show="product.count_buy > 0" )
            td
             .tooltip
              img.imgCar(:src="product.image | absolutePath")
              span.tooltiptext {{product.name}}, Precio: {{product.price}}, sublevel_id: {{product.sublevel_id}} 
            td
              .counter
                .add
                  i.addProduct(@click="addProduct(product)" ) 
                   .plus +
                .counterProduct {{product.count_buy}}
                .remove
                  i.removeProduct(@click="removeProduct(product)") 
                   .minus - 
                .remove
                  i.removeProduct(@click="removeProductAll(product)") 
                   .minusAll -    
            td
             span.priceTable {{product.count_buy * product.priceInt | numberToCurrency}}
      .totalBuyCar Cant: {{ dataStore.shippingCar.quantity }} Total:{{ dataStore.shippingCar.totalPrice | numberToCurrency }}
      .buy 
        button.button.buttonBuy(@click="buy") Comprar
    .quantity {{ dataStore.shippingCar.totalPrice | numberToCurrency }}
    .quantitySmall {{ dataStore.shippingCar.quantity }}
</template>

<script>
  import image from '../assets/product.jpg'
  import productMixin from '@/mixins/Product'
  import { mapState } from 'vuex'
  export default {
    mixins: [productMixin],

    computed: {
      ...mapState(['dataStore'])
    },

    filters: {
      absolutePath (str) {
        return image
      }
    }
  }
</script>

<style lang="scss" scoped >

.buttonBuy {
  height: 46px;
  padding: 1
}
.boxCar {
  display: run-in;
  top: 6px;
  left: 6px;
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
   top: 130%;
   font-weight: bold;
   font-size: 13px;
   background: rgba(255, 255, 255, 0.55);
   @media only screen and (max-width: 600px){
     display: none;
   }
 }

 .quantitySmall {
   display: none;
   @media only screen and (max-width: 600px){
        position: absolute;
        width: 10px;
        top: 130%;
        left: 20px;
        font-weight: bold;
        font-size: 13px; 
        display: block;
   }
 }


 .totalBuyCar {
   display: none;
 }

  .buy {
   display: none;
 }

 @media only screen and (max-width: 600px){
   .totalBuy {
     display: none;
   }
 }

.priceTable {
  text-align: right;
  font-size: 12px;
}
 .tableCar {
   padding: 10px;
   transition: opacity 5s;
   table.scroll {
     display: none;
     width: 10%;
     right: 10px;
     /* 140px * 5 column + 16px scrollbar width */
     border-spacing: 0;
     padding: 100px;
     font-size: 8px;
     transition: opacity 5s;
     //border: 2px solid black;
     tbody, thead tr {
       //display: block;
         //background: rgba(255, 255, 255, 0.85);
     }
     tbody {
       height: 150px;
       overflow-y: auto;
       overflow-x: hidden;
       td {
         width: auto;
         border-right: 1px solid black;
         word-wrap: break-word;
         font-size: 60px;
       }
      }
     } // table.scroll
  } // tableCar

  &:hover {
          z-index: 10010;
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
          border-radius: 15px;
          padding: 20px 15px 0px 0px;
          width: 300px;
          height: 300px;
          .carShopping{
            display: none;
          }
          .buy{
            display: block;
            position: absolute;
            padding: 20px;
            top: 230px;
            width: 220px;
            right: 40px;
            color: black;
            font-size: 16px;
          }

          .totalBuyCar{
            display: block;
            position: absolute;
            padding: 20px;
            top: 200px;
            width: 220px;
            right: 40px;
            color: black;
            font-size: 16px;
          }

          .totalBuy, .quantity, .quantitySmall{
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
                 //background: rgba(255, 255, 255, 0.85);
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
                 border-right: 1px solid rgba(255, 255, 255, 0.85);
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
                      }               
                    border-color: #555 transparent transparent transparent;
                       //border: 1px red solid;
                     }
                   }
                   &:hover .tooltiptext {
                     visibility: visible;
                     opacity: 1;
                   }
                 }
               }
              } // End tbody {
             } // table.scroll
          } // tableCar

  } // &:hover
} // boxCar

@media only screen and (max-width: 600px){
  .boxCar {
    top: 20px;
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
  height: 40px;
  width: 50px;
  margin: red;
  color: rgb(119, 221, 119);
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 0 4px 2px rgba(80, 80, 80, 0.1);
  &:hover {
    transform: scale(1.15);
  }
}

.plus {
  color: rgb(119, 221, 119);
  height: 40px;
  width: 20px;
  text-align: center;
  line-height: 40px;
  box-shadow: 0 0 4px 2px rgba(80, 80, 80, 0.1);
  font-size: 20px; 

}

i.removeProduct {
  z-index: 10002;
  color: #f24e4e;
  border-radius: 20px;
  
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.15);
  }
}
.minus {
  color: #f24e4e;
  height: 40px;
  width: 20px;
  text-align: center;
  line-height: 40px;
  box-shadow: 0 0 4px 2px rgba(80, 80, 80, 0.1);
  font-size: 20px; 
}

.minusAll {
  color: white;
  background: #f24e4e;
  height: 40px;
  width: 20px;
  text-align: center;
  line-height: 40px;
  box-shadow: 0 0 4px 2px rgba(80, 80, 80, 0.1);
  font-size: 20px; 
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

.counterProduct{
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  justify-content: center;
  min-width: 5px;
  padding: 5px;
}

.counter {
    display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  justify-content: center;
  min-width: 5px;
  padding: 0px;
}

</style>
