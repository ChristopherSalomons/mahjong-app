import { useState, useMemo } from "react";
import { Outlet, Link as RouterLink } from "react-router-dom";

import getTheme from '../theme.js';
import Footer from './Footer';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';

const PageLayout = () => {
  const [colorMode, setColorMode] = useState("dark");
  const theme = useMemo(() => createTheme(getTheme(colorMode)), [colorMode]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{textAlign: 'center'}}>
      <Stack direction="column" spacing={-1.5} sx={{mt: 1, mb: 0.5, mx: 'auto', width: 'fit-content'}}>
        <Typography color='appbar.text' component={RouterLink} to="/" variant="h7" sx={{ fontFamily: 'monospace', fontStyle: 'italic', textDecoration: 'none'}}>
          Riichi
        </Typography>
        <Typography color='appbar.text' component={RouterLink} to="/" variant="h6" sx={{ fontFamily: 'monospace', fontWeight: 700, textDecoration: 'none'}}>
          MAHJONG
        </Typography>
      </Stack>
      <Divider sx={{borderColor: 'appbar.divider'}}/>
      <Stack mt={1}>
        <Button component={RouterLink} to="/howtoplay" size="large" sx={{borderRadius: 0, color: 'appbar.text', ':hover': {bgcolor: 'appbar.hover'}}}>How to Play</Button>
        <Button component={RouterLink} to="/yaku" size="large" sx={{borderRadius: 0, color: 'appbar.text', ':hover': {bgcolor: 'appbar.hover'}}}>Yaku</Button>
        <Button component={RouterLink} to="/strategy" size="large" sx={{borderRadius: 0, color: 'appbar.text', ':hover': {bgcolor: 'appbar.hover'}}}>Strategy</Button>
      </Stack>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <AppBar position="sticky" sx={{bgcolor: 'appbar.main'}} enableColorOnDark>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Stack direction="column" spacing={-1.5} sx={{ mr: 4}}>
            <Typography component={RouterLink} to="/" variant="h7" sx={{ fontFamily: 'monospace', fontStyle: 'italic', textDecoration: 'none', color: 'appbar.text'}}>
              Riichi
            </Typography>
            <Typography component={RouterLink} to="/" variant="h6" sx={{ fontFamily: 'monospace', fontWeight: 700, textDecoration: 'none', color: 'appbar.text'}}>
              MAHJONG
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1.25} divider={<Divider orientation="vertical" flexItem sx={{borderColor: 'appbar.divider'}}/>}>
            <Button component={RouterLink} to="/howtoplay" sx={{display: {xs: 'none', sm: 'inherit'}, color: 'appbar.text', ':hover': {bgcolor: 'appbar.hover'}}}>How to Play</Button>
            <Button component={RouterLink} to="/yaku" sx={{display: {xs: 'none', sm: 'inherit'}, color: 'appbar.text', ':hover': {bgcolor: 'appbar.hover'}}}>Yaku</Button>
            <Button component={RouterLink} to="/strategy" sx={{display: {xs: 'none', sm: 'inherit'}, color: 'appbar.text', ':hover': {bgcolor: 'appbar.hover'}}}>Strategy</Button>
          </Stack>
          <IconButton onClick={() => setColorMode(colorMode === "light" ? "dark" : "light")} aria-label="theme toggle" sx={{ml: 'auto', color: 'appbar.text', ':hover': {bgcolor: 'appbar.hover'}}}>
              {colorMode === 'dark' ? <WbSunnyOutlinedIcon fontSize="small"/> : <DarkModeOutlinedIcon fontSize="small"/>}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          PaperProps={{sx: {bgcolor: 'appbar.main'}}}
          sx={{display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '200px' }}}
        >
          {drawer}
        </Drawer>
      </Box>
      <Outlet />
      <Footer/>
    </ThemeProvider>
  )
};

export default PageLayout;