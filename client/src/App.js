import React from 'react';
// add these two library import statements
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost'; 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Tasks from './pages/Tasks';
import CreateProject from './pages/CreateProject';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';

// Added by Brent 8/25/2020
import { StoreProvider } from './utils/GlobalState';
// end brent

import './App.css';


const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <StoreProvider>
            <Header />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/tasks" component={Tasks} />
                <Route exact path="/CreateProject" component={CreateProject} />
                
              </Switch>
              <Footer />
            </div>
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;

