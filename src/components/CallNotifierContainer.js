import React, { Component } from 'react';
import compose from 'recompose/compose'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


import IconButton from '@material-ui/core/IconButton';
import CallIcon from '@material-ui/icons/Call';
import CallEndIcon from '@material-ui/icons/CallEnd';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';


const styles = theme => ({
    root: {
      position: "absolute",
      top:0,
      right:0,
      maxHeight: "100%",
      zIndex: 2000
    },
    callContainer: {
      backgroundColor: "#444",
      borderLeft: "solid 1px #222",
      borderBottom: "solid 1px #222",
      borderTop: "solid 1px #222",
      borderTopLeftRadius	: 50,
      borderBottomLeftRadius: 50,
      display: "flex",
      marginTop:10,
      alignItems: "center"
    },
    avatar: {
      width: 50,
      height: 50,
      marginRight: 10
    },
    text: {
      color: "#fff"
    },
    acceptButton: {
      color: '#65f442'
    },
    rejectButton: {
      color: "red"
    }
});
class CallNotifierContainer extends Component {

    
    render() {
      const {classes} = this.props;

        return (
            <div className={classes.root}>
                {
                  this.props.pendingCalls.map(data => {
                    var username = data.userId;
                    if(this.props.rtcService) {
                      username = this.props.rtcService.getUsernameFromId(data.userId);
                    }

                    return (
                      <div key={data.userId} className={classes.callContainer}>
                        
                        <Avatar className={classes.avatar}>{username[0]}
                        </Avatar>
                        <Typography variant="body1" className={classes.text}>
                          Videoanruf: {username}
                        </Typography>
                    
                        <IconButton
                          className={classes.acceptButton}
                          aria-haspopup="true"
                          onClick={data.acceptCallback}
                          color="inherit"
                        >
                          <CallIcon />
                        </IconButton>

                        <IconButton
                          className={classes.rejectButton}
                          aria-haspopup="true"
                          onClick={data.rejectCallback}
                          color="inherit"
                        >
                          <CallEndIcon />
                        </IconButton>
                      </div>
                    );
                  })
                }
            </div>
        );
    
    }
}



CallNotifierContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
  
    

const mapStateToProps = state => ({
  rtcService: state.services.rtcService,
  pendingCalls: state.videoCallOptions.pendingCalls
});
const mapDispatchToProps = dispatch => ({
    
});


export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(CallNotifierContainer)