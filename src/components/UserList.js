import React, { Component } from 'react';
import compose from 'recompose/compose'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { simpleAction } from '../actions/SimpleAction';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ListHeader from './ListHeader';
import User from './User'

const styles = theme => ({
  root : {
      height:"50%"
  },
  listContainer: {
      overflowY: "auto",
      height: "calc( 100% - 48px)",
  }
});
const listID = "userList";
class UserList extends Component {

  renderFilteredUser(user, index) {
    const {filterValue} = this.props;
    const userName = user.username;
    var allowed = true;
    if(filterValue) {
        if(userName.toLowerCase().indexOf(filterValue.toLowerCase()) === -1) {
            allowed = false;
        }
    }

    if(allowed) {
        return <User key={index} userObj={user} />
    }

}

    render() {
      const { classes } = this.props;
        return (
          <div className={classes.root}>
              <ListHeader  title="Users Online"  filterKey={listID}/>
                <div className={classes.listContainer}> 
                    <List>
                      { this.props.users.map((userObj, index) => this.renderFilteredUser(userObj, index))}
                    </List>
                </div>

            </div>
        );
    
    }
}



UserList.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };
  
    

const mapStateToProps = state => ({
    users: state.users,
    filterValue: state.filter[listID]
});
const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
});
  
  
  export default compose(
    withStyles(styles, { withTheme: true }),
    connect(mapStateToProps, mapDispatchToProps)
  )(UserList)