import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { CandidateOption } from '../../../../api/surveyApi';

interface CandidateModalProps {
  candidate: CandidateOption | null;
  open: boolean;
  onClose: () => void;
  onVote?: (candidateText: string) => void;
}

const CandidateModal = ({ candidate, open, onClose, onVote }: CandidateModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Reset image index when candidate changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [candidate]);

  if (!candidate) return null;

  // Support both imageUrls array and single imageUrl
  const images = candidate.imageUrls || (candidate.imageUrl ? [candidate.imageUrl] : []);

  console.log('Candidate:', candidate.text);
  console.log('Images:', images);
  console.log('Current index:', currentImageIndex);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleVote = () => {
    if (onVote) {
      onVote(candidate.text);
    }
    onClose();
  };

  const handleClose = () => {
    setCurrentImageIndex(0);
    onClose();
  };

  // Touch event handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50; // Minimum swipe distance in pixels

    if (distance > minSwipeDistance) {
      // Swiped left - next image
      handleNextImage();
    } else if (distance < -minSwipeDistance) {
      // Swiped right - previous image
      handlePrevImage();
    }

    // Reset touch values
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={handleClose}
        size='small'
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          zIndex: 1,
          color: 'white',
          bgcolor: 'rgba(255, 255, 255, 0.1)',
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.5)',
          },
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ p: 0 }}>
        {/* Image Slider */}
        {images.length > 0 && (
          <Box
            sx={{ position: 'relative', bgcolor: 'black' }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Box
              component="img"
              src={images[currentImageIndex] || images[0]}
              alt={`${candidate.text} - Image ${currentImageIndex + 1}`}
              onError={(e: any) => {
                console.error('Image failed to load:', images[currentImageIndex]);
                e.target.style.display = 'none';
              }}
              sx={{
                width: '100%',
                height: '100%',
                maxHeight: 500,
                objectFit: 'contain',
                display: 'block',
                userSelect: 'none',
                WebkitUserSelect: 'none',
              }}
            />

          {/* Image Navigation */}
          {images.length > 1 && (
            <>
              <IconButton
                onClick={handlePrevImage}
                sx={{
                  position: 'absolute',
                  left: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'rgba(255, 255, 255, 0.8)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
              <IconButton
                onClick={handleNextImage}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'rgba(255, 255, 255, 0.8)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>

              {/* Image Indicator Dots */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: 1,
                }}
              >
                {images.map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: index === currentImageIndex ? 'white' : 'rgba(255, 255, 255, 0.5)',
                      cursor: 'pointer',
                    }}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </Box>
            </>
          )}
          </Box>
        )}

        {/* Candidate Details */}
        <Box sx={{ p: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            {candidate.text}
          </Typography>

          {candidate.description && (
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, whiteSpace: 'pre-line' }}>
              {candidate.description}
            </Typography>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button href="https://app.earningwhiletravelling.com/login" variant="contained" size="large" fullWidth>
          Vote Now
        </Button>
        {/* <Button href="https://app.earningwhiletravelling.com/login" variant="contained" size="large" fullWidth>
          Vote for {candidate.text}
        </Button> */}
      </DialogActions>
    </Dialog>
  );
};

export default CandidateModal;
