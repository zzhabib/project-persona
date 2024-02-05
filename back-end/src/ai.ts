
import OpenAI from 'openai';
import { ChatCompletionMessageParam, ChatCompletionTool } from 'openai/resources';
import { Story } from './entity/edit/Story';
import { Scene } from './entity/edit/Scene';
import { Persona } from './entity/edit/Persona';
import { Message } from './entity/play/Message';
const openai = new OpenAI();

export type AiMessageRequest = {
  story: Story,
  scene: Scene,
  to_persona: Persona,
  from_persona: Persona,
  message_context: Message[]
}

const tools: ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: "send_message",
      description: "Send a reply message to the other persona that you are talking to.",
      parameters: {
        type: "object",
        properties: {
          message_text: {
            type: "string",
            description: "The text of the message that you want to send to the other persona."
          }
        },
        required: ["message_text"]
      }
    }
  }
]

function createSystemMessages(messageReq: AiMessageRequest): ChatCompletionMessageParam[] {
  const messages: ChatCompletionMessageParam[] = []

  const conversationText = messageReq.message_context.map((message) => {
    return `${message.sender.name}: ${message.text}`
  }).join("\n")

  messages.push({
    role: "system",
    content: `You are now playing as ${messageReq.from_persona.name} in the story ${messageReq.story.title}.
    You are in the scene ${messageReq.scene.title}.
    You are talking to ${messageReq.to_persona.name}.
    Here is a description of the story ${messageReq.story.title}: ${messageReq.story.description}
    Here is a description of the scene ${messageReq.scene.title}: ${messageReq.scene.description}
    The character you are talking to:
    Name: ${messageReq.to_persona.name}
    Description: ${messageReq.to_persona.description}
    The character you are talking as:
    Name: ${messageReq.from_persona.name}
    Description: ${messageReq.from_persona.description}
    Your role is to play as ${messageReq.from_persona.name} and make choices that will affect the story.
    
    Here is the conversation so far:
    ${conversationText}`
  })

  return messages
}

export async function getAiReply(messageReq: AiMessageRequest): Promise<string> {
  console.log("Assembling call to OpenAI")
  const response = await openai.chat.completions.create({
    model: "gpt-4-0125-preview",
    messages: createSystemMessages(messageReq),
    tools: tools
  })
  console.log(response)

  const responseMessage = response.choices[0].message
  let replyText = "[no reply message]"

  responseMessage.tool_calls?.forEach((toolCall) => {
    console.log(toolCall)
    if (toolCall.function?.name === "send_message") {
      // replyText = toolCall.function.arguments
    }
  })

  return replyText
}