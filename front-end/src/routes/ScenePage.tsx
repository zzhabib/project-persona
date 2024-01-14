import { gql, useMutation, useQuery } from "@apollo/client"
import { Box, Button, Container, Divider, SxProps, TextField, Typography } from "@mui/material"
import { useParams } from "react-router"
import { GetStoryDetailsQuery, GetStoryDetailsQueryVariables, StoryUpdateInput, UpdateStoryMutation, UpdateStoryMutationVariables } from "../gql/graphql"
import { Theme, useTheme } from "@emotion/react"
import IdentityCard from "../components/IdentityCard"
import CreateCard from "../components/CreateCard"
import TypographyInput from "../components/TypographyInput"
import { useState } from "react"
import { useNavigate } from 'react-router-dom';






const ScenePage: React.FC = () => {
const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };












  return <>
        <Button
        sx={{
          height: '3em',
          marginTop: '1em',
          marginLeft: '1em'
        }}
        variant="contained"
        onClick={handleGoBack}
      >
        GO BACK
      </Button>


     <Typography
      variant="h4"
      sx={{
        padding: '10px',
        textAlign: 'center'
      }}>
      This is a Scene Page
    </Typography>
  </>
}

export default ScenePage