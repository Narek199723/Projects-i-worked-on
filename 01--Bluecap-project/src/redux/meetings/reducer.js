import { handleActions } from "redux-actions";
import update from "immutability-helper";
import constants from "../constants";

const initialState = {
  meetingDetails: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    data: false,
  },
  addMeetingTopic: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    data: false,
  },
  deleteMeetingTopic: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    data: false,
  },
  meetingOutcome: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    data: false,
  },
};

/* add meeting topic */
const addMeetingTopicRequest = (state, action) => {
  return update(state, {
    addMeetingTopic: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false },
      message: { $set: "" },
      data: { $set: false },
    },
  });
};

const addMeetingTopicSuccess = (state, action) =>
  update(state, {
    topics: {
      isLoading: { $set: true },
      isSuccess: { $set: true },
      isError: { $set: false },
      message: { $set: "" },
      data: { $set: action.payload },
    },
  });
const addMeetingTopicError = (state, action) =>
  update(state, {
    topics: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: false },
      message: { $set: "" },
      data: { $set: false },
    },
  });

/* delete meeting topic */
const deleteMeetingTopicRequest = (state, action) => {
  return update(state, {
    deleteMeetingTopic: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false },
      message: { $set: "" },
      data: { $set: false },
    },
  });
};

const deleteMeetingTopicSuccess = (state, action) =>
  update(state, {
    deleteMeetingTopic: {
      isLoading: { $set: true },
      isSuccess: { $set: true },
      isError: { $set: false },
      message: { $set: "" },
      data: { $set: action.payload },
    },
  });
const deleteMeetingTopicError = (state, action) =>
  update(state, {
    deleteMeetingTopic: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: false },
      message: { $set: "" },
      data: { $set: false },
    },
  });

/* fetch meeting */
const fetchMeetingRequest = (state, action) => {
  return update(state, {
    meetingDetails: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false },
      message: { $set: "" },
      data: { $set: false },
    },
  });
};

const fetchMeetingSuccess = (state, action) =>
  update(state, {
    meetingDetails: {
      isLoading: { $set: true },
      isSuccess: { $set: true },
      isError: { $set: false },
      message: { $set: "" },
      data: { $set: action.payload },
    },
  });
const fetchMeetingError = (state, action) =>
  update(state, {
    meetingDetails: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: false },
      message: { $set: "" },
      data: { $set: false },
    },
  });

/* update meeting outcome */
const updateMeetingOutcomeRequest = (state, action) => {
  return update(state, {
    meetingOutcome: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false },
      message: { $set: "" },
      data: { $set: false },
    },
  });
};

const updateMeetingOutcomeSuccess = (state, action) =>
  update(state, {
    meetingOutcome: {
      isLoading: { $set: true },
      isSuccess: { $set: true },
      isError: { $set: false },
      message: { $set: "" },
      data: { $set: action.payload },
    },
  });
const updateMeetingOutcomeError = (state, action) =>
  update(state, {
    meetingOutcome: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: false },
      message: { $set: "" },
      data: { $set: false },
    },
  });

export default handleActions(
  {
    [constants.ADD_MEETING_TOPIC_REQUEST]: addMeetingTopicRequest,
    [constants.ADD_MEETING_TOPIC_SUCCESS]: addMeetingTopicSuccess,
    [constants.ADD_MEETING_TOPIC_ERROR]: addMeetingTopicError,

    [constants.DELETE_MEETING_TOPIC_REQUEST]: deleteMeetingTopicRequest,
    [constants.DELETE_MEETING_TOPIC_SUCCESS]: deleteMeetingTopicSuccess,
    [constants.DELETE_MEETING_TOPIC_ERROR]: deleteMeetingTopicError,

    [constants.FETCH_MEETING_REQUEST]: fetchMeetingRequest,
    [constants.FETCH_MEETING_SUCCESS]: fetchMeetingSuccess,
    [constants.FETCH_MEETING_ERROR]: fetchMeetingError,

    [constants.UPDATE_MEETING_OUTCOME_REQUEST]: updateMeetingOutcomeRequest,
    [constants.UPDATE_MEETING_OUTCOME_SUCCESS]: updateMeetingOutcomeSuccess,
    [constants.UPDATE_MEETING_OUTCOME_ERROR]: updateMeetingOutcomeError,
  },
  initialState
);
