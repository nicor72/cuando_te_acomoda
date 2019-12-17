import React, { useState, useEffect, useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button, Column, Input, Icon } from "rbx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import { UPDATE_OPTION } from './../Querys/UpdateOption'
import { DELETE_OPTION } from './../Querys/DeleteOption'

const EditSingleOption = ({index, options, setOptions}) => {
    const [date, setDate] = useState(options[index].date);
    const [hour, setHour] = useState(options[index].hour);  
    const [editingInput, setEditingInput] = useState('');
    const ref = useRef(null)

    const [updateOption, { data, loading, error }] = useMutation(UPDATE_OPTION);
    const [deleteOption] = useMutation(DELETE_OPTION);

    useEffect(() => {
        setDate(options[index].date);
        setHour(options[index].hour);
    }, [options])

    const onBlur = () => {
        updateOption({
            variables: {
                id: options[index].id,
                date: date,
                hour: hour
            }
        });

        options[index].date = date;
        options[index].hour = hour;
        setOptions([...options]);

        setEditingInput('')
    }

    return(
        <> 
            <Column ref={ref} className="is-half is-offset-one-quarter has-text-centered">
                <Column.Group>
                    <Column size={2}>
                        {index + 1}
                    </Column>
                    
                    <Column size={5} style={{display: editingInput === 'date' ? '' : 'none' }}>
                        <Input 
                            value={date} 
                            onChange={e => setDate(e.target.value)}
                            onBlur={onBlur} 
                        />
                    </Column>
                    <Column
                        size={5}
                        onClick={() => {setEditingInput('date')}}
                        style={{display: editingInput === 'date' ? 'none' : '' }}
                    >
                        {date}
                        <Icon size="medium">
                            <FontAwesomeIcon icon={faEdit} size="xs"/>
                        </Icon>
                    </Column>

                    <Column style={{display: editingInput === 'hour' ? '' : 'none' }}>
                        <Input 
                            value={hour} 
                            onChange={e => setHour(e.target.value)}
                            onBlur={onBlur} 
                        />
                    </Column>
                    <Column
                        onClick={() => {setEditingInput('hour')}}
                        style={{display: editingInput === 'hour' ? 'none' : '' }}
                    >
                        {hour}
                        <Icon size="medium">
                            <FontAwesomeIcon icon={faEdit} size="xs"/>
                        </Icon>
                    </Column>

                    <Column>
                        <Button
                            color="danger"
                            onClick={
                                () => {
                                    if (window.confirm("¿Estas seguro que deseas eliminar esta opcion?")) {
                                        deleteOption({
                                            variables: {
                                                id: options[index].id
                                            }
                                        });
                                        options.splice(index, 1)
                                        setOptions([...options])
                                    }
                                } 
                            }
                        >
                            Eliminar
                        </Button>
                    </Column>

                </Column.Group>
            </Column>
        </>    
                 
    )
}

export default EditSingleOption