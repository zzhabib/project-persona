import { Container, Paper, Typography } from '@mui/material';
import React from 'react';

interface ChatBubbleProps {
  text: string;
  senderName: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ text, senderName }) => {
  return (
    <Paper
      sx={{
        padding: '1rem',
        marginBottom: '1rem',
        maxWidth: '50%',
        alignSelf: 'flex-start',
        backgroundColor: '#eee',
        borderRadius: '1rem 1rem 1rem 0',
      }}
    >
      <Typography variant="caption">{senderName}</Typography>
      <Typography variant="body1">{text}</Typography>
    </Paper>
  );
};

export default ChatBubble;
