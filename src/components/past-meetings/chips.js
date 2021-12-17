import React, { useEffect } from "react";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import { styled } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

function Chips({ attachments }) {
  // const [chipData, setChipData] = React.useState([
  //     { key: 0, label: 'Bla-bla blabla blab.... pdf (120 Mb)' },
  //     { key: 1, label: 'Bla-bla. jpeg (7 Mb)' },
  //     { key: 2, label: 'Bla-bla blablabla. jpeg (20 Mb)' },
  //     { key: 3, label: 'Google Drive - Bla blabla_1' },
  //     { key: 4, label: 'Google Drive - Bla blabla_2' },
  // ]);

  const handleDelete = (chipToDelete) => () => {
    // setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  return (
    <Paper
      className="attachment-list"
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 0,
        boxShadow: "none !important",
      }}
      component="ul"
    >
      {attachments &&
        attachments.map((data, index) => {
          return (
            <ListItem key={index}>
              <Chip
                avatar={<Avatar src={data.iconLink}></Avatar>}
                label={data.title}
                onClick={() => window.open(data.fileUrl, "_blank")}
                onDelete={
                  data.label === "React" ? undefined : handleDelete(data)
                }
                className="znmd"
              />
            </ListItem>
          );
        })}

      {!attachments && <p style={{ textAlign: "center" }}> No attachments!</p>}
    </Paper>
  );
}

export default Chips;
