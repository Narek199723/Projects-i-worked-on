import { put, call } from "redux-saga/effects";
import * as actions from "../actions";
import {
  addNewTopic,
  fetchTopics,
  deleteTopic,
} from "../../firebase/firestore.js";

export function* addNewTopicRequest(action) {
  let payload = action.payload;
  const response = yield call(addNewTopic, action.payload);
  yield put(
    actions.showSnackbar({
      show: true,
      severity: "success",
      message: "Setting updated successfully",
    })
  );
  yield put(actions.fetchTopicsRequest());
}

export function* fetchTopicsRequest(action) {
  const response = yield call(fetchTopics, action.payload);
  if (response && response.length > 0) {
    yield put(actions.fetchTopicsSuccess(response));
  } else {
    yield put(actions.fetchTopicsError([]));
  }
}

export function* deleteTopicRequest(action) {
  let payload = action.payload;
  const response = yield call(deleteTopic, action.payload);
  yield put(actions.fetchTopicsRequest());
}
