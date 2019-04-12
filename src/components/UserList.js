import React, { Component } from 'react';
import compose from 'recompose/compose'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { simpleAction } from '../actions/SimpleAction';

import List from '@material-ui/core/List';
import ListHeader from './ListHeader';
import User from './User'

const styles = theme => ({
  root : {
      height:"50%"
  },
  listContainer: {
      overflowY: "auto",
      height: "calc( 100% - 48px)",
  },
  emptyIndicator: {
      padding:20,
      color:"#888"
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
                  {
                    this.props.users.length !== 0 ? (
                      <List>
                        { this.props.users.map((userObj, index) => this.renderFilteredUser(userObj, index))}
                      </List>
                    ) : <p className={classes.emptyIndicator}>There is no other user online currently, please stay tuned and inform your buddy about this peer-to-peer communication service</p>
                  }
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