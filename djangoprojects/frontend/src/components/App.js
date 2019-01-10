import React, { Component } from 'react';
import { Route, Link  } from 'react-router-dom';
import testingprotected from 'components/testingprotected'
import AppBar from 'components/AppBar'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from 'theme';
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
      <MuiThemeProvider theme={theme}>
      <div className="App">      
        <Route   path="" component={AppBar}   />
        {this.renderHeader()}      
        <Route path="/feature" component={testingprotected} />  
      </div>
      </MuiThemeProvider>   
      
    );
  }
}



export default App;
