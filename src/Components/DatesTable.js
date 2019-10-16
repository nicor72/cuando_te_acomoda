import React from 'react';
import { Column, Title, Button, Table, Label, Checkbox } from "rbx";

const DatesTable = ({dates, options, setOptions, canIGo, setCanIGo, setDate}) => {
    return(
        <>  
            <Column className="is-half is-offset-one-quarter has-text-centered">
                <Title>Selecciona la opcion que mas te acomoda</Title>
            </Column>      

            <Column className="is-half is-offset-one-quarter has-text-centered">
                <Table style={{width: '100%'}}>
                    <Table.Head>
                        <Table.Row>
                        <Table.Heading>Día</Table.Heading>
                        <Table.Heading>Hora</Table.Heading>
                        <Table.Heading></Table.Heading>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {
                            dates.options.map(option =>
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
                
            <Column className="is-half is-offset-one-quarter has-text-centered">    
                <Button 
                    rounded 
                    size="large" 
                    color="primary"
                    onClick={e => setDate('date')}
                >
                    Listo!
                </Button>
            </Column>

            <Column className="is-half is-offset-one-quarter has-text-centered">
                <Button 
                    onClick={e => setCanIGo(!canIGo)}
                >
                    Volver
                </Button>
            </Column>    
        </>  
    )
}

export default DatesTable