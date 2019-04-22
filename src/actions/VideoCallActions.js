import { ACTIONS } from "./Actions";


export const startVideoCall = (userId) => dispatch =>  {
    dispatch({
        type: ACTIONS.startVideoCall,
        userId: userId
    })
}
export const endVideoCall = () => dispatch =>  {
    dispatch({
        type: ACTIONS.endVideoCall
    })
}
export const acceptVideoCall = (userId) => dispatch =>  {
    dispatch({
        type: ACTIONS.acceptVideoCall,
        userId: userId
    })
}
export const rejectVideoCall = (userId) => dispatch =>  {
    dispatch({
        type: ACTIONS.rejectVideoCall,
        userId: userId
    })
}
export const addPendingVideoCall = (userId, acceptCallback, rejectCallback) => dispatch => {
    dispatch({
        type: ACTIONS.addPendingVideoCall,
        userId: userId,
        acceptCallback: acceptCallback,
        rejectCallback: rejectCallback
    })
}
export const switchDisplayElement = () => dispatch =>  {
    dispatch({
        type: ACTIONS.switchDisplayElement
    })
}