import React from 'react';
import './App.scss';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'
import {
    BrowserRouter as Router,
    Route
  } from "react-router-dom";

import Reunions from './Components/Reunions'
import AdminPanel from './Components/AdminPanel'

const client = new ApolloClient({
  uri: 'https://api.graph.cool/simple/v1/ck14da22p0s3c0168xi7w3dro',
  request: (operation) => {
    const token = window.localStorage.getItem('token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  }
});

function App() {
  return (
    <ApolloProvider client={client}>
        <Router>
            <Route exact path="/">
                <Reunions />
            </Route>
            <Route path="/imanadmin">
                <AdminPanel />
            </Route>
        </Router>
    </ApolloProvider>
  );
}

export default App;
