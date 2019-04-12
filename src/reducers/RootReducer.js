import { combineReducers } from "redux";
import simpleReducer from "./SimpleReducer";
import openChats from "./OpenChats";
import filter from "./Filter";
import users from "./Users";
import userConfig from './UserConfig';

export default combineReducers({
    openChats,
    filter,
    users,
    userConfig,
    simpleReducer
}); 