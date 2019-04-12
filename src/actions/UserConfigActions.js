import { ACTIONS } from "./Actions";


export const loginUser = (userId, username) => dispatch =>  {
    dispatch({
        type: ACTIONS.loginUser,
        username: username,
        userId: userId
    })
}
export const logoutUser = () => dispatch =>  {
    dispatch({
        type: ACTIONS.logoutUser
    })
}