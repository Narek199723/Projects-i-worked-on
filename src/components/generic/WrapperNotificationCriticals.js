import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import AlertIcon from "../../assets/images/alert_warning_icon.svg";
import * as actions from "../../redux/actions";

function WrapperNotificationCriticals(props) {
  useEffect(async () => {
    setTimeout(async () => {
      await props.fetchNotificationCriticals();
    }, 4000);
  }, []);

  const { notificationCriticals } = props;
  const { messages } = notificationCriticals;

  const onClose = (msg) => {
    props.closeNotificationCriticals(msg);
  };

  if (messages && messages.length > 0) {
    let msg = messages[0];
    if (msg.display) {
      return (
        <div id="wrapper-notification-criticals">
          <div className="message">
            <img className="alert-icon" src={AlertIcon} alt="" />
            <span>{msg.message}</span>
            <span className="close-icon" onClick={() => onClose(msg)}>
              x
            </span>
          </div>
        </div>
      );
    } else {
      return null;
    }
  } else {
    return null;
  }
}

const mapStateToProps = (state) => ({
  notificationCriticals: state.generic.notificationCriticals || false,
});
const mapDispatchToProps = (dispatch) => ({
  closeNotificationCriticals: (data) =>
    dispatch(actions.closeNotificationCriticals(data)),
  fetchNotificationCriticals: (data) =>
    dispatch(actions.fetchNotificationCriticals(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrapperNotificationCriticals);
