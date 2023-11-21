import React, { useState } from "react";
import { Box, Card, CardActionArea, CardContent, IconButton, SxProps, TextField, Theme, Typography } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';

interface CreateCardProps {
  text?: string,
  placeholder?: string,
  sx?: SxProps<Theme>,
  onSubmit?: (itemName: string) => void;
}

const CreateCard: React.FC<CreateCardProps> = ({
  text = 'Create',
  placeholder = 'Enter item name',
  sx,
  onSubmit = () => {}
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [itemName, setItemName] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemName(event.target.value);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setItemName('');
  };

  const handleAccept = () => {
    onSubmit(itemName)
    setIsEditing(false);
    setItemName('');
  };

  const normalContent = <CardContent>
    <Typography>
      {text}
    </Typography>
  </CardContent>

  const editContent = <CardContent>
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <TextField
        autoFocus
        fullWidth
        variant="standard"
        value={itemName}
        onChange={handleChange}
        placeholder={placeholder}
        InputProps={{
          sx: { color: 'primary.contrastText' }
        }}
      />
      <IconButton
        onClick={handleCancel}
        sx={{
          color: theme => theme.palette.primary.contrastText
        }}>
        <ClearIcon />
      </IconButton>
      <IconButton
        onClick={handleAccept}
        sx ={{
          color: theme => theme.palette.primary.contrastText
        }}>
        <CheckIcon />
      </IconButton>
    </Box>
  </CardContent>

  return <Card
    color='primary'
    sx={{
      bgcolor: 'primary.main',
      color: 'primary.contrastText',
      margin: '2px',
      ...sx
    }}>
    <CardActionArea onClick={() => { if (!isEditing) setIsEditing(true) }}>
      {isEditing ? (editContent) : (normalContent)}
    </CardActionArea>
  </Card>
}

export default CreateCard