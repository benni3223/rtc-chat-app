import React, { Component } from 'react';
import compose from 'recompose/compose'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { addChatMessage, selectChat} from '../actions/ChatActions';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({

  });
class User extends Component {

  handleChatClick = (userObj) => {
    const {id, username} = userObj;

    this.props.addChatMessage({
      username: username,
      chatId: id
    });
    this.props.selectChat(id);

  }
  render() {
    const {userObj, classes} = this.props;
    return (
      <ListItem button key={userObj.username} onClick={() => this.handleChatClick(userObj)}>
        <ListItemText primary={userObj.username} />
        {/* ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
      </ListItem>
    );
  
  }
}



User.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    userObj: PropTypes.object.isRequired
  };
  
    

const mapStateToProps = state => ({
});
const mapDispatchToProps = dispatch => ({
  addChatMessage: (chatObj) => dispatch(addChatMessage(chatObj)),
  selectChat: (chatId) => dispatch(selectChat(chatId))

});
  
  
export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(User)