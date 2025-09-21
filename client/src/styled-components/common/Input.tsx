// Input styled component
import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface InputProps {
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  error?: boolean;
}

const Input = styled.input<InputProps>`
  // Base styles
  font-family: inherit;
  border: none;
  outline: none;
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  width: 100%;
  transition: all 0.2s ease-in-out;
  
  // Placeholder styling
  &::placeholder {
    color: #b3b3b3;
  }
  
  // Size variants
  ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          padding: 8px 12px;
          font-size: 14px;
          border-radius: 4px;
          min-height: 36px;
        `;
      case 'large':
        return css`
          padding: 16px 20px;
          font-size: 16px;
          border-radius: 8px;
          min-height: 56px;
        `;
      case 'medium':
      default:
        return css`
          padding: 12px 16px;
          font-size: 15px;
          border-radius: 6px;
          min-height: 48px;
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
  ${({ variant, error }) => {
    switch (variant) {
      case 'filled':
        return css`
          background-color: rgba(255, 255, 255, 0.1);
          
          &:focus {
            background-color: rgba(255, 255, 255, 0.2);
          }
        `;
      case 'outlined':
        return css`
          background-color: transparent;
          border: 1px solid ${error ? '#f44336' : 'rgba(255, 255, 255, 0.3)'};
          
          &:focus {
            border-color: ${error ? '#f44336' : '#1db954'};
          }
        `;
      case 'default':
      default:
        return css`
          background-color: #282828;
          
          &:focus {
            background-color: #3e3e3e;
          }
        `;
    }
  }}
  
  // Error state
  ${({ error }) =>
    error &&
    css`
      border-color: #f44336;
      box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.2);
    `}
  
  // Focus state
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(29, 185, 84, 0.3);
  }
  
  // Disabled state
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default Input;