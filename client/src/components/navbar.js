import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {Box, Toolbar, Typography, Button} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/PersonRounded';
import HomeIcon from '@mui/icons-material/HomeRounded';
import { bool } from 'prop-types';
import { useNavigate } from 'react-router-dom';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  })
}));

export default function Navbar({transparent}) {

  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        style={{ background: transparent ? "transparent" : "#FFFFFF", zIndex: theme.zIndex.drawer + 1 }}
        elevation={transparent ? 0 : 1}>
        <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
          <Button>
            <Typography variant="h6" component="div" color="primary" fontWeight="bold" onClick={() => navigate(`/`)}>
              Remy
            </Typography>
          </Button>
          <Box sx={{display: "flex", alignItems: "center"}}>
            <Button color="inherit" size="large">Saved Recipes</Button>
            <Button color="inherit" size="large">Settings</Button>
            <PersonIcon sx={{marginRight: -1}} color="secondary"/>
            <Button color="inherit" size="large">John Doe</Button>
          </Box>
          <Typography variant="h6" component="div" color="white.main">
            Remy
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

Navbar.propTypes = {
    transparent: bool
}

Navbar.defaultProps = {
    transparent: false
}
