// Button styled component
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

// Keyframes for animations
const buttonClick = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
`;

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'icon';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  pulse?: boolean;
}

const Button = styled.button<ButtonProps>`
  // Base styles
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  cursor: pointer;
  font-family: inherit;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  
  // Size variants
  ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          padding: 6px 12px;
          font-size: 12px;
          border-radius: 4px;
          min-height: 32px;
        `;
      case 'large':
        return css`
          padding: 12px 24px;
          font-size: 16px;
          border-radius: 8px;
          min-height: 48px;
        `;
      case 'medium':
      default:
        return css`
          padding: 8px 16px;
          font-size: 14px;
          border-radius: 6px;
          min-height: 40px;
        `;
    }
  }}
  
  // Full width option
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
  
  // Variant styles
  ${({ variant }) => {
    switch (variant) {
      case 'secondary':
        return css`
          background-color: #282828;
          color: #ffffff;
          
          &:hover:not(:disabled) {
            background-color: #3e3e3e;
            transform: translateY(-2px);
          }
          
          &:active:not(:disabled) {
            animation: ${buttonClick} 0.2s ease-in-out;
          }
        `;
      case 'outline':
        return css`
          background-color: transparent;
          color: #1db954;
          border: 1px solid #1db954;
          
          &:hover:not(:disabled) {
            background-color: rgba(29, 185, 84, 0.1);
            transform: translateY(-2px);
          }
          
          &:active:not(:disabled) {
            animation: ${buttonClick} 0.2s ease-in-out;
          }
        `;
      case 'ghost':
        return css`
          background-color: transparent;
          color: #b3b3b3;
          
          &:hover:not(:disabled) {
            color: #ffffff;
            background-color: rgba(255, 255, 255, 0.1);
          }
          
          &:active:not(:disabled) {
            animation: ${buttonClick} 0.2s ease-in-out;
          }
        `;
      case 'icon':
        return css`
          background-color: transparent;
          color: #b3b3b3;
          padding: 8px;
          min-height: auto;
          border-radius: 50%;
          
          &:hover:not(:disabled) {
            color: #ffffff;
            background-color: rgba(255, 255, 255, 0.1);
          }
          
          &:active:not(:disabled) {
            animation: ${buttonClick} 0.2s ease-in-out;
          }
        `;
      case 'primary':
      default:
        return css`
          background-color: #1db954;
          color: #ffffff;
          
          &:hover:not(:disabled) {
            background-color: #1ed760;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(29, 185, 84, 0.3);
          }
          
          &:active:not(:disabled) {
            animation: ${buttonClick} 0.2s ease-in-out;
          }
        `;
    }
  }}
  
  // Pulse animation
  ${({ pulse }) =>
    pulse &&
    css`
      animation: ${pulse} 2s infinite;
    `}
  
  // Disabled state
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  // Focus state
  &:focus {
    outline: 2px solid #1db954;
    outline-offset: 2px;
  }
  
  // Icon spacing
  & > svg {
    margin-right: 8px;
  }
  
  // Icon-only button
  ${({ variant }) =>
    variant === 'icon' &&
    css`
      & > svg {
        margin-right: 0;
      }
    `}
`;

export default Button;