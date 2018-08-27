import React, { Component } from 'react';
import { connect } from 'react-redux';

//AppNavbar
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

//Dialog
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import PropTypes from 'prop-types';

import { loginUser ,signupUser } from '../actions/itemAction';

class AppNavbar extends Component {

  constructor(props){
    super(props);
    this.state = {
      openLogin: false,
      openSignup: false,
      login_email: '',
      login_password: '',
      signup_firstName: '',
      signup_lastName: '',
      signup_email:'',
      signup_password:'',
      signup_confirm_password:''
    };
    this.handleChange=this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.loginUser();
  }

  handleClickLoginOpen = () => {
    this.setState({
       openLogin: true,
     });
  };

  handleClickSignupOpen = () => {
    this.setState({
          openSignup: true 
    });
  };

  handleClose = () => {
    this.setState({ openLogin: false,openSignup: false });
  };

  handleChange =  event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state);
  };

  handleCreate = () => {
    if(this.state.signup_password!=this.state.signup_confirm_password) {
      console.log('Not matching');
    } else {
      const newUser = {
        firstName:this.state.signup_firstName,
        lastName:this.state.signup_lastName,
        email: this.state.signup_email,
        password: this.state.signup_password
      }
      this.props.signupUser(newUser);
      this.setState({openSignup: false});
    }
  }

  handleLogin = () => {
    const login_User = {
      email: this.state.login_email,
      password: this.state.login_password
    }
    this.props.loginUser(login_User);
    this.setState({openLogin: false});
  }
  render() {
    const {signup_success} = this.props.item;
    return (
      <div className="root" style={{flexGrow:1}}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className="menuButton" style={{ marginLeft:-12, marginRight:20 }} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className="flex" style={{flexGrow:1}}>
              Welcome
            </Typography>
            <Button color="inherit" onClick={this.handleClickLoginOpen}>Login</Button>
            <Button color="inherit" onClick={this.handleClickSignupOpen} style={{margin:10}}>Signup</Button>
          </Toolbar>
        </AppBar>
        <Dialog
          open={this.state.openLogin}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Log in</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              name="login_email"
              onChange={this.handleChange}
            /><br />
            <TextField
              id="password-input"
              label="Password"
              type="password"
              name="login_password"
              onChange={this.handleChange}
              autoComplete="current-password"
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleLogin} color="primary">
              Login
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.openSignup}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create User</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="First Name"
              type="text"
              name="signup_firstName"
              onChange={this.handleChange}
            /><br />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Last Name"
              type="text"
              name="signup_lastName"
              onChange={this.handleChange}
            /><br />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              name="signup_email"
              onChange={this.handleChange}
            /><br />
            <TextField
              id="password-input"
              label="Input password"
              type="password"
              name="signup_password"
              onChange={this.handleChange}
              autoComplete="current-password"
              margin="normal"
            /><br />
            <TextField
              id="password-confirm"
              label="Confirm password"
              type="password"
              name="signup_confirm_password"
              onChange={this.handleChange}
              autoComplete="current-password"
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleCreate} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

AppNavbar.propTypes = {
  loginUser: PropTypes.func.isRequired,
  signupUser: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  item: state.item
})

export default connect(mapStateToProps, {loginUser, signupUser})(AppNavbar);
//export default AppNavbar;
