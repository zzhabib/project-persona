import { Container, Paper, SxProps, Typography } from '@mui/material';
import React from 'react';

interface ChatBubbleProps {
  text: string;
  senderName: string;
  sx?: SxProps;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ 
  text, senderName, sx
 }) => {
  return (
    <Paper
      elevation={1}
      sx={{
        padding: '1rem',
        marginBottom: '1rem',
        maxWidth: '50%',
        alignSelf: 'flex-end',
        backgroundColor: '#eee',
        borderRadius: '1rem 1rem 1rem 0',
        wordWrap: 'break-word',  // Allow long words to break and wrap onto the next line
        wordBreak: 'break-word',  // Break words at arbitrary points to prevent overflow
        height: 'auto', 
        ...sx
      }}
    >
      <Typography variant="caption">{senderName}</Typography>
      <Typography variant="body1">{text}</Typography>
    </Paper>
  );
};

export default ChatBubble;
