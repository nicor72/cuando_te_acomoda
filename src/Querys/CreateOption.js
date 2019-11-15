import gql from 'graphql-tag';

export const CREATE_OPTION = gql`
    mutation CreateOption($reunionId: ID!, $date: String!, $hour: String!) {
        createOption(
            reunionId: $reunionId, 
            date: $date, 
            hour: $hour
        ) {
            id,
            date,
            hour
        }   
    }
`;