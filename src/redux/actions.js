import { createAction } from "redux-actions";
import constants from "./constants";

export const showSnackbar = createAction(constants.SHOW_SNACKBAR);

export const fetchNotificationCriticals = createAction(
  constants.FETCH_NOTIFICATION_CRITICALS
);

export const showNotificationCriticals = createAction(
  constants.SHOW_NOTIFICATION_CRITICALS
);
export const closeNotificationCriticals = createAction(
  constants.CLOSE_NOTIFICATION_CRITICALS
);

export const fetchTopicsRequest = createAction(constants.FETCH_TOPICS_REQUEST);
export const fetchTopicsSuccess = createAction(constants.FETCH_TOPICS_SUCCESS);
export const fetchTopicsError = createAction(constants.FETCH_TOPICS_ERROR);

export const addNewTopicRequest = createAction(constants.ADD_NEW_TOPIC_REQUEST);
export const addNewTopicSuccess = createAction(constants.ADD_NEW_TOPIC_SUCCESS);
export const addNewTopicError = createAction(constants.ADD_NEW_TOPIC_ERROR);

export const deleteTopicRequest = createAction(constants.DELETE_TOPIC_REQUEST);
export const deleteTopicSuccess = createAction(constants.DELETE_TOPIC_SUCCESS);
export const deleteTopicError = createAction(constants.DELETE_TOPIC_ERROR);

export const addMeetingTopicRequest = createAction(
  constants.ADD_MEETING_TOPIC_REQUEST
);
export const addMeetingTopicSuccess = createAction(
  constants.ADD_MEETING_TOPIC_SUCCESS
);
export const addMeetingTopicError = createAction(
  constants.ADD_MEETING_TOPIC_ERROR
);

export const deleteMeetingTopicRequest = createAction(
  constants.DELETE_MEETING_TOPIC_REQUEST
);
export const deleteMeetingTopicSuccess = createAction(
  constants.DELETE_MEETING_TOPIC_SUCCESS
);
export const deleteMeetingTopicError = createAction(
  constants.DELETE_MEETING_TOPIC_ERROR
);

export const fetchMeetingRequest = createAction(
  constants.FETCH_MEETING_REQUEST
);
export const fetchMeetingSuccess = createAction(
  constants.FETCH_MEETING_SUCCESS
);
export const fetchMeetingError = createAction(constants.FETCH_MEETING_ERROR);

export const updateMeetingOutcomeRequest = createAction(
  constants.UPDATE_MEETING_OUTCOME_REQUEST
);
export const updateMeetingOutcomeSuccess = createAction(
  constants.UPDATE_MEETING_OUTCOME_SUCCESS
);
export const updateMeetingOutcomeError = createAction(
  constants.UPDATE_MEETING_OUTCOME_ERROR
);
