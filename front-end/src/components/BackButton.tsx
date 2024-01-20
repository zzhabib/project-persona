import React from 'react';
import { SxProps, Theme, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';



type BackButtonComponentProps = {
  sx?: SxProps<Theme>,
  onClick?: React.MouseEventHandler
};




const BackButton: React.FC<BackButtonComponentProps> = ({
}) => {

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); 
    };



  return (
    <Button
        sx={{
          height: '3em',
          width: '8em',
          marginTop: '1em',
          marginLeft: '1em',

        }}
        variant="contained"
        onClick={handleGoBack}
        >
          GO BACK
    </Button>
  );
};

export default BackButton;


