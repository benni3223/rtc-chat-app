


import React, { Component } from 'react';
import compose from 'recompose/compose'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { endVideoCall, switchDisplayElement } from '../actions/VideoCallActions';


import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import SwitchVideoIcon from '@material-ui/icons/SwitchVideo';

import Slide from '@material-ui/core/Slide';
import { Hidden } from '@material-ui/core';

const styles = theme => ({
    videoContainer: {
        position: "relative",
        height:"100%",
        backgroundColor: "#444",
        overflow: "hidden"
    },
    videoMain: {
        position: "absolute",
        top:0,
        left:0,
        height:"100%",
        width:"100%",
        backgroundColor: "#000"
    },
    videoSecondary: {
        position: "absolute",
        height: "33%",
        width: "33%",
        right:0,
        bottom:0,
        zIndex: 1351,
        borderLeft: "solid 1px #888",
        borderTop: "solid 1px #888",
        backgroundColor: "#000"
    },
    closeButton: {
        color: "#fff",
        position: "absolute",
        top:0,
        right: 0,
        zIndex: 1351
    },
    optionsContainer: {
        position: "absolute",
        height: 50,
        top: "calc(50% - 50px)",
        left: "calc(100% - 40px)",
        zIndex: 1351,
        transition: "transform 0.4s",
        "&:hover": {
            transform: "translateX(calc(-100% + 40px))"
        },
        display: "flex",
        borderBottom: "solid 1px white",
        borderTop: "solid 1px white",
        borderLeft: "solid 1px white",
        borderTopLeftRadius	: 20,
        borderBottomLeftRadius: 20,
        backgroundColor:"rgba(1.0, 1.0, 1.0, 0.7)"
    },
    optionsIndicator: {
        width: 40,
        height: 50,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    optionsIndicatorIcon: {
        color: "#888"
    },
    optionsButton: {
        color: "#fff"
    }

});


function Transition(props) {
    return <Slide direction="up" {...props} />;
}
  
class VideoDialog extends Component {


    handleClose = () => {
        this.props.rtcService.stopCall();
    };


    render() {
        const { classes, options } = this.props;
        return (
            
        <Dialog
          fullScreen
          open={options.active}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
            <div className={classes.videoContainer}>
                <video className={options.showSelfInPrimaryDisplay ? classes.videoMain : classes.videoSecondary} autoPlay="autoplay" playsInline="playsinline" id={this.props.videoSelfId}  muted="muted" volume="0"></video>
                <video className={options.showSelfInPrimaryDisplay ? classes.videoSecondary : classes.videoMain} autoPlay="autoplay" playsInline="playsinline" id={this.props.videoContactId}></video>
     
                <IconButton className={classes.closeButton} onClick={this.handleClose} aria-label="Close">
                    <CloseIcon />
                </IconButton>

              <div className={classes.optionsContainer}>
                <div className={classes.optionsIndicator}>
                    <SettingsIcon className={classes.optionsIndicatorIcon}/>
                
                </div>

                <IconButton className={classes.optionsButton} onClick={this.props.switchDisplayElement} aria-label="Switch displays">
                    <SwitchVideoIcon />
                </IconButton>
                
              </div>
            </div>
        
       </Dialog>

        );
    
    }
}



VideoDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
  };
  
    

const mapStateToProps = state => ({
    rtcService: state.services.rtcService,
    options: { ...state.videoCallOptions}
});
const mapDispatchToProps = dispatch => ({
    switchDisplayElement: () => dispatch(switchDisplayElement()),
    
});
  
  
export default compose(
withStyles(styles, { withTheme: true }),
connect(mapStateToProps, mapDispatchToProps)
)(VideoDialog)

