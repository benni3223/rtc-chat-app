
import React, { Component } from 'react';
import compose from 'recompose/compose'
import { connect } from 'react-redux';
import {setUsers} from './../actions/UserActions';
import {registerService} from './../actions/ServiceActions';
import {addChatMessage} from './../actions/ChatActions';

import {startVideoCall, endVideoCall, acceptVideoCall, addPendingVideoCall, rejectVideoCall} from './../actions/VideoCallActions';

const loginTimeout = 5000;

class RTCProvider extends React.Component{

    rtcId = null;

    constructor(props) {
        super(props);


        if(this.props.url) {
            window.easyrtc.setSocketUrl(this.props.url, {
                'connect timeout': 10000,
                'force new connection': true
            });
        }
        
        window.easyrtc.enableAudio(true);
        window.easyrtc.enableVideo(true);
        window.easyrtc.enableDataChannels(true);
        
        window.easyrtc.setPeerListener(this.peerListener);
        window.easyrtc.setRoomOccupantListener(this.roomOccupantListener);

        window.easyrtc.setOnStreamClosed(this.handleStreamClose);
        window.easyrtc.setCallCancelled(this.handleCallCanceled);
        window.easyrtc.setStreamAcceptor(this.handleStreamAcceptor);
        window.easyrtc.setAcceptChecker(this.handleAcceptChecker);

        this.props.registerService("rtcService", this);
    }

    handleStreamClose = (easyrtcid) => {
        this.stopCall();
    }
    handleCallCanceled = (easyrtcid) => {
        console.log("handleStreamAcceptor: "+easyrtcid);
        this.props.rejectVideoCall(easyrtcid);
        //     if( easyrtcid === callerPending) {
        //         document.getElementById('acceptCallBox').style.display = "none";
        //         callerPending = false;
        //     }
    }
    handleStreamAcceptor = (easyrtcid, stream) => {
        this.props.startVideoCall();
        setTimeout(() => {

            console.log("handleStreamAcceptor: "+easyrtcid);
            var video = document.getElementById(this.props.videoContactId);
            window.easyrtc.setVideoObjectSrc(video,stream);
            setTimeout(() => this.enableMirror(), 5000);
        }, 500);

    }
    handleAcceptChecker = (easyrtcid, callback) => {
        console.log("handleAcceptChecker: "+easyrtcid);
        var acceptCallback = () => {
            callback(true);
        }
        var rejectCallback = () => {
            callback(false);
        }
        this.props.addPendingVideoCall(easyrtcid, acceptCallback, rejectCallback);
    }

    getUsernameFromId(easyrtcid) {
        return window.easyrtc.idToName(easyrtcid);
    }

    startCall = (otherEasyrtcid) => {
        this.hangupAll();
        
        var acceptedCB = (accepted, easyrtcid) => {
            if( !accepted ) {
                window.easyrtc.showError("CALL-REJECTEd", "Sorry, your call to " + this.getUsernameFromId(easyrtcid) + " was rejected");
                
            }
        };

        var successCB = (msg) => {
            console.log("i started videosetream");
            console.log(msg);
            if( window.easyrtc.getLocalStream()) {
                this.enableMirror();
            }
            
        };
        var failureCB = (msg) => {
            console.log("failure");
            console.log(msg);
            
        };
        
        window.easyrtc.call(otherEasyrtcid, successCB, failureCB, acceptedCB);
        this.props.startVideoCall();
        setTimeout(() => this.enableMirror(), 5000);
    }
    stopCall = () => {
        window.easyrtc.hangupAll();
        window.easyrtc.setVideoObjectSrc(document.getElementById(this.props.videoContactId), "");
      
        this.disableMirror();
        this.props.endVideoCall();
    }
    hangupAll = () => {
        window.easyrtc.hangupAll();
    }


    

    enableMirror = () =>{
        var selfVideo = document.getElementById(this.props.videoSelfId);
        console.log(selfVideo);
        window.easyrtc.setVideoObjectSrc(selfVideo, window.easyrtc.getLocalStream());
        selfVideo.muted = true;
    }
    disableMirror = () => {
        var selfVideo = document.getElementById(this.props.videoSelfId);
        window.easyrtc.clearMediaStream( selfVideo);
        window.easyrtc.setVideoObjectSrc(selfVideo,"");
        window.easyrtc.closeLocalMediaStream();
    }

    login = (username, successCallback, failCallback) => {

        setTimeout( () => {
            if(this.rtcId === null) {
                window.easyrtc.disconnect();
                failCallback(404, "Server seems to be offline, please try again later.");
            }
        }, loginTimeout);

        window.easyrtc.setUsername(username);
        window.easyrtc.connect("default", (easyrtcid) => {
                this.rtcId = easyrtcid;
                successCallback(easyrtcid);
            }, 
            (errorCode, message) => {
                failCallback(errorCode, message);
            }
        );
    }
    sendData = (receiverId, type, data) => {
        window.easyrtc.sendDataWS(receiverId, type, data, (msg) => {
            console.log(msg);
        });
    }
    sendMessage = (receiverId, message) => {
        this.sendData(receiverId, "message",             
            JSON.stringify({
                    creator: this.props.userConfig.username,
                    message: message,
                    timestamp: new Date().toString()
                })
        );
    }

    peerListener = (who, msgType, content) => {
        if(this.rtcId) {
            console.log(`message received from ${who} : ${content}`);
            if(msgType === "message") {
                this.props.addChatMessage({
                    chatId: who,
                    username: this.props.users.filter((user) => user.id === who)[0].username,
                    message: JSON.parse(content)
                })
            }
        }
    }

    roomOccupantListener = (roomName, occupants, isPrimary) => {
        if(this.rtcId) {
            console.log("new room occument:");
            console.log(occupants);
            var users = [];
            Object.keys(occupants).map((key) => {
                if(key !== this.rtcId ) {
                    users.push({
                        id: key,
                        username: occupants[key].username
                    });
                }
            });

            this.props.setUsers(users);
        }
    } 


    

	render() {
		return this.props.children;
	}

}


const mapStateToProps = state => ({
    users: state.users,
    userConfig: state.userConfig
});
const mapDispatchToProps = dispatch => ({
  setUsers: (users) => dispatch(setUsers(users)),
  addChatMessage: (chatObj) => dispatch(addChatMessage(chatObj)),
  registerService: (name, serviceInstance) => dispatch(registerService(name, serviceInstance)),
  startVideoCall: (userId) => dispatch(startVideoCall(userId)),
  endVideoCall: () => dispatch(endVideoCall()),

  acceptVideoCall: (userId) => dispatch(acceptVideoCall(userId)),
  addPendingVideoCall: (userId, acceptCallback, rejectCallback) => dispatch(addPendingVideoCall(userId, acceptCallback, rejectCallback)),
  rejectVideoCall: (userId) => dispatch(rejectVideoCall(userId)),


});


export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(RTCProvider)
