import React, {useState, useEffect} from 'react';
import "rbx/index.css";
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply, faRetweet, faHeart, faEnvelope, faCheck, faLock } from '@fortawesome/free-solid-svg-icons'
import { 
    Container,
    Column,
    Icon,
    Box,
    Media,
    Image,
    Content,
    Level,
    Button,
    Table,
    Label,
    Checkbox,
    Control,
    Field,
    Input,
    Title,
    Message
} from "rbx";

const GET_REUNIONS = gql`
  {
    allReunions(first: 1){
        name
        options {
            id
            date
            hour
        } 
    }
  }
`;

const Reunions = () => {

    const { loading, error, data } = useQuery(GET_REUNIONS);
    const [canIGo, setCanIGo] = useState(false)
    const [date, setDate] = useState('')
    const [nombre, setNombre] = useState('')
    const [depto, setDepto] = useState('')
    const [options, setOptions] = useState({})
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        if (typeof data !== 'undefined') {
            const options = data.allReunions[0].options.reduce(
                (options, option) => ({
                ...options,
                [option.id]: false
                }),
                {}
            ) 
            setOptions(options)
        }
    }, [data])

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    
    const handleSubmit = (e) => {
        e.preventDefault();

        Object.keys(options)
        .filter(option => options[option])
        .forEach(option => {console.log(option)});

        console.log(nombre)
        console.log(depto)

        setDate(false)
        setSubmitted(true)
    }
    
    return(
        <Container style={{margin: '3em'}}>
            {
                !canIGo && date.length <= 0 &&
                    <>
                        <Column className="has-text-centered">
                            <Title>Proxima Reunión</Title>
                            <Box>
                                <Media>
                                    <Media.Item align="left">
                                    <Image.Container size={64}>
                                        <Image
                                            alt="Image"
                                            src="https://bulma.io/images/placeholders/128x128.png"
                                        />
                                    </Image.Container>
                                    </Media.Item>
                                    <Media.Item>
                                    <Content>
                                        <p>
                                        <strong>{data.allReunions[0].name}</strong> <small>@johnsmith</small> <br />
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                                        ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas
                                        non massa sem. Etiam finibus odio quis feugiat facilisis.
                                        </p>
                                    </Content>
                                    <Level breakpoint="mobile">
                                        <Level.Item align="left">
                                        <Level.Item as="a" aria-label="reply">
                                            <Icon size="small">
                                            <FontAwesomeIcon icon={faReply} />
                                            </Icon>
                                        </Level.Item>
                                        <Level.Item as="a" aria-label="retweet">
                                            <Icon size="small">
                                            <FontAwesomeIcon icon={faRetweet} />
                                            </Icon>
                                        </Level.Item>
                                        <Level.Item as="a" aria-label="like">
                                            <Icon size="small">
                                            <FontAwesomeIcon icon={faHeart} />
                                            </Icon>
                                        </Level.Item>
                                        </Level.Item>
                                    </Level>
                                    </Media.Item>
                                </Media>
                            </Box>
                        </Column>
                        <Column className="has-text-centered">
                            <Button 
                                rounded 
                                size="large" 
                                color={!canIGo ? "primary" : "danger"}
                                onClick={e => setCanIGo(!canIGo)}
                            >
                                {
                                    !canIGo ? 'Si, Quiero ir!' : 'No gracias.'
                                }
                            </Button>
                        </Column>
                    </>    
            }
            
            {
                canIGo && date.length <= 0 &&
                <>        
                    <Column className="has-text-centered">
                        <Title>Selecciona la opcion que mas te acomoda</Title>
                        <Table>
                            <Table.Head>
                                <Table.Row>
                                <Table.Heading>Día</Table.Heading>
                                <Table.Heading>Hora</Table.Heading>
                                <Table.Heading></Table.Heading>
                                </Table.Row>
                            </Table.Head>
                            <Table.Body>
                                {
                                    data.allReunions[0].options.map(option =>
                                        <Table.Row key={option.id}>
                                            <Table.Cell>{option.date}</Table.Cell>
                                            <Table.Cell>{option.hour}</Table.Cell>
                                            <Table.Cell>
                                            <Label>
                                                <Checkbox
                                                    name={option.id}
                                                    checked={options[option.id]}
                                                    onChange={ e => setOptions({...options, [option.id]: !options[e.target.name]}) }
                                                /> Puedo asistir
                                            </Label>
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                }
                            </Table.Body>
                        </Table>
                    </Column>

                    <Column.Group>
                        
                        <Column className="has-text-centered">    
                            <Button 
                                rounded 
                                size="large" 
                                color="primary"
                                onClick={e => setDate('date')}
                            >
                                Listo!
                            </Button>
                        </Column>

                        <Column className="has-text-centered">
                            <Button 
                                onClick={e => setCanIGo(!canIGo)}
                            >
                                Volver
                            </Button>
                        </Column>    
                    </Column.Group>
                </>
            } 
            {
                date.length > 0 &&
                <form onSubmit={e => handleSubmit(e)}>
                    <Column.Group>
                        <Column size={4} className="has-text-centered">      
                            <Title>Ingresa tus datos</Title>  
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
                    </Column.Group>    
                </form>    
            }

            {
                submitted &&
                <Message color="primary">
                    <Message.Body>
                    Congrats <span role="img">⚡️</span>
                    <strong>Pellentesque risus mi</strong>
                    </Message.Body>
                </Message>
            }
        </Container>
    )
}

export default Reunions