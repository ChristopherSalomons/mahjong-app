import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const MissingPage = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h5" mt={5}>404 Page Not Found</Typography>
      <Typography mt={3}>This page doesn't exist. Sorry!</Typography>
    </Container>
    
  )
};
  
export default MissingPage;