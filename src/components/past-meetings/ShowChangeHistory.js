import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import Diff from "react-stylable-diff";
import { getSummary, storeSummary } from "../../firebase/firestore";
import { Box, Button, CircularProgress } from "@material-ui/core";
import * as actions from "../../redux/actions";
import { connect } from "react-redux";

function ShowChangeHistory({
  open,
  onClose,
  meetingId,
  historyNo,
  setSummaryData,
  ...props
}) {
  const [summaryHistory, setSummaryHistory] = useState([]);
  const [summaryHistoryNumber, setSummaryHistoryNumber] = useState(0);
  const [summaryHistoryTotal, setSummaryHistoryTotal] = useState(0);
  const [restoreLoader, setRestoreLoader] = useState(false);

  useEffect(async () => {
    let summaryData = await getSummary(meetingId);
    let summaryArry = [];

    if (summaryData.history_summary) {
      summaryData.history_summary.forEach((h) => {
        summaryArry.push(h.value);
      });
    }

    if (summaryData.summary) {
      summaryArry.push(summaryData.summary);
    }
    setSummaryHistory(summaryArry);
    if (historyNo && historyNo < summaryArry.length - 1) {
      setSummaryHistoryNumber(historyNo);
    } else {
      setSummaryHistoryNumber(summaryArry.length - 1);
    }
    setSummaryHistoryTotal(summaryArry.length);
  }, []);

  return (
    <Dialog maxWidth="lg" onClose={() => onClose(false)} open={open}>
      <Box style={{ padding: "20px" }} width={{ md: "700px", xs: "500px" }}>
        {summaryHistory.length > 0 && (
          <>
            <Diff
              inputA={summaryHistory[summaryHistoryNumber - 1]}
              inputB={summaryHistory[summaryHistoryNumber]}
              type="words"
            />

            <Box display="flex" marginTop="10px" justifyContent="space-between">
              <Box
                display="flex"
                width={{ md: "200px", xs: "170px" }}
                justifyContent="space-between"
              >
                <Button
                  disabled={summaryHistoryNumber == 0}
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    setSummaryHistoryNumber(summaryHistoryNumber - 1);
                  }}
                >
                  Previous
                </Button>

                <Button
                  disabled={summaryHistoryNumber == summaryHistoryTotal - 1}
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    setSummaryHistoryNumber(summaryHistoryNumber + 1);
                  }}
                >
                  Next
                </Button>
              </Box>

              <Box
                display="flex"
                width={{ md: "200px", xs: "170px" }}
                justifyContent="space-between"
              >
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    onClose(false);
                  }}
                >
                  Cancel
                </Button>

                <Button
                  disabled={summaryHistoryNumber == summaryHistoryTotal - 1}
                  variant="outlined"
                  color="primary"
                  onClick={async () => {
                    setRestoreLoader(true);
                    // setSummaryHistoryNumber(summaryHistoryNumber + 1)
                    let payload = {
                      summary: summaryHistory[summaryHistoryNumber],
                    };
                    let storesummaryStatus = await storeSummary(
                      payload,
                      meetingId
                    );
                    if (storesummaryStatus) {
                      props.showSnackbar({
                        show: true,
                        severity: "success",
                        message: "Summary change restored successfully.",
                      });
                      setSummaryData(summaryHistory[summaryHistoryNumber]);
                      onClose(false);
                    } else {
                      props.showSnackbar({
                        show: true,
                        severity: "error",
                        message: "Something went wrong!",
                      });
                    }
                    setRestoreLoader(false);
                    //show success
                  }}
                >
                  Restore
                  {restoreLoader && (
                    <Box marginLeft={1}>
                      <CircularProgress style={{ color: "blue" }} size="15px" />
                    </Box>
                  )}
                </Button>
              </Box>
            </Box>
          </>
        )}
        {summaryHistory.length == 0 && <p>Loading..</p>}
      </Box>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  showSnackbar: (data) => dispatch(actions.showSnackbar(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowChangeHistory);
