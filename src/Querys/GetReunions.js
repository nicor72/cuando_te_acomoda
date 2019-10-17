import gql from 'graphql-tag';

export const GET_REUNIONS = gql`
  {
    allReunions(first: 1){
        name
        description
        where
        options {
            id
            date
            hour
            answers {
                author
            }
        }
    }
  }
`;