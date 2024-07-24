import {configureStore,combineReducers} from "@reduxjs/toolkit"


import { persistReducer,persistStore } from "redux-persist"
import storage from 'redux-persist/lib/storage'
import userSlice from "../slices/userSlice"

const persistConfig = {
    key:"root",
    whitelist:["user"],
    storage
}

const reducer = combineReducers({
    user:userSlice
})

const persistedReducer = persistReducer(persistConfig,reducer)

const Store = configureStore({
    reducer:{
        persisted:persistedReducer
    }
})
const persistor = persistStore(Store)

export{Store,persistor}