import { Card, CardActionArea, CardContent, SxProps, Theme, Typography } from "@mui/material";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';


type ConnectionCardProps = {
  initiatedConnection: boolean,
  recievedConnnection: boolean,
  personaId: number,
  otherPersonaId: number,
  otherPersonaName: string,
  sx?: SxProps<Theme>,
  onClick?: React.MouseEventHandler
  onContextMenu?: (name: string, event: React.MouseEvent<HTMLDivElement>) => void;
  onDoSomethingClick?: (Id: string) => void;
}




const ConnectionCard: React.FC<ConnectionCardProps> = ({
  initiatedConnection,
  recievedConnnection,
  personaId,
  otherPersonaId,
  otherPersonaName,
  sx,
  onClick = () => { },
  onDoSomethingClick,
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
            
          {initiatedConnection && (
                <span
                style={{
                  display: 'inline-block',
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'blue',
                    marginRight: '5px',
                  }}
                />
              )}
              {recievedConnnection && (
                <span
                style={{
                  display: 'inline-block',
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'red',
                    marginRight: '5px',
                  }}
                />
              )}
          {otherPersonaName}
        </Typography>
      </CardContent>
      </CardActionArea>
    </Card>
    
    </>
}

ConnectionCard.defaultProps = {
  onClick: () => { }
}

export default ConnectionCard