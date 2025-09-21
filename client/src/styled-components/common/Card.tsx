// Card styled component
import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined';
  hoverable?: boolean;
  padding?: 'none' | 'small' | 'medium' | 'large';
}

const Card = styled.div<CardProps>`
  // Base styles
  background-color: #181818;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  
  // Padding variants
  ${({ padding }) => {
    switch (padding) {
      case 'none':
        return css`
          padding: 0;
        `;
      case 'small':
        return css`
          padding: 12px;
        `;
      case 'large':
        return css`
          padding: 24px;
        `;
      case 'medium':
      default:
        return css`
          padding: 16px;
        `;
    }
  }}
  
  // Variant styles
  ${({ variant }) => {
    switch (variant) {
      case 'elevated':
        return css`
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
        `;
      case 'outlined':
        return css`
          background-color: transparent;
          border: 1px solid rgba(255, 255, 255, 0.1);
        `;
      case 'default':
      default:
        return css`
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        `;
    }
  }}
  
  // Hover effect
  ${({ hoverable }) =>
    hoverable &&
    css`
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
      }
    `}
`;

export default Card;