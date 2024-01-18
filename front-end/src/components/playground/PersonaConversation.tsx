import { useQuery } from "@apollo/client";
import { Box, Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import { GET_CONVERSATION } from "../../queries/PlaygroundQueries";
import { GetConversationQuery, GetConversationQueryVariables } from "../../gql/graphql";
import ChatBubble from "./ChatBubble";
import { useState } from "react";

interface ConversationMessage {
  id: number;
  createdAt: unknown;
  text: string;
  scene: {
    id: number;
    title: string;
  };
  sender: {
    id: number;
    name: string;
  };
}

type PersonaConversationProps = {
  storySessionId: number;
  fromPersonaId: number;
  targetPersonaId: number;
  scenes: {
    id: number;
    title: string;
  }[];
}

const PersonaConversation: React.FC<PersonaConversationProps> = ({
  storySessionId,
  fromPersonaId,
  targetPersonaId,
  scenes
}) => {
  
  const { data, error, loading } = useQuery<GetConversationQuery, GetConversationQueryVariables>(GET_CONVERSATION, { 
    variables: {
      storySessionId: storySessionId,
      firstPersonaId: fromPersonaId,
      secondPersonaId: targetPersonaId
    }
  });

  const [selectedSceneId, setSelectedSceneId] = useState(scenes[0].id ?? -1);
  const [messageText, setMessageText] = useState('');
  const [sendingMessage, setSendingMessage] = useState<ConversationMessage | undefined>();

  const handleSendMessage = () => {
    setSendingMessage({
      id: -1,
      createdAt: new Date(),
      text: messageText,
      scene: {
        id: selectedSceneId,
        title: scenes.find((scene) => scene.id === selectedSceneId)?.title ?? ''
      },
      sender: {
        id: fromPersonaId,
        name: ''
      }
    })
    setMessageText('')
  }

  const messages: ConversationMessage[] = [
    ...(data?.getConversation ?? []),
    ...(sendingMessage ? [sendingMessage] : [])
  ];

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
      {messages.map((message) => (
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
      <Select
        value={selectedSceneId}
        onChange={(e) => setSelectedSceneId(parseInt(e.target.value as string))}
      >
        {scenes.map((scene) => (
          <MenuItem
            key={scene.id}
            value={scene.id}
          >
            {scene.title}
          </MenuItem>
        ))}
      </Select>
      <TextField
        value={messageText}
        multiline
        rows={2}
        onChange={(e) => setMessageText(e.target.value)}
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