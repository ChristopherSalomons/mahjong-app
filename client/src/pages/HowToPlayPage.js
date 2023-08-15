import { Tiles, ScreenSize } from './Components'

import './Style.css'

import { useState, useRef, useEffect } from "react";

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import ListIcon from '@mui/icons-material/List';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';

const ContentMenu = ({toggleContentList}) => {
  const [contentMenuIsOpen, setContentMenuIsOpen] = useState(false);
  const contentMenuAnchorRef = useRef(null);
  
  const handleContentButtonToggle = () => {
    setContentMenuIsOpen((prev) => !prev);
  };
  
  const handleCloseContentMenu = (event) => {
    if (contentMenuAnchorRef.current && contentMenuAnchorRef.current.contains(event.target)) {
      return;
    }
    setContentMenuIsOpen(false);
  };

  const handleMoveToSidebar = (event) => {
    if (contentMenuAnchorRef.current && contentMenuAnchorRef.current.contains(event.target)) {
      return;
    }
    setContentMenuIsOpen(false);
    toggleContentList();
  };
  
  function handleContentMenuKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setContentMenuIsOpen(false);
    } else if (event.key === 'Escape') {
      setContentMenuIsOpen(false);
    }
  }
  
  // return focus to the button when we transition from !open -> open
  const prevContentMenuIsOpen = useRef(contentMenuIsOpen);
  useEffect(() => {
    if (prevContentMenuIsOpen.current === true && contentMenuIsOpen === false) {
      contentMenuAnchorRef.current.focus();
    }
  
    prevContentMenuIsOpen.current = contentMenuIsOpen;
  }, [contentMenuIsOpen]);

  return (
    <>
      <IconButton
        aria-label="contents"
        onClick={handleContentButtonToggle}
        ref={contentMenuAnchorRef}
        id="contents-button"
        aria-controls={contentMenuIsOpen ? 'contents-menu' : undefined}
        aria-expanded={contentMenuIsOpen ? 'true' : undefined}
        aria-haspopup="true"
        sx={{
          position: 'fixed',
          top: {xs: '65px', sm: '75px'},
          left: '10px',
          zIndex: 2,
          color: 'appbar.text',
          bgcolor: 'appbar.main',
          ':hover': {bgcolor: 'appbar.iconHover'},
          borderRadius: '4px'
        }}
      >
        <ListIcon/>
      </IconButton>
      {/* <Box sx={{position: 'fixed', top: {xs: '65px', sm: '75px'}, left: '10px', width: '40px', height: '40px', borderRadius: '50%', zIndex: 1, bgcolor: 'appbar.main'}}></Box>  */}
      <Popper
        open={contentMenuIsOpen}
        anchorEl={contentMenuAnchorRef.current}
        role={undefined}
        placement='bottom-start'
        transition
        disablePortal
        sx={{zIndex: 2, top: '10px'}}
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, -40],
            },
          },
        ]}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
              placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Box sx={{bgcolor: 'appbar.main', borderRadius: "4px"}}>
              <ClickAwayListener onClickAway={handleCloseContentMenu}>
              <MenuList
                autoFocusItem={contentMenuIsOpen}
                id="contents-menu"
                aria-labelledby="contents-button"
                onKeyDown={handleContentMenuKeyDown}
                dense
                sx={{color: 'appbar.text', paddingBottom: '4px', paddingTop: '0px'}}
              >
                <ListItem
                  sx={{fontWeight: 600, borderBottom: 1, borderColor: 'appbar.divider', paddingY: '6px'}}
                  secondaryAction={ ScreenSize() >= 3 &&
                    <IconButton
                      aria-label="move to sidebar"
                      onClick={handleMoveToSidebar}
                      sx={{
                        mr: '-16px',
                        ':hover': { bgcolor: 'appbar.hover'},
                        borderTopLeftRadius: '0px',
                        borderBottomLeftRadius: '0px',
                        borderTopRightRadius: '4px',
                        borderBottomRightRadius: '0px',
                      }}
                    >
                      <ArrowRightIcon sx={{color: 'appbar.text'}}/>
                    </IconButton>
                  }
                >
                  <ListItemText primaryTypographyProps={{fontWeight: 600}}>Contents</ListItemText>
                </ListItem>
                <MenuItem onClick={handleCloseContentMenu} component="a" href="#top" sx={{':hover': {bgcolor: 'appbar.hover'}, fontWeight: 600}}>(Top)</MenuItem>
                <MenuItem onClick={handleCloseContentMenu} component="a" href="#tiles" sx={{':hover': {bgcolor: 'appbar.hover'}}}>Tiles</MenuItem>
                <MenuItem onClick={handleCloseContentMenu} component="a" href="#gameplay" sx={{':hover': {bgcolor: 'appbar.hover'}}}>Basic Gameplay</MenuItem>
                <MenuItem onClick={handleCloseContentMenu} component="a" href="#groups" sx={{':hover': {bgcolor: 'appbar.hover'}}}>Groups and Pairs</MenuItem>
                <MenuItem onClick={handleCloseContentMenu} component="a" href="#calls" sx={{':hover': {bgcolor: 'appbar.hover'}}}>Calls</MenuItem>
                <MenuItem onClick={handleCloseContentMenu} component="a" href="#yaku" sx={{':hover': {bgcolor: 'appbar.hover'}}}>Yaku</MenuItem>
                <MenuItem onClick={handleCloseContentMenu} component="a" href="#furiten" sx={{':hover': {bgcolor: 'appbar.hover'}}}>Furiten</MenuItem>
              </MenuList>
              </ClickAwayListener>
            </Box>
          </Grow>
        )}
      </Popper>
    </>
  )
}

