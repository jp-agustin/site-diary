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
};

export type BeautifiedDiary = {
  __typename: 'BeautifiedDiary';
  beautified: Scalars['String']['output'];
};

export type Mutation = {
  __typename: 'Mutation';
  beautifyDiaryInput: BeautifiedDiary;
  createSiteDiary: SiteDiary;
};


export type MutationBeautifyDiaryInputArgs = {
  content: Scalars['String']['input'];
};


export type MutationCreateSiteDiaryArgs = {
  input: SiteDiaryInput;
};

export type Query = {
  __typename: 'Query';
  siteDiaries: Array<SiteDiary>;
  siteDiary: Maybe<SiteDiary>;
  siteDiarySummary: SiteDiarySummary;
};


export type QuerySiteDiaryArgs = {
  id: Scalars['String']['input'];
};

export type SiteDiary = {
  __typename: 'SiteDiary';
  attachments: Maybe<Array<Scalars['String']['output']>>;
  attendees: Maybe<Array<Scalars['String']['output']>>;
  content: Maybe<Scalars['String']['output']>;
  createdBy: Scalars['String']['output'];
  date: Scalars['String']['output'];
  id: Scalars['String']['output'];
  title: Scalars['String']['output'];
  weather: Maybe<Weather>;
};

export type SiteDiaryInput = {
  attachments?: InputMaybe<Array<Scalars['String']['input']>>;
  attendees?: InputMaybe<Array<Scalars['String']['input']>>;
  content?: InputMaybe<Scalars['String']['input']>;
  createdBy: Scalars['String']['input'];
  date: Scalars['String']['input'];
  id: Scalars['String']['input'];
  title: Scalars['String']['input'];
  weather?: InputMaybe<WeatherInput>;
};

export type SiteDiarySummary = {
  __typename: 'SiteDiarySummary';
  summary: Scalars['String']['output'];
};

export type Weather = {
  __typename: 'Weather';
  description: Scalars['String']['output'];
  temperature: Scalars['Int']['output'];
};

export type WeatherInput = {
  description: Scalars['String']['input'];
  temperature: Scalars['Int']['input'];
};

export type SiteDiariesQueryVariables = Exact<{ [key: string]: never; }>;


export type SiteDiariesQuery = { siteDiaries: Array<{ __typename: 'SiteDiary', id: string, title: string, date: string, createdBy: string, content: string | null, weather: { __typename: 'Weather', temperature: number, description: string } | null }> };

export type SiteDiaryQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type SiteDiaryQuery = { siteDiary: { __typename: 'SiteDiary', id: string, title: string, date: string, content: string | null, createdBy: string, attendees: Array<string> | null, attachments: Array<string> | null, weather: { __typename: 'Weather', description: string, temperature: number } | null } | null };

export type CreateSiteDiaryMutationVariables = Exact<{
  input: SiteDiaryInput;
}>;


export type CreateSiteDiaryMutation = { createSiteDiary: { __typename: 'SiteDiary', id: string, title: string, date: string, createdBy: string, content: string | null, attendees: Array<string> | null, attachments: Array<string> | null, weather: { __typename: 'Weather', temperature: number, description: string } | null } };

export type SiteDiarySummaryQueryVariables = Exact<{ [key: string]: never; }>;


export type SiteDiarySummaryQuery = { siteDiarySummary: { __typename: 'SiteDiarySummary', summary: string } };

export type BeautifyDiaryMutationVariables = Exact<{
  content: Scalars['String']['input'];
}>;


export type BeautifyDiaryMutation = { beautifyDiaryInput: { __typename: 'BeautifiedDiary', beautified: string } };
