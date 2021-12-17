import { put, call } from "redux-saga/effects";
import * as actions from "../actions";
import {
  addMeetingTopic,
  getMeetingByMeetingId,
  deleteMeetingTopic,
  updateMeetingOutcome,
} from "../../firebase/firestore.js";

export function* fetchMeetingRequest(action) {
  let payload = action.payload;
  const response = yield call(getMeetingByMeetingId, payload.meetingId);
  if (response) {
    yield put(actions.fetchMeetingSuccess(response));
  }
}

export function* addMeetingTopicRequest(action) {
  let payload = action.payload;
  const response = yield call(addMeetingTopic, payload);
  yield put(actions.fetchMeetingRequest(action.payload));
}

export function* deleteMeetingTopicRequest(action) {
  let payload = action.payload;
  const response = yield call(deleteMeetingTopic, payload);
  yield put(actions.fetchMeetingRequest(action.payload));
}

export function* updateMeetingOutcomeRequest(action) {
  let payload = action.payload;
  const response = yield call(updateMeetingOutcome, payload);
  yield put(actions.fetchMeetingRequest(action.payload));
}
