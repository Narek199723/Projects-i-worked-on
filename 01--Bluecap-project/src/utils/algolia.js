import { render } from "react-dom";
import React, {
  createElement,
  useState,
  Fragment,
  useEffect,
  useRef,
  useCallback,
} from "react";

import algoliasearch from "algoliasearch";
import { autocomplete, getAlgoliaResults } from "@algolia/autocomplete-js";
// import "@algolia/autocomplete-theme-classic";
import { createLocalStorageRecentSearchesPlugin } from "@algolia/autocomplete-plugin-recent-searches";
import { Box, Collapse, Grid } from "@mui/material";
import insightsClient from "search-insights";
import { createAlgoliaInsightsPlugin } from "@algolia/autocomplete-plugin-algolia-insights";
import "../App.css";
import "../AlgoliaTheme.css";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import ChatIcon from "@material-ui/icons/Chat";
import { getTranscriptByMeetingId } from "../firebase/firestore";
import firebase from "../firebase/firebase";

let setOpen;

function MyMetting({ meeting, components, insights }) {
  const [open, setOpenFn] = useState(false);
  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    insights.clickedObjectIDsAfterSearch({
      eventName: "Meeting selected",
      index: meeting.__autocomplete_indexName,
      objectIDs: [meeting.objectID],
      queryID: meeting.__autocomplete_queryID,
    });
    setOpenFn(!open);
  };
  return (
    <div onClick={handleClick}>
      <components.Highlight hit={meeting} attribute="title" />
      <Collapse in={open} timeout="auto" unmountOnExit>
        <p>Collapse</p>
      </Collapse>
    </div>
  );
}

function Note({ note }) {
  return <p>{note.note}</p>;
}

function Transcript({ transcript, components, insights }) {
  const [open, setOpenFn] = useState(false);
  const [transcripts, setTranscripts] = useState(false);

  const myRef = useCallback((node) => {
    if (node !== null) {
      node.scrollIntoView();
    }
  }, []);

  const handleClick = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setTranscripts(false);

    if (!transcripts) {
      let d = await getTranscriptByMeetingId(transcript.meetingId);
      let t = [];
      d.forEach((doc) => {
        t.push({
          text: doc.data().text,
          id: doc.id,
          speaker: doc.data().speaker,
        });
      });
      if (t.length) {
        setTranscripts(t);
      }
    }
    insights.clickedObjectIDsAfterSearch({
      eventName: "Transcript selected",
      index: transcript.__autocomplete_indexName,
      objectIDs: [transcript.objectID],
      queryID: transcript.__autocomplete_queryID,
    });
    setOpenFn(!open);
  };

  let firstLetter = transcript.speaker.charAt(0);

  return (
    <div onClick={handleClick}>
      <div style={{ padding: "10px" }}>
        <Grid container spacing={1}>
          <Grid item xs={1} sm={1}>
            <img src="/images/trans-icon.png"></img>
          </Grid>
          <Grid item xs={9} sm={9}>
            <div style={{ lineHeight: "1.3" }}>
              <components.Snippet hit={transcript} attribute="transcript">
                <components.Highlight hit={transcript} attribute="transcript" />
              </components.Snippet>
            </div>
          </Grid>
          <Grid item xs={2} sm={2}>
            <Chip size="small" label={transcript.speaker} />
          </Grid>
        </Grid>

        {/* <Box display="flex" justifyContent="space-between" width={{ xs: "400px", md: "700px" }}>
            <img src="/images/trans-icon.png"></img>
            <div>
              <components.Snippet hit={transcript} attribute="transcript">
                <components.Highlight hit={transcript} attribute="transcript" />
              </components.Snippet>
            </div>
            <Chip size="small" avatar={<Avatar>{firstLetter}</Avatar>} label={transcript.speaker} />
          </Box> */}

        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            borderRadius="10px"
          >
            <Box
              height={200}
              style={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                margin: "30px 0 20px 0",
              }}
            >
              <div
                style={{
                  height: "100%",
                  overflow: "hidden",
                  overflowY: "auto",
                  padding: "10px",
                }}
              >
                <p>Transcript details</p>
                {transcripts &&
                  transcripts.map((doc) => {
                    let tmpFirstLetter = doc.speaker.charAt(0);
                    if (doc.id == transcript.objectID) {
                      return (
                        <Box
                          padding={1}
                          style={{ lineHeight: "1.3" }}
                          display="flex"
                          justifyContent="flex-start"
                          ref={myRef}
                        >
                          {" "}
                          <Chip
                            style={{ marginRight: "20px" }}
                            size="small"
                            label={doc.speaker}
                          />{" "}
                          <div>
                            {" "}
                            <components.Highlight
                              hit={transcript}
                              attribute="transcript"
                            />
                          </div>{" "}
                        </Box>
                      );
                    } else {
                      return (
                        <Box
                          padding={1}
                          style={{ lineHeight: "1.3" }}
                          display="flex"
                          justifyContent="flex-start"
                        >
                          <Chip
                            style={{ marginRight: "20px" }}
                            size="small"
                            label={doc.speaker}
                          />{" "}
                          <p>{doc.text}</p>{" "}
                        </Box>
                      );
                    }
                  })}
              </div>
            </Box>
            <Box margin={1}>
              <a
                onClick={() =>
                  (window.location.href = `/meeting/${transcript.meetingId}`)
                }
              >
                Meeting details
              </a>
            </Box>
          </Box>
        </Collapse>
      </div>
    </div>
  );
}

function TranscriptByMeeting({ transcript, components, insights }) {
  return (
    <div style={{ backgroundColor: "#f1f1f1", borderRadius: "10px" }}>
      {transcript.groupByMeetingId.map((t, i) => {
        return (
          <Transcript
            key={i}
            insights={insights}
            components={components}
            transcript={t}
          />
        );
      })}
    </div>
  );
}

