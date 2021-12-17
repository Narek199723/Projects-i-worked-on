import { handleActions } from "redux-actions";
import update from "immutability-helper";
import constants from "../constants";
import {
  getClosedCriticalNotifications,
  setClosedCriticalNotifications,
} from "../../utils/generic";

const initialState = {
  snackbar: {
    data: {
      show: false,
      severity: "",
      message: "",
    },
  },
  notificationCriticals: {
    show: false,
    messages: [],
    messagesBackup: [],
  },
};

/* snackbar */
const showSnackbar = (state, action) => {
  return update(state, {
    snackbar: {
      data: { $set: action.payload },
    },
  });
};

/* notification criticals */
const showNotificationCriticals = (state, action) => {
  let existingMessages = [];
  let allMessages = [];
  let { notificationCriticals } = state;
  if (notificationCriticals && notificationCriticals.messages) {
    existingMessages = [...notificationCriticals.messages];
    allMessages = [...notificationCriticals.messages];
  }
  if (action.payload && action.payload.length > 0) {
    let existigViewed = getClosedCriticalNotifications();
    let newToAdd = [];
    action.payload.forEach((msg) => {
      allMessages.push(msg);
      if (existigViewed.indexOf(msg.docId) === -1) {
        newToAdd.push(msg);
      }
    });
    if (newToAdd && newToAdd.length > 0) {
      existingMessages = existingMessages.concat(newToAdd);
    }
  }

  return update(state, {
    notificationCriticals: {
      messages: { $set: existingMessages },
      messagesBackup: { $set: allMessages },
    },
  });
};

const closeNotificationCriticals = (state, action) => {
  let { docId } = action.payload;
  setClosedCriticalNotifications(docId);
  let existingMessages = [];
  let { notificationCriticals } = state;
  if (notificationCriticals && notificationCriticals.messages) {
    existingMessages = [...notificationCriticals.messages];
    existingMessages.shift();
  }
  return update(state, {
    notificationCriticals: {
      messages: { $set: existingMessages },
    },
  });
};

export default handleActions(
  {
    [constants.SHOW_SNACKBAR]: showSnackbar,
    [constants.SHOW_NOTIFICATION_CRITICALS]: showNotificationCriticals,
    [constants.CLOSE_NOTIFICATION_CRITICALS]: closeNotificationCriticals,
  },
  initialState
);
