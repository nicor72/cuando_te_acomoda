import React from 'react';
import './App.scss';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'

import Reunions from './Components/Reunions'

const client = new ApolloClient({
  uri: 'https://api.graph.cool/simple/v1/ck14da22p0s3c0168xi7w3dro',
});

function App() {
  return (
    <ApolloProvider client={client}>
        <Reunions />
    </ApolloProvider>
  );
}

export default App;
