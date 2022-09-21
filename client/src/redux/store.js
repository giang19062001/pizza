import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import cartSlice from './cart/cartSlice'
import { combineReducers } from "redux";
import { persistStore } from "redux-persist";
import createSagaMiddleware from 'redux-saga';
import { all, call } from "redux-saga/effects";
import { orderSaga } from './order/orderSaga'
import { pizzaSaga } from './pizza/pizzaSaga'
import orderSlice from './order/orderSlice'
import notifySlice from './notify/notifySlice'

const rootReducer = combineReducers({
  cart:cartSlice,
  order:orderSlice,
  notify:notifySlice
});

function* rootSaga() {
  yield all([call(orderSaga),call(pizzaSaga)]);
}

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleWare = createSagaMiddleware();

export const store = configureStore({
    reducer:persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger,sagaMiddleWare),

})
sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);
