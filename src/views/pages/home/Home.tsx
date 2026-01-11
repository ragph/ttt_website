import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../utils/constants';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 2, fontWeight: 700, textAlign: 'center' }}>
        Welcome to the Application
      </Typography>
      <Typography variant="h6" sx={{ mb: 4, textAlign: 'center', color: 'text.secondary' }}>
        Choose where you'd like to go
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            sx={{
              height: '100%',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4,
              }
            }}
            onClick={() => navigate(ROUTES.DASHBOARD)}
          >
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                View your analytics and insights
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            sx={{
              height: '100%',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4,
              }
            }}
            onClick={() => navigate(ROUTES.PROFILE)}
          >
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Profile
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage your profile information
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            sx={{
              height: '100%',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4,
              }
            }}
            onClick={() => navigate(ROUTES.SETTINGS)}
          >
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Settings
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Customize your preferences
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            sx={{
              height: '100%',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4,
              }
            }}
            onClick={() => navigate(ROUTES.USERS_TABLE)}
          >
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Users
              </Typography>
              <Typography variant="body2" color="text.secondary">
                View and manage users
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            sx={{
              height: '100%',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4,
              }
            }}
            onClick={() => navigate(ROUTES.ANALYTICS)}
          >
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Analytics
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Track your analytics data
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            sx={{
              height: '100%',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4,
              }
            }}
            onClick={() => navigate(ROUTES.UI_BUTTONS)}
          >
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                UI Components
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Explore UI component demos
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button variant="contained" size="large" onClick={() => navigate(ROUTES.DASHBOARD)}>
          Go to Dashboard
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
