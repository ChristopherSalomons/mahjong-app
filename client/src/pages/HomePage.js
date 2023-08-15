import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const HomePage = () => {
  return (
    <Container maxWidth="md">
      <Box mt={6} />
      {/* <Typography component="span" variant="h5" mt={6}>Riichi Mahjong</Typography> */}
      <Typography variant="h6" mt={8} mb={1}>Weclome to the world of riichi mahjong!</Typography>
      <Typography paragraph>This site is intended to be a guide for those who are brand new to the game, as well as a helpful resource for players of all skill levels.</Typography>
      <Typography mt={4} mb={1} fontWeight='bold'>What is riichi mahjong?</Typography>
      <Typography paragraph>Riichi mahjong is a Japanese variation of the classic Chinese game of mahjong. It features a unique set of rules that encourages defensive play and adds strategic depth to the game. Riichi mahjong is widely popular in Japan and has grown internationally, being featured in video games, anime, manga, and online platforms.</Typography>
      <Typography mt={4} mb={1} fontWeight='bold'>Where can I play riichi mahjong?</Typography>
      <Typography paragraph>There are many options for playing riichi mahjong online, two of the most popular platforms being <Box component="span" sx={{ fontStyle: 'italic' }}>Mahjong Soul</Box> and <Box component="span" sx={{ fontStyle: 'italic' }}>tenhou.net</Box>. Mahjong Soul is beginner friendly and features an anime aesthetic, while tenhou.net is a traditional japanese website with a large, dedicated playerbase.</Typography>
    </Container>
  )
};
  
export default HomePage;