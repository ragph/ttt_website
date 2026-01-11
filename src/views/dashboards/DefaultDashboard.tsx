import { Card, CardContent, Typography, Box, Paper, Grid } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useAppSelector } from '../../app/hooks';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactElement;
  color: string;
  trend?: string;
}

const StatCard = ({ title, value, icon, color, trend }: StatCardProps) => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {title}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
            {value}
          </Typography>
          {trend && (
            <Typography variant="caption" color="success.main" sx={{ display: 'flex', alignItems: 'center' }}>
              <TrendingUpIcon sx={{ fontSize: 16, mr: 0.5 }} />
              {trend}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            bgcolor: color,
            borderRadius: '12px',
            p: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const DefaultDashboard = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
        Welcome back, {user?.name}! 👋
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Here's what's happening with your projects today
      </Typography>

      <Grid container spacing={3}>
        {/* Stat Cards */}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Total Users"
            value="2,456"
            icon={<PeopleIcon sx={{ color: 'white', fontSize: 28 }} />}
            color="primary.main"
            trend="+12.5% from last month"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Revenue"
            value="$45,890"
            icon={<AttachMoneyIcon sx={{ color: 'white', fontSize: 28 }} />}
            color="success.main"
            trend="+8.3% from last month"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Orders"
            value="1,234"
            icon={<ShoppingCartIcon sx={{ color: 'white', fontSize: 28 }} />}
            color="warning.main"
            trend="+5.2% from last month"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Growth"
            value="23.5%"
            icon={<TrendingUpIcon sx={{ color: 'white', fontSize: 28 }} />}
            color="info.main"
            trend="+2.1% from last month"
          />
        </Grid>

        {/* Recent Activity */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Recent Activity
              </Typography>
              <Box>
                {[
                  { title: 'New user registration', time: '2 minutes ago', color: 'primary.main' },
                  { title: 'Order #1234 completed', time: '15 minutes ago', color: 'success.main' },
                  { title: 'Payment received', time: '1 hour ago', color: 'info.main' },
                  { title: 'New comment on post', time: '2 hours ago', color: 'warning.main' },
                ].map((activity, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      py: 2,
                      borderBottom: index < 3 ? 1 : 0,
                      borderColor: 'divider',
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: activity.color,
                        mr: 2,
                      }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {activity.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {activity.time}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Stats */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Quick Stats
              </Typography>
              <Box>
                {[
                  { label: 'Conversion Rate', value: '3.24%', color: 'success.main' },
                  { label: 'Avg. Order Value', value: '$142.50', color: 'primary.main' },
                  { label: 'Customer Satisfaction', value: '98%', color: 'info.main' },
                  { label: 'Return Rate', value: '2.1%', color: 'error.main' },
                ].map((stat, index) => (
                  <Box
                    key={index}
                    sx={{
                      py: 1.5,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: stat.color }}>
                      {stat.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DefaultDashboard;
