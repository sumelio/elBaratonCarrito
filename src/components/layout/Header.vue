<template lang="pug">
   section
      .containerHeader
      #myTopnav(:class="{'topnav':istopnav, 'responsive':responsive }") 
         rp-menu-small.button-nav(:class="{'displayNone':!responsive}", to="/")
         a(:class="{'icon':true}", @click="toggle") &#9776
</template>

<script>
import RappiCar from '@/components/Car.vue'
import RpMenuSmall from '@/components/MenuSmall.vue'

export default {
  components: { RappiCar, RpMenuSmall },
  data () {
    return {
      responsive: false,
      istopnav: true
    }
  },

  methods: {
    toggle () {
      this.responsive = !this.responsive
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
    display: none;
    background: rgba(242, 246, 246, 0.5);
    color: #9faab7;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    color: #fff;
    font-size: 14px;
    text-align: center;
    border: 0;
    padding: 40px 0px 20px 0px;
    margin: 20px 0px 10px 0px;

    @media screen and (max-width: 600px) {
      display: block;
     // position: fixed;
      width: 100%;
      top: 0px;
      left: 0px;
      z-index: 1006;
    }
}


/* Add a black background color to the top navigation */
.topnav {
    background-color: rgba(158, 211, 191,0.95);
    overflow: hidden;
    position: fixed;
    width: 100%;
    top: 0px;
    left: 0px;
    z-index: 100006;

    @media screen and (max-width: 600px) {
      display: block;
     // position: fixed;
      width: 100%;
      top: 0px;
      left: 0px;
      z-index: 1006;
    }
}

/* Style the links inside the navigation bar */
.topnav a {
    float: right;
    display: block;
    color: black;
    text-align: center;
    padding: 0px 0px;
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
    font-size: 20px;
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
  .topnav.responsive {position: fixed;}
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: right;
    display: block;
    color: black;
    background-color:rgb(242, 246, 246);
    text-align: center;
    padding: 0px 0px;
    text-decoration: none;
    font-size: 17px;
  }
}

.displayNone {
  display: none;
}

</style>