const ContentList = ({toggleContentList}) => {
  return (
    <Box mt={15.7} sx={{position: 'sticky', top: '80px', width: '250px'}}>
      <List dense>
        <ListItem
          secondaryAction={
            <IconButton
              aria-label="hide list of contents"
              onClick={toggleContentList}
              sx={{
                ':hover': {bgcolor: 'action.hover'},
                mr: '-16px',
                borderRadius: '0px',
                padding: '4px',
              }}
            >
              <ArrowLeftIcon sx={{color: 'text.primary'}}/>
            </IconButton>
          }
        >
          <Typography fontWeight={600} mb={0}>Contents</Typography>
        </ListItem>
        <Divider/>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#top">
          <ListItemText primary="(Top)" primaryTypographyProps={{color: 'text.secondary', fontWeight: 600}}/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#tiles">
          <ListItemText primary="Tiles" primaryTypographyProps={{color: 'text.secondary'}}/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#gameplay">
          <ListItemText primary="Basic Gameplay" primaryTypographyProps={{color: 'text.secondary'}}/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#groups">
          <ListItemText primary="Groups and Pairs" primaryTypographyProps={{color: 'text.secondary'}}/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#calls">
          <ListItemText primary="Calls" primaryTypographyProps={{color: 'text.secondary'}}/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#yaku">
          <ListItemText primary="Yaku" primaryTypographyProps={{color: 'text.secondary'}}/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#furiten">
          <ListItemText primary="Furiten" primaryTypographyProps={{color: 'text.secondary'}}/>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )
}

