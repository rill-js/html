[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Join the chat at https://gitter.im/rill-js/rill](https://badges.gitter.im/rill-js/rill.svg)](https://gitter.im/rill-js/rill?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# Rill HTML
Universal html rendering middleware for [Rill](https://github.com/rill-js/rill).
Uses [set-dom](https://github.com/DylanPiercey/set-dom) to update html in the browser.

# Installation

#### Npm
```console
npm install @rill/html
```

# Example

```javascript
// We will use handlebars for our example.
const hbs = require("handlebars");
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
`);

// Setup a universal Rill application.
const Rill = require("rill");
const app = Rill();

// Setup the html diffing/rendering middleware.
app.use(require("@rill/html")());

// Setup a homepage route.
app.get("/", ({ req, res }, next)=> {
	// Just set the response body to some html.
	// updates the dom in the browser, or render a string in the server.
	res.body = homePage({ title: "@rill/html" });

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
