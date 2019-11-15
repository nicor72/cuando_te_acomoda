import gql from 'graphql-tag';

export const GET_REUNIONS = gql`
  {
    allReunions(first: 1){
        id
        name
        description
        where
        options {
            id
            date
            hour
            answers {
                author
                depto
            }
        }
    }
  }
`;