const PageContent = ({openFullscreenImg}) => {
  return (
    <Container maxWidth='md'>
      <Typography variant="h4" mt={6}>A Beginner's Guide to Riichi Mahjong</Typography>

      <Typography id='tiles' className='anchor' variant="h5" mt={5} mb={0.5}>Tiles</Typography>
      <Divider/>
      <Typography paragraph mt={1.5}>Mahjong is played with tiles that function similar to a deck of cards. <Box component="span" fontWeight='bold'>Number</Box> tiles have values from 1 to 9 and come in three different suits:</Typography>
      <Typography mb={1} mt={3} fontWeight='bold'>Man (Characters):</Typography>
      {Tiles('123456789m')}
      <Typography mb={1} mt={2} fontWeight='bold'>Pin (Dots):</Typography>
      {Tiles('123456789p')}
      <Typography mb={1} mt={2} fontWeight='bold'>Sou (Bamboo):</Typography>
      {Tiles('123456789s')}
      <Typography paragraph mt={4}>There are also <Box component="span" fontWeight='bold'>honor</Box> tiles, of which there are two types:</Typography>
      <Typography mb={1} mt={3} fontWeight='bold'>Wind tiles (East, South, West, North):</Typography>
      {Tiles('E   S   W   N')}
      <Typography mb={1} mt={2} fontWeight='bold'>Dragon tiles (White, Green, Red):</Typography>
      {Tiles('T   G   R')}
      <Typography mt={4} paragraph>There are four identical copies of each tile, for a total of 136 tiles.</Typography>

      <Typography id='gameplay' className='anchor' variant="h5" mb={0.5} mt={4} >Basic Gameplay</Typography>
      <Divider/>
      <Box component="img" src="/screenshots/game_start.gif" onClick={() => {openFullscreenImg("/screenshots/game_start.gif")}} mt={2} sx={{width: "100%", cursor: 'pointer'}}/>
      <Typography paragraph mt={1.5}>A regular game of Mahjong has four players. With a starting hand of 13 tiles, players take turns counter-clockwise around the table. Each turn, the player draws a tile, then discards a tile of their choice from their hand. The first person to collect a "winning" hand of tiles wins points from the other players, based on the rarity of the hand.</Typography>
      
      <Typography id='groups' className='anchor' variant="h5" mb={0.5} mt={4}>Groups and Pairs</Typography>
      <Divider/>
      <Typography paragraph mt={1.5}>A valid winning hand must consist of four <Box component="span" fontWeight='bold'>groups</Box> and one <Box component="span" fontWeight='bold'>pair</Box>. There are two types of groups:</Typography>
      <Typography mb={1} mt={3}><Box component="span" fontWeight='bold'>Triplets:</Box> a group of three duplicate tiles, e.g.:</Typography>
      {Tiles('111p   777m   GGG')}
      <Typography mb={1} mt={3}><Box component="span" fontWeight='bold'>Sequences:</Box> a group of three consecutively numbered tiles of the same suit, e.g.:</Typography>
      {Tiles('123s   789p   234m')}
      <Typography mb={1} mt={3}>Sequences cannot be made from honor tiles, and cannot wrap around from 9 to 1.</Typography>
      <Typography mb={1} mt={4}>A <Box component="span" fontWeight='bold'>pair</Box> is any two duplicate tiles, e.g.:</Typography>
      {Tiles('22m     TT     NN')}
      <Typography mb={1} mt={4}>Here is an example of a winning hand (containing four groups and one pair):</Typography>
      <Box display="flex" justifyContent="center" alignItems="center" sx={{border: 1, borderColor: "divider", padding: "2%", borderRadius: "10px"}}>
        {Tiles('234m678p11456sGG G', ScreenSize())}
      </Box>
      <Typography mt={2}>The winning tile is displayed seperate from the rest. This is because a full hand consists of only 13 tiles, but 14 tiles are needed to win.</Typography>
      
      <Typography id='calls' className='anchor' variant="h5" mb={0.5} mt={4}>Calls</Typography>
      <Divider/>
      <Typography paragraph mt={1}>Whenever a player discards a tile, you may be able to <Box component="span" fontWeight='bold'>call</Box> it for yourself. This can only be done if you can use the tile to complete a group.</Typography>
      <Box component="img" src="/screenshots/pon.gif" onClick={() => {openFullscreenImg("/screenshots/pon.gif")}}  sx={{width: "100%", cursor: 'pointer'}}/>
      <Typography paragraph mt={1}>The completed group is placed face up on the table, and your hand is now considered <Box component="span" fontWeight='bold'>open</Box>. The called tile is turned on its side and positioned according to the player it was taken from.</Typography>
      <Typography paragraph>There are two basic calls:</Typography>
      <Typography mb={1}><Box component="span" fontWeight='bold'>1. Pon:</Box> Take the discarded tile to complete a triplet, e.g.:</Typography>
      {Tiles('999-m   EE-E')}
      <Typography mb={1} mt={3}><Box component="span" fontWeight='bold'>2. Chii:</Box> Take the discarded tile to complete a sequence, e.g.:</Typography>
      {Tiles('4-56p   4-23s')}
      <Typography paragraph mt={3}>Chii can only be called on the discards of the player to your left.</Typography>
      <Typography paragraph mt={4}>When you are one tile away from winning, you are in <Box component="span" fontWeight='bold'>tenpai</Box>, and your hand is considered <Box component="span" fontWeight='bold'>ready</Box>. Having reached tenpai, you may call to win when another player discards the last tile you need, or when you draw the tile yourself. The winning calls are:</Typography>
      <Typography paragraph><Box component="span" fontWeight='bold'>1. Tsumo:</Box> Win using your own drawn tile. Points are collected from all other players, split evenly between them.</Typography>
      <Typography paragraph><Box component="span" fontWeight='bold'>2. Ron:</Box> Win using a player's discarded tile. Points are collected from that player alone.</Typography>

      <Typography id='yaku' className='anchor' variant="h5" mb={0.5} mt={4}>Yaku</Typography>
      <Divider/>
      <Typography paragraph mt={1.5}>There is one final condition for a winning hand to be valid: it must meet the requirements of at least one <Box component="span" fontWeight='bold'>yaku</Box>. Yaku are specific combinations of tiles or special conditions that make a hand more rare and valuable. There are more than 40 yaku in total, but don't worry — to succeed as a beginner, you only need to remember three of them:</Typography>
      <Typography paragraph><Box component="span" fontWeight='bold'>1. Riichi</Box></Typography>
      <Typography paragraph>If you are in tenpai and your hand is closed, you may declare <Box component="span" fontWeight='bold'>riichi</Box>. Declaring riichi requires a fixed bet of 1000 points and locks your hand in its current state (you may not exchange any of the 13 tiles in your hand). Winning having declared riichi earns you one yaku.</Typography>
      <Box component="img" src="/screenshots/riichi.gif" onClick={() => {openFullscreenImg("/screenshots/riichi.gif")}} sx={{width: "100%", cursor: 'pointer'}}/>
      <Typography paragraph mt={1}>As long as you have not made any calls during the round, you will always have this one yaku available to you. Call a tile, and you must find a yaku elsewhere.</Typography>
      <Typography paragraph><Box component="span" fontWeight='bold'>2. Yakuhai (Honors)</Box></Typography>
      <Typography paragraph> Each round in a game of Mahjong has a designated <Box component="span" fontWeight='bold'>prevailing wind</Box>. Similarly, each player has their own designated <Box component="span" fontWeight='bold'>seat wind</Box>.</Typography>
      <Box component="img" src="/screenshots/winds.jpg" onClick={() => {openFullscreenImg("/screenshots/winds.jpg")}} sx={{width: "100%", cursor: 'pointer'}}/>
      <Typography paragraph mt={1}>If your hand contains a triplet of the prevailing wind tile, a triplet of your seat wind tile, or a triplet of <Box component="span" sx={{ fontStyle: 'italic' }}>any</Box> dragon tile, your hand gains one yaku.</Typography>
      <Typography mb={1} mt={2}>Example hand:</Typography>
      <Box display="flex" justifyContent="center" alignItems="center" sx={{border: 1, borderColor: "divider", padding: "2%", borderRadius: "10px"}}>
        {Tiles('123m234789p66sRR R', ScreenSize())}
      </Box>
      <Typography paragraph mt={2}><Box component="span" fontWeight='bold'>3. Tanyao (All Simples)</Box></Typography>
      <Typography paragraph>If your hand contains no <Box component="span" fontWeight='bold'>terminals</Box> (tiles numbered either 1 or 9) and no honor tiles, your hand gains one yaku.</Typography>
      <Typography mb={1} mt={2}>Example hand:</Typography>
      <Box display="flex" justifyContent="center" alignItems="center" sx={{border: 1, borderColor: "divider", padding: "2%", borderRadius: "10px"}}>
        {Tiles('234m222678p5678 5s', ScreenSize())}
      </Box>

      <Typography id='furiten' className='anchor' variant="h5" mb={0.5} mt={4}>Furiten</Typography>
      <Divider/>
      <Typography paragraph mt={1.5}>After reaching tenpai, the tiles you can use to win are called your <Box component="span" fontWeight='bold'>waits</Box>.</Typography>
      <Typography paragraph>For example, this hand is waiting on either a 3 pin or 6 pin to complete its final group:</Typography>
      <Box display="flex" justifyContent="center" alignItems="center" sx={{border: 1, borderColor: "divider", padding: "2%", borderRadius: "10px"}}>
        {Tiles('999m45p234567sNN', ScreenSize())}
      </Box>
      <Typography paragraph mt={2}>Be careful — if any of your waits are a tile you have previously discarded, you are in <Box component="span" fontWeight='bold'>furiten</Box>. This means that you are prohibited from winning using another player's discard. In the above example, if the player previously discarded either a 3 pin or a 6 pin, they would be in furiten. At this point, they could either hope that they draw the winning tile themselves, or modify their hand for a different wait (for example, discarding either the 4 pin or 5 pin for a third north wind tile).</Typography>
      <Typography paragraph>Furiten was originally added to the game to prevent player targeting, but it is also a key component in defensive strategy. To avoid dealing into another player, look at their discard pile — all of those tiles are guaranteed to be safe to discard because of the furiten rule.</Typography>
    </Container>
  )
}

