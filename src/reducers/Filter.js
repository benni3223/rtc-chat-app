import { ACTIONS } from "../actions/Actions";

export default (state = {}, action) => {
    switch (action.type) {
        case ACTIONS.doFilter: 
            const currentState = {...state};
            currentState[action.filterKey] = action.filterValue;
            return currentState;
        default: 
            return state
    }
}