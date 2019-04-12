

import { ACTIONS } from "../actions/Actions";

const init = {
    selected: null,
    chats: {
        
        // "asdlsad": {
        //     unreadMessages: 1,
        //     username: "Hans Müller",
        //     chatlog: [{
        //         creator:"Hans Müller",
        //         message: "Testmessage",
        //         timestamp: new Date().toString()
        //     }]
        // },
        // "fg242asdfas": {
        //     unreadMessages: 0,
        //     username: "Friedrich",
        //     chatlog: [{
        //         message: "Testmessage2",
        //         timestamp: new Date().toString()
        //     }]
        // },
        // "asfg23asd": {
        //     unreadMessages: 0,
        //     username: "Felix",
        //     chatlog: []
        // }
    }

}

export default (state = init, action) => {
    var newState ;
    switch (action.type) {
        case ACTIONS.addChatMessage: 
            newState = JSON.parse(JSON.stringify(state));// {...state}; 
            const payload = action.payload;
            console.log(action);
            if(!newState.chats[payload.chatId]) {
                newState.chats[payload.chatId] = {
                    unreadMessages: 0,
                    username: action.payload.username,
                    chatlog: []
                }
            }
            if(action.payload.message) {
                if(state.selected !== action.payload.chatId) {
                    newState.chats[action.payload.chatId].unreadMessages++;
                }
                newState.chats[action.payload.chatId].chatlog.push(action.payload.message);            
            }
            return newState;
        case ACTIONS.selectChat:
            newState = {...state};
            newState.selected = action.chatId;
            newState.chats[newState.selected].unreadMessages = 0;

            return newState;
        default: 
            return state;
    }
}