const HowToPlayPage = () => {
  const [contentListIsOpen, setContentListIsOpen] = useState(true);
  const toggleContentList = () => {setContentListIsOpen((prev) => !prev)}

  const [imgFullscreen, setImgFullscreen] = useState('');
  const openImg = (src) => {setImgFullscreen(src)}
  const closeImg = () => {setImgFullscreen('')};

  return (
    <>
      <Dialog open={imgFullscreen} onClose={closeImg} maxWidth='xl' PaperComponent={Box} PaperProps={{sx: {margin: '0px', maxHeight: '100vh'}}}>
        <Box component="img" src={imgFullscreen} sx={{maxWidth: '100%', maxHeight: '100vh'}}/>
        <Box sx={{position: 'absolute', top: '0px', width: "100%"}}>
          <IconButton
            aria-label="close fullscreen image"
            onClick={closeImg}
            sx = {{position: 'absolute', top: '10px', right: '10px', color: '#f2f3fa', ':hover': {bgcolor: 'action.hover'}, borderRadius: '4px', padding: '4px'}}
          >
            <CloseIcon fontSize='large'/>
          </IconButton>
        </Box>
      </Dialog>
      {(ScreenSize() < 3 || !contentListIsOpen) &&
        <ContentMenu toggleContentList={toggleContentList}/>
      }
      <Container maxWidth='xl' id='top' className='anchor'>
        {(ScreenSize() >= 3 && contentListIsOpen) ?
          <Grid container spacing={4} wrap="nowrap" disableEqualOverflow>
            <Grid xs="auto" display={contentListIsOpen ? {xs: 'none', lg: 'block'} : 'none'}>
              <ContentList toggleContentList={toggleContentList}/>
            </Grid>
            <Grid>
              <PageContent openFullscreenImg={openImg}/>
            </Grid>
          </Grid>
          :
          <PageContent openFullscreenImg={openImg}/>
        }   
      </Container>
    </>
  )
};
  
export default HowToPlayPage;