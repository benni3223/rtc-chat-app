import { ACTIONS } from "./Actions";


export const registerService = (serviceName, serviceInstance) => dispatch =>  {
    dispatch({
        type: ACTIONS.registerService,
        name: serviceName,
        service: serviceInstance
    })
}