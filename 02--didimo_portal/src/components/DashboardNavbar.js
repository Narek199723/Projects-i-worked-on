import { useState, useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  Button,
  IconButton,
  Toolbar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
// import InputIcon from '@material-ui/icons/Input';
import { GlobalContext } from 'src/context/store';
import './logo.css';
import Amplify, { Auth, Hub } from 'aws-amplify';
import { userLogout } from 'src/context/actions';
import Logo from './Logo';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const [notifications] = useState([]);
  const navigate = useNavigate();
  const { dispatch } = useContext(GlobalContext);
  return (
    <AppBar elevation={0} {...rest}>
      <Toolbar>
        <Hidden mdUp>
          <IconButton color="inherit" onClick={onMobileNavOpen} size="large">
            <MenuIcon />
          </IconButton>
        </Hidden>
        <RouterLink to="/dashboard">
          <Logo />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden mdDown>

          <Button
            variant="contained"
            style={{ backgroundColor: '#5bed96', color: '#000000de' }}
          >
            Buy
          </Button>

          <IconButton color="inherit" size="large">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />

            </Badge>
          </IconButton>
          <IconButton
            onClick={() => {
              Auth.signOut();
              dispatch(userLogout());
              navigate(`${process.env.REACT_APP_ROOT_PATH}/login`, { replace: true });
            }}
            olor="inherit"
            size="large"
          >
            <span style={{ fontSize: '14px', color: 'white' }}>Sign Out</span>
          </IconButton>
        </Hidden>

      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func,
};

export default DashboardNavbar;
