import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'
import animeReducer from './user/animeSlice.js'

const rootReducer = combineReducers({
    user: userReducer,
    anime: animeReducer
})

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
    blacklist: ['anime']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck: false,
    })
})

export const persistor = persistStore(store);