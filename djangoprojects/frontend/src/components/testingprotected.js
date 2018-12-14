import React, { Component } from 'react';
import requireAuth from './requireAuth';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { withRouter } from 'react-router-dom'

class Feature extends Component {

  rendertestdata() {
    let unique  = 0
    return this.props.data.map(data => {
      unique = unique + 1
      return <li key={unique}>{data}</li>;
    });
  }

  handleClick(){
    
    this.props.fetchtestdata(this.props.history)
  }
  render() {
    return (
    <div>
      Nice You are authenticated!
      <div>        
        <button className="fetch-testdata" onClick={this.handleClick.bind(this)}>
          Fetch testdata
        </button>
        <ul>{this.rendertestdata()}</ul>
      </div>


    </div>
      
      );
  }
}

function mapStateToProps(state){
  return { data: state.data };
}

export default withRouter(connect(mapStateToProps, actions)(requireAuth(Feature)));
