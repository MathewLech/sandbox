
import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import WSock from 'components/common/websocket/webSockComponent'
class WSockWrap extends React.Component {
    constructor(props) {
        super(props);
      }
   
async componentDidMount() {
    //here we want to set up a timer to refresh websocket, in case in fails connection 
    //it will refresh through state update and reset
    this.Increment = 1;
    this.timerID = setInterval(
      async () => this.tick(),
      10*1000
    );
  }

async tick() {

    this.Increment = this.Increment + 1;    
      try {                       
            await this.props.wsRefresh(this.Increment);        
      } catch(e) {
        console.log(e);
      }    
  }  

render() {
    //if(this.props.auth){
    if(false){
        return(
        <WSock></WSock>
        )
    }
    else{
    return <span />;
    }
  }
}

function mapStateToProps(state){
    return {               
              auth: state.auth.authenticated,
          }; 
  }
  

export default connect(mapStateToProps, actions)(WSockWrap);
