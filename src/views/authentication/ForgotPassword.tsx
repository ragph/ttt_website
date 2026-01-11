import { useState, FormEvent } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { forgotPassword } from '../../features/auth/authThunks';
import { ROUTES } from '../../utils/constants';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await dispatch(forgotPassword({ email }));
      if (forgotPassword.fulfilled.match(result)) {
        setSuccess(true);
      } else {
        setError('Failed to send reset link. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 450, px: 2 }}>
      <Card elevation={3}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Forgot Password
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Enter your email to receive a password reset link
            </Typography>
          </Box>

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Password reset link has been sent to your email!
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 3 }}
              autoComplete="email"
              disabled={success}
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              disabled={loading || success}
              sx={{ mb: 2 }}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Remember your password?{' '}
                <Link
                  component="button"
                  type="button"
                  variant="body2"
                  onClick={() => navigate(ROUTES.LOGIN)}
                  sx={{ textDecoration: 'none', fontWeight: 600 }}
                >
                  Sign In
                </Link>
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 3, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Demo: This will simulate sending a reset link
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ForgotPassword;
