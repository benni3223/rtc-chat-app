import { ACTIONS } from "../actions/Actions";

const initialUsers = [
    {
        id: 1,
        username: "Felix"
    },
    {
        id: 2,
        username: "Frank"
    },
    {
        id: 3,
        username: "Friedrich"
    }
]

export default (state = initialUsers, action) => {
    switch (action.type) {
        case ACTIONS.addUser: 
            const currentState = [...state, action.user];
            return currentState;
        case ACTIONS.removeUser: 
                return state.filter(user => user.id !== action.userId);
        default: 
            return state
    }
}