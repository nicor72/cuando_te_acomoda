import React, { useEffect, useState } from 'react';
import { Column, Title, Button, Table, Label, Checkbox } from "rbx";
import { VictoryPie } from "victory";

const DatesTable = ({dates, options, setOptions, canIGo, setCanIGo, setDate}) => {
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        for (var opt in options) {
            if (options[opt]) {
                setDisabled(false)
                break;
            }
            setDisabled(true)
        }
    }, [options]);

    let results = dates.options.map(opt => {
        return {x: opt.date + ' ' + opt.hour, y: opt.answers.length}
    });

    console.log(results)

    return(
        <>  
            <Column className="is-half is-offset-one-quarter has-text-centered">
                <Title><span role="img" aria-labelledby="img">🤔</span></Title>
            </Column>

            <Column className="is-half is-offset-one-quarter has-text-centered">
                <Title>¿Cuándo te acomoda?</Title>
            </Column>

            <Column className="is-half is-offset-one-quarter has-text-centered">
                <Table striped hoverable fullwidth>
                    <Table.Head>
                        <Table.Row>
                        <Table.Heading>Opción</Table.Heading>
                        <Table.Heading>Día</Table.Heading>
                        <Table.Heading>Hora</Table.Heading>
                        <Table.Heading></Table.Heading>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {
                            dates.options.map((option, i) =>
                                <Table.Row key={option.id}>
                                    <Table.Cell>{i + 1}</Table.Cell>
                                    <Table.Cell>{option.date}</Table.Cell>
                                    <Table.Cell>{option.hour}</Table.Cell>
                                    <Table.Cell>
                                    <Label>
                                        <Checkbox
                                            name={option.id}
                                            checked={options[option.id]}
                                            onChange={ 
                                                e => {
                                                    setOptions({...options, [option.id]: !options[e.target.name]})
                                                }
                                            }    
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
                    disabled={disabled}
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

            <Column className="is-half is-offset-one-quarter has-text-centered">
                <VictoryPie
                    colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
                    data={
                        dates.options.map((opt, i) => {
                            return {x: 'Opción ' + (i + 1), y: opt.answers.length}
                        })
                    }
                    startAngle={90}
                    endAngle={-90}
                    width={500}
                    // height={'2000px'}
                />
            </Column>            
        </>  
    )
}

export default DatesTable