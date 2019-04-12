import { ACTIONS } from "./Actions";


/*
    {
        chatId: "asdasdsa",
        username: "Username",
        message: {
            creator: "asdsad", //if it is not set, the creator is the user himself
            message: "asldaksdlaskdlakdlsakd",
            timestamp: "04.12.2012 10:21:12"
        }
    }
*/
export const addChatMessage = (messageObj) => dispatch =>  {
    dispatch({
        type: ACTIONS.addChatMessage,
        payload: messageObj
    })
}



export const selectChat = (chatId) => dispatch =>  {
    dispatch({
        type: ACTIONS.selectChat,
        chatId: chatId
    })
}

