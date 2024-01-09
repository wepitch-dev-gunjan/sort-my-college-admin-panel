import Grid from '@mui/material/Unstable_Grid2'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import './style.scss';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const MuiCounsellorProfile = () => {
  return (
    <div className='MuiCounsellorProfile-container'>
      <Container maxWidth='md'>
        <Grid container spacing={2}>
          <Grid item xs={4} >
            <Item>
              
            </Item>
          </Grid>
          <Grid item xs={8} >
            <Item>xs=4</Item>
          </Grid>
          <Grid item xs={4} >
            <Item>xs=4</Item>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default MuiCounsellorProfile;