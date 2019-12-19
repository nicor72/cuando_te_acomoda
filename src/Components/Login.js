import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { Column, Button, Field, Control, Input, Icon, Section, Progress, Title } from "rbx"

import { AUTH_USER } from './../Querys/AuthUser'

const Login = ({setIsLogin}) => {

    const [authenticateUser, { data, loading, error }] = useMutation(AUTH_USER);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (typeof data !== 'undefined') {
            window.localStorage.setItem("token", data.authenticateUser.token);
            setIsLogin(true)
        }
    }, [data]) 

    if (loading) 
        return <Section size="large">
                    <Column className="is-half is-offset-one-quarter has-text-centered">
                        <Column size={4} offset={4}>
                            <Progress size="small" color="primary"/>
                        </Column>
                    </Column>
                </Section>
    if (error) return `Error! ${error.message}`;

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
            <form onSubmit={handleSubmit}>
                
                <Column className="has-text-centered">
                    <Title>Ingresa tus datos</Title>  
                </Column>

                <Column className="is-half is-offset-one-quarter">      
                    <Field>
                        <Control iconLeft iconRight>
                            <Input 
                                type="email"
                                placeholder="Email" 
                                onChange={e => setEmail(e.target.value)}
                            />
                            <Icon align="left">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </Icon>
                        </Control>
                    </Field>
                    <Field>
                        <Control iconLeft>
                            <Input 
                                type="password" 
                                placeholder="Password"
                                onChange={e => setPassword(e.target.value)}
                            />
                            <Icon align="left">
                                <FontAwesomeIcon icon={faLock} />
                            </Icon>
                        </Control>
                    </Field>
                </Column>

                <Column className="has-text-centered">    
                    <Button color="primary">
                        <strong>Log in</strong>
                    </Button>
                </Column>
            </form>
        </>      
            
    )
}

export default Login