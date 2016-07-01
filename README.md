# React MS Edge bug

In a recent project, I discovered some weird behaviour in MS Edge. I was able to narrow it down to using a combination of React, React Side Effect, nested flexbox containers and existing children in the React container. The issue is this:

**Click handlers aren't called when using the above combination.**

The issue surfaces in MS Edge 12 and 13. In IE 11, Chrome, Firefox and Safari the issue is not reproducible.

This repo is the smallest reproducible test case I could create. Relevant code is in `index.html` and `index.js`:

```html
<!-- Both `.wrapper` and `.root` are Flex Containers (`display: flex`) -->
<div class="wrapper">
	<!-- This `#root` div will be used as the React mount container -->
	<div id="root" class="root">
		<!-- Note the use of existing children in the mount container -->
		<p>loading...</p>
	</div>
</div>
```

```js
import React from 'react';
import ReactDOM from 'react-dom';
import DocumentTitle from 'react-document-title';

const App = React.createClass({
	render() {

		/**
		 * The click handler on the button isn't called in MS Edge.
		 *
		 * When the `<DocumentTitle />` is removed, the click handler is called.
		 */
		return (
			<div>
				<DocumentTitle title="My Title" />
				<button onClick={() => console.log('clicked')}>Click me</button>
			</div>
		);
	}
});

// Render into the nested Flex Container
ReactDOM.render(
	<App />,
	document.getElementById('root')
);
```

This repo uses React Document Title, but I was able to reproduce the issue with React Helmet as well. That makes me think that React Side Effect might be the influential factor here.

## Build the project

1. Clone this repo: `$ git clone git@github.com:leonderijke/react-edge-bug.git`.
2. Install dependencies: `$ npm install`.
3. Build the project: `$ npm run watch`.
4. Open up the project in MS Edge: `http://localhost:8080/` (e.g. use [BrowserStack](https://www.browserstack.com))

## Steps to reproduce

Using MS Edge:

1. Open the Console and click the button on the page. No message is logged to the console.
2. Click somewhere else in the page, then click the button: the message is logged to the console.
3. Remove the `<DocumentTitle />` from the `App` component (`index.js`), reload the page, then click the button: the message is logged to the console.
4. Add the `DocumentTitle` back. Remove the `<p>loading...</p>` from the page (`index.html`), reload the page, then click the button: the message is logged to the console.
5. Add it back. Remove the `.wrapper,` line from the page (`index.html`), reload the page, then click the button: the message is logged to the console.
