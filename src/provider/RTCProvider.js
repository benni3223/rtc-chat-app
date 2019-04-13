
import React, { Component } from 'react';
import compose from 'recompose/compose'
import { connect } from 'react-redux';
import {setUsers} from './../actions/UserActions';
import {registerService} from './../actions/ServiceActions';
import {addChatMessage} from './../actions/ChatActions';

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
        window.easyrtc.setPeerListener(this.peerListener);
        window.easyrtc.setRoomOccupantListener(this.roomOccupantListener);

        this.props.registerService("rtcService", this);
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
        window.easyrtc.sendDataWS(receiverId, type, data);
    }
    sendMessage = (receiverId, message) => {
        window.easyrtc.sendDataWS(receiverId, "message",             
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
  registerService: (name, serviceInstance) => dispatch(registerService(name, serviceInstance))
});


export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(RTCProvider)
