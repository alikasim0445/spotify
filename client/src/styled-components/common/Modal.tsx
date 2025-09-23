// Modal styled component
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

// Keyframes for animations
const modalFadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const modalSlideIn = keyframes`
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

interface ModalProps {
  isOpen?: boolean;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
}

const ModalOverlay = styled.div<Pick<ModalProps, 'isOpen'>>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1300;
  padding: 16px;
  
  ${({ isOpen }) =>
    isOpen
      ? css`
          animation: ${modalFadeIn} 0.3s ease-out;
        `
      : css`
          display: none;
        `}
`;

const ModalContent = styled.div<ModalProps>`
  background-color: #282828;
  border-radius: 8px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
  width: 100%;
  
  // Size variants
  ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          max-width: 400px;
        `;
      case 'large':
        return css`
          max-width: 800px;
        `;
      case 'fullscreen':
        return css`
          max-width: none;
          width: 90vw;
          height: 90vh;
        `;
      case 'medium':
      default:
        return css`
          max-width: 600px;
        `;
    }
  }}
  
  animation: ${modalSlideIn} 0.3s ease-out;
  
  // Scrollbar styling
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #1db954;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #1ed760;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
  }
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const ModalFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #b3b3b3;
  cursor: pointer;
  font-size: 24px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Modal = Object.assign(ModalContent, {
  Overlay: ModalOverlay,
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
  CloseButton,
});

export default Modal;