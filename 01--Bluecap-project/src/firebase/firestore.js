import firebase from "./firebase";
import "firebase/firestore";
import { _log, getData } from "../utils";
import { v4 as uuidv4 } from "uuid";
import { documentId } from "firebase/firestore";

const db = firebase.firestore();

const DBusers = db.collection("users");
const DBorganizations = db.collection("organizations");
const transcription = db.collection("transcription");
const summaryActions = db.collection("summary");
export const summaryStore = db.collection("summaries");
export const notesStore = db.collection("notes");
export const DBmeeting = db.collection("meetings");
export const DBcriticalNotifications = db.collection("criticalNotifications");

// export summaryStore;
// export notesStore;

export const getUserByUserId = async (uid) => {
  return await DBusers.doc(uid)
    .get()
    .then(function (doc) {
      if (doc.exists) {
        //_log(doc.data())
        return doc.data();
      } else {
        return false;
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
      return false;
    });
};

//Store user details

export const setUserDetailsByUserId = async (uid, payload) => {
  try {
    DBusers.doc(uid).update({
      email: payload.email,
      displayName: payload.displayName,
      photoURL: payload.photoURL,
      timeZone: new Date().getTimezoneOffset(),
      updatedAt: new Date(),
    });
  } catch (error) {}
};

// Store meeting settings

export const storeMeetingSettings = async (payload, meetingType) => {
  let organizationId = uuidv4();
  return await DBorganizations.doc(organizationId)
    .set(payload)
    .then(async (response) => {
      return response;
    })
    .then(async () => {
      const userUpdated = await DBusers.doc(payload.createdBy)
        .update({
          organizationId: organizationId,
          "settings.join": meetingType,
        })
        .then(() => {
          return true;
        })
        .catch(() => {
          return false;
        });
      return userUpdated;
    })
    .catch((error) => {
      console.error("Error writing Oragnization: ", error);
      return {
        success: false,
        message: (error && error.message) || "",
      };
    });
};

export const getTranscriptByMeetingId = async (meetingId) => {
  let transcriptions = await db
    .collection("meetings")
    .doc(meetingId)
    .collection("transcription")
    .orderBy("timestamp")
    .get();

  // _log('logg:', doc.data())

  return transcriptions;
  // })
  // .catch(function (error) {
  //   console.log("Error getting document:", error);
  //   return false;
  // });
};

// export const getMeetingByMeetingId = async (meetingId) => {
//   let meetingData = await db.collection('meetings')
//     .doc(meetingId)
//     .get()
//     return meetingData;
// };

export const getMeetingByMeetingId = async (meetingId) => {
  return await db
    .collection("meetings")
    .doc(meetingId)
    .get()
    .then(function (doc) {
      if (doc.exists) {
        // _log('logg:',doc.data())
        return doc.data();
      } else {
        return false;
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
      return false;
    });
};

export const getSummary = async (meetingId) => {
  return await db
    .collection("summaries")
    .doc(meetingId)
    .get()
    .then(function (doc) {
      if (doc.exists) {
        // _log('logg:',doc.data())
        return doc.data();
      } else {
        return false;
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
      return false;
    });
};

export const getNotes = async (meetingId) => {
  return await db
    .collection("notes")
    .doc(meetingId)
    .get()
    .then(function (doc) {
      if (doc.exists) {
        // _log('logg:',doc.data())
        return doc.data();
      } else {
        return false;
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
      return false;
    });
};

export const storeSummary = async (payload, meetingId) => {
  let summaryRef = summaryStore.doc(meetingId);
  let currentSummary = "";

  await summaryRef
    .get()
    .then(function (doc) {
      if (doc.exists) {
        currentSummary = doc.data().summary;
        payload.history_summary = firebase.firestore.FieldValue.arrayUnion({
          value: currentSummary,
          timestamp: new Date(),
        });
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
      return false;
    });

  return summaryRef
    .update(payload)

    .then(async (response) => {
      let changeLogId = uuidv4();
      let changeLogData = {
        timestamp: new Date(),
        userId: firebase.auth().currentUser.uid,
        field: "SUMMARY",
        action: "UPDATE",
      };

      return DBmeeting.doc(meetingId)
        .collection("changeLogs")
        .doc(changeLogId)
        .set(changeLogData);
    })
    .then(() => true)

    .catch((error) => {
      console.error("Error writing Oragnization: ", error);
      return {
        success: false,
        message: (error && error.message) || "",
      };
    });
};

export const storeActions = async (payload, meetingId) => {
  let summaryRef = summaryStore.doc(meetingId);
  let currentActionPlans = "";

  await summaryRef
    .get()
    .then(function (doc) {
      if (doc.exists) {
        currentActionPlans = doc.data().actionPlans;
        payload.history_actionPlans = firebase.firestore.FieldValue.arrayUnion({
          value: currentActionPlans,
          timestamp: new Date(),
        });
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
      return false;
    });

  return await summaryRef
    .update(payload)

    .then(async (response) => {
      let changeLogId = uuidv4();
      let changeLogData = {
        timestamp: new Date(),
        userId: firebase.auth().currentUser.uid,
        field: "ACTIONS",
        action: "UPDATE",
      };
      return DBmeeting.doc(meetingId)
        .collection("changeLogs")
        .doc(changeLogId)
        .set(changeLogData);
    })
    .then(() => true)

    .catch((error) => {
      console.error("Error writing Oragnization: ", error);
      return {
        success: false,
        message: (error && error.message) || "",
      };
    });
};

//store notes changes

export const changeNotes = async (payload, meetingId) => {
  return notesStore
    .doc(meetingId)
    .get()
    .then(function (doc) {
      if (doc.exists) {
        let currentNotes = doc.data();

        let updatedNotes = currentNotes.specialNotes.map((note, index) => {
          if (index == payload.index) {
            note.note = payload.note;
            return note;
          } else {
            return note;
          }
        });

        return notesStore.doc(meetingId).update({ specialNotes: updatedNotes });
      } else {
        throw "doc not found";
      }
    })
    .then(() => {
      let changeLogId = uuidv4();
      let changeLogData = {
        timestamp: new Date(),
        userId: firebase.auth().currentUser.uid,
        field: "NOTES",
        action: "UPDATE",
      };

      return DBmeeting.doc(meetingId)
        .collection("changeLogs")
        .doc(changeLogId)
        .set(changeLogData);
    })
    .then(() => {
      return true;
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
      return false;
    });
};

//store transcript changes

export const changeTranscript = async (payload, meetingId) => {
  let response = await DBmeeting.doc(meetingId)
    .collection("transcription")
    .doc(payload.transcriptId)
    .update({ text: payload.text })
    .then(() => {
      console.log("store change log here");

      let changeLogId = uuidv4();
      let changeLogData = {
        timestamp: new Date(),
        userId: firebase.auth().currentUser.uid,
        field: "TRANSCRIPT",
        action: "UPDATE",
      };

      return DBmeeting.doc(meetingId)
        .collection("changeLogs")
        .doc(changeLogId)
        .set(changeLogData);
    })
    .then(() => {
      return true;
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
      return false;
    });

  return response;
};

// get change logs of meeting
export const getChangeLog = (meetingId) => {
  return firebase
    .auth()
    .currentUser.getIdToken()
    .then(async function (jwtToken) {
      return getData(
        `${process.env.REACT_APP_BASE_API_URL}/meeting/changelog?meetingId=${meetingId}`,
        jwtToken
      );
    })
    .then((changeLogData) => {
      return changeLogData;
    })
    .catch(() => {
      return false;
    });

  return DBmeeting.doc(meetingId)
    .collection("changeLogs")
    .orderBy("timestamp", "desc")
    .get()
    .then((data) => {
      return data;
    })
    .catch((e) => e);
};

// store user setting

export const storeUserSetting = async (payload, type) => {
  let userId = firebase.auth().currentUser.uid;
  let userUpdated = "";

  if (type == "notifications") {
    userUpdated = await DBusers.doc(userId).update({
      "settings.preferences.notifications": payload,
    });
  } else if (type == "sharing") {
    userUpdated = await DBusers.doc(userId).update({
      "settings.preferences.sharing": payload,
    });
  } else if (type == "meeting-settings") {
    return DBusers.doc(userId)
      .update({
        "settings.join": payload,
      })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  } else {
    userUpdated = await DBusers.doc(userId).update({
      "settings.preferences.summaries": payload,
    });
  }

  return userUpdated;
};

// store Summary ratings
export const storeSummaryRatings = async (meetingId, payload) => {
  return summaryStore
    .doc(meetingId)
    .update({
      summaryReaction: payload,
    })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

// store Action ratings
export const storeActionRatings = async (meetingId, payload) => {
  return summaryStore
    .doc(meetingId)
    .update({
      actionPlansReaction: payload,
    })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

// set users selected calendars from settings

export const setCalendars = (calendars) => {
  return DBusers.doc(firebase.auth().currentUser.uid)
    .update({
      "settings.calendars": calendars,
    })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

// set users Products/Services and Competitors
export const setProductsAndCompetitors = (arr, type) => {
  let obj =
    type == "competitors"
      ? { "settings.matching.competitors": arr }
      : { "settings.matching.products": arr };

  return DBusers.doc(firebase.auth().currentUser.uid)
    .update(obj)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

//Mark transcript as read

export const markTranscriptAsReadFs = async (meetingId) => {
  return DBmeeting.doc(meetingId)
    .update({ transcriptRead: true })
    .then(() => {
      return true;
    })
    .catch(function (error) {
      return false;
    });
};

// mark summary as read

export const markSummaryAsReadFs = async (meetingId) => {
  return summaryStore
    .doc(meetingId)
    .update({ summaryRead: true })
    .then(() => {
      return true;
    })
    .catch(function (error) {
      return false;
    });
};

// mark actions as read

export const markActionAsReadFs = async (meetingId) => {
  return summaryStore
    .doc(meetingId)
    .update({ actionPlansRead: true })
    .then(() => {
      return true;
    })
    .catch(function (error) {
      return false;
    });
};

// mark notes as read

export const markNotesAsReadFs = async (meetingId) => {
  return notesStore
    .doc(meetingId)
    .update({ notesRead: true })
    .then(() => {
      return true;
    })
    .catch(function (error) {
      return false;
    });
};

// get all critical notifications
export const getCriticalNotifications = async (uid) => {
  const snapshot = await DBcriticalNotifications.get();
  return snapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      docId: doc.id,
    };
  });
};

// add new topic
export const addNewTopic = async (data) => {
  let userDetails = await getUserByUserId(firebase.auth().currentUser.uid);
  let existingTopics = [];
  if (userDetails && userDetails.settings && userDetails.settings.topics) {
    existingTopics = userDetails.settings.topics;
  }
  existingTopics.push(data);
  let obj = {
    "settings.topics": existingTopics,
  };
  return DBusers.doc(firebase.auth().currentUser.uid)
    .update(obj)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

// fetch topics
export const fetchTopics = async (data) => {
  let existingTopics = [];
  let userDetails = await getUserByUserId(firebase.auth().currentUser.uid);
  if (userDetails && userDetails.settings && userDetails.settings.topics) {
    existingTopics = userDetails.settings.topics;
  }
  return existingTopics;
};

// delete topic
export const deleteTopic = async (data) => {
  let userDetails = await getUserByUserId(firebase.auth().currentUser.uid);
  let existingTopics = [];
  if (userDetails && userDetails.settings && userDetails.settings.topics) {
    existingTopics = userDetails.settings.topics;
  }
  let newTopics = existingTopics.filter((i, index) => data !== index);
  let obj = {
    "settings.topics": newTopics,
  };
  return DBusers.doc(firebase.auth().currentUser.uid)
    .update(obj)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

// add meeting topic
export const addMeetingTopic = async (data) => {
  const { meetingId, topic } = data;
  let meetingDetails = await getMeetingByMeetingId(meetingId);
  let existingTopics = [];
  if (meetingDetails && meetingDetails.topics) {
    existingTopics = meetingDetails.topics;
  }
  existingTopics.push(topic);
  let obj = {
    topics: existingTopics,
  };
  return DBmeeting.doc(meetingId)
    .update(obj)
    .then(() => {
      return true;
    })
    .catch(function (error) {
      return false;
    });
};

// delete meeting topic
export const deleteMeetingTopic = async (data) => {
  const { meetingId, topic } = data;
  let meetingDetails = await getMeetingByMeetingId(meetingId);
  let topicsToUpdate = [];
  if (meetingDetails && meetingDetails.topics) {
    meetingDetails.topics.forEach((t) => {
      if (t !== topic) {
        topicsToUpdate.push(t);
      }
    });
  }
  let obj = {
    topics: topicsToUpdate,
  };
  return DBmeeting.doc(meetingId)
    .update(obj)
    .then(() => {
      return true;
    })
    .catch(function (error) {
      return false;
    });
};

// set speakers flag
export const setParticipantsFlag = (obj, meetingId) => {
  return DBmeeting.doc(meetingId)

    .update({
      participants: obj,
    })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

//update transcript
export const UpdateTranscriptByMeetingId = async (
  meetingId,
  transcriptId,
  name
) => {
  // console.log(meetingId, transcriptId, name)
  let transcriptions = await db
    .collection("meetings")
    .doc(meetingId)
    .collection("transcription")
    .doc(transcriptId)
    .update({
      name: name,
    })
    .then(() => {
      // console.log('then')
      return true;
    })
    .catch((e) => {
      // console.log(e)
      return false;
    });
  return transcriptions;
};

//addContact
export const addContact = async (contactDetails) => {
  let contactID = uuidv4();
  contactDetails.contactId = contactID;
  let uid = firebase.auth().currentUser.uid;
  console.log(uid, "inapp");
  let newContact = await db
    .collection("contacts")
    .doc(contactID)
    .set(contactDetails)
    .then(async () => {
      let user = (await db.collection("users").doc(uid).get()).data();
      if (user.contact) {
        user.contact.push(contactID);
        await db.collection("users").doc(uid).set(user);
      } else {
        user.contact = [];
        user.contact.push(contactID);
        await db.collection("users").doc(uid).set(user);
      }
      return true;
    })
    .catch((e) => {
      // console.log(e)
      return e;
    });
  return newContact;
};

export const getContactById = async (ID) => {
  try {
    let contact = (await db.collection("contacts").doc(ID).get()).data();
    if (contact) {
      return contact;
    }
  } catch (e) {
    console.log(e);
  }
};

export const updateContact = async (updatedUserInfo, ID) => {
  try {
    console.log(updatedUserInfo, "updated data here");
    let contact = await db.collection("contacts").doc(ID).set(updatedUserInfo);
    console.log(contact, "lool");
    if (contact) {
      return "true";
    }
  } catch (e) {
    console.log(e);
  }
};

export const deleteContact = async (ID) => {
  try {
    let contact = await db.collection("contacts").doc(ID).delete();
    if (contact) {
      return "true";
    }
  } catch (e) {
    console.log(e);
  }
};

// update meeting outcome
export const updateMeetingOutcome = async (data) => {
  const { meetingId, meetingOutcome } = data;
  let meetingDetails = await getMeetingByMeetingId(meetingId);
  let obj = {
    meetingOutcome: meetingOutcome,
  };
  return DBmeeting.doc(meetingId)
    .update(obj)
    .then(() => {
      return true;
    })
    .catch(function (error) {
      return false;
    });
};

// get meeting list by meetingId array
export const getMeetingsByMeetingIdList = async (meetingIds) => {
  // const meetingDetails = await DBmeeting.where(
  //   firestore.FieldPath.documentId(),
  //   "in",
  //   meetingIds
  // )
  //   .get()
  //   .then(() => {
  //     console.log("meetingDetails", meetingDetails);
  //   })
  //   .catch(function (error) {
  //     console.log("error", error);
  //   });
  // const meetingDetails = userIds.map(id => this.firestore.doc(users/${id}))
  // this.firestore.getAll(...refs).then(users => console.log(users.map(doc => doc.data())))
  // const meetingDetails = meetingIds.map((id) =>
  //   DBmeeting.doc(meetings / { id })
  // );
  // db.getAll(...meetingDetails).then((meetings) =>
  //   console.log(meetings.map((doc) => doc.data()))
  // );
};
