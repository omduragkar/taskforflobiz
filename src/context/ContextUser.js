import React, { useContext, useReducer } from 'react'
import { Reducers } from './Reducers';
const Context = React.createContext();

function ContextUser({ children}) {
    const [state, dispatch] = useReducer(Reducers, {
      user: localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):undefined,
      datarr:localStorage.getItem("datarr")?JSON.parse(localStorage.getItem("datarr")):[]
    })
  return (
    <Context.Provider value={{state, dispatch}}>
        {children}
    </Context.Provider>

  )
}
export const GlobalContext = ()=>{
    return useContext(Context);
}
export default ContextUser