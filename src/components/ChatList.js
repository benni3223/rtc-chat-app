import React, { Component } from 'react';
import compose from 'recompose/compose'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { addChatMessage } from '../actions/ChatActions';

import List from '@material-ui/core/List';
import ListHeader from './ListHeader';
import OpenChat from './OpenChat';

const styles = theme => ({
    root : {
        height:"50%"
    },
    listContainer: {
        overflowY: "auto",
        height: "calc( 100% - 48px)",
    }
});

const listID = "chatList";

class ChatList extends Component {

    renderFilteredChat(chatId) {
        const {filterValue, openChats} = this.props;
        const openChat = openChats[chatId];
        const userName = openChat.username;
        var allowed = true;
        if(filterValue) {
            if(userName.toLowerCase().indexOf(filterValue.toLowerCase()) === -1) {
                allowed = false;
            }
        }

        if(allowed) {
            return <OpenChat key={chatId} chatId={chatId} chatObj={this.props.openChats[chatId]} />
        }

    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <ListHeader title="Open Chats" filterKey={listID}/>
                <div className={classes.listContainer}>
                    <List>
                    {Object.keys(this.props.openChats).map((chatId) => this.renderFilteredChat(chatId))}
                    </List>
                </div>
            </div> 
        );
    
    }
}



ChatList.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    openChats: PropTypes.object.isRequired
  };
  
    

const mapStateToProps = state => ({
    openChats: { ...state.openChats.chats},
    filterValue: state.filter[listID]
});
const mapDispatchToProps = dispatch => ({
addChatMessage: () => dispatch(addChatMessage())
});
  
  
  export default compose(
    withStyles(styles, { withTheme: true }),
    connect(mapStateToProps, mapDispatchToProps)
  )(ChatList)