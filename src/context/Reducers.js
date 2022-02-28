import { ADDUSER, CHANGE, LOGOUT } from "./Constants";

export const Reducers = (state, action)=>{
    switch(action.type){
        case ADDUSER: return {...state, user:action.payload}
        case LOGOUT: return {...state, user:undefined}
        case CHANGE: return {...state, datarr:action.payload}
        default:
            return state;
    }
}