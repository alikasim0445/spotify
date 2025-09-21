// Text styled component
import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline';
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  fontWeight?: 'light' | 'regular' | 'medium' | 'bold' | number;
  noWrap?: boolean;
  gradient?: boolean;
}

const Text = styled.p<TextProps>`
  margin: 0;
  padding: 0;
  color: ${({ color }) => color || '#ffffff'};
  text-align: ${({ align }) => align || 'left'};
  
  // Font weight
  ${({ fontWeight }) => {
    if (typeof fontWeight === 'number') {
      return css`
        font-weight: ${fontWeight};
      `;
    }
    
    switch (fontWeight) {
      case 'light':
        return css`
          font-weight: 300;
        `;
      case 'regular':
        return css`
          font-weight: 400;
        `;
      case 'medium':
        return css`
          font-weight: 500;
        `;
      case 'bold':
        return css`
          font-weight: 700;
        `;
      default:
        return css`
          font-weight: 400;
        `;
    }
  }}
  
  // No wrap
  ${({ noWrap }) =>
    noWrap &&
    css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `}
  
  // Gradient text
  ${({ gradient }) =>
    gradient &&
    css`
      background: linear-gradient(45deg, #1db954 30%, #1ed760 90%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    `}
  
  // Variant styles
  ${({ variant }) => {
    switch (variant) {
      case 'h1':
        return css`
          font-size: 48px;
          font-weight: 700;
          line-height: 1.2;
        `;
      case 'h2':
        return css`
          font-size: 40px;
          font-weight: 700;
          line-height: 1.2;
        `;
      case 'h3':
        return css`
          font-size: 32px;
          font-weight: 700;
          line-height: 1.2;
        `;
      case 'h4':
        return css`
          font-size: 24px;
          font-weight: 700;
          line-height: 1.3;
        `;
      case 'h5':
        return css`
          font-size: 20px;
          font-weight: 700;
          line-height: 1.3;
        `;
      case 'h6':
        return css`
          font-size: 18px;
          font-weight: 700;
          line-height: 1.4;
        `;
      case 'subtitle1':
        return css`
          font-size: 16px;
          font-weight: 500;
          line-height: 1.4;
          color: #b3b3b3;
        `;
      case 'subtitle2':
        return css`
          font-size: 14px;
          font-weight: 500;
          line-height: 1.4;
          color: #b3b3b3;
        `;
      case 'body1':
        return css`
          font-size: 16px;
          font-weight: 400;
          line-height: 1.5;
        `;
      case 'body2':
        return css`
          font-size: 14px;
          font-weight: 400;
          line-height: 1.5;
        `;
      case 'caption':
        return css`
          font-size: 12px;
          font-weight: 400;
          line-height: 1.5;
          color: #b3b3b3;
        `;
      case 'overline':
        return css`
          font-size: 10px;
          font-weight: 500;
          line-height: 1.5;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #b3b3b3;
        `;
      default:
        return css`
          font-size: 16px;
          font-weight: 400;
          line-height: 1.5;
        `;
    }
  }}
`;

export default Text;