import { ACTIONS } from "../actions/Actions";

export default (state = [], action) => {
    switch (action.type) {
        case ACTIONS.addChatMessage: 
            return [...state, action.payload]
        default: 
            return state
    }
}