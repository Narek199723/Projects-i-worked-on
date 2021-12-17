import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
function Loader() {
  return (
    <div
      id="mainLoader"
      style={{
        position: "fixed",
        zIndex: "999",
        overflow: "show",
        margin: "auto",
        height: "3rem",
        top: "-20px",
        left: 0,
        bottom: 0,
        right: 0,
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "2.5rem", height: "2.5rem" }}>
          <CircularProgress />
        </div>
      </div>
    </div>
  );
}
export default Loader;
