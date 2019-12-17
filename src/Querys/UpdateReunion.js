import gql from 'graphql-tag';

export const UPDATE_REUNION = gql`
    mutation UpdateReunion($id: ID!, $name: String!, $where: String!, $description: String!) {
        updateReunion(
            id: $id, 
            name: $name,
            where: $where,
            description: $description,
        ) {
            id
        }   
    }
`;