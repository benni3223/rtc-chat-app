import { ACTIONS } from "../actions/Actions";

export default (state = {
    active: false,
    userId: null,
    callInitiatedByUser: false,
    pendingCalls: [],
    showSelfInPrimaryDisplay: false
}, action) => {
    switch (action.type) {
        case ACTIONS.startVideoCall: 
            return {
                ...state,
                active: true,
                callInitiatedByUser: true,
                pendingCalls: []
            };
        case ACTIONS.endVideoCall: 
            return {
                ...state,
                active: false
            };
        case ACTIONS.acceptVideoCall: 
            return {
                ...state,
                active: true,
                callInitiatedByUser: false,
                pendingCalls: []
            };
        case ACTIONS.rejectVideoCall: 
            return {
                ...state,
                pendingCalls: state.pendingCalls.filter(data => {return data.userId !== action.userId})
            };
        case ACTIONS.addPendingVideoCall: 
            return {
                ...state,
                pendingCalls: [...state.pendingCalls, {
                    userId: action.userId,
                    acceptCallback: action.acceptCallback,
                    rejectCallback: action.rejectCallback
                } ]
            };
        case ACTIONS.switchDisplayElement: 
            return {
                ...state,
                showSelfInPrimaryDisplay: !state.showSelfInPrimaryDisplay
            }
        default: 
            return state
    }
}