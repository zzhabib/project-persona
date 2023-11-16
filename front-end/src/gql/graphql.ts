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
};


export type QueryGetConversationArgs = {
  firstPersonaId: Scalars['Int']['input'];
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
  story: Story;
  user: User;
};

export type StorySessionInput = {
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

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', allUsers: Array<{ __typename?: 'User', id: number, email: string }> };


export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;