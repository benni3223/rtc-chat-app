import React, { Component } from 'react';
import compose from 'recompose/compose'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import { simpleAction } from '../actions/SimpleAction';

import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

const styles = theme => ({
  root: {
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    background:"#ccc",
    paddingLeft:15,
    paddingRight:15,
    paddingBottom:5
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

    render() {
      const {classes} = this.props;

        return (
            <div className={classes.root}>
              <TextField
                placeholder="Insert text here"
                className={classes.inputField}
                multiline
                rowsMax="10"
                variant="outlined"
                value={this.state.input}
                onChange={this.handleChange()}
                margin="normal"
                disabled={this.props.selectedChat === null}
              />

              <IconButton className={classes.sendButton}  color="primary" disabled={this.props.selectedChat === null || this.state.input === ""} aria-label="Send message">
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
  simpleAction: () => dispatch(simpleAction())
});

  
  export default compose(
    withStyles(styles, { withTheme: true }),
    connect(mapStateToProps, mapDispatchToProps)
  )(ChatInput)