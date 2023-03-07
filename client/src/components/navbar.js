import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/PersonRounded';
import HomeIcon from '@mui/icons-material/HomeRounded';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  })
}));

export default function ButtonAppBar() {

  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{ background: '#ffffff', zIndex: theme.zIndex.drawer + 1 }} elevation={1}>
        <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
          <Typography variant="h6" component="div" color="primary" fontWeight="bold">
            Remy
          </Typography>
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
