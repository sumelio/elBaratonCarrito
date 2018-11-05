<template lang="pug">
.contarnerApi
  .container
     label(for="apiUrl" ) Rappi API URL
     input.inputChange(type="text", id="apiUrl" v-model="apiUrl")
     button.search-button-nav(@click="changeUrl") Cambiar URL
  br
  .tableConainer
    table.table-api
      tr
        th Tipo producto
        th Url
      tr
          td Actual
          td
            | {{ apiUrl }}
      tr
        td Lacteos
        td
          | https://www.rappi.com/api-services/windu/sub_corridors/store/6660307/corridor/125772
      tr
        td Bebidas
        td
         | https://www.rappi.com/api-services/windu/sub_corridors/store/6660307/corridor/126222
      tr
        td Desayunos
        td
          | https://www.rappi.com/api-services/windu/sub_corridors/store/6660307/corridor/125841
      tr
        td Papelería
        td
          | https://www.rappi.com/api-services/windu/sub_corridors/store/6660307/corridor/126239
      tr
        td Salud
        td
          | https://www.rappi.com/api-services/windu/sub_corridors/store/6660307/corridor/126306
</template>

<script>

export default {

  data () {
    return {
      apiUrl: 'https://www.rappi.com/api-services/windu/sub_corridors/store/6660307/corridor/126222'
    }
  },

  methods: {
    changeUrl () {
      this.$bus.$emit('set-url-api', this.apiUrl)
      console.log(' Change url .......')
    }
  }
}
</script>
<style media="screen" scoped>

.contarnerApi {
 padding: 60px 0 0 0;
}
  .container{
    display: flex;
  }
  .tableConainer{
    display: flex;
    justify-content: center;

  }

  .table-api{
    width: 100%;
    max-width: 800px;
    margin-bottom: 20px;
    // background-color: rgb(163, 213, 194 );
    border-spacing: 2;
    // border-collapse: collapse;
    border: 3px solid rgb(163, 213, 194 );

  }

  td, tr, th {
    margin: 2px;
    border: 3px solid rgb(163, 213, 194 );
    padding: 10px;
    background-color: white;
  }
  .inputChange{
    width: 70%;
    padding: 5px;
    font-size: 16px;
  }
  .buttonChange{
    width: 20%;
    height: 20px;
  }
</style>
