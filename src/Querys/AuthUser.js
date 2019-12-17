import gql from 'graphql-tag';

export const AUTH_USER = gql`
    mutation AuthenticateUser($email: String!, $password: String!){
        authenticateUser(
            email: $email, 
            password: $password
        ) {
            token
        }
    }
`;