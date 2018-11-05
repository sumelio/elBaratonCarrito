<template lang="pug">
span
  span.level(v-if="level.sublevels && level.sublevels.length > 0" )  
    span(v-if=" level.sublevels.filter( e => !e.sublevels || e.sublevels.length === 0).length > 0 ") 
     span {{ level.name }} search
    span.finalLevel(v-if=" level.sublevels.filter( e => !e.sublevels || e.sublevels.length === 0).length > 0 ") 
     level(v-for="child in level.sublevels" :id="child.id" :level="child")
    span(v-if=" ! level.sublevels.filter( e => !e.sublevels || e.sublevels.length === 0).length > 0 ") 
     span  {{ level.name }}
     level(v-for="child in level.sublevels" :id="child.id" :level="child") 
  span(v-if="!level.sublevels || !level.sublevels.length > 0" )  
    .product [ product {{ level.id }} {{ level.name }} ]
</template>

<script>
  import productMixin from '@/mixins/Product'
  import level from '@/components/Level.vue'

  export default {
    name: 'level',

    mixins: [productMixin],

    components: { level },

    props: {
      level: Object
    }
  }
</script>

<style lang="scss" scoped >
 .level {
    border: 1px solid black;
    margin: 10px; 
    min-width: 60px;
    max-width: 100%; 
    min-height: 90px;
    max-height: 90px;
    background-color: white;
    flex-direction: column;
    // display: flex;
    // flex-flow: row wrap;
 }
 .product {
    border: 1px solid black;
    margin: 10px; 
    background-color: yellow;
 }
 .finalLevel {
    display: flex;
    flex-flow: row wrap;
 }

</style>
