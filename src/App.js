import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login/Login';
import Tweets from './pages/Tweets/Tweets';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/tweets' component={Tweets} />
      </Switch>
    );
  }
}

export default App;
