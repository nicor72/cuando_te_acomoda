import React, { useState } from 'react';
import { Column, Table } from "rbx";
import { VictoryPie } from "victory";

const Results = ({options}) => {

    options = options.filter(opt => opt.answers.length)

    const [selectedOptions, setSelectedOptions] = useState(options)

    return(
        <>
            <Column className="is-half is-offset-one-quarter has-text-centered" style={{maxHeight: '25em'}}>
                <VictoryPie
                    colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
                    data={
                        options.map((opt, i) => {
                            return {x: i, y: opt.answers.length, label: 'Opción ' + (i + 1)}
                        })
                    }
                    // labels={({ datum }) => `${datum.x}: ${datum.y} votos`}
                    startAngle={90}
                    endAngle={-90}
                    sortKey="x"
                    sortOrder="descending"
                    width={500}
                    events={[{
                        target: "data",
                        eventHandlers: {
                          onClick: (e) => {
                            // e.persist()
                            return [
                              {
                                target: "data",
                                mutation: ({ style }) => {
                                  return style.fill === "#c43a31" ? null : { style: { fill: "#c43a31" } };
                                }
                            }];
                          }
                        }
                      }]}
                />
            </Column>
            <Column className="is-half is-offset-one-quarter has-text-centered">
                <p>Has click en el gráfico para filtrar los resultados</p>
                <Table striped hoverable fullwidth>
                    <Table.Head>
                        <Table.Row>
                            <Table.Heading>Opción</Table.Heading>
                            <Table.Heading>Fecha</Table.Heading>
                            <Table.Heading>Nombre</Table.Heading>
                            <Table.Heading>Depto</Table.Heading>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {selectedOptions.map((option, i) => (
                            option.answers.map((answer, k) => (
                                <Table.Row key={k}>
                                    <Table.Cell>Opción {(i + 1)}</Table.Cell>
                                    <Table.Cell>{option.date}</Table.Cell>
                                    <Table.Cell>{answer.author}</Table.Cell>
                                    <Table.Cell>{answer.depto}</Table.Cell>
                                </Table.Row>
                            ))
                        ))}
                    </Table.Body>
                </Table>
            </Column>
        </>
    )
}

export default Results