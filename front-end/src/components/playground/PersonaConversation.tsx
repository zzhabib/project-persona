import { useQuery } from "@apollo/client";
import { Box, Button, TextField, Typography } from "@mui/material";
import { GET_CONVERSATION } from "../../queries/PlaygroundQueries";
import { GetConversationQuery, GetConversationQueryVariables } from "../../gql/graphql";
import ChatBubble from "./ChatBubble";
import { useState } from "react";

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

  const [message, setMessage] = useState('');
  const handleSendMessage = () => {

  }

  return <Box>
    {/* <Typography variant="h6" align="center">Conversation</Typography> */}
    <Box
      sx={{
        width: '100%',
        maxHeight: '50%',
        overflowY: 'auto',
        border: '1px solid #ccc',
      }}
    >
      {data?.getConversation?.map((message) => (
        <ChatBubble
          key={message.id}
          senderName={message.sender.name}
          text={message.text}
        />
      ))}
    </Box>

    {/* Message Box */}
    <Box
      sx={{
        display: "flex",
        alignItems: "center"
      }}
    >
      <TextField
        value={message}
        multiline
        rows={2}
        onChange={(e) => setMessage(e.target.value)}
        label="Type a message"
        variant="outlined"
        fullWidth
      />
      <Button
        variant="contained"
        onClick={handleSendMessage}
      >
        Send
      </Button>
    </Box>
  </Box>
}

export default PersonaConversation;