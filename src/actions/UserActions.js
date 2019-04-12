import { ACTIONS } from "./Actions";


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