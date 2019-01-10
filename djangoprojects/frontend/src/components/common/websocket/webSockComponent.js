
import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import API_ENDPOINT from 'config'

class WSock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {AlreadyConnected: false};
      }


componentDidMount(){    
    this.I_AM_CONNECTED =false;
    this.createSocket();
}

componentWillReceiveProps(){    
    if(this.props.auth){
        this.createSocket()
    }    
}


createSocket(){
    if(!this.I_AM_CONNECTED){
        this.I_AM_CONNECTED = true;        
        var token = localStorage.getItem('token')
        var endpoint = "ws://"+API_ENDPOINT+"/myapi/stream/?token="+token
        
        this.socket = new WebSocket(endpoint)
        this.socket.onopen = () => {
            this.I_AM_CONNECTED = true;
            console.log("WS CONNECTED")
        }
        this.socket.onerror = () => {
            this.I_AM_CONNECTED = false
            console.log("WS ERROR")
            
        }

        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data)
            this.handleSocketData(data)
        }

        this.socket.onclose = (event) => {       
            this.I_AM_CONNECTED = false     
            console.log("IM CLOSING")
        }
    }
    
}

handleSocketData(msg){
    console.log(msg)
    if(msg.message === "DATA_UPDATE"){
        try {                       
            this.props.fetchdealdata();        
      } catch(e) {
        console.log(e);
      }
    }
}

componentWillUnmount(){    
    this.I_AM_CONNECTED = false
    this.socket.close()    
}

render() {                    
    return <span />;
  }
}

function mapStateToProps(state){
    return {               
              auth: state.auth.authenticated,
              wsrefresh: state.auth.wsrefresh,
          }; 
  }
  

export default connect(mapStateToProps, actions)(WSock);
