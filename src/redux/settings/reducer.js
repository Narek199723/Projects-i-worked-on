import { handleActions } from "redux-actions";
import update from "immutability-helper";
import constants from "../constants";

const initialState = {
  addNewTopic: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    data: false,
  },
  topics: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    data: false,
  },
  deleteTopic: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    data: false,
  },
};

/* add new topic */
const addNewTopicRequest = (state, action) => {
  return update(state, {
    addNewTopic: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false },
      message: { $set: "" },
      data: { $set: false },
    },
  });
};

const fetchTopicsRequest = (state, action) =>
  update(state, {
    topics: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false },
      message: { $set: "" },
      data: { $set: false },
    },
  });
const fetchTopicsSuccess = (state, action) =>
  update(state, {
    topics: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false },
      message: { $set: "" },
      data: { $set: action.payload },
    },
  });
const fetchTopicsError = (state, action) =>
  update(state, {
    topics: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true },
      message: { $set: action.payload },
      data: { $set: false },
    },
  });

const deleteTopicRequest = (state, action) =>
  update(state, {
    deleteTopic: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false },
      message: { $set: "" },
      data: { $set: false },
    },
  });
const deleteTopicSuccess = (state, action) =>
  update(state, {
    deleteTopic: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false },
      message: { $set: "" },
      data: { $set: action.payload },
    },
  });
const deleteTopicError = (state, action) =>
  update(state, {
    deleteTopic: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true },
      message: { $set: action.payload },
      data: { $set: false },
    },
  });

export default handleActions(
  {
    [constants.ADD_NEW_TOPIC_REQUEST]: addNewTopicRequest,
    [constants.FETCH_TOPICS_REQUEST]: fetchTopicsRequest,
    [constants.FETCH_TOPICS_SUCCESS]: fetchTopicsSuccess,
    [constants.FETCH_TOPICS_ERROR]: fetchTopicsError,

    [constants.DELETE_TOPIC_REQUEST]: deleteTopicRequest,
    [constants.DELETE_TOPIC_SUCCESS]: deleteTopicSuccess,
    [constants.DELETE_TOPIC_ERROR]: deleteTopicError,
  },
  initialState
);
