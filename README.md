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



#### Installation requirements

- NodeJS v8.11.1 or later.
- npm.


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

*NOTA:* ```Navigate to http://localhost:8080/#/```
