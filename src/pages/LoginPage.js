import React, { Component } from 'react';
import compose from 'recompose/compose'
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';

import { loginUser } from '../actions/UserConfigActions';

import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



const styles = theme => ({
  root: {
    display: 'flex',
    height: "100%",
    width: "100%",
    justifyContent:"center",
    alignItems: "center",
    background: "#444"
  },
  formContainer: {
      display:"flex",
      flexDirection:"column"
  },
  loginButton: {
      marginTop: 20
  }
});

class LoginPage extends Component {
    state = {
        loading: false,
        errorMessage: "",
        errorDialogOpen: false
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };
    handleKeyDown = (event) => {
        if(event.keyCode === 13) {
            this.handleSubmit();
        }
    }
    handleSubmit = () => {
        this.setState({loading: true});
        this.props.rtcService.login(this.state.username, 
            (easyrtcid) => {
                this.props.loginUser("asdas", this.state.username);
                this.props.router.push("/");

            }, (errorCode, message) => {
                this.setState({loading:false, errorMessage: message, errorDialogOpen: true});
                console.log(errorCode + ": "+ message);
            });
    }
    handleDialogClose = () => {
        this.setState({errorDialogOpen: false});
    }
    render() {
        const { loading } = this.state;
        const { classes, theme } = this.props;

        return (
        <div className={classes.root}>
            <Card className={classes.card}>
                {loading && <LinearProgress />}
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Login
                    </Typography>
                    <Typography color="textSecondary">
                        Please type in a username to enter the chatroom
                    </Typography>
                    <div className={classes.formContainer}>
                        <TextField
                            label="Username"
                            value={this.state.username || ""}
                            onChange={this.handleChange('username')}
                            onKeyDown={this.handleKeyDown}
                            margin="normal"
                            disabled={loading}
                            variant="outlined"
                        />
                        <TextField
                            label="Password"
                            value={this.state.password || ""}
                            onChange={this.handleChange('password')}
                            onKeyDown={this.handleKeyDown}
                            type="password"
                            disabled={loading}
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                        />
                        <Button 
                            className={classes.loginButton} 
                            variant="contained" 
                            disabled={loading}
                            color="primary"
                            onClick={this.handleSubmit}
                        >
                            Login
                        </Button>
                        {/* <Button className={classes.loginButton} variant="contained" color="primary">
                            Register
                        </Button> */}
                    </div>
                </CardContent>
            </Card>
            

            
        <Dialog
          open={this.state.errorDialogOpen}
          onClose={this.handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>{"Error"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.state.errorMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        </div>
        );

    }
}


LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    userConfig: state.userConfig,
    rtcService: state.services.rtcService
});
const mapDispatchToProps = dispatch => ({
    loginUser: (userId, username) => dispatch(loginUser(userId, username))
});


export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(LoginPage)