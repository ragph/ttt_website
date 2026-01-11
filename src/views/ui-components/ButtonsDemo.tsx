import { Card, CardContent, Typography, Box, Button, Divider, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import SaveIcon from '@mui/icons-material/Save';

const ButtonsDemo = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Buttons
      </Typography>

      <Grid container spacing={3}>
        {/* Contained Buttons */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Contained Buttons
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Button variant="contained">Default</Button>
                <Button variant="contained" color="primary">
                  Primary
                </Button>
                <Button variant="contained" color="secondary">
                  Secondary
                </Button>
                <Button variant="contained" color="success">
                  Success
                </Button>
                <Button variant="contained" color="error">
                  Error
                </Button>
                <Button variant="contained" color="warning">
                  Warning
                </Button>
                <Button variant="contained" color="info">
                  Info
                </Button>
                <Button variant="contained" disabled>
                  Disabled
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Outlined Buttons */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Outlined Buttons
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Button variant="outlined">Default</Button>
                <Button variant="outlined" color="primary">
                  Primary
                </Button>
                <Button variant="outlined" color="secondary">
                  Secondary
                </Button>
                <Button variant="outlined" color="success">
                  Success
                </Button>
                <Button variant="outlined" color="error">
                  Error
                </Button>
                <Button variant="outlined" color="warning">
                  Warning
                </Button>
                <Button variant="outlined" color="info">
                  Info
                </Button>
                <Button variant="outlined" disabled>
                  Disabled
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Text Buttons */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Text Buttons
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Button>Default</Button>
                <Button color="primary">Primary</Button>
                <Button color="secondary">Secondary</Button>
                <Button color="success">Success</Button>
                <Button color="error">Error</Button>
                <Button color="warning">Warning</Button>
                <Button color="info">Info</Button>
                <Button disabled>Disabled</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Buttons with Icons */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Buttons with Icons
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Button variant="contained" startIcon={<AddIcon />}>
                  Add Item
                </Button>
                <Button variant="contained" color="error" startIcon={<DeleteIcon />}>
                  Delete
                </Button>
                <Button variant="contained" color="success" endIcon={<SendIcon />}>
                  Send
                </Button>
                <Button variant="outlined" startIcon={<SaveIcon />}>
                  Save
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Button Sizes */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Button Sizes
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Button variant="contained" size="small">
                  Small
                </Button>
                <Button variant="contained" size="medium">
                  Medium
                </Button>
                <Button variant="contained" size="large">
                  Large
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ButtonsDemo;
