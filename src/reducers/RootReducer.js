import { combineReducers } from "redux";
import simpleReducer from "./SimpleReducer";
import openChats from "./OpenChats";
import filter from "./Filter";
import users from "./Users";


export default combineReducers({
    openChats,
    filter,
    users,
    simpleReducer
}); 