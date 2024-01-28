import { React, useEffect } from 'react';
import { Box } from "@mui/material";
import { cardStyle } from "../../styles/styles";
import { useNavigate } from 'react-router';
import { useMutation, useQuery } from '@apollo/client';
import IdentityCard from '../IdentityCard';
import { DELETE_ROLE } from '../../queries/ScenePageQueries';
import { GET_ALL_PERSONAS } from '../../queries/PersonaPageQueries';
import RoleContactList from './RoleContactList';

type SceneRolesProps = {
  rolePersonas: Array<{ persona: { id: number; name: string } }>;
    sceneId: number;
    storyId: number;
    refetchData: () => void;
};

const SceneRoles: React.FC<SceneRolesProps> = ({ rolePersonas, sceneId, storyId, refetchData }) => {
    const navigate = useNavigate()


    const { data, loading, error, refetch } = useQuery(
        GET_ALL_PERSONAS, {
          variables: { 
            getStoryId: storyId
          }
        }
    )



  const [deleteRole] = useMutation(DELETE_ROLE)


  const handleRoleDelete = async (personaId: number) => {
      await deleteRole({
        variables: {
          personaId: personaId,
          sceneId: sceneId
        }
      })
    
    
    refetchData();
    refetch();
  }




    if (loading) {
        // You can render a loading indicator here if needed
        return <p>Loading...</p>;
    }

    if (error) {
        // Handle the error, for example, log it or display an error message
        console.error(error);
        return <p>Error loading data</p>;
    }


    const allPersonas = data.getStory.personas;

    return (
    <Box sx={{padding: '20px'}}>
      <RoleContactList
        sceneId={sceneId}
        storyId={storyId}
        existingRolePersonas={rolePersonas}
        allPersonas={allPersonas}
        refetchData={refetchData}
        />
      {rolePersonas.map((item, index) => (
        <IdentityCard
            key={item.persona.id}
          name={item.persona.name}
        
            sx={cardStyle}
          onClick={() => {
                navigate(`/scene/${sceneId}/roles/${item.persona.id}`)
            }}
          onDoSomethingClick={() => handleRoleDelete(item.persona.id)}
          
        />
      ))}
    </Box>
  );
};

export default SceneRoles;