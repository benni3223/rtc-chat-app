import { ACTIONS } from "../actions/Actions";

const initialUsers = [
    {
        id: "ksdgjsdjn",
        username: "Felix"
    },
    {
        id: "jaisofühas",
        username: "Frank"
    },
    {
        id: "asfasfg",
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