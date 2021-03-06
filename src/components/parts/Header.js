import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { getisSignedIn, getUserName } from '../../redux/users/selector';
import { signOut } from '../../redux/users/operations';
import { push } from 'connected-react-router';

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: '#304def',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#4e65e4',
      boxShadow: 'none',
    }
  },
  colorPrimary: {
    backgroundColor: '#304def',
  },
  grow: {
    flexGrow: 1,
  },
  root: {
    paddingLeft: 7,
  },
  title: {
    marginLeft: 25,
    fontSize: 28,
    cursor: 'pointer',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  name: {
    fontSize: 18,
    marginRight: 10,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const name = getUserName(selector);
  const isSignedIn = getisSignedIn(selector);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem className={classes.root} onClick={() => dispatch(push('/mypage'))}>
        <IconButton
          aria-controls="mypage"
          color="inherit"
          title='???????????????'
        >
          <AccountCircle />
        </IconButton>
        <p>???????????????</p>
      </MenuItem>
      <MenuItem className={classes.root} onClick={() => dispatch(push('/edit/income'))}>
        <IconButton
          aria-controls="income"
          color="inherit"
          title='??????'
        >
          <CreateIcon />
        </IconButton>
        <p>??????</p>
      </MenuItem>
      <MenuItem className={classes.root} onClick={() => dispatch(push('/edit/expense'))}>
        <IconButton
          aria-controls="expense"
          color="inherit"
          title='??????'
        >
          <CreateIcon />
        </IconButton>
        <p>??????</p>
      </MenuItem >
      <MenuItem className={classes.root} onClick={() => dispatch(signOut())}>
        <IconButton
          aria-controls="signout"
          color="inherit"
          title='???????????????'
        >
          <ExitToAppIcon />
        </IconButton>
        <p>???????????????</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position='fixed' className={classes.colorPrimary}>
        <Toolbar>
          <Typography 
            className={classes.title} 
            onClick={() => dispatch(push('/'))}
            variant="h5">
            ??????????????????
          </Typography>
          {isSignedIn && (
            <>
              <div className={classes.grow} />
              <Typography className={classes.name} variant={"overline"}>
                {name}??????
              </Typography>
              <div className={classes.sectionDesktop}>
                <Button
                  variant={"contained"}
                  color={"secondary"}
                  className={classes.button}
                  onClick={() => dispatch(push('/mypage'))}
                  startIcon={<AccountCircle />}
                >
                  ???????????????
                </Button>
                <Button
                  variant={"contained"}
                  color={"secondary"}
                  className={classes.button}
                  onClick={() => dispatch(push('/edit/income'))}
                  startIcon={<CreateIcon />}
                >
                  ??????
                </Button>
                <Button
                  variant={"contained"}
                  color={"secondary"}
                  className={classes.button}
                  onClick={() => dispatch(push('/edit/expense'))}
                  startIcon={<CreateIcon />}
                >
                  ??????
                </Button>
                <Button
                  variant={"contained"}
                  color={"secondary"}
                  className={classes.button}
                  onClick={() => dispatch(signOut())}
                  startIcon={<ExitToAppIcon />}
                >
                  ???????????????
                </Button>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label={"show more"}
                  aria-controls={mobileMenuId}
                  aria-haspopup={"true"}
                  onClick={handleMobileMenuOpen}
                  color={"inherit"}
                >
                  <MenuIcon />
                </IconButton>
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
};

export default Header;