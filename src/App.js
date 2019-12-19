import React, { useEffect, useState } from 'react'
import './App.scss'
import { useQuery } from '@apollo/react-hooks'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { Column, Navbar, Button, Footer, Content } from "rbx"

import { LOGGED_IN_USER } from './Querys/LoggedInUser'  

import Reunions from './Components/Reunions'
import Dashboard from './Components/Dashboard'
import Login from './Components/Login'

function App() {
    const { data: queryData, loading: queryLoading } = useQuery(LOGGED_IN_USER);

    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        if (typeof queryData !== 'undefined' && queryData.loggedInUser !== null) {
            setIsLogin(true)
        }
    }, [queryData])

    return (
        <Router>
            <Column className="is-half is-offset-one-quarter has-text-centered">
                <Navbar color="warning">
                    <Navbar.Brand>
                        <Navbar.Item href="#">
                            <img
                            src="https://bulma.io/images/bulma-logo.png"
                            alt=""
                            role="presentation"
                            width="112"
                            height="28"
                            />
                        </Navbar.Item>
                        <Navbar.Burger />
                    </Navbar.Brand>
                    
                    <Navbar.Menu>
                        <Navbar.Segment align="start">
                            <Navbar.Item>
                                <Link to="/" style={{ color: 'black' }}>
                                    Inicio
                                </Link>
                            </Navbar.Item>
                            <Navbar.Item>
                                <Link to="/imanadmin" style={{ color: 'black' }}>
                                    Administrador
                                </Link>
                            </Navbar.Item>
                        </Navbar.Segment>

                        <Navbar.Segment align="end">
                            <Navbar.Item>
                            {
                                isLogin &&
                                    <Button 
                                        color="light" 
                                        onClick={() => {window.localStorage.removeItem("token"); window.location.replace('/');}}
                                    >
                                        Log out
                                    </Button>
                            }
                            </Navbar.Item>
                        </Navbar.Segment>
                    </Navbar.Menu>
                </Navbar>
            </Column>
            
            <Route exact path="/">
                <Reunions />
            </Route>
            
            <Route path="/imanadmin">
                <div style={{flex: 1, marginBottom: '2em'}}>
                    {
                        isLogin ?
                            <Dashboard />
                        :
                            <Login
                                setIsLogin={setIsLogin}
                            /> 
                    }
                </div>
            </Route>

            <Column className="is-half is-offset-one-quarter has-text-centered">
                <Footer>
                    <Content textAlign="centered">
                        <p>
                            <strong>¿Cuándo te acomoda?</strong> by {' '}
                            <a href="http://nicolasroman.com" target="_blank" rel="noopener noreferrer">Nicolás Román</a>.
                            Source code is available{' '}
                            <a href="https://github.com/nicor72/cuando_te_acomoda" target="_blank" rel="noopener noreferrer">
                                here
                            </a>.
                        </p>
                    </Content>
                </Footer>
            </Column>
        </Router>
    );
}

export default App;
