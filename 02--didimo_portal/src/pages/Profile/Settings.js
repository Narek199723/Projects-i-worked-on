import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Grid,
  TextField,
  Divider,
  FormControlLabel,
  Checkbox,
  Typography,
  Card,
  CardHeader,
  CardContent,
  InputAdornment,
} from '@material-ui/core';
import EmailField from '../../components/EmailField';
import TimezoneSelect from '../../components/TimezoneSelect';
import CountrySelect from '../../components/CountrySelect';
import USCityField from '../../components/USCityField';
import { useContext, useState } from 'react';
import { GlobalContext } from '../../context/store';
import './Settings.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ConfirmDeleteDialog from "../../components/ConfirmDeleteDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(2)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  cardHeaderTitle: {
    fontWeight: 'bold',
    fontSize: '20px'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


const Settings = () => {
  const classes = useStyles();
  const { state } = useContext(GlobalContext);
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [timezone, setTmezone] = useState("");
  const [streetAddressLn1, setStreetAddressLn1] = useState("");
  const [streetAddressLn2, setStreetAddressLn2] = useState("");
  const [states, setStates] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [taxId, setTaxId] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountEmailAddress, setAccountEmailAddress] = useState("");
  const [isDeveloper, setIsDeveloper] = useState(false);
  const [isCompanyAccount, setIsCompanyAccount] = useState(false);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);
  const [errorMessageOpen, setErrorMessageOpen] = useState(false);
  const [requiredFields, setRequiredFields] = useState(["givenName", "familyName", "country", "timezone"]);
  const [isDataFieldsDirty, setIsDataFieldsDirty] = useState(false);
  const [touched, setTouched] = useState({});
  const [deleteAccount, setDeleteAccount] = useState(false);

  useEffect(() => {
    axios.get('profiles/' + state.user.uuid , {
      headers: {Authorization: `Bearer ${state.user.accessToken}`,
              Accept: "application/json",
             "Content-Type": "application/json",}
    }).then(res => {
      let requiredFields = ["givenName", "familyName", "country", "timezone"];
      if (res.data.accounts[0].address.country === "US") {
        requiredFields.push("state");
      }
      setGivenName(res.data.given_name);
      setFamilyName(res.data.family_name);
      setEmail(res.data.email_address);
      setCountry(res.data.accounts[0].address.country);
      setStreetAddressLn1(res.data.accounts[0].address.street_address_line1);
      setStreetAddressLn2(res.data.accounts[0].address.street_address_line2);
      setStates(res.data.accounts[0].address.state);
      setCity(res.data.accounts[0].address.city);
      setZipCode(res.data.accounts[0].address.zip_code);
      setTmezone(res.data.accounts[0].address.timezone);
      setTaxId(res.data.accounts[0].tax_id);
      setAccountName(res.data.accounts[0].company_name);
      setAccountEmailAddress(res.data.accounts[0].email_address);
      setIsDeveloper(res.data.accounts[0].is_developer);
      setIsCompanyAccount(res.data.accounts[0].is_company);
      setRequiredFields(requiredFields);
      setIsDataFieldsDirty(false);
    })
  },[]);

  const handleSaveData = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // if (!isFormValid()) {
    //   return;
    // }

    let data = [
      {
        op: 'replace',
        path: '/address/street_address_line1',
        value: streetAddressLn1
      },
      {
        op: 'replace',
        path: '/address/street_address_line2',
        value: streetAddressLn2
      },
      {
        op: 'replace',
        path: '/address/state',
        value: states
      },
      {
        op: 'replace',
        path: '/address/city',
        value: city
      },
      {
        op: 'replace',
        path: '/address/country',
        value: country
      },
      {
        op: 'replace',
        path: '/address/zip_code',
        value: zipCode
      },
      {
        op: 'replace',
        path: '/timezone',
        value: timezone
      },
      {
        op: 'replace',
        path: '/tax_id',
        value: isCompanyAccount ? taxId : ''
      },
      {
        op: 'replace',
        path: '/email_address',
        value: isCompanyAccount ? accountEmailAddress : ''
      },
      {
        op: 'replace',
        path: '/is_developer',
        value: isDeveloper
      },
      {
        op: 'replace',
        path: '/is_company',
        value: isCompanyAccount
      },
      {
        op: 'replace',
        path: '/company_name',
        value: isCompanyAccount ? accountName : ''
      }
    ];

    let payloadNew = {
      family_name: familyName,
      given_name: givenName,
    };

    axios.patch('accounts/' + state.user.accounts.uuid, data, {
      headers: { Authorization: `Bearer ${state.user.accessToken}` }
    }).then((res) => {

    }).catch((err) => {
      console.log(err);
    });

    axios.put('profiles/' + state.user.uuid, payloadNew, {
      headers: { Authorization: `Bearer ${state.user.accessToken}` }
    }).then((res) => {
      setIsDataFieldsDirty(false);
      setSuccessMessageOpen(true);
    }).catch((err) => {
      console.log(err);
    });
  };

  const isFormValid = (field) => {
    let fields = [];
    if (field) {
      fields.push(field);
    } else {
      fields = requiredFields;
      const untouchedFields = Object.assign(
        {},
        ...fields
          .filter((fld) => !touched[fld])
          .map((fld) => ({ [fld]: true }))
      );
      setTouched({...touched, ...untouchedFields, })
    }

    const invalidFields = fields.filter((fld) => {
      return ((!field || touched[fld]));
    });
    return invalidFields.length === 0;
  }

 const onCountryChange = (e, selected) => {
    let requiredFields = ["givenName", "familyName", "country", "timezone"];
    if (selected && country !== selected.iso_code2) {
      setCountry(selected.iso_code2);
      setStates("");
      setCity("");
      setZipCode("")

      if (country === "US") {
        requiredFields.push("state");
      }
      setRequiredFields(requiredFields);
      setIsDataFieldsDirty(true);
    }
  };

 const onCityChange = (e, selected) => {
   if (selected && city !== selected.code) {
     setCity(selected.code);
     setZipCode("");
     setIsDataFieldsDirty(true);
   }
 };

  return (
    <div className={'settingNav'}>
      <Helmet>
        <title>Dashboard | Settings</title>
      </Helmet>
      {
        <div className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card style={{ padding: '16px' }}>
                <CardContent style={{ padding: '0px' }} className="user_detail">
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant='h4' sx={{ fontWeight: 'bold', paddingBottom: '16px' }}>
                        User data
                      </Typography>
                      <CardContent style={{ padding: 0 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              value={givenName}
                              onChange={(e) => {
                                setGivenName(e.target.value);
                                setIsDataFieldsDirty(true);
                              }}
                              required
                              fullWidth
                              id='user-setting-given-name'
                              label='Given name'
                              variant='outlined'
                              error={touched["givenName"] && !givenName?.trim()}
                              helperText={
                                touched["givenName"] &&
                                !givenName?.trim() &&
                                "This field is required"
                              }
                              onBlur={(e) => {
                                setTouched({...touched, 'givenName': true})
                              }}
                            />
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <TextField
                              value={familyName}
                              onChange={(e) => {
                                setFamilyName(e.target.value);
                                setIsDataFieldsDirty(true);
                              }}
                              required
                              fullWidth
                              id='user-setting-family-name'
                              label='Family name'
                              variant='outlined'
                              error={touched["familyName"] && !familyName?.trim()}
                              helperText={
                                touched["familyName"] &&
                                !familyName?.trim() &&
                                "This field is required"
                              }
                              onBlur={(e) => {
                                setTouched({...touched, 'familyName': true})
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <EmailField
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                                setIsDataFieldsDirty(true);
                              }}
                              fullWidth
                              label='Email'
                              disabled
                              inputProps={{
                                'aria-label': 'email',
                                'data-id': 'email'
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <CountrySelect
                              fullWidth
                              required
                              onChange={onCountryChange}
                              value={country}
                              accessToken={state.user.accessToken}
                              countryCode={country}
                              setCountry={setCountry}
                              error={touched["country"] && !country?.trim()}
                              helperText={
                                touched["country"] &&
                                !country?.trim() &&
                                "This field is required"
                              }
                              onBlur={(e) => {
                                setTouched({...touched, 'country': true})
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              value={streetAddressLn1}
                              onChange={(e) => {
                                setStreetAddressLn1(e.target.value);
                                setIsDataFieldsDirty(true);
                              }}
                              fullWidth
                              placeholder=''
                              label='Address (line 1)'
                              variant='outlined'
                              inputProps={{
                                'aria-label': 'streetAddressLn1',
                                'data-id': 'streetAddressLn1'
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              value={streetAddressLn2}
                              onChange={(e) => {
                                setStreetAddressLn2(e.target.value);
                                setIsDataFieldsDirty(true);
                              }}
                              fullWidth
                              placeholder=''
                              label='Address (line 2)'
                              variant='outlined'
                              inputProps={{
                                'aria-label': 'streetAddressLn2',
                                'data-id': 'streetAddressLn2'
                              }}
                            />
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <USCityField
                              fullWidth
                              countryState={state}
                              onChange={onCityChange}
                              value={city}
                            />
                          </Grid>


                          <Grid item xs={12} sm={6}>
                            <TextField
                              value={zipCode}
                              onChange={(e) => {
                                setZipCode(e.target.value);
                                setIsDataFieldsDirty(true);
                              }}
                              fullWidth
                              label='ZIP Code'
                              variant='outlined'
                              inputProps={{
                                'aria-label': 'zipCode',
                                'data-id': 'zipCode'
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} style={{ marginBottom: '10px' }}>
                            <TimezoneSelect
                              fullWidth
                              value={timezone}
                              accessToken={state.user.accessToken}
                              timezone={timezone}
                              setTmezone={setTmezone}
                              error={
                                touched["timezone"] &&
                                !timezone?.trim()
                              }
                              helperText={
                                touched["timezone"] &&
                                !timezone?.trim() &&
                                !timezone?.trim() &&
                                "This field is required"
                              }
                              onBlur={(e) => {
                                setTouched({...touched, timezone: true})
                              }}
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant='h4'
                                  sx={{ fontWeight: 'bold', paddingBottom: '16px', padding: '0 0 16px 0' }}>
                        Account data
                      </Typography>
                      <CardContent style={{ padding: 0 }}>
                        <Grid container spacing={1}>
                          <Grid item xs={12}>
                            <FormControlLabel
                              value='end'
                              control={
                                <Checkbox
                                  color='primary'
                                  checked={isDeveloper}
                                  onChange={() => {
                                    setIsDeveloper(!isDeveloper);
                                    setIsDataFieldsDirty(true);
                                  }}
                                  inputProps={{
                                    'aria-label': 'isDeveloper',
                                    'data-id': 'isDeveloper'
                                  }}
                                />
                              }
                              label='Activate developer features'
                              labelPlacement='end'
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControlLabel
                              value='end'
                              control={
                                <Checkbox
                                  checked={isCompanyAccount}
                                  onChange={() => {
                                    setIsCompanyAccount(!isCompanyAccount);
                                    setIsDataFieldsDirty(true);
                                  }}
                                  color='primary'
                                  inputProps={{
                                    'aria-label': 'isCompanyAccount',
                                    'data-id': 'isCompanyAccount'
                                  }}
                                />
                              }
                              label='This is a company account'
                              labelPlacement='end'
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              value={accountName}
                              onChange={(e) => {
                                setAccountName(e.target.value);
                                setIsDataFieldsDirty(true);
                              }}
                              fullWidth
                              placeholder=''
                              disabled={!isCompanyAccount}
                              label='Company name'
                              variant='outlined'
                              inputProps={{
                                'aria-label': 'accountName',
                                'data-id': 'accountName'
                              }}
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <EmailField
                              value={accountEmailAddress}
                              onChange={(e) => {
                                setAccountEmailAddress(e.target.value);
                                setIsDataFieldsDirty(true);
                              }}
                              disabled={!isCompanyAccount}
                              fullWidth
                              label='Company email'
                              inputProps={{
                                'aria-label': 'accountEmailAddress',
                                'data-id': 'accountEmailAddress'
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              value={taxId}
                              onChange={(e) => {
                                setTaxId(e.target.value);
                                setIsDataFieldsDirty(true);
                              }}
                              fullWidth
                              placeholder=''
                              disabled={!isCompanyAccount}
                              label='Tax ID'
                              variant='outlined'
                              inputProps={{
                                'aria-label': 'taxid',
                                'data-id': 'taxId'
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    {country.toUpperCase()}
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Grid>
                  </Grid>
                  <Divider />
                  <form onSubmit={handleSaveData}>
                    <div style={{ paddingTop: '10px' }}>
                      <Button type='submit' variant='contained' color='primary' style={{ float: 'right' }}>
                        Save
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardHeader title='Change Password' variant='h4' />
                <CardContent>
                  <Typography>
                    Here you change your password.
                  </Typography>
                  <div style={{ textAlign: 'right' }}>
                    <Link to={'/profile/changepassword'}>
                      <Button
                        // href='/profile/data-usage-policy'
                        variant='contained'
                        color='primary'
                        style={{ textTransform: 'capitalize' }}
                      >Change Password
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardHeader title='Privacy settings' variant='h4' />
                <CardContent>
                  <Typography>
                    Here you can check your current privacy settings.
                  </Typography>
                  <div style={{ textAlign: 'right' }}>
                    <Link to={'/profile/data-usage-policy'}>
                      <Button
                        variant='contained'
                        color='primary'
                      >Go
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardHeader title='Delete account' />
                <CardContent>
                  <p>
                    <Typography style={{ color: 'red', fontSize: '14px' }}>
                      Once you delete your account, all your personal information
                      and didimos will be wiped, according to our{' '}
                      <a href='https://privacy.mydidimo.com/privacy-policy/'>
                        Privacy Policy
                      </a>{' '}
                      and there is no going back.
                    </Typography>
                    <div style={{ textAlign: 'right' }}>
                      <Button
                        style={{ textTransform: 'capitalize', backgroundColor: '#f44336', fontWeight: '600' }}
                        variant='contained'
                        color='primary'
                        onClick={() => setDeleteAccount(true)}
                      >
                        Delete your account
                      </Button>
                    </div>
                  </p>
                  <form>
                    <div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <ConfirmDeleteDialog
            title="Delete account"
            message={
              <div className="delete_accou">
                <p>This action will delete your account.</p>
                <p>
                  Once you delete your account, all your personal information and
                  didimos will be wiped, according to our{" "}
                  <a href="https://privacy.mydidimo.com/privacy-policy/">
                    Privacy Policy
                  </a>{" "}
                  and there is no going back.
                </p>
                <p>Are you sure you want to continue?</p>
              </div>
            }
            open={deleteAccount}
            onContinue={() => {
              // this.props
              //   .postData(
              //     process.env.REACT_APP_API_ROOT +
              //     "accounts/" +
              //     this.props.profile.accountUuid,
              //     {},
              //     this.props.session,
              //     fetch,
              //     "DELETE"
              //   )
              //   .then((response) => {
              //     setTimeout(() => {
              //       deleteUser();
              //       signOutCognitoSession();
              //     });
              //   });
            }}
            onCancel={() => setDeleteAccount(false)}
            onClose={() => setDeleteAccount(false)}
          />
        </div>

      }
    </div>
  );

};

export default Settings;
