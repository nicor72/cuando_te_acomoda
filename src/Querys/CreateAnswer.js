import gql from 'graphql-tag';

export const CREATE_ANSWER = gql`
    mutation CreateAnswer($author: String!, $depto: Int!, $optionId: ID) {
        createAnswer(
            author: $author, 
            depto: $depto,
            optionId: $optionId
        ) {
            id
        }   
    }
`;