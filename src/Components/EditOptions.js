import React, { useEffect } from 'react';
import { Column, Button, Progress } from "rbx";
import { useMutation } from '@apollo/react-hooks';

import EditSingleOption from './EditSingleOption'

import { CREATE_OPTION } from './../Querys/CreateOption'

const EditOptions = ({ options, setOptions, reunionId }) => {

    // const [opts, setOpts] = useState(options);
    const [createOption, {data, loading}] = useMutation(CREATE_OPTION);

    useEffect(() => {
        if (data) {
            setOptions([...options, {id: data.createOption.id, date: '', hour: '', answers: {}}]);
        }
    }, [data])

    return(
        <>
            <Column className="is-half is-offset-one-quarter has-text-centered">
                <Column.Group>
                    <Column size={2}>
                        Opción
                    </Column>
                    <Column size={5}>
                        Día
                    </Column>
                    <Column>
                        Hora
                    </Column>
                    <Column>
                    </Column>
                </Column.Group>
            </Column>
            {
                Object.keys(options).map((i) => 
                    <EditSingleOption 
                        key={i} 
                        index={parseInt(i)}
                        options={options} 
                        setOptions={setOptions}
                    />
                )
            }

            {
                loading &&
                <Column className="is-half is-offset-one-quarter has-text-centered">
                    <Column size={4} offset={4}>
                        <Progress size="small" color="primary"/>
                    </Column>
                </Column>
            }
            <Column className="is-half is-offset-one-quarter has-text-centered">
                <Button 
                    color="success"
                    onClick={() => {
                        createOption({
                            variables: {
                                reunionId: reunionId,
                                date: '',
                                hour: ''
                            }
                        });
                        
                    }}
                >
                    Agregar Opción
                </Button>
            </Column>
        </>    
    )
}

export default EditOptions