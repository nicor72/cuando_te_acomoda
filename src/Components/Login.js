import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { Column, Button, Field, Control, Input, Icon } from "rbx";


const Login = ({handleSubmit, setEmail, setPassword}) => {

    return(
        <>
            <form onSubmit={handleSubmit}>
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
                        <strong>Sign up</strong>
                    </Button>
                </Column>
            </form>
        </>      
            
    )
}

export default Login