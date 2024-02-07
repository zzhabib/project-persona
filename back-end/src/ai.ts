
import OpenAI from 'openai';
import { ChatCompletionMessage, ChatCompletionMessageParam, ChatCompletionTool } from 'openai/resources';
import { Story } from './entity/edit/Story';
import { Scene } from './entity/edit/Scene';
import { Persona } from './entity/edit/Persona';
import { Message } from './entity/play/Message';
import { assert } from 'console';
import { Connection } from './entity/edit/Connection';
import { Role } from './entity/edit/Role';
const openai = new OpenAI();

export type AiMessageRequest = {
  story: Story,
  scene: Scene,
  to_persona: Persona,
  from_persona: Persona,
  connection?: Connection,
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

function formatStoryInfo(story: Story): string {
  return `Story: ${story.title}
  ${story.description}\n`
}

function formatRoleInfo(role: Role): string {
  assert(role.persona, "Role must have a persona.")
  assert(role.actions, "Role must have actions.")
  return `(${role.persona.name}, ID: ${role.personaId}): ${role.description}
  Actions: [${role.actions.map((action) => `'${action.name}'`).join(", ")}]\n`
}

function formatSceneInfo(scene: Scene): string {
  let sceneText = `Scene: ${scene.title}
  ${scene.description}\n`

  if (scene.roles) {
    sceneText += `Roles:
    ${scene.roles.map(formatRoleInfo)}\n`
  }

  return sceneText
}

function formatPersonaInfo(persona: Persona): string {
  return `Name: ${persona.name}, ID: ${persona.id}
  Description: ${persona.description}\n`
}

function formatConnectionInfo(connection: Connection): string {
  return `Your connection with ${connection.targetPersona.name}:
  ${connection.description}\n`
}

function createSystemMessages(messageReq: AiMessageRequest): ChatCompletionMessageParam[] {
  let msgText = `Your role is to play as a character in the following story and make choices that will affect the story.`

  msgText += formatStoryInfo(messageReq.story)
  msgText += formatSceneInfo(messageReq.scene)
  msgText += `Your character:
    ${formatPersonaInfo(messageReq.from_persona)}\n`
  msgText += `The character you are talking to:
    ${formatPersonaInfo(messageReq.to_persona)}
    ${messageReq.connection ? formatConnectionInfo(messageReq.connection) : ""}`
  
  const conversationText = messageReq.message_context.map(
    (message) => `${message.senderId === messageReq.from_persona.id ? `You` : message.sender.name}: ${message.text}`
  ).join("\n")
  
  msgText += `Here is the conversation so far:
  ${conversationText}`

  return [{
    role: "system",
    content: msgText
  }]
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
  console.log("Message context: ", messages)
  
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