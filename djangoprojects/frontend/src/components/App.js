import React, { Component } from 'react';
import { Route, Link  } from 'react-router-dom';
import testingprotected from 'components/testingprotected'
import AppBar from 'components/AppBar'


class App extends Component {
  
  
  renderHeader() {
    return (
      <ul>
        <li>
          <Link to="/">Home</Link>
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
        <Route   path="" component={AppBar}   />
        {this.renderHeader()}      
        <Route path="/feature" component={testingprotected} />  
      </div>
      
    );
  }
}



export default App;
