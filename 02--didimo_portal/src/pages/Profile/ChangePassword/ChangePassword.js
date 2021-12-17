import React, { useState } from 'react';
import { createCognitoUser } from "../../../helpers/cognitoUtils";
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Grid,
  Button,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';
// import { ErrorSnack } from '../../../components';

const useStyles =  makeStyles((theme) => ({
  root: {
    "& .MuiGrid-root > .MuiTextField-root, & .MuiGrid-root > .MuiAutocomplete-root": {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    flexGrow: 1,
  },
  actionButton: {
    textAlign: "right",
    paddingTop: 10,
  },
}));

const ChangePassword = () => {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState(null);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [touchedFields, setTouchedFields] = useState({
    oldPassword: false,
    newPassword: false,
    newPasswordConfirmation: false,
  });


  const handlePasswordChangeSubmit = (e) => {
    e.preventDefault();
    if (
      !touchedFields.oldPassword ||
      !touchedFields.newPassword ||
      !touchedFields.newPasswordConfirmation
    ) {

      setTouchedFields({
          oldPassword: true,
          newPassword: true,
          newPasswordConfirmation: true,
        });
    }

    if (
      !touchedFields.oldPassword ||
      !touchedFields.newPassword ||
      touchedFields.newPassword !==
      touchedFields.newPasswordConfirmation
    ) {
      return;
    }
    var currentUser = createCognitoUser();
    if (currentUser) {
      currentUser.getSession((err, userSession) => {
        currentUser.changePassword(oldPassword, newPassword,
          (err, data) => {
            if (err) {
              setErrorMessage(err.message);
            } else {
              setPasswordChanged(true);
            }
          }
        );
      });
    }
  };

  return (
    <>
      <Card>
        <CardHeader title="Change Password" />
        <CardContent>
          <form onSubmit={handlePasswordChangeSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      required
                      attributesInput={{
                        id: "oldPassword",
                      }}
                      type="password"
                      label="Old password"
                      variant="outlined"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.currentTarget.value)}
                      onBlur={(e) => {
                        touchedFields["oldPassword"] = true;
                        setTouchedFields(touchedFields);
                      }}
                      error={
                        touchedFields["oldPassword"] && !oldPassword
                      }
                      helperText={
                        touchedFields["oldPassword"] &&
                        !oldPassword &&
                        "This field is required"
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      required
                      attributesInput={{
                        id: "newPassword",
                      }}
                      type="password"
                      label="New password"
                      variant="outlined"
                      value={newPassword} //Optional.[String].Default: "".
                      onChange={(e) => setNewPassword(e.currentTarget.value)}
                      onBlur={(e) => {
                        touchedFields["newPassword"] = true;
                        setTouchedFields(touchedFields);
                      }}
                      error={
                        touchedFields["newPasswordConfirmation"] &&
                        newPassword !== newPasswordConfirmation
                      }
                      helperText={
                       touchedFields["newPasswordConfirmation"] &&
                       newPassword !== newPasswordConfirmation &&
                        "Passwords don't match."
                      }
                      validationOption={{
                        name: "new password", //Optional.[String].Default: "". To display in the Error message. i.e Please enter your {name}.
                        check: true, //Optional.[Bool].Default: true. To determin if you need to validate.
                        required: true, //Optional.[Bool].Default: true. To determin if it is a required field.
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      attributesInput={{
                        id: "newPasswordConfirmation",
                      }}
                      type="password"
                      label="Confirm new password"
                      variant="outlined"
                      value={newPasswordConfirmation} //Optional.[String].Default: "".
                      onChange={(e) => setNewPasswordConfirmation(e.currentTarget.value)}
                      onBlur={(e) => {
                        touchedFields["newPasswordConfirmation"] = true;
                        setTouchedFields(touchedFields);
                      }}
                      error={
                        touchedFields["newPasswordConfirmation"] &&
                        newPassword !== newPasswordConfirmation
                      }
                      helperText={
                        touchedFields["newPasswordConfirmation"] &&
                        newPassword !==
                        newPasswordConfirmation &&
                        "Passwords don't match."
                      }
                      validationOption={{
                        name: "new password", //Optional.[String].Default: "". To display in the Error message. i.e Please enter your {name}.
                        check: true, //Optional.[Bool].Default: true. To determin if you need to validate.
                        required: true, //Optional.[Bool].Default: true. To determin if it is a required field.
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <div>
                  <Button type="submit" variant="contained" color="primary">
                    Change password
                  </Button>
                </div>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default ChangePassword;
