import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import { Box, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import EditIcon from "@material-ui/icons/Edit";
import { Block } from "@material-ui/icons";
import EdiText from "react-editext";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

import { changeNotes } from "../../firebase/firestore";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

function TabPanelDiv(tabData) {
  // console.log(tabData,"tabData")
  // console.log(tabData.meetingId,"meetingId")
  const [value, setValue] = React.useState(0);
  // const [noteEditMode, setNoteEditMode] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleChangeTab = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  let notesData = tabData.tabData;

  const handleSave = async (index, val) => {
    let res = await changeNotes({ note: val, index: index }, tabData.meetingId);

    if (res && !tabData.notesRead) {
      tabData.markNotesAsRead();
    }
  };

  const handleScrollEvent = async (e) => {
    const bottom =
      e.target.scrollHeight.toFixed(0) - e.target.scrollTop.toFixed(0) ===
      e.target.clientHeight;

    if (bottom) {
      tabData.markNotesAsRead();
    }
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        className="notes-tabes"
      >
        <Tab
          icon={
            <Box display="flex" alignItems="center">
              <p>Notes</p> &nbsp;&nbsp;&nbsp;
              {notesData && notesData.length > 0 && (
                <>
                  {!tabData.notesRead && value == 0 && (
                    <Box
                      title="Mark as reviewed"
                      onClick={() => tabData.markNotesAsRead()}
                      style={{ cursor: "pointer" }}
                    >
                      <CheckCircleOutlineIcon color="disabled" />
                    </Box>
                  )}

                  {tabData.notesRead && value == 0 && (
                    <Box title="Marked as reviewed">
                      <CheckCircleOutlineIcon color="primary" />
                    </Box>
                  )}
                </>
              )}
            </Box>
          }
          {...a11yProps(0)}
        />

        <Tab label="Snippets" {...a11yProps(1)} />
      </Tabs>
      <Box
        bgcolor="#fff"
        borderRadius="6px"
        p={{ xs: 1, sm: 1, md: 1 }}
        style={{ marginTop: "7px", boxShadow: "0px 0px 10px #E5E6FF" }}
      >
        <div className="tab-div" onScroll={(e) => handleScrollEvent(e)}>
          {notesData &&
            notesData.length > 0 &&
            notesData.map((note, index) => {
              var date = new Date(null);
              date.setSeconds(note.duration); // specify value for SECONDS here
              var result = date.toISOString().substr(11, 8);
              return (
                <div key={index}>
                  <Accordion
                    className="acc-item"
                    expanded={expanded === `panel${index}`}
                    onChange={handleChangeTab(`panel${index}`)}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography
                        sx={{
                          width: "33%",
                          color: "text.secondary",
                          flexShrink: 0,
                        }}
                      >
                        {result}
                      </Typography>
                      <Typography>{note.speakerName}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <EdiText
                        type="textarea"
                        inputProps={{ rows: "3" }}
                        value={note.note}
                        onSave={(val) => handleSave(index, val)}
                      />
                    </AccordionDetails>
                  </Accordion>
                </div>
              );
            })}
        </div>
      </Box>
    </>
  );
}

export default TabPanelDiv;
