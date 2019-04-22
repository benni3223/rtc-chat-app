import React, { Component } from 'react';
import compose from 'recompose/compose'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import ChatMessage from './ChatMessage';
import Avatar from '@material-ui/core/Avatar';
import ChatInput from './ChatInput';

const styles = theme => ({
  root: {
    width:"100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  appBar: {
    
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  content: {
    alignSelf: "stretch",
    padding: theme.spacing.unit * 3,
    overflowY: "auto"
  },
  mainContainer: {
    alignSelf:"stretch",
    overflowY:"auto",
    flexGrow: 0,
    marginTop: "auto"
  }, 
  noChatIndicator: {
    textAlign:"center",
    color:"#222"
  }, 
  openChatHeader: {
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    width: "100%"
  },
  grow: {
    flexGrow: 1,
  },
  avatar: {
    marginRight: 10
  }
});
class ChatLog extends Component {

  handleDrawerToggle = () => {
    this.props.onDrawerToggle();
  }

  scrollToBottom = (smooth) => {
    this.messagesEnd.scrollIntoView({ behavior: smooth ? "smooth": undefined });
  }
  
  componentDidMount() {
    this.scrollToBottom(false);
  }
  
  componentDidUpdate(prevProps, prevState) {
    this.scrollToBottom(prevProps.selected === this.props.selected );
  }
  startCall = () => {
    this.props.rtcService.startCall(this.props.selected);
  }
  render() {
    const { classes, theme, openChat, chatlog} = this.props;

    var chatMessages = undefined;

    if(openChat) {
      if(openChat.chatlog.length === 0) {
        chatMessages = <div className={classes.noChatIndicator}>Write a chat message to your chat buddy.</div>
      } else {
        chatMessages = (
          openChat.chatlog.map((chatObj, index) => {
            return <ChatMessage key={index} messageObject={chatObj}/>
          })
        )
      }
    } else {
      chatMessages = <div className={classes.noChatIndicator}>Please select a chat in your open chat list or open a new one.</div>
    }

      return (
        <div className={classes.root}>

          <AppBar position="static" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              {
                this.props.openChat ? (
                  <div className={classes.openChatHeader}>
                    <Avatar className={classes.avatar}>{this.props.openChat.username[0]}
                    </Avatar>
                    <Typography variant="h6" color="inherit" noWrap className={classes.grow}>
                      {this.props.openChat ? this.props.openChat.username : ""}
                    </Typography>
                    
                    <IconButton
                      aria-haspopup="true"
                      onClick={this.startCall}
                      color="inherit"
                    >
                      <VideoCallIcon />
                    </IconButton>
                  </div>
                ) : undefined
              }
            </Toolbar>
          </AppBar>
          <div className={classes.mainContainer}>
            <main className={classes.content}>

                {
                  chatMessages
                }
              
                <div style={{ float:"left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </main> 
          </div>
          <ChatInput />
          </div>
      );
    
    }
}



ChatLog.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };
  
    

const mapStateToProps = (state, ownProps) => ({
  selected: state.openChats.selected,
  openChat: state.openChats.chats[state.openChats.selected],
  rtcService: state.services.rtcService
  // chatlog: state.openChats.chats[state.openChats.selected]? state.openChats.chats[state.openChats.selected].chatlog : undefined
});
const mapDispatchToProps = dispatch => ({
});
  

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(ChatLog)