import React from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
export default function Footer() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Bluecap ©,"}
      <Link color="inherit">All rights reserved,</Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}
