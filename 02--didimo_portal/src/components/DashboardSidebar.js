import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  Typography,
} from '@material-ui/core';
// import makeStyles from '@material-ui/styles'
import NavItem from './NavItem';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FaceIcon from '@mui/icons-material/Face';
import ReorderIcon from '@mui/icons-material/Reorder';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CodeIcon from '@mui/icons-material/Code';
import SettingsIcon from '@mui/icons-material/Settings';
import { Button } from '@mui/material';
import { GlobalContext } from 'src/context/store';
import { Auth } from 'aws-amplify';
import { userLogout } from 'src/context/actions';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import makeStyles from '@material-ui/styles/makeStyles';
import './Layouts/Sidebar.css';

const useStyles = makeStyles({
  MenuInner: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    color: 'grey',
    padding: '0',
    fontSize: '0.8em',
    marginTop: '0',
    textAlign: 'left',
    marginBottom: '0',
    textTransform: 'uppercase',
  },
  title: {
    color: '#263238',
    fontSize: '20px',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '500',
    lineHeight: '24px',
    letterSpacing: '-0.06px',
  },
  subtitle: {
    color: '#546e7a',
    fontSize: '12px',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '400',
    lineHeight: '18px',
    letterSpacing: '-0.04px',
  },
  sign_btn_1: {
    color: 'rgba(0, 0, 0, 0.87) !important',
    padding: '6px 16px',
    fontSize: '14px',
    minWidth: '64px',
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
    border: 'none',
    transition:
      'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '500',
    lineHeight: '1.75',
    borderRadius: '4px',
    letterSpacing: '0.02857em',
    textTransform: 'none',
  },
});

// const useStyles = makeStyles({

// });

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: '',
  name: '',
};

const items = [
  {
    href: `${process.env.REACT_APP_ROOT_PATH}/welcome`,
    icon: EmojiPeopleIcon,
    title: 'Welcome',
  },
  {
    href: `${process.env.REACT_APP_ROOT_PATH}/dashboard`,
    icon: DashboardIcon,
    title: 'Dashboard',
  },
  {
    href: `${process.env.REACT_APP_ROOT_PATH}/mydidmos`,
    icon: FaceIcon,
    title: 'My didimos',
  },
];

const items2 = [
  {
    href: `${process.env.REACT_APP_ROOT_PATH}/transactions`,
    icon: ReorderIcon,
    title: 'Transactions',
  },
  {
    href: `${process.env.REACT_APP_ROOT_PATH}/packages`,
    icon: ShoppingBasketIcon,
    title: 'Packages',
    function: true,
  },
  {
    href: `${process.env.REACT_APP_ROOT_PATH}/orders`,

    icon: AttachMoneyIcon,
    title: 'Orders',
  },
  {
    href: `${process.env.REACT_APP_ROOT_PATH}/profile/settings`,
    icon: SettingsIcon,
    title: 'Settings',
  },
];
const items3 = [
  {
    href: '#',
    icon: CodeIcon,
    title: 'Applications',
  },
];

// {
//   page.shouldExpand && (
//     <ListItemSecondaryAction>
//       <IconButton edge="end" aria-label="expand">
//         {(page.shouldExpand() && <KeyboardArrowDownIcon />) || (
//           <KeyboardArrowRightIcon />
//         )}
//       </IconButton>
//     </ListItemSecondaryAction>
//   );
// }

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const { dispatch } = useContext(GlobalContext);
  const { state } = useContext(GlobalContext);
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);
  const userName = state.user.given_name + ' ' + state.user.family_name;
  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        p: 2,
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          className="Profile-personalInfoCard-UploadProfile-container"
          id="logo-import-drop-area"
        >
          <div id="profileImage">
            {(userName ? userName : '')
              .match(/(\b\S)?/g)
              .join('')
              .match(/(^\S|\S$)?/g)
              .join('')
              .toUpperCase()}
          </div>
        </div>
        <Typography className={classes.title} color="textPrimary" variant="h5">
          {userName}
        </Typography>
        <Typography
          className={classes.subtitle}
          color="textSecondary"
          variant="body2"
        >
          {state?.user?.email}
        </Typography>
        <Button
          onClick={() => {
            Auth.signOut();
            dispatch(userLogout());
            navigate(`${process.env.REACT_APP_ROOT_PATH}/login`, {
              replace: true,
            });
          }}
          className={classes.sign_btn_1}
        >
          {' '}
          Sign Out
        </Button>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
          <Hidden mdUp>
            <NavItem
              href={'#'}
              key={'notifications'}
              title={'Notifications'}
              icon={NotificationsIcon}
            />
          </Hidden>
        </List>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box>
        <h1 className={classes.MenuInner}>ACCOUNT</h1>

        <List>
          {items2.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
              fn={item.function}
            />
          ))}
        </List>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box>
        <h1 className={classes.MenuInner}> DEVELOPERS</h1>
        <List>
          {items3.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Hidden mdUp>
        <IconButton color="inherit" size="large">
          <Button
            variant={'contained'}
            style={{ backgroundColor: '#5bed96', color: '#000000de' }}
          >
            Buy
          </Button>
        </IconButton>
      </Hidden>
    </Box>
  );

  return (
    <div className={'dashSidebar'}>
      <Hidden mdUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256,
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)',
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </div>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default DashboardSidebar;
