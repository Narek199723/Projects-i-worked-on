import React from "react";
import { Box, Container, Typography } from "@material-ui/core";

export default function PendingApproval() {
  return (
    <Container>
      <Box display="flex" alignItems="center" height={200}>
        <Typography variant="h6">
          Your account is either pending to approval or if you have not yet
          applied for beta access, please{" "}
          <a
            style={{ textDecoration: "none" }}
            href="https://www.bluecap.ai/#form-mainsection"
          >
            start here
          </a>
        </Typography>
      </Box>
    </Container>
  );
}
