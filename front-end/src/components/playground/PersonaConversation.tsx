import { useQuery } from "@apollo/client";
import { Box, Typography } from "@mui/material";
import { GET_CONVERSATION } from "../../queries/PlaygroundQueries";
import { GetConversationQuery, GetConversationQueryVariables } from "../../gql/graphql";

type PersonaConversationProps = {
  storySessionId: number;
  fromPersonaId: number;
  targetPersonaId: number;
}

const PersonaConversation: React.FC<PersonaConversationProps> = ({
  storySessionId,
  fromPersonaId,
  targetPersonaId
}) => {
  
  const { data, error, loading } = useQuery<GetConversationQuery, GetConversationQueryVariables>(GET_CONVERSATION, { 
    variables: {
      storySessionId: storySessionId,
      firstPersonaId: fromPersonaId,
      secondPersonaId: targetPersonaId
    }
   });

  return <Box>
    <Typography variant="h6" align="center">Conversation</Typography>
    <Box>
      {data?.getConversation?.map((message) => (
        <Typography key={message.id}>{message.text}</Typography>
      ))}
    </Box>
  </Box>
}

export default PersonaConversation;