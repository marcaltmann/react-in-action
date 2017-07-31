import React from 'react';
import { render } from 'react-dom';
import App from './components/app';

render(<App/>, document.getElementById('app'));

<Router location="/">
  <Route index={Home} path="/" component={App}>
    <Route path="posts/:post" component={SinglePost} />
    <Route path="login" component={Login} />
  </Route>
</Router>
