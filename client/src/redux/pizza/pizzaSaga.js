import { all, call, put, takeLatest,delay } from "redux-saga/effects";
import axios from 'axios'
import { startCreatePizza,CreatePizza } from "./pizzaAction";


const callAPIPizza= async (pizzaInfo) => {
    try {
      const res = await axios.post(process.env.REACT_APP_SERVER + "api/pizza", pizzaInfo, {headers: {
        "Content-Type": "multipart/form-data"}
    });
      return res;
  
    } catch (error) {
        throw new Error(error.message);
    }
  }

  export function* createPizzaSaga (pizzaInfo) {

  try {  
      const res = yield call(callAPIPizza, pizzaInfo.payload.pizza);
      pizzaInfo.payload.navigate(0)

    } catch (error) {
         throw new Error (error);
      }

  }

  export function* onAddPizzaInfo() {
    yield takeLatest(startCreatePizza, createPizzaSaga);
  }

export function* pizzaSaga() {
  yield all([call(onAddPizzaInfo)]);
}
