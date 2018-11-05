<template lang="pug">
   section
      .containerHeader
           .nav-center
      #myTopnav(:class="{'topnav':istopnav, 'responsive':responsive }")
         router-link.buttonNav.button-nav(to="about") Cambiar la URL de la Api REST Rappi
         router-link.buttonNav.button-nav(to="/") Carrito
         a(:class="{'icon':true}", @click="myFunction") &#9776
</template>

<script>
import RappiCar from '@/components/Car.vue'

export default {
  components: { RappiCar },
  data () {
    return {
      responsive: false,
      istopnav: true
    }
  },

  methods: {
    myFunction () {
      if (this.responsive === false) {
        this.responsive = true
      } else {
        this.responsive = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.containerHeader {
  display: flex;
  justify-content: space-between;
  background-color: rgb(158, 211, 191);
}

.nav-center{
    width: 100%;
    display: inline-block;
    text-align: center;
}

.button-nav {
    background: #FF7175;
    color: #9faab7;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    color: #fff;
    font-size: 14px;
    text-align: center;
    border: 0;
    padding: 30px;
    margin: 10px;
}


/* Add a black background color to the top navigation */
.topnav {
    background-color: rgb(158, 211, 191);
    overflow: hidden;
}

/* Style the links inside the navigation bar */
.topnav router-link a {
    float: right;
    display: block;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
}

.topnav a.buttonNav {
    float: right;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
}

a:hover {
    background-color: #ddd;
    color: black;
}

router-link:hover {
    background-color: #ddd;
    color: black;
}

/* Change the color of links on hover */


/* Add an active class to highlight the current page */
.active {
    background-color: #4CAF50;
    color: white;
}

/* Hide the link that should open and close the topnav on small screens */
.topnav .icon {
    display: none;
}

/* When the screen is less than 600 pixels wide, hide all links, except for the first one ("Home"). Show the link that contains should open and close the topnav (.icon) */
@media screen and (max-width: 600px) {
  .topnav a{display: none;}
  .topnav router-link{display: none;}
  .topnav a.icon {
    float: right;
    display: block;
  }

  .topnav a.icon {
    float: right;
    display: block;
  }
}

/* The "responsive" class is added to the topnav with JavaScript when the user clicks on the icon. This class makes the topnav look good on small screens (display the links vertically instead of horizontally) */
@media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive router-link {
    float: none;
    display: block;
    text-align: left;
    background-color: rgb(0, 0, 0);
  }

  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
    padding: 10px;
  }


}
</style>
