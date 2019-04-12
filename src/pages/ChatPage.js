import React, { Component } from 'react';
import compose from 'recompose/compose'
import { connect } from 'react-redux';

import { addChatMessage } from '../actions/ChatActions';

import { withStyles } from '@material-ui/core/styles';


import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import ChatList from '../components/ChatList';
import UserList from '../components/UserList';

import ChatLog from '../components/ChatLog';


const drawerWidth = 300;

const styles = theme => ({
  root: {
    display: 'flex',
    height: "100%"
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerContent: {
    height: "100%" 
  },
  drawerPaper: {
    width: drawerWidth,
  },
});

class ChatPage extends Component {
  state = {
    mobileOpen: false
  };


  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };


  componentDidMount() {
    console.log(this.props.userConfig);
    if(!this.props.userConfig) {
      //this.props.history.push("/login");
      this.props.router.push("/login");
    }
  }


  render() {
    const { classes, theme} = this.props;

    const drawer = (
        <div className={classes.drawerContent}>
            <ChatList/>
            <UserList/>
        </div>
        );
    
    
    
    return (
    <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
            <Drawer
            container={this.props.container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
                paper: classes.drawerPaper,
            }}
            >
            {drawer}
            </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
            <Drawer
            classes={{
                paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
            >
            {drawer}
            </Drawer>
        </Hidden>
        </nav>

        <ChatLog onDrawerToggle={this.handleDrawerToggle} />
    </div>
    );
  }
}


ChatPage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    userConfig: state.userConfig
});
const mapDispatchToProps = dispatch => ({
  addChatMessage: (msg) => dispatch(addChatMessage(msg))
});


export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(ChatPage)