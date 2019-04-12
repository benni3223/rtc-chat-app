import { ACTIONS } from "./Actions";


export const doFilter = (filterKey, filterValue) => dispatch =>  {
    dispatch({
        type: ACTIONS.doFilter,
        filterKey: filterKey,
        filterValue: filterValue
    })
}