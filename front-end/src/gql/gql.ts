/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\nquery GetInitatedConnection($getPersonaId: Int!, $targetPersonaId: Int) {\n    getPersona(id: $getPersonaId) {\n      name\n      initiatedConnections(targetPersonaId: $targetPersonaId) {\n        description\n        targetPersona {\n          name\n        }\n      }\n    }\n  }\n": types.GetInitatedConnectionDocument,
    "\nquery GetReceivedConnection($getPersonaId: Int!, $sourcePersonaId: Int) {\n  getPersona(id: $getPersonaId) {\n    name\n    receivedConnections(sourcePersonaId: $sourcePersonaId) {\n      description\n      sourcePersona {\n        name\n      }\n    }\n  \n  }\n}\n": types.GetReceivedConnectionDocument,
    "\nmutation AddConnection($input: PersonaUpdateInput!, $updatePersonaId: Int!) {\n    updatePersona(input: $input, id: $updatePersonaId)\n  }\n": types.AddConnectionDocument,
    "\nmutation UpdatePersona($input: PersonaUpdateInput!, $updatePersonaId: Int!) {\n  updatePersona(input: $input, id: $updatePersonaId)\n}\n": types.UpdatePersonaDocument,
    "\n  query GetUserStories($id: Int!) {\n    getUser(id: $id) {\n      stories {\n        id\n        title\n        description\n      }\n    }\n  }\n": types.GetUserStoriesDocument,
    "\n  mutation CreateStory($input: StoryInput!) {\n    createStory(input: $input) {\n      id\n    }\n  }\n": types.CreateStoryDocument,
    "\n  mutation Mutation($deleteStoryId: Int!) {\n    deleteStory(id: $deleteStoryId)\n\n  }\n": types.MutationDocument,
    " \n  query GetUsers {\n    allUsers {\n      id\n      email\n    }\n  }\n": types.GetUsersDocument,
    "\n  mutation CreateUser($email: String!) {\n    createUser(email: $email) {\n      id\n      email\n    }\n  }\n": types.CreateUserDocument,
    "\nquery GetPersona($getPersonaId: Int!) {\n  getPersona(id: $getPersonaId) {\n    name\n    description\n    story {\n      id\n    }\n    initiatedConnections {\n      targetPersona {\n        name\n        id\n      }\n    }\n    receivedConnections {\n      sourcePersona {\n        name\n        id\n      }\n    }\n  }\n}\n": types.GetPersonaDocument,
    "\nmutation UpdatePersona($input: PersonaUpdateInput!, $updatePersonaId: Int!) {\n  updatePersona(input: $input, id: $updatePersonaId)\n  \n}\n": types.UpdatePersonaDocument,
    "\nquery GetStory($getStoryId: Int!) {\n  getStory(id: $getStoryId) {\n    personas {\n      id\n      name\n    }\n  }\n}\n": types.GetStoryDocument,
    "\n  query GetStorySession($storySessionId: Int!) {\n    getStorySession(id: $storySessionId) {\n      id\n      name\n      story {\n        id\n        title\n        description\n        personas {\n          name\n          id\n          description\n        }\n        scenes {\n          id\n          title\n        }\n      }\n    }\n  }\n": types.GetStorySessionDocument,
    "\n  query GetConversation($secondPersonaId: Int!, $firstPersonaId: Int!, $storySessionId: Int!) {\n    getConversation(secondPersonaId: $secondPersonaId, firstPersonaId: $firstPersonaId, storySessionId: $storySessionId) {\n      id\n      createdAt\n      text\n      scene {\n        id\n        title\n      }\n      sender {\n        id\n        name\n      }\n    }\n  }\n": types.GetConversationDocument,
    "\n  mutation CreateUserMessage($input: UserMessageInput!) {\n    createUserMessage(input: $input) {\n      userMessage {\n        id\n        createdAt\n        text\n        sender {\n          id\n          name\n        }\n        scene {\n          id\n          title\n        }\n      }\n      replyMessage {\n        id\n        createdAt\n        text\n        sender {\n          id\n          name\n        }\n        scene {\n          id\n          title\n        }\n      }\n    }\n  }\n": types.CreateUserMessageDocument,
    "\nquery Roles($getSceneId: Int!) {\n    getScene(id: $getSceneId) {\n      story {\n        id\n      }\n      roles {\n        actions {\n          name\n          id\n        }\n        persona {\n          id\n          name\n        }\n        description\n      }\n    }\n  }\n": types.RolesDocument,
    "\nmutation UpdateRole($input: RoleUpdateInput!, $sceneId: Int!, $personaId: Int!) {\n    updateRole(input: $input, sceneId: $sceneId, personaId: $personaId)\n  }\n  \n": types.UpdateRoleDocument,
    "\nmutation CreateAction($input: ActionInput!) {\n  createAction(input: $input) {\n    id\n    name\n  }\n}\n": types.CreateActionDocument,
    "\nmutation DeleteAction($deleteActionId: Int!) {\n  deleteAction(id: $deleteActionId)\n}\n": types.DeleteActionDocument,
    "\nquery GetScene($getSceneId: Int!) {\n  getScene(id: $getSceneId) {\n    story {\n      id\n    }\n    description\n    id\n    title\n    roles {\n      persona {\n        name\n        id\n      }\n    }\n  }\n}\n": types.GetSceneDocument,
    "\nmutation UpdateScene($input: SceneUpdateInput!, $updateSceneId: Int!) {\n  updateScene(input: $input, id: $updateSceneId)\n}\n": types.UpdateSceneDocument,
    "\nmutation CreateRole($input: RoleInput!) {\n  createRole(input: $input) {\n    persona {\n      id\n    }\n    scene {\n      title\n    }\n  }\n}\n": types.CreateRoleDocument,
    "\nmutation DeleteRole($personaId: Int!, $sceneId: Int!) {\n  deleteRole(personaId: $personaId, sceneId: $sceneId)\n}\n": types.DeleteRoleDocument,
    "\n  query GetStoryDetails($id: Int!) {\n    getStory(id: $id) {\n      id\n      title\n      description\n\n      personas {\n        id\n        name\n        description\n      }\n\n      scenes {\n        id\n        title\n        description\n      }\n    }\n  }\n": types.GetStoryDetailsDocument,
    "\n  query GetUserStorySessions($storyId: Int!, $userId: Int!) {\n    getUserStorySessions(storyId: $storyId, userId: $userId) {\n      id\n      story {\n        title\n      }\n      user {\n        email\n      }\n      name\n    }\n  }\n": types.GetUserStorySessionsDocument,
    "\n  mutation UpdateStory($input: StoryUpdateInput!, $updateStoryId: Int!) {\n    updateStory(input: $input, id: $updateStoryId)\n  }\n": types.UpdateStoryDocument,
    "\n  mutation CreatePersona($input: PersonaInput!) {\n    createPersona(input: $input) {\n      name\n    }\n  }\n": types.CreatePersonaDocument,
    "\n  mutation CreateStorySession($input: StorySessionInput!) {\n    createStorySession(input: $input) {\n      id\n    }\n  }\n": types.CreateStorySessionDocument,
    "\n  mutation CreateScene($input: SceneInput!) {\n    createScene(input: $input) {\n      title\n    }\n  }\n": types.CreateSceneDocument,
    "\n  mutation DeletePersona($deletePersonaId: Int!) {\n    deletePersona(id: $deletePersonaId)\n  }\n": types.DeletePersonaDocument,
    "\n  mutation DeleteScene($deleteSceneId: Int!) {\n    deleteScene(id: $deleteSceneId)\n  }\n": types.DeleteSceneDocument,
    "\n  mutation DeleteStorySession($storySessionId: Int!) {\n    deleteStorySession(id: $storySessionId)\n  }\n": types.DeleteStorySessionDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetInitatedConnection($getPersonaId: Int!, $targetPersonaId: Int) {\n    getPersona(id: $getPersonaId) {\n      name\n      initiatedConnections(targetPersonaId: $targetPersonaId) {\n        description\n        targetPersona {\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\nquery GetInitatedConnection($getPersonaId: Int!, $targetPersonaId: Int) {\n    getPersona(id: $getPersonaId) {\n      name\n      initiatedConnections(targetPersonaId: $targetPersonaId) {\n        description\n        targetPersona {\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetReceivedConnection($getPersonaId: Int!, $sourcePersonaId: Int) {\n  getPersona(id: $getPersonaId) {\n    name\n    receivedConnections(sourcePersonaId: $sourcePersonaId) {\n      description\n      sourcePersona {\n        name\n      }\n    }\n  \n  }\n}\n"): (typeof documents)["\nquery GetReceivedConnection($getPersonaId: Int!, $sourcePersonaId: Int) {\n  getPersona(id: $getPersonaId) {\n    name\n    receivedConnections(sourcePersonaId: $sourcePersonaId) {\n      description\n      sourcePersona {\n        name\n      }\n    }\n  \n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation AddConnection($input: PersonaUpdateInput!, $updatePersonaId: Int!) {\n    updatePersona(input: $input, id: $updatePersonaId)\n  }\n"): (typeof documents)["\nmutation AddConnection($input: PersonaUpdateInput!, $updatePersonaId: Int!) {\n    updatePersona(input: $input, id: $updatePersonaId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation UpdatePersona($input: PersonaUpdateInput!, $updatePersonaId: Int!) {\n  updatePersona(input: $input, id: $updatePersonaId)\n}\n"): (typeof documents)["\nmutation UpdatePersona($input: PersonaUpdateInput!, $updatePersonaId: Int!) {\n  updatePersona(input: $input, id: $updatePersonaId)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserStories($id: Int!) {\n    getUser(id: $id) {\n      stories {\n        id\n        title\n        description\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUserStories($id: Int!) {\n    getUser(id: $id) {\n      stories {\n        id\n        title\n        description\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateStory($input: StoryInput!) {\n    createStory(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateStory($input: StoryInput!) {\n    createStory(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Mutation($deleteStoryId: Int!) {\n    deleteStory(id: $deleteStoryId)\n\n  }\n"): (typeof documents)["\n  mutation Mutation($deleteStoryId: Int!) {\n    deleteStory(id: $deleteStoryId)\n\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: " \n  query GetUsers {\n    allUsers {\n      id\n      email\n    }\n  }\n"): (typeof documents)[" \n  query GetUsers {\n    allUsers {\n      id\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateUser($email: String!) {\n    createUser(email: $email) {\n      id\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($email: String!) {\n    createUser(email: $email) {\n      id\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetPersona($getPersonaId: Int!) {\n  getPersona(id: $getPersonaId) {\n    name\n    description\n    story {\n      id\n    }\n    initiatedConnections {\n      targetPersona {\n        name\n        id\n      }\n    }\n    receivedConnections {\n      sourcePersona {\n        name\n        id\n      }\n    }\n  }\n}\n"): (typeof documents)["\nquery GetPersona($getPersonaId: Int!) {\n  getPersona(id: $getPersonaId) {\n    name\n    description\n    story {\n      id\n    }\n    initiatedConnections {\n      targetPersona {\n        name\n        id\n      }\n    }\n    receivedConnections {\n      sourcePersona {\n        name\n        id\n      }\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation UpdatePersona($input: PersonaUpdateInput!, $updatePersonaId: Int!) {\n  updatePersona(input: $input, id: $updatePersonaId)\n  \n}\n"): (typeof documents)["\nmutation UpdatePersona($input: PersonaUpdateInput!, $updatePersonaId: Int!) {\n  updatePersona(input: $input, id: $updatePersonaId)\n  \n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetStory($getStoryId: Int!) {\n  getStory(id: $getStoryId) {\n    personas {\n      id\n      name\n    }\n  }\n}\n"): (typeof documents)["\nquery GetStory($getStoryId: Int!) {\n  getStory(id: $getStoryId) {\n    personas {\n      id\n      name\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetStorySession($storySessionId: Int!) {\n    getStorySession(id: $storySessionId) {\n      id\n      name\n      story {\n        id\n        title\n        description\n        personas {\n          name\n          id\n          description\n        }\n        scenes {\n          id\n          title\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetStorySession($storySessionId: Int!) {\n    getStorySession(id: $storySessionId) {\n      id\n      name\n      story {\n        id\n        title\n        description\n        personas {\n          name\n          id\n          description\n        }\n        scenes {\n          id\n          title\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetConversation($secondPersonaId: Int!, $firstPersonaId: Int!, $storySessionId: Int!) {\n    getConversation(secondPersonaId: $secondPersonaId, firstPersonaId: $firstPersonaId, storySessionId: $storySessionId) {\n      id\n      createdAt\n      text\n      scene {\n        id\n        title\n      }\n      sender {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetConversation($secondPersonaId: Int!, $firstPersonaId: Int!, $storySessionId: Int!) {\n    getConversation(secondPersonaId: $secondPersonaId, firstPersonaId: $firstPersonaId, storySessionId: $storySessionId) {\n      id\n      createdAt\n      text\n      scene {\n        id\n        title\n      }\n      sender {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateUserMessage($input: UserMessageInput!) {\n    createUserMessage(input: $input) {\n      userMessage {\n        id\n        createdAt\n        text\n        sender {\n          id\n          name\n        }\n        scene {\n          id\n          title\n        }\n      }\n      replyMessage {\n        id\n        createdAt\n        text\n        sender {\n          id\n          name\n        }\n        scene {\n          id\n          title\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUserMessage($input: UserMessageInput!) {\n    createUserMessage(input: $input) {\n      userMessage {\n        id\n        createdAt\n        text\n        sender {\n          id\n          name\n        }\n        scene {\n          id\n          title\n        }\n      }\n      replyMessage {\n        id\n        createdAt\n        text\n        sender {\n          id\n          name\n        }\n        scene {\n          id\n          title\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery Roles($getSceneId: Int!) {\n    getScene(id: $getSceneId) {\n      story {\n        id\n      }\n      roles {\n        actions {\n          name\n          id\n        }\n        persona {\n          id\n          name\n        }\n        description\n      }\n    }\n  }\n"): (typeof documents)["\nquery Roles($getSceneId: Int!) {\n    getScene(id: $getSceneId) {\n      story {\n        id\n      }\n      roles {\n        actions {\n          name\n          id\n        }\n        persona {\n          id\n          name\n        }\n        description\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation UpdateRole($input: RoleUpdateInput!, $sceneId: Int!, $personaId: Int!) {\n    updateRole(input: $input, sceneId: $sceneId, personaId: $personaId)\n  }\n  \n"): (typeof documents)["\nmutation UpdateRole($input: RoleUpdateInput!, $sceneId: Int!, $personaId: Int!) {\n    updateRole(input: $input, sceneId: $sceneId, personaId: $personaId)\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation CreateAction($input: ActionInput!) {\n  createAction(input: $input) {\n    id\n    name\n  }\n}\n"): (typeof documents)["\nmutation CreateAction($input: ActionInput!) {\n  createAction(input: $input) {\n    id\n    name\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation DeleteAction($deleteActionId: Int!) {\n  deleteAction(id: $deleteActionId)\n}\n"): (typeof documents)["\nmutation DeleteAction($deleteActionId: Int!) {\n  deleteAction(id: $deleteActionId)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetScene($getSceneId: Int!) {\n  getScene(id: $getSceneId) {\n    story {\n      id\n    }\n    description\n    id\n    title\n    roles {\n      persona {\n        name\n        id\n      }\n    }\n  }\n}\n"): (typeof documents)["\nquery GetScene($getSceneId: Int!) {\n  getScene(id: $getSceneId) {\n    story {\n      id\n    }\n    description\n    id\n    title\n    roles {\n      persona {\n        name\n        id\n      }\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation UpdateScene($input: SceneUpdateInput!, $updateSceneId: Int!) {\n  updateScene(input: $input, id: $updateSceneId)\n}\n"): (typeof documents)["\nmutation UpdateScene($input: SceneUpdateInput!, $updateSceneId: Int!) {\n  updateScene(input: $input, id: $updateSceneId)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation CreateRole($input: RoleInput!) {\n  createRole(input: $input) {\n    persona {\n      id\n    }\n    scene {\n      title\n    }\n  }\n}\n"): (typeof documents)["\nmutation CreateRole($input: RoleInput!) {\n  createRole(input: $input) {\n    persona {\n      id\n    }\n    scene {\n      title\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation DeleteRole($personaId: Int!, $sceneId: Int!) {\n  deleteRole(personaId: $personaId, sceneId: $sceneId)\n}\n"): (typeof documents)["\nmutation DeleteRole($personaId: Int!, $sceneId: Int!) {\n  deleteRole(personaId: $personaId, sceneId: $sceneId)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetStoryDetails($id: Int!) {\n    getStory(id: $id) {\n      id\n      title\n      description\n\n      personas {\n        id\n        name\n        description\n      }\n\n      scenes {\n        id\n        title\n        description\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetStoryDetails($id: Int!) {\n    getStory(id: $id) {\n      id\n      title\n      description\n\n      personas {\n        id\n        name\n        description\n      }\n\n      scenes {\n        id\n        title\n        description\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserStorySessions($storyId: Int!, $userId: Int!) {\n    getUserStorySessions(storyId: $storyId, userId: $userId) {\n      id\n      story {\n        title\n      }\n      user {\n        email\n      }\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetUserStorySessions($storyId: Int!, $userId: Int!) {\n    getUserStorySessions(storyId: $storyId, userId: $userId) {\n      id\n      story {\n        title\n      }\n      user {\n        email\n      }\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateStory($input: StoryUpdateInput!, $updateStoryId: Int!) {\n    updateStory(input: $input, id: $updateStoryId)\n  }\n"): (typeof documents)["\n  mutation UpdateStory($input: StoryUpdateInput!, $updateStoryId: Int!) {\n    updateStory(input: $input, id: $updateStoryId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePersona($input: PersonaInput!) {\n    createPersona(input: $input) {\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePersona($input: PersonaInput!) {\n    createPersona(input: $input) {\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateStorySession($input: StorySessionInput!) {\n    createStorySession(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateStorySession($input: StorySessionInput!) {\n    createStorySession(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateScene($input: SceneInput!) {\n    createScene(input: $input) {\n      title\n    }\n  }\n"): (typeof documents)["\n  mutation CreateScene($input: SceneInput!) {\n    createScene(input: $input) {\n      title\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeletePersona($deletePersonaId: Int!) {\n    deletePersona(id: $deletePersonaId)\n  }\n"): (typeof documents)["\n  mutation DeletePersona($deletePersonaId: Int!) {\n    deletePersona(id: $deletePersonaId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteScene($deleteSceneId: Int!) {\n    deleteScene(id: $deleteSceneId)\n  }\n"): (typeof documents)["\n  mutation DeleteScene($deleteSceneId: Int!) {\n    deleteScene(id: $deleteSceneId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteStorySession($storySessionId: Int!) {\n    deleteStorySession(id: $storySessionId)\n  }\n"): (typeof documents)["\n  mutation DeleteStorySession($storySessionId: Int!) {\n    deleteStorySession(id: $storySessionId)\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;