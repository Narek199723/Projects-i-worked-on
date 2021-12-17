import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Snackbar, Alert } from "@material-ui/core";
import * as actions from "../../redux/actions";

function SnackbarWrapper(props) {
  let { show, severity, message } = props.snackbar;
  if (severity === "") {
    severity = "info";
  }
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={show}
      autoHideDuration={4000}
      onClose={() =>
        props.showSnackbar({
          show: false,
        })
      }
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
}

const mapStateToProps = (state) => ({
  snackbar: state.generic.snackbar.data || false,
});
const mapDispatchToProps = (dispatch) => ({
  showSnackbar: (data) => dispatch(actions.showSnackbar(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarWrapper);
