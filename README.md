## Objetivo del proyecto ShoppingCarRappi

Este proyecto tiene como objetivo hacer un Fake del carrito de compras de Rappi usando las tecnologías de VueJS 2.5
La página esta publicada en github https://sumelio.github.io/shoppingCarRappi/#/

# Como ejecutar el proyecto en un ambiente local

1. En la carpeta raíz ejecutar:
``` bash
npm install
```

2. Editar el archvio index.html:

``` html
  <body>
    <div id="app"></div>
    <script src="/dist/build.js"></script>
  </body>
``` 

3. Ejecutar el proyecto modo desarrollo

``` bash
npm run dev
```


# Configuración de ambiente de desarrollo

1. Instalar Node y el manejador de paquetes npm

2. Instalar el plugin de Vue para Chrome
  https://github.com/vuejs/vue-devtools



3. Instalar el cli del Vue para crear el proyecto usando Webpack 
  https://github.com/vuejs/vue-cli

``` bash
npm install -g @vue/cli
```


2. Se creo el proyecto con el asistente
``` bash
vue init webpack-simple shoppingCarRapis
```


3. Se instalarón las dependencias iniciales
``` bash
npm i
``` 


4. Luego se instalarón los siguientes modulos a lo largo del proyecto

- bulma: Es un framework CSS basado en Flexbox y Sass

``` bash
npm i -s install bulma
```
- Babel: Es un transpilador de código. 

- sass: Es un metalenguaje de Hojas de Estilo en Cascada (CSS)

- eslint: Controla el estilo del código de tu equipo

``` bash
npm i -D estlint

npm install --save-dev eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node

npm i -D estlint-plugin-html
```

- language-pug:

``` bash
 npm i -D pug pug-loader
 
```

- Router de vue

``` bash
npm install vue-router
npm install --save lodash vue-lodash

``` 




## Servicios Rest para obtener imagenes e información de los productos


https://www.rappi.com/api-services/windu/products/store/99900037/sub_corridor/441301
https://www.rappi.com/api-services/windu/sub_corridors/store/99900037/corridor/77135

https://www.rappi.com/api-services/windu/products/store/99900037/sub_corridor/77135
https://www.rappi.com/api-services/windu/sub_corridors/store/99900037/corridor/77135


https://www.rappi.com/api-services/windu/sub_corridors/store/6660307/corridor/125827

https://www.rappi.com/api-services/windu/sub_corridors/store/6660307/corridor/125827
https://img.rappi.com/products/low/510872.png


https://www.rappi.com/api-services/windu/sub_corridors/store/6660307/corridor/125772


Plugin para ATOM


https://atom.io/packages/language-vue

``` bash
apm install atom-axios
apm install vue-format

```

