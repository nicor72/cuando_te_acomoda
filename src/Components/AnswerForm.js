import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faCheck, faLock} from '@fortawesome/free-solid-svg-icons'
import { Column, Title, Button, Field, Control, Input, Icon} from "rbx";

const AnswerForm = ({handleSubmit, setNombre, setDepto, setDate}) => {
    return(
        <form onSubmit={e => handleSubmit(e)}>
            <Column className="has-text-centered">
                <Title>Ingresa tus datos</Title>  
            </Column>

            <Column className="is-half is-offset-one-quarter">      
                <Field>
                    <Control iconLeft iconRight>
                        <Input type="text" placeholder="Nombre" onChange={e => setNombre(e.target.value)}/>
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
                        <Input type="number" placeholder="Depto" onChange={e => setDepto(e.target.value)}/>
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
                    size="large" 
                    color="primary"
                >
                    Listo!
                </Button>
            </Column>

            <Column className="has-text-centered">
                <Button
                    onClick={e => setDate('')}
                >
                    Volver
                </Button>
            </Column>
        </form>  
    )
}

export default AnswerForm