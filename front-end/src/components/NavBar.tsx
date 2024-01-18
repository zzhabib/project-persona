import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { logout } from '../reducers/authReducer';
import { useNavigate } from 'react-router';

const NavBar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <AppBar
      position="static"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <img src="/pp-icon.png" alt="Project Persona" style={{ height: '40px' }} />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Project Persona
        </Typography>

        {isLoggedIn ? (<Button
          color="inherit"
          onClick={handleLogout}
        >
          Logout
        </Button>) : null}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
