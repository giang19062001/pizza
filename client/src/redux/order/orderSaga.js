import { all, call, put, takeLatest,delay } from "redux-saga/effects";
import axios from 'axios'
import { startOrder,createOrder,createOrderShutdown } from "./orderAction";


const callAPIOrder= async (orderInfo) => {
    try {
      const res = await axios.post(process.env.REACT_APP_SERVER + "api/order", orderInfo, {headers: {
        "Content-Type": "application/json"}
    });
      return res;
  
    } catch (error) {
        throw new Error(error.message);
    }
  }

  export function* createOrderSaga (orderInfo) {

  try {  

      const res = yield call(callAPIOrder, orderInfo.payload.order);
      yield put(createOrder([res.data._id,res.data.createdAt,orderInfo.payload.socket]));
      
    } catch (error) {
        yield put(createOrderShutdown(error));
      }

  }

  export function* onAddOrderInfo() {
    yield takeLatest(startOrder, createOrderSaga);
  }

export function* orderSaga() {
  yield all([call(onAddOrderInfo)]);
}
