import gql from 'graphql-tag';

export const DELETE_OPTION = gql`
    mutation DeleteOption($id: ID!) {
        deleteOption(
            id: $id
        ) {
            id
        }   
    }
`;