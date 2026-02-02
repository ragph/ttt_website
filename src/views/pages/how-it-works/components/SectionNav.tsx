import { useState, useEffect } from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PaymentsIcon from '@mui/icons-material/Payments';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import type { Section } from '../data/howItWorksSteps';

const sectionIcons: Record<string, typeof AccountBalanceWalletIcon> = {
  topup: AccountBalanceWalletIcon,
  payout: PaymentsIcon,
  convert: CurrencyExchangeIcon,
};

const sectionColors: Record<string, string> = {
  topup: '#1e40af',
  payout: '#059669',
  convert: '#7c3aed',
};

interface SectionNavProps {
  sections: Section[];
  activeSection: string;
}

export const SectionNav = ({ sections, activeSection }: SectionNavProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past hero (approximately 400px)
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  const activeIndex = sections.findIndex((s) => s.id === activeSection);

  return (
    <Box
      sx={{
        position: 'fixed',
        right: { xs: 16, md: 24, lg: 40 },
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1100,
        // opacity: isVisible ? 1 : 0,
        // pointerEvents: isVisible ? 'auto' : 'none',
        transition: 'opacity 0.3s ease',
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0,
      }}
    >
      {/* Progress Line Background */}
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: 24,
          bottom: 24,
          width: 2,
          bgcolor: 'divider',
          transform: 'translateX(-50%)',
          borderRadius: 1,
        }}
      />

      {/* Progress Line Fill */}
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: 24,
          width: 2,
          bgcolor: sectionColors[activeSection] || 'primary.main',
          transform: 'translateX(-50%)',
          borderRadius: 1,
          height: `${(activeIndex / (sections.length - 1)) * (100 - 48 / sections.length)}%`,
          transition: 'height 0.4s ease, background-color 0.3s ease',
        }}
      />

      {sections.map((section, index) => {
        const isActive = activeSection === section.id;
        const isPast = index < activeIndex;
        const Icon = sectionIcons[section.id] || AccountBalanceWalletIcon;
        const color = sectionColors[section.id] || '#1e40af';

        return (
          <Tooltip
            key={section.id}
            title={section.title}
            placement="left"
            arrow
          >
            <Box
              onClick={() => scrollToSection(section.id)}
              sx={{
                position: 'relative',
                cursor: 'pointer',
                p: 1,
                my: 1.5,
                zIndex: 1,
              }}
            >
              {/* Node Circle */}
              <Box
                sx={{
                  width: isActive ? 48 : 40,
                  height: isActive ? 48 : 40,
                  borderRadius: '50%',
                  bgcolor: isActive || isPast ? color : 'background.paper',
                  border: '2px solid',
                  borderColor: isActive || isPast ? color : 'divider',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isActive
                    ? `0 4px 20px ${color}40`
                    : '0 2px 8px rgba(0,0,0,0.08)',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    boxShadow: `0 6px 24px ${color}50`,
                    borderColor: color,
                    bgcolor: isActive || isPast ? color : `${color}15`,
                  },
                }}
              >
                <Icon
                  sx={{
                    fontSize: isActive ? 22 : 18,
                    color: isActive || isPast ? 'white' : color,
                    transition: 'all 0.3s ease',
                  }}
                />
              </Box>

              {/* Active Indicator Ring */}
              {isActive && (
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    border: '2px solid',
                    borderColor: color,
                    opacity: 0.3,
                    animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
                    '@keyframes ping': {
                      '75%, 100%': {
                        transform: 'scale(1.4)',
                        opacity: 0,
                      },
                    },
                  }}
                />
              )}
            </Box>
          </Tooltip>
        );
      })}

      {/* Section Label */}
      <Box
        sx={{
          mt: 3,
          px: 1.5,
          py: 0.75,
          borderRadius: 2,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          maxWidth: 80,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontWeight: 600,
            color: sectionColors[activeSection] || 'text.primary',
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            display: 'block',
            lineHeight: 1.2,
          }}
        >
          {sections.find((s) => s.id === activeSection)?.title.replace('How to ', '') || ''}
        </Typography>
      </Box>
    </Box>
  );
};
