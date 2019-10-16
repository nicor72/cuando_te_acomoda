import gql from 'graphql-tag';

export const GET_REUNIONS = gql`
  {
    allReunions(first: 1){
        name
        options {
            id
            date
            hour
        } 
    }
  }
`;