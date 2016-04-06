[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Join the chat at https://gitter.im/rill-js/rill](https://badges.gitter.im/rill-js/rill.svg)](https://gitter.im/rill-js/rill?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# Rill HTML
Isomorphic html rendering middleware for Rill.
Uses https://github.com/tbranyen/diffhtml to update html in the browser.

# Installation

#### Npm
```console
npm install @rill/html
```

# Example

```javascript
const app       = require("rill")();
const htmlViews = require("@rill/html");

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

app.use(htmlViews());

app.use(({ req, res }, next)=> {
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

* Use gulp to run tests.

Please feel free to create a PR!
