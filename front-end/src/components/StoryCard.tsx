import { Card, CardActionArea, CardContent, Typography } from "@mui/material"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';

type StoryCardProps = {
  story: {
    title: string
    description: string
  },
  onClick: React.MouseEventHandler
  onContextMenu?: (name: string, event: React.MouseEvent<HTMLDivElement>) => void;
  onDoSomethingClick?: React.MouseEventHandler<HTMLLIElement>;
}

function StoryCard(props: StoryCardProps): JSX.Element {
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  
  return <Card onContextMenu={handleContextMenu}
    sx={{
      width: 200,
      height: 200,
      margin: '10px'
    }}>
    <CardActionArea
      onClick={props.onClick}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
      }}
    >
      <CardContent>
        <Typography variant="h6">
          {props.story.title}
        </Typography>
        <Typography>
          {props.story.description}
        </Typography>
      </CardContent>
    </CardActionArea>

    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={props.onDoSomethingClick}>
          Delete
        </MenuItem>
      </Menu>

  </Card>
}

StoryCard.defaultProps = {
  onClick: () => { }
}

export default StoryCard