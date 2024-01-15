import { ButtonBase, Card, CardActionArea, CardContent, SxProps, Theme, Typography } from "@mui/material";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';


type IdentityCardProps = {
  name: string,
  sx?: SxProps<Theme>,
  onClick?: React.MouseEventHandler
  onContextMenu?: (name: string, event: React.MouseEvent<HTMLDivElement>) => void;
  onDoSomethingClick?: (Id: string) => void;
}




const IdentityCard: React.FC<IdentityCardProps> = ({
  name,
  sx,
  onClick = () => { },
  onDoSomethingClick
}) => {


  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

 





  return <>
  
  <Card
    sx={{
      margin: '2px',
      ...sx
    }} onContextMenu={handleContextMenu}>
    <CardActionArea onClick={onClick}>
      <CardContent>
        <Typography>
          {name}
        </Typography>
      </CardContent>
      </CardActionArea>
      


      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={onDoSomethingClick}>
          Delete
        </MenuItem>

      </Menu>





    </Card>
    
    </>
}

IdentityCard.defaultProps = {
  onClick: () => { }
}

export default IdentityCard