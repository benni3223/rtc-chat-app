import { ACTIONS } from "./Actions";


export const simpleAction = () => dispatch =>  {
    dispatch({
        type: ACTIONS.simpleAction,
        payload: 'result_of_simple_action'
    })
}