function Header({ title }) {
  return (
    <div>
      <span className="aa-SourceHeaderTitle">{title}</span>
      <div className="aa-SourceHeaderLine" />
    </div>
  );
}
const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
  key: "search",
  limit: 5,
  transformSource({ source }) {
    return {
      ...source,
      onSelect({ item }) {
        setOpen(true);
      },
    };
  },
});

export default function algoliaAutocomplete(
  userId,
  apiKey,
  handleAlgoliaSearchSubmit
) {
  const appId = process.env.REACT_APP_ALGOLIA_APP_ID
    ? process.env.REACT_APP_ALGOLIA_APP_ID
    : "TWE65SAYW0";
  const searchClient = algoliasearch(appId, apiKey);
  insightsClient("init", { appId, apiKey });

  insightsClient("setUserToken", userId);
  const algoliaInsightsPlugin = createAlgoliaInsightsPlugin({ insightsClient });

  const autocompleteInstance = autocomplete({
    container: "#algolia-autocomplete-input",
    panelPlacement: "start",
    onSubmit: function (data) {
      console.log(data);
      data.event.preventDefault();
      data.event.stopPropagation();
      // data.setIsOpen(true)
      handleAlgoliaSearchSubmit();
      // document.getElementById("algolia-autocomplete-input").focus()
    },
    // debug:true,
    renderer: { createElement, Fragment },
    render({ children }, root) {
      render(children, root);
    },
    openOnFocus: true,
    plugins: [recentSearchesPlugin, algoliaInsightsPlugin],
    getSources(mainProps) {
      return [
        {
          sourceId: "transcripts",
          getItems({ query, state }) {
            if (!query) return [];

            let tmpQuery = {
              indexName: "dev_transcripts",
              query,
              params: {
                page: mainProps.state.context.transcript_page
                  ? mainProps.state.context.transcript_page
                  : 0,
                hitsPerPage: 2,
                attributesToSnippet: ["transcript:20"],
                snippetEllipsisText: "…",
              },
            };

            if (state.context.filter) {
              tmpQuery.filters = state.context.filter;
            }

            return getAlgoliaResults({
              searchClient,
              queries: [tmpQuery],
              transformResponse(props) {
                if (props.results[0].nbPages) {
                  mainProps.setContext({
                    transcript_total_page: props.results[0].nbPages,
                    transcript_page: props.results[0].page,
                  });
                }

                let formattedResponse = [],
                  groupByMeetingId = {},
                  meetingIDArr = [],
                  tempArr = [];

                props.hits[0].map((hit) => {
                  let meetingId = hit.meetingId;
                  if (groupByMeetingId[meetingId]) {
                    groupByMeetingId[meetingId].push(hit);
                  } else {
                    groupByMeetingId[meetingId] = [];
                    groupByMeetingId[meetingId].push(hit);
                  }
                });

                tempArr = props.hits[0].map((h) => {
                  if (meetingIDArr.includes(h.meetingId)) {
                    h.skip = true;
                  } else {
                    h.skip = false;
                    h.groupByMeetingId = groupByMeetingId[h.meetingId];
                    meetingIDArr.push(h.meetingId);
                  }

                  return h;
                });

                formattedResponse[0] = tempArr.filter((h) => !h.skip);
                return formattedResponse;
              },
            });
          },

          templates: {
            header(props) {
              return props.items.length > 0 ? (
                <Header title="Transcripts" />
              ) : (
                false
              );
            },

            item({ state, item, components }) {
              return (
                <TranscriptByMeeting
                  insights={state.context.algoliaInsightsPlugin.insights}
                  components={components}
                  transcript={item}
                />
              );
            },

            noResults() {
              return false;
            },
            footer(props) {
              if (props.items.length == 0) {
                return false;
              }
              return (
                <Box
                  padding={3}
                  display="flex"
                  width={150}
                  justifyContent="space-between"
                >
                  {props.state.context.transcript_page > 0 ? (
                    <a
                      href="Javascript:;"
                      onClick={() => {
                        mainProps.setContext({
                          transcript_page:
                            props.state.context.transcript_page - 1,
                        });
                        mainProps.refresh();
                      }}
                    >
                      Prev
                    </a>
                  ) : (
                    <a href="Javascript:;" style={{ cursor: "not-allowed" }}>
                      Prev
                    </a>
                  )}
                  <p>
                    {props.state.context.transcript_page + 1}/
                    {props.state.context.transcript_total_page}
                  </p>
                  {props.state.context.transcript_page + 2 <=
                  props.state.context.transcript_total_page ? (
                    <a
                      href="Javascript:;"
                      onClick={() => {
                        mainProps.setContext({
                          transcript_page:
                            props.state.context.transcript_page + 1,
                        });
                        mainProps.refresh();
                      }}
                    >
                      Next
                    </a>
                  ) : (
                    <a href="Javascript:;" style={{ cursor: "not-allowed" }}>
                      Next
                    </a>
                  )}
                </Box>
              );
            },
          },
        },
        {
          sourceId: "notes",
          getItems({ query }) {
            if (!query) return [];
            return getAlgoliaResults({
              searchClient,
              queries: [
                {
                  indexName: "dev_notes",
                  query,
                  params: {
                    hitsPerPage: 3,
                    attributesToSnippet: ["note:10"],
                    snippetEllipsisText: "…",
                  },
                },
              ],
            });
          },
          templates: {
            header() {
              return <Header title="Notes" />;
            },

            item({ item }) {
              return <Note note={item} />;
            },
            noResults() {
              return "No notes for this query.";
            },
          },
        },
      ];
    },
  });

  setOpen = autocompleteInstance.setIsOpen;

  return autocompleteInstance;
}
