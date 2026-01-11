import { Card, CardContent, Typography, Box, Avatar, TextField, Button, Divider, Grid } from '@mui/material';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { updateUser } from '../../../features/auth/authSlice';
import { getInitials } from '../../../utils/helpers';

const Profile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateUser(formData));
    alert('Profile updated successfully!');
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        My Profile
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Info Card */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  mx: 'auto',
                  mb: 2,
                  bgcolor: 'primary.main',
                  fontSize: '3rem',
                }}
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  getInitials(user?.name || 'U')
                )}
              </Avatar>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
                {user?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {user?.role}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.email}
              </Typography>
              <Button variant="outlined" sx={{ mt: 3 }}>
                Change Avatar
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Edit Profile Form */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Edit Profile
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Divider sx={{ my: 2 }} />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      Change Password
                    </Typography>
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Current Password"
                      type="password"
                      name="currentPassword"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="New Password"
                      type="password"
                      name="newPassword"
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Confirm New Password"
                      type="password"
                      name="confirmPassword"
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                      <Button variant="outlined" size="large">
                        Cancel
                      </Button>
                      <Button variant="contained" size="large" type="submit">
                        Save Changes
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
