import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { Box, Button, Card, Typography } from '@mui/material';

// Export theme
export * from './theme';

// Keyframes for animations
export const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

export const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.01);
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Common styled components
export const GradientText = styled(Typography)`
  background: linear-gradient(45deg, #1DB954 30%, #1ed760 90%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const GradientButton = styled(Button)`
  background: linear-gradient(45deg, #1DB954 30%, #1ed760 90%);
  border-radius: 30px;
  padding: 12px 24px;
  font-weight: 600;
  text-transform: none;
  box-shadow: 0 4px 12px rgba(29, 185, 84, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(29, 185, 84, 0.4);
    background: linear-gradient(45deg, #1ed760 30%, #1DB954 90%);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:focus {
    outline: 2px solid #1DB954;
    outline-offset: 2px;
  }
`;

export const GlassCard = styled(Card)`
  background: linear-gradient(135deg, rgba(29, 185, 84, 0.1) 0%, rgba(25, 20, 20, 0.1) 100%);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const SectionHeader = styled(Box)`
  margin-bottom: 32px;
  text-align: center;
`;

export const SectionTitle = styled(Typography)`
  background: linear-gradient(135deg, #1DB954 0%, #1ed760 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 16px;
  font-weight: 800;
`;

export const SectionSubtitle = styled(Typography)`
  color: #b3b3b3;
`;

export const StatCard = styled(Card)`
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 16px 32px rgba(0,0,0,0.2);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #1DB954 0%, #1ed760 100%);
  }
`;

export const StatCardContent = styled(Box)`
  padding: 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const StatNumber = styled(Typography)`
  font-weight: 800;
  font-size: 2.5rem;
  margin-bottom: 8px;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StatLabel = styled(Typography)`
  opacity: 0.9;
  font-weight: 500;
  text-align: center;
`;