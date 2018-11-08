# El baraton

Components Diagram:


	┌─────────────────────────────────────────┐
	│                    App                  │
	│                                         │
	│  ┌────────────────────────────────────┐ │
	│  │              Header.vue            │ │
	│  └────────────────────────────────────┘ │
	│  ┌───────────────┐  ┌─────────────────┐ │
	│  │  Car.vue      │  │   filter.vue    │ │
	│  └───────────────┘  └─────────────────┘ │
	│  ┌───────────────┐  ┌─────────────────┐ │
	│  │ Menu.vue      │  │                 │ │
	│  │ ┌───────────┐ │  │                 │ │
	│  │ │ level.vue │ │  │   Product.vue   │ │
	│  │ │           │ │  │                 │ │
	│  │ └───────────┘ │  │                 │ │
	│  └───────────────┘  └─────────────────┘ │
	│  ┌────────────────────────────────────┐ │
	│  │              Footer.vue            │ │
	│  └────────────────────────────────────┘ │
	└─────────────────────────────────────────┘


#### Tecnologies

- VueJS, vuex (javascript library)
- Bulma (Framework css)
- SOme loader and plugins with webpack.

See package.json

#### Installation requirements

- NodeJS v8.11.1 or later.
- npm.

#### How can you execute 'El baraton' app in developer environment ?

1. Enter to elBaratonCarritoWeb folder 

```bash
/elBaratonCarritoWeb
```
and execute this command:

2. Install modules:

```bash
$ npm install
```

3. Run developer environments:

```bash
$ npm run dev
```

*NOTA:* ```Navigate to http://localhost:9104/```

#### How can you build this app for production?

3. Run production environments:

```bash
$ npm run build
```

*NOTA:* ```Open the /elBaratonCarritoWeb/dist/index.production.html page in your browser```
