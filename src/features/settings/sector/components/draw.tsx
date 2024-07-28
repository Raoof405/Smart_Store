import React, { useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';

interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

const ImageWithRectangle: React.FC = () => {
  const [rectangles, setRectangles] = useState<Rectangle[]>([]);
  const [drawing, setDrawing] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);
  const [currentRect, setCurrentRect] = useState<Rectangle | null>(null);

  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setStartX(x);
      setStartY(y);
      setCurrentRect({
        x,
        y,
        width: 0,
        height: 0,
      });
      setDrawing(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (drawing && imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const width = x - startX;
      const height = y - startY;
      setCurrentRect({
        x: startX,
        y: startY,
        width,
        height,
      });
    }
  };

  const handleMouseUp = () => {
    if (currentRect) {
      setRectangles([...rectangles, currentRect]);
      console.log("Rectangle Drawn:", currentRect);
      setCurrentRect(null);
    }
    setDrawing(false);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-block',
        userSelect: 'none',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <img
        ref={imageRef}
        src="https://via.placeholder.com/600"
        alt="Draw on me"
        style={{
          width: '600px',
          height: '400px',
          display: 'block',
        }}
      />
      {currentRect && (
        <Box
          sx={{
            position: 'absolute',
            border: '2px dashed red',
            pointerEvents: 'none',
            left: currentRect.x,
            top: currentRect.y,
            width: currentRect.width,
            height: currentRect.height,
          }}
        />
      )}
      {rectangles.map((rect, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            border: '2px solid blue',
            pointerEvents: 'none',
            left: rect.x,
            top: rect.y,
            width: rect.width,
            height: rect.height,
          }}
        />
      ))}
      <Box mt={2}>
        <Typography variant="h6">Rectangles Data:</Typography>
        {rectangles.map((rect, index) => (
          <Typography key={index}>
            Rectangle {index + 1}: X: {rect.x}, Y: {rect.y}, Width: {rect.width}, Height: {rect.height}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default ImageWithRectangle;
