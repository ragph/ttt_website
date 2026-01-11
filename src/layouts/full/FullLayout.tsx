import { useState } from 'react';
import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const FullLayout = () => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          width: { xs: '100%', lg: 'calc(100% - 270px)' },
          marginLeft: { xs: 0, lg: '270px' },
        }}
      >
        {/* Header */}
        <Header toggleMobileSidebar={toggleMobileSidebar} />

        {/* Page Content */}
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: 'background.default',
            px: 3,
            py: 3,
          }}
        >
          <Container maxWidth={false} disableGutters>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default FullLayout;
