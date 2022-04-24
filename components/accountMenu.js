import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { GetUser } from '../components/contexts/CurrentUser'
//import { googleSignIn } from './googleSignInButton'
//import { logout } from '../pages/signout'
import GoogleIcon from '@mui/icons-material/Google';
import { Nav } from 'react-bootstrap';
import PersonIcon from '@mui/icons-material/Person';
import { provider, auth} from "../Firebase"
import { signInWithPopup, signOut } from 'firebase/auth'

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { currentUser } = GetUser();

  function googleSignIn(){
    console.log("here");
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
        .then((result)=>{
            console.log(result);
            window.location.href = "/landing";
        })
        .catch((error) => {
            console.log(error);
        });
    }
    signInWithGoogle();
  }
  function logout(){
    const SignOut = () => {
        signOut(auth)
        .then(() => {
            //console.log("signed out")
            localStorage.clear();
            window.location.href = "/landing";
        })
        .catch((error) => {
        });
    }
    SignOut();
  }
  
  let icon;
  let status;
  if (!currentUser) {
    icon = <GoogleIcon fontSize="small" />;
    status = <Nav.Link onClick={googleSignIn}>Sign In</Nav.Link> ;
  }
  else {
    icon = <Logout fontSize="small" />;
    status = <Nav.Link onClick={logout}>Sign Out</Nav.Link>;
  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
                <PersonIcon fontSize="small" />
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
/*         onClick={googleSignIn} */
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <div>{currentUser ? currentUser.displayName : "Guest"}</div>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            {icon}
          </ListItemIcon>
          {status}
        </MenuItem>
 {/*        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <Nav.Link href="signout">{currentUser ? currentUser.displayName : "Guest"}</Nav.Link>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <GoogleIcon fontSize="small" />
          </ListItemIcon>
          <Nav.Link href="googleSignInButton">Sign In</Nav.Link>
        </MenuItem> */}
      </Menu>
    </React.Fragment>
  );
}