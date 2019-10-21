import React, { useState, useEffect }from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faCheck, faLock} from '@fortawesome/free-solid-svg-icons'
import { Column, Title, Button, Field, Control, Input, Icon, Message} from "rbx";

const AnswerForm = ({handleSubmit, nombre, setNombre, depto, setDepto, setDate}) => {
    const [disabled, setDisabled] = useState(true)
    const [error, setError] = useState(false)
 
    useEffect(() => {
        if (nombre !== '' && depto !== '') {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [nombre, depto])

    return(
        <form onSubmit={e => handleSubmit(e)}>
            <Column className="has-text-centered">
                <Title>Ingresa tus datos</Title>  
            </Column>

            {
                error &&
                <Message color="danger">
                    <Message.Body className="has-text-centered">
                        Completa los datos para continuar.
                    </Message.Body>
                </Message>
            }

            <Column className="is-half is-offset-one-quarter">      
                <Field>
                    <Control iconLeft iconRight>
                        <Input 
                            type="text"
                            placeholder="Nombre" 
                            onKeyUp={e => setNombre(e.target.value)}
                        />
                        <Icon align="left">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </Icon>
                        <Icon align="right">
                            <FontAwesomeIcon icon={faCheck} />
                        </Icon>
                    </Control>
                </Field>
                <Field>
                    <Control iconLeft>
                        <Input 
                            type="number" 
                            placeholder="Depto" 
                            onKeyUp={e => setDepto(e.target.value)}
                        />
                        <Icon align="left">
                            <FontAwesomeIcon icon={faLock} />
                        </Icon>
                    </Control>
                </Field>
            </Column>

            <Column className="has-text-centered">    
                <Button 
                    type="submit"
                    rounded 
                    disabled={disabled}
                    size="large" 
                    color="primary"
                >
                    Listo!
                </Button>
            </Column>

            <Column className="has-text-centered">
                <Button
                    onClick={
                        e => {
                            e.preventDefault()
                            setDate('')
                        }
                    }
                >
                    Volver
                </Button>
            </Column>
        </form>  
    )
}

export default AnswerForm