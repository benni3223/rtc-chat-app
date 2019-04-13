import { ACTIONS } from "./Actions";


export const setUsers = (userArray) => dispatch =>  {
    dispatch({
        type: ACTIONS.setUsers,
        users: userArray
    })
}
export const addUser = (userObj) => dispatch =>  {
    dispatch({
        type: ACTIONS.addUser,
        user: userObj
    })
}
export const removeUser = (userId) => dispatch =>  {
    dispatch({
        type: ACTIONS.removeUser,
        userId: userId
    })
}