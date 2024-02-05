
import OpenAI from 'openai';
import { ChatCompletionMessage, ChatCompletionMessageParam, ChatCompletionTool } from 'openai/resources';
import { Story } from './entity/edit/Story';
import { Scene } from './entity/edit/Scene';
import { Persona } from './entity/edit/Persona';
import { Message } from './entity/play/Message';
import { assert } from 'console';
const openai = new OpenAI();

export type AiMessageRequest = {
  story: Story,
  scene: Scene,
  to_persona: Persona,
  from_persona: Persona,
  message_context: Message[]
}

type MessageResult = {
  replies: string[]
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

function handleResponseMessage(message: ChatCompletionMessage): MessageResult {
  if (!message.tool_calls) {
    throw new Error("Please use the send_message tool to send a message to the other persona.")
  }

  const replies: string[] = message.tool_calls.map((toolCall) => {
    if (toolCall.function?.name === "send_message") {
      try {
        const args = JSON.parse(toolCall.function.arguments)
        assert(args.message_text)
        return args.message_text
      } catch (e) {
        throw new Error("Please use the valid format for the send_message tool.")
      }
    }
  })

  return {
    replies: replies
  }
}

export async function getAiReply(messageReq: AiMessageRequest): Promise<string> {
  console.log("Assembling call to OpenAI")
  const messages = createSystemMessages(messageReq)
  
  let replyText = "[no reply message]"

  let messageResult: MessageResult
  let tries = 0

  while (tries < 5) {
    const response = await openai.chat.completions.create({
      model: "gpt-4-0125-preview",
      messages: messages,
      tools: tools
    })
    const responseMessage = response.choices[0].message
    messages.push(responseMessage)
    console.log(JSON.stringify(responseMessage))

    try {
      messageResult = handleResponseMessage(responseMessage)
      break
    } catch (e) {
      messages.push({
        role: "system",
        content: e.message
      })
    }

    tries += 1
  }

  if (!messageResult) {
    throw new Error("Failed to get a valid response from the OpenAI")
  }

  if (messageResult.replies.length > 0) {
    replyText = messageResult.replies.join("\n")
  }

  return messageResult.replies[0]
}