// import { ApolloClient } from 'apollo-client'
// import { HttpLink } from 'apollo-link-http'
// import { InMemoryCache } from 'apollo-cache-inmemory'

// const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/ck143nixg6izq0140p0r1c60q' })

// const client = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache({
//     addTypename: false
//   })
// })

import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://api.graph.cool/simple/v1/ck14da22p0s3c0168xi7w3dro',
});

export default client