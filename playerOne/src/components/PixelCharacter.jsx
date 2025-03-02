import React, { useState, useContext } from 'react';
import ThemeContext from '../context/ThemeContext';


const BODY_PARTS = {
  heads: [
    { id: 'head1', path: 'M5,5 L15,5 L15,15 L5,15 Z', viewBox: '0 0 20 20' },
    { id: 'head2', path: 'M5,5 L15,5 L15,13 L10,15 L5,13 Z', viewBox: '0 0 20 20' },
  ],
  bodies: [
    { id: 'body1', path: 'M7,0 L13,0 L13,10 L7,10 Z', viewBox: '0 0 20 15' },
    { id: 'body2', path: 'M7,0 L13,0 L15,7 L5,7 Z', viewBox: '0 0 20 15' },
  ],
  weapons: [
    { id: 'sword', path: 'M2,10 L5,13 L15,3 L12,0 Z', viewBox: '0 0 20 20' },
    { id: 'staff', path: 'M9,0 L11,0 L11,18 L9,18 Z M6,2 L14,2 L14,5 L6,5 Z', viewBox: '0 0 20 20' },
    { id: 'bow', path: 'M5,0 C12,8 12,12 5,20 M15,0 C8,8 8,12 15,20 M10,5 L10,15', viewBox: '0 0 20 20' },
  ],
};

const PixelCharacter = ({ size = 200, editable = false }) => {
  const { currentTheme } = useContext(ThemeContext);
  const [character, setCharacter] = useState({
    head: BODY_PARTS.heads[0],
    body: BODY_PARTS.bodies[0],
    weapon: BODY_PARTS.weapons[0]
  });

  const handlePartChange = (partType, part) => {
    setCharacter(prev => ({
      ...prev,
      [partType]: part
    }));
  };

  return