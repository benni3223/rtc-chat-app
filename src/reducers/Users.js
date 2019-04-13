import { ACTIONS } from "../actions/Actions";

const initialUsers = [
]

export default (state = initialUsers, action) => {
    switch (action.type) {
        case ACTIONS.addUser: 
            const currentState = [...state, action.user];
            return currentState;
        case ACTIONS.removeUser: 
                return state.filter(user => user.id !== action.userId);
        case ACTIONS.setUsers: 
                return action.users;
        default: 
            return state
    }
}