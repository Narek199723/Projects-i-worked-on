export const getClosedCriticalNotifications = function () {
  let ret = [];
  let data = sessionStorage.getItem("closedCriticalNotifications");
  if (data && data !== null) {
    ret = data.split(",");
  }
  return ret;
};

export const setClosedCriticalNotifications = function (docId) {
  let existing = getClosedCriticalNotifications();
  if (existing && existing.indexOf(docId) === -1) {
    existing.push(docId);
    sessionStorage.setItem("closedCriticalNotifications", existing.toString());
  }
};
