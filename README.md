<h1 align="center">
  <!-- Logo -->
  <img src="https://raw.githubusercontent.com/rill-js/rill/master/Rill-Icon.jpg" alt="Rill"/>
  <br/>
  @rill/html
	<br/>

  <!-- Stability -->
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-stable-brightgreen.svg?style=flat-square" alt="API stability"/>
  </a>
  <!-- Standard -->
  <a href="https://github.com/feross/standard">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square" alt="Standard"/>
  </a>
  <!-- NPM version -->
  <a href="https://npmjs.org/package/@rill/html">
    <img src="https://img.shields.io/npm/v/@rill/html.svg?style=flat-square" alt="NPM version"/>
  </a>
  <!-- Downloads -->
  <a href="https://npmjs.org/package/@rill/html">
    <img src="https://img.shields.io/npm/dm/@rill/html.svg?style=flat-square" alt="Downloads"/>
  </a>
  <!-- Gitter Chat -->
  <a href="https://gitter.im/rill-js/rill">
    <img src="https://img.shields.io/gitter/room/rill-js/rill.svg?style=flat-square" alt="Gitter Chat"/>
  </a>
</h1>

Universal html rendering middleware for [Rill](https://github.com/rill-js/rill).
Uses [set-dom](https://github.com/DylanPiercey/set-dom) to update html in the browser.

Need isomorphic event handling? Check out [@rill/delegate](https://github.com/rill-js/delegate)!

# Installation

```console
npm install @rill/html
```

# Example

```javascript
// We will use handlebars for our example.
const hbs = require('handlebars')
const homePage = hbs.compile(`
	<html>
		<head>
			<title>My App</title>
			<meta name="description" content="Rill Application">
		</head>
		<body>
			{{title}}
			<script src="/app.js"/>
		</body>
	</html>
`)

// Setup a universal Rill application.
const app = require('rill')()

// Setup the html diffing/rendering middleware.
app.use(require('@rill/html')());

// Setup a homepage route.
app.get('/', ({ req, res }, next)=> {
	// Just set the response body to some html.
	// updates the dom in the browser, or render a string in the server.
	res.body = homePage({ title: '@rill/html' });

	// On the server the final response will be.
	`
		<!DOCTYPE html>
		<html>
			<head>
				<title>My App</title>
				<meta name="description" content="Rill Application">
			</head>
			<body>
				@rill/html
				<script src="/app.js"></script>
			</body>
		</html>
	`
});
```

### Contributions

* Use `npm test` to run tests.

Please feel free to create a PR!
