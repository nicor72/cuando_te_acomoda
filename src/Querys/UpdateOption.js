import gql from 'graphql-tag';

export const UPDATE_OPTION = gql`
    mutation UpdateOption($id: ID!, $date: String!, $hour: String!) {
        updateOption(
            id: $id, 
            date: $date,
            hour: $hour
        ) {
            id
        }   
    }
`;