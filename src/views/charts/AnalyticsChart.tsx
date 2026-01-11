import { Card, CardContent, Typography, Box, Grid } from '@mui/material';

const AnalyticsChart = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Revenue Overview
              </Typography>
              <Box
                sx={{
                  height: 300,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'background.default',
                  borderRadius: 2,
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  Chart placeholder - Integrate with Chart.js or Recharts
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                User Growth
              </Typography>
              <Box
                sx={{
                  height: 250,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'background.default',
                  borderRadius: 2,
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  Line Chart Placeholder
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Traffic Sources
              </Typography>
              <Box
                sx={{
                  height: 250,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'background.default',
                  borderRadius: 2,
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  Pie Chart Placeholder
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsChart;
