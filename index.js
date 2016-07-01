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

ReactDOM.render(
	<App />,
	document.getElementById('root')
);
