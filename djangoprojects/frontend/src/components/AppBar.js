import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'actions';

class ButtonAppBar extends Component{

  onSubmit = formProps => {
    this.props.signin(formProps, () => {      
      this.props.history.push('/feature');
    });
  };

  handleLogout(){
    
    this.props.signout();
  }

rendersigninout(){
  const { handleSubmit } = this.props;
  
  if(!this.props.auth){
    return(
      <form onSubmit={handleSubmit(this.onSubmit)}>
      <Field
        name="username"
        type="text"
        component="input"
        autoComplete="none"
      />
      <Field
        name="password"
        type="password"
        component="input"
        autoComplete="none"
      />
      <button>Login</button>
      </form>
    );
  }
  else{

    return(
      <button onClick={this.handleLogout.bind(this)}>Logout</button>
    )
  }

}

render(){
  const { classes } = this.props;

  return (    

    
    <div className={classes.root}>
      <AppBar position="static"  style={{ background: '#2E3B55' }}>
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            TITLE HERE
          </Typography>
          {this.rendersigninout()}
        </Toolbar>
      </AppBar>
    </div>
    
  );
}
}


const styles = {

  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return { 
            errorMessage: state.auth.errorMessage,
            auth: state.auth.authenticated
          
          };
}

const x =  compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'ButtonAppBar' })
)(ButtonAppBar);

export default withStyles(styles)(x)