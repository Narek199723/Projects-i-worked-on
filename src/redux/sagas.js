import constants from "./constants";
import { takeLatest, all } from "redux-saga/effects";

import { fetchNotificationCriticals } from "./generic/action";

import {
  addNewTopicRequest,
  fetchTopicsRequest,
  deleteTopicRequest,
} from "./settings/action";

import {
  fetchMeetingRequest,
  addMeetingTopicRequest,
  deleteMeetingTopicRequest,
  updateMeetingOutcomeRequest,
} from "./meetings/action";

function* watchActions() {
  /*fetch notifications critical*/
  yield takeLatest(
    constants.FETCH_NOTIFICATION_CRITICALS,
    fetchNotificationCriticals
  );

  // fetch topics
  // yield takeLatest(constants.FETCH_TOPICS, fetchTopics);

  // add topics
  yield takeLatest(constants.ADD_NEW_TOPIC_REQUEST, addNewTopicRequest);

  // fetch topics
  yield takeLatest(constants.FETCH_TOPICS_REQUEST, fetchTopicsRequest);

  // delete topic
  yield takeLatest(constants.DELETE_TOPIC_REQUEST, deleteTopicRequest);

  // add meeting topic
  yield takeLatest(constants.ADD_MEETING_TOPIC_REQUEST, addMeetingTopicRequest);

  // delete meeting topic
  yield takeLatest(
    constants.DELETE_MEETING_TOPIC_REQUEST,
    deleteMeetingTopicRequest
  );

  // fetch meetings
  yield takeLatest(constants.FETCH_MEETING_REQUEST, fetchMeetingRequest);

  // update meeting outcome
  yield takeLatest(
    constants.UPDATE_MEETING_OUTCOME_REQUEST,
    updateMeetingOutcomeRequest
  );
}

export default function* rootSaga() {
  yield all([watchActions()]);
}
