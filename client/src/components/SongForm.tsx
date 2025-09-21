import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store'; // Import AppDispatch from your store
import { addSong, updateSong } from '../store/songs/songsSlice';
import type { Song } from '../types';
import {  Box, Button, TextField, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { GlassCard, GradientButton, GradientText } from '../styled-components';

interface SongFormProps {
  song?: Song;
  onCancel: () => void;
}

// Keyframes for animations
const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
`;

// Styled components using Emotion
const FormContainer = styled(GlassCard)`
  padding: 24px;
`;

const FormTitle = styled(GradientText)`
  text-align: center;
  margin-bottom: 24px !important;
  font-weight: 700 !important;
`;

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: rgba(255, 255, 255, 0.2);
      transition: border-color 0.3s ease;
    }
    
    &:hover fieldset {
      border-color: #1DB954;
    }
    
    &.Mui-focused fieldset {
      border-color: #1DB954;
      box-shadow: 0 0 0 2px rgba(29, 185, 84, 0.2);
    }
  }
  
  & .MuiInputLabel-root {
    color: #b3b3b3;
    
    &.Mui-focused {
      color: #1DB954;
    }
  }
  
  & .MuiInputBase-input {
    color: #ffffff;
  }
  
  margin-bottom: 20px !important;
`;

const ButtonGroup = styled(Box)`
  display: flex;
  gap: 16px;
  margin-top: 24px !important;
  justify-content: center;
`;

const SubmitButton = styled(GradientButton)`
  padding: 12px 24px !important;
  border-radius: 30px !important;
`;

const CancelButton = styled(Button)`
  border-radius: 30px !important;
  padding: 12px 24px !important;
  font-weight: 600 !important;
  text-transform: none !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: #ffffff !important;
  transition: all 0.3s ease !important;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1) !important;
    border-color: #1DB954 !important;
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const SongForm: React.FC<SongFormProps> = ({ song, onCancel }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    title: song?.title || '',
    artist: song?.artist || '',
    album: song?.album || '',
    genre: song?.genre || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (song) {
      // Update existing song
      dispatch(updateSong({ id: song._id, song: formData }));
    } else {
      // Add new song
      dispatch(addSong(formData));
    }
    
    onCancel();
  };

  return (
    <FormContainer>
      <FormTitle variant="h5">
        {song ? 'Edit Song' : 'Add New Song'}
      </FormTitle>
      
      <form onSubmit={handleSubmit}>
        <StyledTextField
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        
        <StyledTextField
          fullWidth
          label="Artist"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
          required
        />
        
        <StyledTextField
          fullWidth
          label="Album"
          name="album"
          value={formData.album}
          onChange={handleChange}
          required
        />
        
        <StyledTextField
          fullWidth
          label="Genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          required
        />
        
        <ButtonGroup>
          <SubmitButton 
            type="submit" 
            variant="contained"
          >
            {song ? 'Update' : 'Add'} Song
          </SubmitButton>
          <CancelButton 
            variant="outlined" 
            onClick={onCancel}
          >
            Cancel
          </CancelButton>
        </ButtonGroup>
      </form>
    </FormContainer>
  );
};

export default SongForm;