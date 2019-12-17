import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Column, Navbar, Button, Footer, Content, Section, Progress } from "rbx";

import Dashboard from './Dashboard'
import Login from './Login'

import { LOGGED_IN_USER } from './../Querys/LoggedInUser'
import { AUTH_USER } from './../Querys/AuthUser'

const AdminPanel = () => {
    const { data: queryData, loading: queryLoading } = useQuery(LOGGED_IN_USER);
    const [authenticateUser, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(AUTH_USER);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        if (typeof queryData !== 'undefined' && queryData.loggedInUser !== null) {
            setIsLogin(true)
        }
    }, [queryData])

    useEffect(() => {
        if (typeof mutationData !== 'undefined') {
            window.localStorage.setItem("token", mutationData.authenticateUser.token);
            setIsLogin(true)
        }
    }, [mutationData]) 

    if (mutationLoading || queryLoading) 
        return <Section size="large">
                    <Column className="is-half is-offset-one-quarter has-text-centered">
                        <Column size={4} offset={4}>
                            <Progress size="small" color="primary"/>
                        </Column>
                    </Column>
                </Section>
    if (mutationError) return `Error! ${mutationError.message}`;

    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        authenticateUser({
            variables: {
                email: email, 
                password: password,
            }
        })
    }

    return(
        <>
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
                    
                    {
                        isLogin &&
                        <Navbar.Menu>
                            <Navbar.Segment align="end">
                                <Navbar.Item>
                                    <Button color="light" onClick={() => {window.localStorage.removeItem("token"); window.location.reload();}}>Log out</Button>
                                </Navbar.Item>
                            </Navbar.Segment>
                        </Navbar.Menu>
                    }
                </Navbar>
            </Column>
            
            <div style={{flex: 1, marginBottom: '2em'}}>
                {
                    isLogin ?
                        <Dashboard />
                    :
                        <Login
                            email={email}
                            password={password}
                            setEmail={setEmail}
                            setPassword={setPassword}
                            handleSubmit={handleSubmit}
                        /> 
                }
            </div>

            <Column className="is-half is-offset-one-quarter has-text-centered">
                <Footer>
                    <Content textAlign="centered">
                        <p>
                        <strong>¿Cuándo te acomoda?</strong> by <a href="https://github.com/nicor72">Nicolás Román</a>.
                        The source code is released under the{' '}
                        <a href="https://opensource.org/licenses/mit-license.php">
                            MIT License
                        </a>
                        . The website content is licensed{' '}
                        <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
                            CC BY NC SA 4.0
                        </a>
                        .
                        </p>
                    </Content>
                </Footer>
            </Column>

        </>
            
    )
}

export default AdminPanel