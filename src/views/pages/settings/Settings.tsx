import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Switch,
  FormControlLabel,
  Divider,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { toggleTheme } from '../../../features/theme/themeSlice';

const Settings = () => {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.theme.mode);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    monthlyReports: false,
    language: 'en',
    timezone: 'UTC',
  });

  const handleSwitchChange = (name: string) => {
    setSettings({
      ...settings,
      [name]: !settings[name as keyof typeof settings],
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setSettings({
      ...settings,
      [name]: value,
    });
  };

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Settings
      </Typography>

      <Grid container spacing={3}>
        {/* Appearance Settings */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Appearance
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={themeMode === 'dark'}
                    onChange={() => dispatch(toggleTheme())}
                  />
                }
                label="Dark Mode"
              />

              <Divider sx={{ my: 2 }} />

              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Language</InputLabel>
                <Select
                  value={settings.language}
                  label="Language"
                  onChange={(e) => handleSelectChange('language', e.target.value)}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="es">Spanish</MenuItem>
                  <MenuItem value="fr">French</MenuItem>
                  <MenuItem value="de">German</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Timezone</InputLabel>
                <Select
                  value={settings.timezone}
                  label="Timezone"
                  onChange={(e) => handleSelectChange('timezone', e.target.value)}
                >
                  <MenuItem value="UTC">UTC</MenuItem>
                  <MenuItem value="EST">EST</MenuItem>
                  <MenuItem value="PST">PST</MenuItem>
                  <MenuItem value="CST">CST</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        {/* Notification Settings */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Notifications
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.emailNotifications}
                      onChange={() => handleSwitchChange('emailNotifications')}
                    />
                  }
                  label="Email Notifications"
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.pushNotifications}
                      onChange={() => handleSwitchChange('pushNotifications')}
                    />
                  }
                  label="Push Notifications"
                />

                <Divider />

                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.weeklyReports}
                      onChange={() => handleSwitchChange('weeklyReports')}
                    />
                  }
                  label="Weekly Reports"
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.monthlyReports}
                      onChange={() => handleSwitchChange('monthlyReports')}
                    />
                  }
                  label="Monthly Reports"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Security Settings */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Security
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Button variant="outlined" fullWidth>
                    Change Password
                  </Button>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Button variant="outlined" fullWidth>
                    Two-Factor Authentication
                  </Button>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Button variant="outlined" fullWidth>
                    Active Sessions
                  </Button>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Button variant="outlined" fullWidth color="error">
                    Delete Account
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Save Button */}
        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" size="large">
              Cancel
            </Button>
            <Button variant="contained" size="large" onClick={handleSave}>
              Save Changes
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
