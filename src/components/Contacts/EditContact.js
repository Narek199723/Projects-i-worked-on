import { useEffect, useState } from "react";
import firebase from "firebase";
import { Icon } from "@iconify/react";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import { Link as RouterLink, useHistory, useParams } from "react-router-dom";
import FileUploader from "react-firebase-file-uploader";

// material
import { useTheme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { alpha } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {
  Grid,
  Box,
  Card,
  Table,
  Button,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  TableContainer,
  Popover,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Paper,
  IconButton,
  Input,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import moment from "moment";
import Pagination from "@material-ui/lab/Pagination";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ListIcon from "@material-ui/icons/List";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import InputNumber from "rc-input-number";

// utils

import { Post, Get } from "../../utils/axiosUtils";
import { ContactsList, Contact } from "../../utils/endpoints";
import Page from "../Page";
import { InputBase } from "@mui/material";

import { makeStyles } from "@material-ui/styles";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import "react-phone-input-2/lib/material.css";
import {
  addContact,
  getContactById,
  updateContact,
} from "../../firebase/firestore";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function EditContact(props) {
  const { type } = props;

  let apiUrl = Contact;
  const classes = useStyles();
  let STag = "Twitter";

  const history = useHistory();
  // const handleRowClick = (meetingId) => {
  //   history.push(`/meeting/${meetingId}`);
  // };

  const totalRecordsPerPage = 10;

  const [contactList, setContactList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [userInfo, setUserInfo] = useState({});
  const [phoneObj, setPhoneObj] = useState({});
  const [assistantPhoneObj, setAssistantPhoneObj] = useState({});
  const [numberOfEmail, setNumberOfEmail] = useState(1);
  const [numberOfPhone, setNumberOfPhone] = useState(1);
  const [numberOfSocialMedia, setNumberOfSocialMedia] = useState(1);
  const [numOfAss_PhoneNumber, setNumberOfAssistant] = useState(1);
  const [emailsObj, setEmailsObj] = useState({});
  const [socialMediaArray, setSocialMediaArray] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [leadScore, setLeadScore] = useState("");
  const [lineOfBussiness, setLineOfBussiness] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [skypeID, setSkypeId] = useState("");
  const [accountName, setAccountName] = useState("");
  const [contactWoner, setContactWoner] = useState("");
  const [assistant_name, setAssistantname] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [role, setRole] = useState("");
  const [emails, setEmail] = useState([]);
  const [phones, setPhones] = useState([]);
  const [assistantPhones, setAssistantPhones] = useState([]);
  const [socialTags, setSocialtags] = useState([]);
  const [socialValues, setSocialValues] = useState([]);
  const [tags, setTags] = useState([]);
  const [avatar, setAvatar] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [avatarURL, setAvatarURL] = useState("");
  let { id } = useParams();
  console.log(id, "contacts id");
  const FetchContactById = async () => {
    let contactData = await getContactById(id);
    if (contactData) {
      console.log(contactData, "single contact");
      setFirstName(contactData.firstName);
      setLastName(contactData.lastName);
      setAssistantname(contactData.assistant_name);
      setLineOfBussiness(contactData.lineOfBussiness);
      setLeadScore(contactData.leadScore);
      setDateOfBirth(contactData.dateOfBirth);
      setSkypeId(contactData.skypeID);
      setAccountName(contactData.accountName);
      setContactWoner(contactData.contactWoner);
      setDepartmentName(contactData.departmentName);
      setRole(contactData.role);
      setNumberOfEmail(contactData.emails.length);
      setNumberOfPhone(contactData.phones.length);
      setNumberOfAssistant(contactData.assistant_phones.length);
      setNumberOfSocialMedia(contactData.socialMedias.length);
      setEmail(contactData.emails.map((el) => el[Object.keys(el)[0]]));
      setPhones(contactData.phones.map((el) => el[Object.keys(el)[0]]));
      setAssistantPhones(
        contactData.assistant_phones.map((el) => el[Object.keys(el)[0]])
      );
      setSocialtags(contactData.socialMedias.map((el) => Object.keys(el)[0]));
      setTags(contactData.socialMedias.map((el) => Object.keys(el)[0]));
      setSocialValues(
        contactData.socialMedias.map((el) => el[Object.keys(el)[0]])
      );
      setEmailsObj(Object.assign({}, ...contactData.emails));
      setPhoneObj(Object.assign({}, ...contactData.phones));
      setAssistantPhoneObj(Object.assign({}, ...contactData.assistant_phones));
      setSocialMediaArray(Object.assign({}, ...contactData.socialMedias));
      setAvatarURL(contactData.avatarURL);
      setUserInfo(contactData);
    }

    // if (apiRes.status == 200 && apiRes.data.status == "success") {
    //   const { data, total } = apiRes.data;
    //   console.log(data, "contacts getting");
    //   setContactList(data);
    //   setTotalRecords(total);
    // } else {
    //   console.log("data not fetched");
    // }
  };

  // const onPaginationChange = (fn, newPage) => {
  //   setCurrentPage(newPage);
  // };

  // useEffect(() => {
  //   let tmpTotalPages = totalRecords / totalRecordsPerPage;
  //   setTotalPages(Math.ceil(tmpTotalPages));
  // }, [totalRecords]);

  const handleUploadStart = () => {
    setIsUploading(true);
    setProgress(0);
  };
  const handleProgress = (progress) => setProgress(progress);
  const handleUploadError = (error) => {
    // this.setState({ isUploading: false });
    setIsUploading(false);
    console.error(error);
  };
  const handleUploadSuccess = (filename) => {
    setAvatar(filename);
    setProgress(100);
    setIsUploading(false);
    // this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then((url) => setAvatarURL(url));
  };

  useEffect(() => {
    console.log("useEffect called");
    FetchContactById();
  }, []);

  const onChangeHandeler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let users = userInfo;
    console.log("llll", name, value, users);
    users[name] = value;
    setUserInfo(users);
    if (name === "firstName") setFirstName(value);
    else if (name === "lastName") setLastName(value);
    else if (name === "contactWoner") setContactWoner(value);
    else if (name === "role") setRole(value);
    else if (name === "dateOfBirth") setDateOfBirth(value);
    else if (name === "lineOfBussiness") {
      setLineOfBussiness(value);
    } else if (name === "departmentName") {
      setDepartmentName(value);
    } else if (name === "assistant_name") {
      setAssistantname(value);
    } else if (name === "skypeID") {
      setSkypeId(value);
    }
    if (name === "leadScore") {
      setLeadScore(value);
    }
  };

  const emailHandeler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let emailData = emailsObj;
    emailData[name.toString()] = value;

    let emailArray = [...emails];
    emailArray[parseInt(name.slice(5)) - 1] = value;
    setEmail(emailArray);
    setEmailsObj(emailData);
  };
  const setTag = (num) => {
    let position = num.target.name;
    let tag = tags;

    tag[position] = num.target.value;
    setTags(tag);
  };
  const socialMediaHandeler = (e, x) => {
    let value = e.target.value;
    console.log(e.target.value, x, "day", tags);
    let socialMediaData = socialMediaArray;
    socialMediaData[tags[x].toString()] = value;

    let ST = [...socialValues];
    ST[x] = e.target.value;
    setSocialValues(ST);
    setSocialMediaArray(socialMediaData);
  };
  const phoneHandeler = (e, x) => {
    let phoneData = phoneObj;
    let name = `phone${x}`;
    phoneData[name.toString()] = e;
    let phoneArray = [...phones];
    phoneArray[x] = e;
    setPhones(phoneArray);
    setPhoneObj(phoneData);
  };
  const assistantPhoneHandeler = (e, x) => {
    let phoneData = assistantPhoneObj;
    let name = `assistant_phone${x}`;
    phoneData[name.toString()] = e;
    let assitantphoneArray = [...assistantPhones];
    assitantphoneArray[x] = e;
    setAssistantPhones(assitantphoneArray);
    setAssistantPhoneObj(phoneData);
  };
  const ObjToArray = (obj) => {
    var result = Object.entries(obj).map((e) => ({ [e[0]]: e[1] }));
    return result;
  };
  const onSubmit = async () => {
    console.log(emailsObj, "emailObj");
    let emails = ObjToArray(emailsObj);
    let phones = ObjToArray(phoneObj);
    let assistant_phones = ObjToArray(assistantPhoneObj);
    let socialMediaData = ObjToArray(socialMediaArray);
    console.log(socialMediaArray, "llllooppppo");
    userInfo["emails"] = emails;
    userInfo["phones"] = phones;
    userInfo["socialMedias"] = socialMediaData;
    userInfo["assistant_phones"] = assistant_phones;
    userInfo["avatarURL"] = avatarURL;
    if (id == 0) {
      let status = await addContact(userInfo);
      if (status) {
        alert("Contact Added Successfully");
      } else {
        alert("Failure");
      }
      // console.log("userData",userInfo,status);
    } else {
      // console.log(Object.assign(userInfo,cont))

      let status = await updateContact(userInfo, id);
      if (status) {
        alert("Updated Successfully");
      } else {
        alert("Update Failure");
      }
      console.log("userData", userInfo, status);
    }
  };

  const onCancel = () => {
    history.push(`/contacts`);
  };
  const showEmailInput = () => {
    let inp = [];
    for (let i = 1; i < numberOfEmail; i++) {
      inp.push(
        <Grid item xs={12}>
          <TextField
            style={{ width: "100%", height: "5px" }}
            type="email"
            value={emails[i]}
            name={`email${i + 1}`}
            onChange={(e) => emailHandeler(e)}
            placeholder="Enter email"
          />
        </Grid>
      );
    }
    return inp;
  };

  const showPhoneInput = () => {
    let inp = [];
    for (let i = 1; i < numberOfPhone; i++) {
      inp.push(
        <Grid
          item
          xs={12}
          container
          spacing={1}
          style={{ justifyContent: "center", textAlign: "center" }}
        >
          <PhoneInput
            international
            value={phones[i]}
            placeholder="Enter phone number"
            onChange={(e) => phoneHandeler(e, i)}
          />
        </Grid>
      );
    }
    return inp;
  };

  const showSocialMediaInput = () => {
    let inp = [];
    for (let i = 1; i < numberOfSocialMedia; i++) {
      inp.push(
        <Grid item xs={12} container spacing={1}>
          <Grid item xs={4}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              style={{ width: "100%" }}
              value={socialTags[i]}
              name={i}
              onChange={(e) => setTag(e)}
            >
              <MenuItem value={`Facebook`}>Facebook</MenuItem>
              <MenuItem value={`Twitter`}>Twitter</MenuItem>
              <MenuItem value={`Youtube`}>Youtube</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={8}>
            {" "}
            <TextField
              style={{ width: "100%", height: "5px" }}
              placeholder="@"
              value={socialValues[i]}
              name={tags[i]}
              onChange={(e) => socialMediaHandeler(e, i)}
            />
          </Grid>
        </Grid>
      );
    }
    return inp;
  };

  const showAssistantPhone = () => {
    let inp = [];
    for (let i = 1; i < numOfAss_PhoneNumber; i++) {
      inp.push(
        <Grid
          item
          xs={12}
          container
          spacing={1}
          style={{ justifyContent: "center", textAlign: "center" }}
        >
          <PhoneInput
            international
            value={assistantPhones[i]}
            placeholder="Enter phone number"
            onChange={(e) => assistantPhoneHandeler(e, i)}
            buttonStyle={{ height: "40px" }}
          />
        </Grid>
      );
    }
    return inp;
  };
  return (
    <Page>
      <Container maxWidth={"xl"}>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar
              style={{ background: "white", color: "black", height: "110px" }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                  <IconButton
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                  >
                    <span>
                      {" "}
                      {avatarURL ? (
                        <Avatar
                          alt="Remy Sharp"
                          style={{
                            width: "86px",
                            height: "86px",
                            borderRadius: "100%",
                          }}
                          src={avatarURL}
                        />
                      ) : (
                        <Icon
                          icon="bx:bxs-face"
                          width="84"
                          style={{
                            position: "absolute",
                            top: "-4px",
                            zIndex: "1",
                          }}
                          height="84"
                        />
                      )}{" "}
                      <sub>
                        <label
                          style={{
                            backgroundColor: "white",
                            color: "steelblue",
                            padding: 10,
                            borderRadius: 4,
                            cursor: "pointer",
                            boxShadow: "0px 0px 10px #E5E6FF",
                            zIndex: "3",
                          }}
                        >
                          <AddIcon />
                          Add Photo
                          <FileUploader
                            hidden
                            accept="image/*"
                            storageRef={firebase.storage().ref("images")}
                            onUploadStart={handleUploadStart}
                            onUploadError={handleUploadError}
                            onUploadSuccess={handleUploadSuccess}
                            onProgress={handleProgress}
                          />
                        </label>
                      </sub>
                    </span>
                  </IconButton>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  container
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    className={classes.button}
                    style={{ marginRight: "5px", marginBottom: "20px" }}
                    onClick={() => onCancel()}
                  >
                    cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.button}
                    style={{ marginBottom: "20px" }}
                    startIcon={<SaveIcon />}
                    onClick={() => onSubmit()}
                  >
                    {id != 0 ? "Update" : "Save"}
                  </Button>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <Card id="block-past-meetings">
            <Grid container spacing={3} style={{ marginBottom: "30px" }}>
              <Grid item xs={12} lg={6} container spacing={1}>
                <Grid item xs={4}>
                  <Paper
                    className={classes.paper}
                    style={{
                      width: "100%",
                      fontSize: "14px",
                      marginTop: "10px",
                    }}
                  >
                    Contact woner
                  </Paper>
                </Grid>
                <Grid item xs={8}>
                  <Paper className={classes.paper} edge="start">
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      style={{
                        width: "315px",
                        marginLeft: "-14px",
                        boxShadow: "0px 0px 10px #E5E6FF",
                        background: "#FFFFFF",
                        borderRadius: "16px",
                      }}
                      value={contactWoner}
                      name="contactWoner"
                      onChange={(e) => onChangeHandeler(e)}
                    >
                      <MenuItem value={`A`}>A</MenuItem>
                      <MenuItem value={`B`}>B</MenuItem>
                      <MenuItem value={`C`}>C</MenuItem>
                    </Select>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper
                    className={classes.paper}
                    style={{
                      width: "100%",
                      fontSize: "14px",

                      marginTop: "5px",
                      marginLeft: "20px",
                    }}
                  >
                    First Name
                  </Paper>
                </Grid>
                <Grid item xs={8}>
                  <Paper>
                    <TextField
                      style={{
                        width: "100%",
                        height: "5px",
                        boxShadow: "0px 0px 10px #E5E6FF",
                        background: "#FFFFFF",
                        borderRadius: "16px",
                      }}
                      value={firstName}
                      name="firstName"
                      onChange={(e) => onChangeHandeler(e)}
                      placeholder="Enter first name"
                    />
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper
                    className={classes.paper}
                    style={{
                      width: "100%",
                      fontSize: "14px",
                      justifyContent: "center",
                      textAlign: "center",
                      marginTop: "5px",
                      marginLeft: "20px",
                    }}
                  >
                    Last Name
                  </Paper>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    style={{
                      width: "100%",
                      height: "5px",
                      boxShadow: "0px 0px 10px #E5E6FF",
                      background: "#FFFFFF",
                      borderRadius: "16px",
                    }}
                    value={lastName}
                    name="lastName"
                    onChange={(e) => onChangeHandeler(e)}
                    placeholder="Enter last name"
                  />
                </Grid>
                <Grid item xs={4}>
                  <Paper
                    className={classes.paper}
                    style={{
                      width: "100%",
                      fontSize: "14px",
                      justifyContent: "center",
                      textAlign: "center",
                      marginTop: "5px",
                      marginLeft: "20px",
                    }}
                  >
                    Email
                  </Paper>
                </Grid>
                <Grid item xs={8} spacing={5} container>
                  <Grid item xs={12}>
                    <TextField
                      style={{
                        width: "100%",
                        height: "5px",
                        boxShadow: "0px 0px 10px #E5E6FF",
                        background: "#FFFFFF",
                        borderRadius: "16px",
                      }}
                      type="email"
                      value={emails[0]}
                      name="email1"
                      onChange={(e) => emailHandeler(e)}
                      placeholder="Enter email"
                    />
                  </Grid>
                  {showEmailInput()}

                  <Grid item>
                    <Button
                      style={{
                        width: "130px",
                        height: "40px",
                        fontSize: "14px",
                        boxShadow: "0px 0px 10px #E5E6FF",
                        background: "#FFFFFF",
                        borderRadius: "16px",
                      }}
                      variant="outlined"
                      color="primary"
                      size="small"
                      className={classes.button}
                      startIcon={<AddIcon />}
                      onClick={() => setNumberOfEmail(numberOfEmail + 1)}
                    >
                      Add Email
                    </Button>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Paper
                    className={classes.paper}
                    style={{
                      width: "100%",
                      fontSize: "14px",
                      justifyContent: "center",
                      textAlign: "center",
                      marginLeft: "20px",
                    }}
                  >
                    Phone Number
                  </Paper>
                </Grid>
                <Grid item xs={8} spacing={5} container>
                  <Grid
                    item
                    xs={12}
                    container
                    spacing={1}
                    style={{
                      justifyContent: "center",
                      textAlign: "center",
                      marginTop: "5px",
                    }}
                  >
                    <PhoneInput
                      international
                      value={phones[0]}
                      placeholder="Enter phone number"
                      onChange={(e) => phoneHandeler(e, 0)}
                    />
                  </Grid>
                  {showPhoneInput()}
                  <Grid item>
                    <Button
                      style={{
                        width: "130px",
                        height: "40px",
                        fontSize: "14px",
                        marginTop: "-55px",
                      }}
                      variant="outlined"
                      color="primary"
                      size="small"
                      className={classes.button}
                      startIcon={<AddIcon />}
                      onClick={() => setNumberOfPhone(numberOfPhone + 1)}
                    >
                      Add Phone
                    </Button>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Paper
                    className={classes.paper}
                    style={{
                      width: "100%",
                      fontSize: "14px",
                      justifyContent: "center",
                      textAlign: "center",
                      marginTop: "5px",
                      marginLeft: "20px",
                    }}
                  >
                    Death of Birth
                  </Paper>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    style={{
                      width: "100%",
                      height: "5px",
                      boxShadow: "0px 0px 10px #E5E6FF",
                      background: "#FFFFFF",
                      borderRadius: "16px",
                    }}
                    type="date"
                    value={dateOfBirth}
                    name="dateOfBirth"
                    onChange={(e) => onChangeHandeler(e)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Paper
                    className={classes.paper}
                    style={{
                      width: "100%",
                      fontSize: "14px",
                      justifyContent: "center",
                      textAlign: "center",
                      marginTop: "5px",
                      marginLeft: "20px",
                    }}
                  >
                    Skype ID
                  </Paper>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    style={{
                      width: "100%",
                      height: "5px",
                      boxShadow: "0px 0px 10px #E5E6FF",
                      background: "#FFFFFF",
                      borderRadius: "16px",
                    }}
                    value={skypeID}
                    name="skypeID"
                    onChange={(e) => onChangeHandeler(e)}
                    placeholder="Enter Skype ID"
                  />
                </Grid>
                <Grid item xs={4}>
                  <Paper
                    className={classes.paper}
                    style={{
                      width: "100%",
                      fontSize: "14px",
                      justifyContent: "center",
                      textAlign: "center",
                      marginTop: "5px",
                      marginLeft: "20px",
                    }}
                  >
                    Social Media
                  </Paper>
                </Grid>
                <Grid item xs={8} spacing={5} container>
                  {(socialTags.length > 1 || id == 0) && (
                    <Grid item xs={12} container spacing={1}>
                      <Grid item xs={4}>
                        <Select
                          style={{
                            width: "100%",
                            boxShadow: "0px 0px 10px #E5E6FF",
                            background: "#FFFFFF",
                            borderRadius: "16px",
                          }}
                          value={socialTags[0]}
                          name={"0"}
                          onChange={(e) => setTag(e)}
                        >
                          <MenuItem value={`Facebook`}>Facebook</MenuItem>
                          <MenuItem value={`Twitter`}>Twitter</MenuItem>
                          <MenuItem value={`Youtube`}>Youtube</MenuItem>
                        </Select>
                      </Grid>

                      <Grid item xs={8}>
                        {" "}
                        <TextField
                          style={{
                            width: "100%",
                            height: "5px",
                            boxShadow: "0px 0px 10px #E5E6FF",
                            background: "#FFFFFF",
                            borderRadius: "16px",
                          }}
                          placeholder="@"
                          value={socialValues[0]}
                          name={tags[0]}
                          onChange={(e) => socialMediaHandeler(e, 0)}
                        />
                      </Grid>
                    </Grid>
                  )}
                  {(socialTags.length > 1 || id == 0) && showSocialMediaInput()}

                  <Grid item>
                    <Button
                      style={{
                        width: "180px",
                        height: "40px",
                        fontSize: "14px",
                      }}
                      variant="outlined"
                      color="primary"
                      size="small"
                      className={classes.button}
                      startIcon={<AddIcon />}
                      onClick={() =>
                        setNumberOfSocialMedia(numberOfSocialMedia + 1)
                      }
                    >
                      Add Social Media
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                lg={6}
                container
                spacing={1}
                style={{ marginTop: "5px" }}
              >
                <Grid item xs={4} style={{ marginTop: "5px" }}>
                  <Paper
                    className={classes.paper}
                    style={{
                      width: "100%",
                      fontSize: "14px",
                      justifyContent: "center",
                      textAlign: "center",
                      marginTop: "5px",
                      marginLeft: "10px",
                    }}
                  >
                    Account Name
                  </Paper>
                </Grid>
                <Grid item xs={8}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    style={{
                      width: "90%",
                      marginLeft: "5px",
                      marginTop: "5px",
                      boxShadow: "0px 0px 10px #E5E6FF",
                      background: "#FFFFFF",
                      borderRadius: "16px",
                    }}
                    value={accountName}
                    name="accountName"
                    onChange={(e) => onChangeHandeler(e)}
                  >
                    <MenuItem value={`x`}>X</MenuItem>
                    <MenuItem value={`y`}>Y</MenuItem>
                    <MenuItem value={`z`}>Z</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={4} style={{ marginTop: "2px" }}>
                  <Paper
                    className={classes.paper}
                    style={{
                      width: "100%",
                      fontSize: "14px",
                      justifyContent: "center",
                      textAlign: "center",
                      marginTop: "5px",
                      marginLeft: "10px",
                    }}
                  >
                    <Typography> Lead Score</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    style={{
                      width: "90%",
                      height: "5px",
                      marginLeft: "5px",
                      marginTop: "5px",
                      boxShadow: "0px 0px 10px #E5E6FF",
                      background: "#FFFFFF",
                      borderRadius: "16px",
                    }}
                    type="number"
                    value={leadScore}
                    name="leadScore"
                    onChange={(e) => onChangeHandeler(e)}
                  />
                </Grid>
                <Grid item xs={4} style={{ marginTop: "5px" }}>
                  <Paper
                    className={classes.paper}
                    style={{
                      width: "100%",
                      fontSize: "14px",
                      justifyContent: "center",
                      textAlign: "center",
                      marginTop: "5px",
                      marginLeft: "10px",
                    }}
                  >
                    Line of Business
                  </Paper>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    style={{
                      width: "90%",
                      height: "5px",
                      marginLeft: "5px",
                      marginTop: "5px",
                      boxShadow: "0px 0px 10px #E5E6FF",
                      background: "#FFFFFF",
                      borderRadius: "16px",
                    }}
                    value={lineOfBussiness}
                    name="lineOfBussiness"
                    onChange={(e) => onChangeHandeler(e)}
                    placeholder="Enter line of business"
                  />
                </Grid>
                <Grid item xs={4} style={{ marginTop: "5px" }}>
                  <Paper
                    className={classes.paper}
                    style={{
                      width: "100%",
                      fontSize: "14px",
                      justifyContent: "center",
                      textAlign: "center",
                      marginTop: "5px",
                      marginLeft: "10px",
                    }}
                  >
                    Department
                  </Paper>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    style={{
                      width: "90%",
                      height: "5px",
                      marginLeft: "5px",
                      marginTop: "5px",
                      boxShadow: "0px 0px 10px #E5E6FF",
                      background: "#FFFFFF",
                      borderRadius: "16px",
                    }}
                    value={departmentName}
                    name="departmentName"
                    onChange={(e) => onChangeHandeler(e)}
                    placeholder="Enter department name"
                  />
                </Grid>
                <Grid item xs={4} style={{ marginTop: "5px" }}>
                  <Paper
                    className={classes.paper}
                    style={{
                      width: "100%",
                      fontSize: "14px",
                      justifyContent: "center",
                      textAlign: "center",
                      marginTop: "5px",
                      marginLeft: "10px",
                    }}
                  >
                    Role
                  </Paper>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    style={{
                      width: "90%",
                      height: "5px",
                      marginLeft: "5px",
                      marginTop: "5px",
                      boxShadow: "0px 0px 10px #E5E6FF",
                      background: "#FFFFFF",
                      borderRadius: "16px",
                    }}
                    value={role}
                    name="role"
                    onChange={(e) => onChangeHandeler(e)}
                    placeholder="Enter role"
                  />
                </Grid>
                <Grid item xs={4} style={{ marginTop: "5px" }}>
                  <Paper
                    className={classes.paper}
                    style={{
                      width: "100%",
                      fontSize: "14px",
                      justifyContent: "center",
                      textAlign: "center",
                      marginTop: "5px",
                      marginLeft: "10px",
                    }}
                  >
                    Assistant
                  </Paper>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    style={{
                      width: "90%",
                      height: "5px",
                      marginLeft: "5px",
                      marginTop: "5px",
                      boxShadow: "0px 0px 10px #E5E6FF",
                      background: "#FFFFFF",
                      borderRadius: "16px",
                    }}
                    value={assistant_name}
                    name="assistant_name"
                    onChange={(e) => onChangeHandeler(e)}
                    placeholder="Assistant name"
                  />
                </Grid>
                <Grid item xs={4} style={{ marginTop: "5px" }}>
                  <Paper
                    className={classes.paper}
                    style={{
                      width: "100%",
                      fontSize: "14px",
                      justifyContent: "center",
                      textAlign: "center",
                      marginTop: "0px",
                      marginLeft: "10px",
                    }}
                  >
                    Assistant Phone No
                  </Paper>
                </Grid>
                <Grid item xs={8} spacing={5} container>
                  <Grid
                    item
                    xs={12}
                    container
                    spacing={1}
                    style={{
                      justifyContent: "center",
                      textAlign: "center",
                      marginTop: "20px",
                    }}
                  >
                    <PhoneInput
                      international
                      value={assistantPhones[0]}
                      placeholder="Enter assistant phone number"
                      onChange={(e) => assistantPhoneHandeler(e, 0)}
                      buttonStyle={{ height: "40px" }}
                    />
                  </Grid>
                  {/* {JSON.stringify(assistantPhones)} */}
                  {(assistantPhones.length > 1 || id == 0) &&
                    showAssistantPhone()}
                  <Grid item>
                    <Button
                      style={{
                        width: "130px",
                        height: "40px",
                        fontSize: "14px",
                        marginTop: "-55px",
                      }}
                      variant="outlined"
                      color="primary"
                      size="small"
                      className={classes.button}
                      startIcon={<AddIcon />}
                      onClick={() =>
                        setNumberOfAssistant(numOfAss_PhoneNumber + 1)
                      }
                    >
                      Add Phone
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </div>
      </Container>
    </Page>
  );
}
