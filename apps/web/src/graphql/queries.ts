import { gql } from '@apollo/client';

// List all diaries
export const SITE_DIARIES = gql`
  query SiteDiaries {
    siteDiaries {
      id
      title
      date
      createdBy
      content
      weather {
        temperature
        description
      }
    }
  }
`;

// View single diary
export const SITE_DIARY = gql`
  query SiteDiary($id: String!) {
    siteDiary(id: $id) {
      id
      title
      date
      content
      createdBy
      weather {
        description
        temperature
      }
      attendees
      attachments
    }
  }
`;

// Create diary
export const CREATE_SITE_DIARY = gql`
  mutation CreateSiteDiary($input: SiteDiaryInput!) {
    createSiteDiary(input: $input) {
      id
      title
      date
      createdBy
      content
      attendees
      attachments
      weather {
        temperature
        description
      }
    }
  }
`;
