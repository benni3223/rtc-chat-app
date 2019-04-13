import { ACTIONS } from "../actions/Actions";

export default (state = {}, action) => {
    switch (action.type) {
        case ACTIONS.registerService: 
            const newState = {
                ...state,
                [action.name]: action.service
            }
            return newState;
        default: return state;
    }
}