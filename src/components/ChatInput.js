import React, { Component } from 'react';
import compose from 'recompose/compose'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import { addChatMessage } from '../actions/ChatActions';

import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

const styles = theme => ({
  root: {
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    background:"#ccc",
    padding:10
  },
  inputField: {
    width:"100%",
    background:"#fff",
    borderRadius:5
  },
  sendButton: {
    marginLeft: 10
  }
});
class ChatInput extends Component {

    state = {
      input: ""
    }

    handleChange = () => event => {
      this.setState({ input: event.target.value });
    };
    handleSendButtonClick = () => {
      this.props.addChatMessage({
        chatId: this.props.selectedChat,
        message: {
          message: this.state.input,
          timestamp: new Date().toString()
        }
      });

      this.setState({input: ""});
    }
    handleOnKeyDown = (event) => {
      if(event.keyCode === 13 && event.ctrlKey) {
        this.handleSendButtonClick();
      }
    }

    render() {
      const {classes} = this.props;

        return (
            <div className={classes.root}>
              <TextField
                placeholder="Insert text here... You can use Ctrl+Enter to submit a message"
                className={classes.inputField}
                multiline
                rowsMax="10"
                variant="outlined"
                onKeyDown={this.handleOnKeyDown}
                value={this.state.input}
                onChange={this.handleChange()}
                disabled={this.props.selectedChat === null}
              />

              <IconButton className={classes.sendButton} 
                  color="primary" 
                  onClick={this.handleSendButtonClick}
                  tabIndex="0"
                  disabled={this.props.selectedChat === null || this.state.input === ""} 
                  aria-label="Send message">
                <SendIcon />
              </IconButton>
            </div>
        );
    
    }
}



ChatInput.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
  
    

const mapStateToProps = state => ({
  selectedChat: state.openChats.selected
});
const mapDispatchToProps = dispatch => ({
  addChatMessage: (chatObj) => dispatch(addChatMessage(chatObj))
});


export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(ChatInput)