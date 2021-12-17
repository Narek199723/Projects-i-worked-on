import { useRef, useState } from "react";
import { connect } from "react-redux";

import { alpha } from "@material-ui/core/styles";
import { Avatar } from "@material-ui/core";
import { MIconButton } from "../../components/@material-extend";
import MenuPopover from "../../components/MenuPopover";
import AlertIcon from "../../assets/images/alert_warning_icon.svg";

function NotificationCriticalPopover(props) {
  const { notificationCriticals } = props;
  const { messagesBackup } = notificationCriticals;
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleOpen = (e) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return messagesBackup && messagesBackup.length ? (
    <div className="header-user-menu">
      <MIconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <Avatar
          alt="My Avatar"
          src={AlertIcon}
          sx={{ width: 20, height: 20 }}
        />
      </MIconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        {messagesBackup.map((n, index) => {
          if (n.display) {
            return (
              <div
                key={index}
                style={{ padding: "5px 10px 5px 10px ", fontSize: "14px" }}
              >
                {n.message}
              </div>
            );
          } else {
            return null;
          }
        })}
      </MenuPopover>
    </div>
  ) : null;
}

const mapStateToProps = (state) => ({
  notificationCriticals: state.generic.notificationCriticals || false,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationCriticalPopover);
