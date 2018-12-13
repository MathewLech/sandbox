import React, { Component } from 'react';
import { Route, Link  } from 'react-router-dom';
import testingprotected from 'components/testingprotected'
import Signin from 'components/auth/Signin';
class App extends Component {
  
  
  renderHeader() {
    return (
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/signin">signin</Link>
        </li>
        <li>
          <Link to="/feature">feature</Link>
        </li>
      </ul>
    );
  }

  render() {
    return (      
      <div className="App">
        {this.renderHeader()}      
        <Route path="/signin" component={Signin} />
        <Route path="/feature" component={testingprotected} />  
      </div>
    );
  }
}

export default App;
