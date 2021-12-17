import { put, call } from "redux-saga/effects";
import * as actions from "../actions";
import { getCriticalNotifications } from "../../firebase/firestore.js";

export function* fetchNotificationCriticals(action) {
  // below code is commented as rule are modifying very usually and this is creating issue
  // const response = yield call(getCriticalNotifications);
  // if (response && response.length > 0) {
  //   yield put(actions.showNotificationCriticals(response));
  // }
}
