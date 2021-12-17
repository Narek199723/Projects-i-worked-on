import PropTypes from "prop-types";
import { forwardRef } from "react";
// material
import { Box } from "@material-ui/core";
// utils
import useCollapseDrawer from "../hooks/useCollapseDrawer";

const Page = forwardRef(({ children, title = "", ...other }, ref) => {
  const { isCollapse } = useCollapseDrawer();

  let marginLeft = 0;
  let boxWidth = "calc(100% - 0px)";
  if (isCollapse) {
    marginLeft = 90;
    boxWidth = "calc(100% - 90px)";
  }

  return (
    <Box
      ref={ref}
      {...other}
      style={{ marginLeft: marginLeft, width: boxWidth }}
    >
      {children}
    </Box>
  );
});

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Page;
