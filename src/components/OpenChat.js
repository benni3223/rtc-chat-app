import React, { Component } from 'react';
import compose from 'recompose/compose'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { selectChat } from '../actions/ChatActions';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { ListItemSecondaryAction } from '@material-ui/core';

const styles = theme => ({
    secondaryAction: {
      paddingRight:10
    },
    selected: {
      backgroundColor: "#eee"
    }
  });
class OpenChat extends Component {

    handleChatClick = () => {
      this.props.selectChat(this.props.chatId);
    }

    

    render() {
      const { classes, chatObj} = this.props;

      const isSelected = this.props.chatId === this.props.selectedChatId;

      return (
        <ListItem button key={chatObj.username} onClick={this.handleChatClick} className={isSelected ? classes.selected : undefined}>
        <Avatar>{chatObj.username[0]}
        </Avatar>
          <ListItemText primary={chatObj.username} />
          {
            chatObj.unreadMessages > 0 ? (
            <ListItemSecondaryAction className={classes.secondaryAction}>
            <Badge color="primary" badgeContent={this.props.unreadMessages} className={classes.margin}>
              <MailIcon />
            </Badge>
            </ListItemSecondaryAction>
            ) : undefined
          }

          {/* ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
        </ListItem>
      );
    
    }
}



OpenChat.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };
  
    

const mapStateToProps = (state, ownProps) => ({
  selectedChatId: state.openChats.selected,
  unreadMessages: state.openChats.chats[ownProps.chatId].unreadMessages
});
const mapDispatchToProps = dispatch => ({
  selectChat: (chatId) => dispatch(selectChat(chatId))
});
  
  
  export default compose(
    withStyles(styles, { withTheme: true }),
    connect(mapStateToProps, mapDispatchToProps)
  )(OpenChat)