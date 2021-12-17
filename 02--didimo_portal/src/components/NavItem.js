import {
  NavLink as RouterLink,
  matchPath,
  useLocation,
} from 'react-router-dom';
import React, { Fragment, useState } from 'react';

import PropTypes from 'prop-types';
import {
  Button,
  ListItem,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import makeStyles from '@material-ui/styles/makeStyles';
import { NavLink } from 'react-router-dom';
import { v4 } from 'uuid';

import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const NavItem = ({ href, icon: Icon, title, fn, ...rest }) => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const location = useLocation();

  const active = href
    ? !!matchPath(
        {
          path: href,
          end: false,
        },
        location.pathname
      )
    : false;

  let onClickFunctionOnPackages = () => {
    setShowSubMenu(!showSubMenu);
  };

  const subMenuPackageArray = [
    {
      name: 'Details',
    },
  ];
  return (
    <Fragment>
      <ListItem
        disableGutters
        sx={{
          display: 'flex',
          py: 0,
        }}
        {...rest}
      >
        <Button
          component={RouterLink}
          sx={{
            color: '#37474f',
            fontWeight: 'medium',
            justifyContent: 'flex-start',
            letterSpacing: 0,
            py: 1.25,
            textTransform: 'none',
            width: '100%',
            ...(active && {
              color: 'primary.main',
            }),
            '& svg': {
              mr: 1,
            },
          }}
          to={href}
        >
          {Icon && <Icon size="20" />}
          <span onClick={fn && onClickFunctionOnPackages}>
            <p style={{ color: 'text.secondary' }}>{title}</p>
            {fn && (
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="expand">
                  {(showSubMenu && <KeyboardArrowDownIcon />) || (
                    <KeyboardArrowRightIcon />
                  )}
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </span>
        </Button>
        <br />
      </ListItem>
      {showSubMenu &&
        subMenuPackageArray.map((item) => (
          <ListItem key={v4()} style={{ paddingLeft: '40px' }}>
            <NavLink to={'/packages/details'}>{item.name}</NavLink>
          </ListItem>
        ))}
    </Fragment>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string,
};

export default NavItem;
