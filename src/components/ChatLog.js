import React, { Component } from 'react';
import compose from 'recompose/compose'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { addChatMessage } from '../actions/ChatActions';


import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import ChatMessage from './ChatMessage';
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
  }
});
class ChatLog extends Component {

  addChatMessage = () => {
    this.props.addChatMessage({
      chatId: "asdasdfasfsa",
      username: "Username",
      message: {
          message: "asldaksdlaskdlakdlsakd",
          timestamp: "04.12.2012 10:21:12"
      }
    } );
  }
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
                <Typography variant="h6" color="inherit" noWrap>
                  {this.props.openChat ? this.props.openChat.username : ""}
                </Typography>
              <button onClick={this.addChatMessage}>Test redux action</button>
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
   // chatlog: state.openChats.chats[state.openChats.selected]? state.openChats.chats[state.openChats.selected].chatlog : undefined
  });
  const mapDispatchToProps = dispatch => ({
    addChatMessage: (msg) => dispatch(addChatMessage(msg))
  });
  
  
  export default compose(
    withStyles(styles, { withTheme: true }),
    connect(mapStateToProps, mapDispatchToProps)
  )(ChatLog)