import { ACTIONS } from "../actions/Actions";

export default (state = null, action) => {
    switch (action.type) {
        case ACTIONS.loginUser: 
            const newState = {
                username: action.username,
                userId: action.userId
            }
            return newState;
        case ACTIONS.removeUser: 
            return null;
        default: 
            return state
    }
}