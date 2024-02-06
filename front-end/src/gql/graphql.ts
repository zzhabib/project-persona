/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format. */
  DateTimeISO: { input: any; output: any; }
};

export type Action = {
  __typename?: 'Action';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type ActionInput = {
  name: Scalars['String']['input'];
  storyId: Scalars['Int']['input'];
};

export type ActionUpdateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Connection = {
  __typename?: 'Connection';
  description: Scalars['String']['output'];
  sourcePersona: Persona;
  targetPersona: Persona;
};

export type ConnectionInput = {
  description: Scalars['String']['input'];
  targetPersonaId: Scalars['Int']['input'];
};

export type Message = {
  __typename?: 'Message';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['Int']['output'];
  recipient: Persona;
  scene: Scene;
  sender: Persona;
  text: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAction: Action;
  createPersona: Persona;
  createRole: Role;
  createScene: Scene;
  createStory: Story;
  createStorySession: StorySession;
  createUser: User;
  createUserMessage: UserMessageResponse;
  deleteAction: Scalars['Boolean']['output'];
  deletePersona: Scalars['Boolean']['output'];
  deleteRole: Scalars['Boolean']['output'];
  deleteScene: Scalars['Boolean']['output'];
  deleteStory: Scalars['Boolean']['output'];
  deleteStorySession: Scalars['Boolean']['output'];
  updateAction: Scalars['Boolean']['output'];
  updatePersona: Scalars['Boolean']['output'];
  updateRole: Scalars['Boolean']['output'];
  updateScene: Scalars['Boolean']['output'];
  updateStory: Scalars['Boolean']['output'];
};


export type MutationCreateActionArgs = {
  input: ActionInput;
};


export type MutationCreatePersonaArgs = {
  input: PersonaInput;
};


export type MutationCreateRoleArgs = {
  input: RoleInput;
};


export type MutationCreateSceneArgs = {
  input: SceneInput;
};


export type MutationCreateStoryArgs = {
  input: StoryInput;
};


export type MutationCreateStorySessionArgs = {
  input: StorySessionInput;
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
};


export type MutationCreateUserMessageArgs = {
  input: UserMessageInput;
};


export type MutationDeleteActionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeletePersonaArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteRoleArgs = {
  personaId: Scalars['Int']['input'];
  sceneId: Scalars['Int']['input'];
};


export type MutationDeleteSceneArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteStoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteStorySessionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateActionArgs = {
  id: Scalars['Int']['input'];
  input: ActionUpdateInput;
};


export type MutationUpdatePersonaArgs = {
  id: Scalars['Int']['input'];
  input: PersonaUpdateInput;
};


export type MutationUpdateRoleArgs = {
  input: RoleUpdateInput;
  personaId: Scalars['Int']['input'];
  sceneId: Scalars['Int']['input'];
};


export type MutationUpdateSceneArgs = {
  id: Scalars['Int']['input'];
  input: SceneUpdateInput;
};


export type MutationUpdateStoryArgs = {
  id: Scalars['Int']['input'];
  input: StoryUpdateInput;
};

export type Persona = {
  __typename?: 'Persona';
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  initiatedConnections: Array<Connection>;
  name: Scalars['String']['output'];
  receivedConnections: Array<Connection>;
  story: Story;
};


export type PersonaInitiatedConnectionsArgs = {
  targetPersonaId?: InputMaybe<Scalars['Int']['input']>;
};


export type PersonaReceivedConnectionsArgs = {
  sourcePersonaId?: InputMaybe<Scalars['Int']['input']>;
};

export type PersonaInput = {
  description: Scalars['String']['input'];
  initiatedConnectionInputs?: InputMaybe<Array<ConnectionInput>>;
  name: Scalars['String']['input'];
  storyId: Scalars['Int']['input'];
};

export type PersonaUpdateInput = {
  addInitiatedConnectionInputs?: InputMaybe<Array<ConnectionInput>>;
  description?: InputMaybe<Scalars['String']['input']>;
  modifyInitiatedConnectionInputs?: InputMaybe<Array<ConnectionInput>>;
  name?: InputMaybe<Scalars['String']['input']>;
  removeInitiatedConnectionIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type Query = {
  __typename?: 'Query';
  allPersonas: Array<Persona>;
  allScenes: Array<Scene>;
  allStories: Array<Story>;
  allUsers: Array<User>;
  getConversation: Array<Message>;
  getPersona: Persona;
  getPersonaByName: Persona;
  getPersonaConversations: Array<Persona>;
  getScene: Scene;
  getStory: Story;
  getStorySession: StorySession;
  getUser: User;
  getUserStorySessions: Array<StorySession>;
};


export type QueryGetConversationArgs = {
  firstPersonaId: Scalars['Int']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  secondPersonaId: Scalars['Int']['input'];
  storySessionId: Scalars['Int']['input'];
};


export type QueryGetPersonaArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetPersonaByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryGetPersonaConversationsArgs = {
  personaId: Scalars['Int']['input'];
  storySessionId: Scalars['Int']['input'];
};


export type QueryGetSceneArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetStoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetStorySessionArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetUserStorySessionsArgs = {
  storyId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type Role = {
  __typename?: 'Role';
  actions: Array<Action>;
  description: Scalars['String']['output'];
  persona: Persona;
  scene: Scene;
};

export type RoleInput = {
  actionIds: Array<Scalars['Int']['input']>;
  description: Scalars['String']['input'];
  personaId: Scalars['Int']['input'];
  sceneId: Scalars['Int']['input'];
};

export type RoleUpdateInput = {
  addActionIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  removeActionIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type Scene = {
  __typename?: 'Scene';
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  roles: Array<Role>;
  story: Story;
  title: Scalars['String']['output'];
};

export type SceneInput = {
  description: Scalars['String']['input'];
  storyId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type SceneUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  storyId?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Story = {
  __typename?: 'Story';
  actions: Array<Action>;
  description: Scalars['String']['output'];
  editors: Array<User>;
  id: Scalars['Int']['output'];
  personas: Array<Persona>;
  scenes: Array<Scene>;
  title: Scalars['String']['output'];
};

export type StoryInput = {
  description: Scalars['String']['input'];
  editorIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  title: Scalars['String']['input'];
};

export type StorySession = {
  __typename?: 'StorySession';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  story: Story;
  user: User;
};

export type StorySessionInput = {
  name?: Scalars['String']['input'];
  storyId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type StoryUpdateInput = {
  addEditorIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  removeEditorIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  stories: Array<Story>;
  storySessions: Array<StorySession>;
};

export type UserMessageInput = {
  recipientId: Scalars['Int']['input'];
  sceneId: Scalars['Int']['input'];
  senderId: Scalars['Int']['input'];
  storySessionId: Scalars['Int']['input'];
  text: Scalars['String']['input'];
};

export type UserMessageResponse = {
  __typename?: 'UserMessageResponse';
  replyMessage: Message;
  userMessage: Message;
};

export type GetInitatedConnectionQueryVariables = Exact<{
  getPersonaId: Scalars['Int']['input'];
  targetPersonaId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetInitatedConnectionQuery = { __typename?: 'Query', getPersona: { __typename?: 'Persona', name: string, initiatedConnections: Array<{ __typename?: 'Connection', description: string, targetPersona: { __typename?: 'Persona', name: string } }> } };

export type GetReceivedConnectionQueryVariables = Exact<{
  getPersonaId: Scalars['Int']['input'];
  sourcePersonaId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetReceivedConnectionQuery = { __typename?: 'Query', getPersona: { __typename?: 'Persona', name: string, receivedConnections: Array<{ __typename?: 'Connection', description: string, sourcePersona: { __typename?: 'Persona', name: string } }> } };

export type AddConnectionMutationVariables = Exact<{
  input: PersonaUpdateInput;
  updatePersonaId: Scalars['Int']['input'];
}>;


export type AddConnectionMutation = { __typename?: 'Mutation', updatePersona: boolean };

export type UpdatePersonaMutationVariables = Exact<{
  input: PersonaUpdateInput;
  updatePersonaId: Scalars['Int']['input'];
}>;


export type UpdatePersonaMutation = { __typename?: 'Mutation', updatePersona: boolean };

export type GetUserStoriesQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetUserStoriesQuery = { __typename?: 'Query', getUser: { __typename?: 'User', stories: Array<{ __typename?: 'Story', id: number, title: string, description: string }> } };

export type CreateStoryMutationVariables = Exact<{
  input: StoryInput;
}>;


export type CreateStoryMutation = { __typename?: 'Mutation', createStory: { __typename?: 'Story', id: number } };

export type MutationMutationVariables = Exact<{
  deleteStoryId: Scalars['Int']['input'];
}>;


export type MutationMutation = { __typename?: 'Mutation', deleteStory: boolean };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', allUsers: Array<{ __typename?: 'User', id: number, email: string }> };

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: number, email: string } };

export type GetPersonaQueryVariables = Exact<{
  getPersonaId: Scalars['Int']['input'];
}>;


export type GetPersonaQuery = { __typename?: 'Query', getPersona: { __typename?: 'Persona', name: string, description: string, story: { __typename?: 'Story', id: number }, initiatedConnections: Array<{ __typename?: 'Connection', targetPersona: { __typename?: 'Persona', name: string, id: number } }>, receivedConnections: Array<{ __typename?: 'Connection', sourcePersona: { __typename?: 'Persona', name: string, id: number } }> } };

export type GetStoryQueryVariables = Exact<{
  getStoryId: Scalars['Int']['input'];
}>;


export type GetStoryQuery = { __typename?: 'Query', getStory: { __typename?: 'Story', personas: Array<{ __typename?: 'Persona', id: number, name: string }> } };

export type GetStorySessionQueryVariables = Exact<{
  storySessionId: Scalars['Int']['input'];
}>;


export type GetStorySessionQuery = { __typename?: 'Query', getStorySession: { __typename?: 'StorySession', id: number, name: string, story: { __typename?: 'Story', id: number, title: string, description: string, personas: Array<{ __typename?: 'Persona', name: string, id: number, description: string }>, scenes: Array<{ __typename?: 'Scene', id: number, title: string }> } } };

export type GetConversationQueryVariables = Exact<{
  secondPersonaId: Scalars['Int']['input'];
  firstPersonaId: Scalars['Int']['input'];
  storySessionId: Scalars['Int']['input'];
}>;


export type GetConversationQuery = { __typename?: 'Query', getConversation: Array<{ __typename?: 'Message', id: number, createdAt: any, text: string, scene: { __typename?: 'Scene', id: number, title: string }, sender: { __typename?: 'Persona', id: number, name: string } }> };

export type CreateUserMessageMutationVariables = Exact<{
  input: UserMessageInput;
}>;


export type CreateUserMessageMutation = { __typename?: 'Mutation', createUserMessage: { __typename?: 'UserMessageResponse', userMessage: { __typename?: 'Message', id: number, createdAt: any, text: string, sender: { __typename?: 'Persona', id: number, name: string }, scene: { __typename?: 'Scene', id: number, title: string } }, replyMessage: { __typename?: 'Message', id: number, createdAt: any, text: string, sender: { __typename?: 'Persona', id: number, name: string }, scene: { __typename?: 'Scene', id: number, title: string } } } };

export type RolesQueryVariables = Exact<{
  getSceneId: Scalars['Int']['input'];
}>;


export type RolesQuery = { __typename?: 'Query', getScene: { __typename?: 'Scene', story: { __typename?: 'Story', id: number }, roles: Array<{ __typename?: 'Role', description: string, actions: Array<{ __typename?: 'Action', name: string, id: number }>, persona: { __typename?: 'Persona', id: number, name: string } }> } };

export type UpdateRoleMutationVariables = Exact<{
  input: RoleUpdateInput;
  sceneId: Scalars['Int']['input'];
  personaId: Scalars['Int']['input'];
}>;


export type UpdateRoleMutation = { __typename?: 'Mutation', updateRole: boolean };

export type CreateActionMutationVariables = Exact<{
  input: ActionInput;
}>;


export type CreateActionMutation = { __typename?: 'Mutation', createAction: { __typename?: 'Action', id: number, name: string } };

export type DeleteActionMutationVariables = Exact<{
  deleteActionId: Scalars['Int']['input'];
}>;


export type DeleteActionMutation = { __typename?: 'Mutation', deleteAction: boolean };

export type GetSceneQueryVariables = Exact<{
  getSceneId: Scalars['Int']['input'];
}>;


export type GetSceneQuery = { __typename?: 'Query', getScene: { __typename?: 'Scene', description: string, id: number, title: string, story: { __typename?: 'Story', id: number }, roles: Array<{ __typename?: 'Role', persona: { __typename?: 'Persona', name: string, id: number } }> } };

export type UpdateSceneMutationVariables = Exact<{
  input: SceneUpdateInput;
  updateSceneId: Scalars['Int']['input'];
}>;


export type UpdateSceneMutation = { __typename?: 'Mutation', updateScene: boolean };

export type CreateRoleMutationVariables = Exact<{
  input: RoleInput;
}>;


export type CreateRoleMutation = { __typename?: 'Mutation', createRole: { __typename?: 'Role', persona: { __typename?: 'Persona', id: number }, scene: { __typename?: 'Scene', title: string } } };

export type DeleteRoleMutationVariables = Exact<{
  personaId: Scalars['Int']['input'];
  sceneId: Scalars['Int']['input'];
}>;


export type DeleteRoleMutation = { __typename?: 'Mutation', deleteRole: boolean };

export type GetStoryDetailsQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetStoryDetailsQuery = { __typename?: 'Query', getStory: { __typename?: 'Story', id: number, title: string, description: string, personas: Array<{ __typename?: 'Persona', id: number, name: string, description: string }>, scenes: Array<{ __typename?: 'Scene', id: number, title: string, description: string }> } };

export type GetUserStorySessionsQueryVariables = Exact<{
  storyId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
}>;


export type GetUserStorySessionsQuery = { __typename?: 'Query', getUserStorySessions: Array<{ __typename?: 'StorySession', id: number, name: string, story: { __typename?: 'Story', title: string }, user: { __typename?: 'User', email: string } }> };

export type UpdateStoryMutationVariables = Exact<{
  input: StoryUpdateInput;
  updateStoryId: Scalars['Int']['input'];
}>;


export type UpdateStoryMutation = { __typename?: 'Mutation', updateStory: boolean };

export type CreatePersonaMutationVariables = Exact<{
  input: PersonaInput;
}>;


export type CreatePersonaMutation = { __typename?: 'Mutation', createPersona: { __typename?: 'Persona', name: string } };

export type CreateStorySessionMutationVariables = Exact<{
  input: StorySessionInput;
}>;


export type CreateStorySessionMutation = { __typename?: 'Mutation', createStorySession: { __typename?: 'StorySession', id: number } };

export type CreateSceneMutationVariables = Exact<{
  input: SceneInput;
}>;


export type CreateSceneMutation = { __typename?: 'Mutation', createScene: { __typename?: 'Scene', title: string } };

export type DeletePersonaMutationVariables = Exact<{
  deletePersonaId: Scalars['Int']['input'];
}>;


export type DeletePersonaMutation = { __typename?: 'Mutation', deletePersona: boolean };

export type DeleteSceneMutationVariables = Exact<{
  deleteSceneId: Scalars['Int']['input'];
}>;


export type DeleteSceneMutation = { __typename?: 'Mutation', deleteScene: boolean };

export type DeleteStorySessionMutationVariables = Exact<{
  storySessionId: Scalars['Int']['input'];
}>;


export type DeleteStorySessionMutation = { __typename?: 'Mutation', deleteStorySession: boolean };


export const GetInitatedConnectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetInitatedConnection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getPersonaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"targetPersonaId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPersona"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getPersonaId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"initiatedConnections"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"targetPersonaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"targetPersonaId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"targetPersona"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetInitatedConnectionQuery, GetInitatedConnectionQueryVariables>;
export const GetReceivedConnectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetReceivedConnection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getPersonaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sourcePersonaId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPersona"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getPersonaId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"receivedConnections"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sourcePersonaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sourcePersonaId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"sourcePersona"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetReceivedConnectionQuery, GetReceivedConnectionQueryVariables>;
export const AddConnectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddConnection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PersonaUpdateInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updatePersonaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePersona"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updatePersonaId"}}}]}]}}]} as unknown as DocumentNode<AddConnectionMutation, AddConnectionMutationVariables>;
export const UpdatePersonaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePersona"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PersonaUpdateInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updatePersonaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePersona"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updatePersonaId"}}}]}]}}]} as unknown as DocumentNode<UpdatePersonaMutation, UpdatePersonaMutationVariables>;
export const GetUserStoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserStories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserStoriesQuery, GetUserStoriesQueryVariables>;
export const CreateStoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateStory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createStory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateStoryMutation, CreateStoryMutationVariables>;
export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteStoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteStory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteStoryId"}}}]}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;
export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const GetPersonaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPersona"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getPersonaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPersona"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getPersonaId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"story"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"initiatedConnections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"targetPersona"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"receivedConnections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sourcePersona"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPersonaQuery, GetPersonaQueryVariables>;
export const GetStoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getStoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getStory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getStoryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"personas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetStoryQuery, GetStoryQueryVariables>;
export const GetStorySessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStorySession"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storySessionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getStorySession"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storySessionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"story"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"personas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scenes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetStorySessionQuery, GetStorySessionQueryVariables>;
export const GetConversationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetConversation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"secondPersonaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstPersonaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storySessionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getConversation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"secondPersonaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"secondPersonaId"}}},{"kind":"Argument","name":{"kind":"Name","value":"firstPersonaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstPersonaId"}}},{"kind":"Argument","name":{"kind":"Name","value":"storySessionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storySessionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"scene"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetConversationQuery, GetConversationQueryVariables>;
export const CreateUserMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUserMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserMessageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUserMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userMessage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scene"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"replyMessage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scene"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateUserMessageMutation, CreateUserMessageMutationVariables>;
export const RolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Roles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getSceneId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getScene"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getSceneId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"story"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"actions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"persona"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<RolesQuery, RolesQueryVariables>;
export const UpdateRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RoleUpdateInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sceneId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"personaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"sceneId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sceneId"}}},{"kind":"Argument","name":{"kind":"Name","value":"personaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"personaId"}}}]}]}}]} as unknown as DocumentNode<UpdateRoleMutation, UpdateRoleMutationVariables>;
export const CreateActionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ActionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateActionMutation, CreateActionMutationVariables>;
export const DeleteActionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteAction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteActionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteActionId"}}}]}]}}]} as unknown as DocumentNode<DeleteActionMutation, DeleteActionMutationVariables>;
export const GetSceneDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetScene"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getSceneId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getScene"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getSceneId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"story"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"persona"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetSceneQuery, GetSceneQueryVariables>;
export const UpdateSceneDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateScene"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SceneUpdateInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateSceneId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateScene"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateSceneId"}}}]}]}}]} as unknown as DocumentNode<UpdateSceneMutation, UpdateSceneMutationVariables>;
export const CreateRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RoleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"persona"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scene"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<CreateRoleMutation, CreateRoleMutationVariables>;
export const DeleteRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"personaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sceneId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"personaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"personaId"}}},{"kind":"Argument","name":{"kind":"Name","value":"sceneId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sceneId"}}}]}]}}]} as unknown as DocumentNode<DeleteRoleMutation, DeleteRoleMutationVariables>;
export const GetStoryDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStoryDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getStory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"personas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scenes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<GetStoryDetailsQuery, GetStoryDetailsQueryVariables>;
export const GetUserStorySessionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserStorySessions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserStorySessions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"storyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"story"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetUserStorySessionsQuery, GetUserStorySessionsQueryVariables>;
export const UpdateStoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateStory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StoryUpdateInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateStoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateStoryId"}}}]}]}}]} as unknown as DocumentNode<UpdateStoryMutation, UpdateStoryMutationVariables>;
export const CreatePersonaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePersona"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PersonaInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPersona"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreatePersonaMutation, CreatePersonaMutationVariables>;
export const CreateStorySessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateStorySession"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StorySessionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createStorySession"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateStorySessionMutation, CreateStorySessionMutationVariables>;
export const CreateSceneDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateScene"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SceneInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createScene"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<CreateSceneMutation, CreateSceneMutationVariables>;
export const DeletePersonaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePersona"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deletePersonaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePersona"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deletePersonaId"}}}]}]}}]} as unknown as DocumentNode<DeletePersonaMutation, DeletePersonaMutationVariables>;
export const DeleteSceneDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteScene"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteSceneId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteScene"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteSceneId"}}}]}]}}]} as unknown as DocumentNode<DeleteSceneMutation, DeleteSceneMutationVariables>;
export const DeleteStorySessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteStorySession"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storySessionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteStorySession"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storySessionId"}}}]}]}}]} as unknown as DocumentNode<DeleteStorySessionMutation, DeleteStorySessionMutationVariables>;