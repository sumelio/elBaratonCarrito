<template lang="pug">
 li 
  a(v-show="level.sublevels && level.sublevels.length > 0"  
     @click="hideChild()") {{level.name}}
  a(:class="{'is-active': dataStore.level === level}" 
     v-show="!level.sublevels || !level.sublevels.length > 0" 
     @click="setLevel({level})") :: {{level.name}}
  ul(v-for="child in level.sublevels" v-show="childShow")
   level(:id="child.id" :level="child")
</template>

<script>
  import productMixin from '@/mixins/Product'
  import level from '@/components/Level.vue'
  import { mapState } from 'vuex'

  export default {
    name: 'level',

    mixins: [productMixin],

    components: { level },

    props: {
      level: Object
    },

    data () {
      return {
        childShow: false
      }
    },
    created () {
      this.showChild = true
    },

    methods: {
      showChild () {
        this.childShow = true
      },
      hideChild () {
        this.childShow = !this.childShow
      }
    },

    computed: {
      ...mapState(['dataStore'])
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

a {
    padding: 0;
}
</style>
