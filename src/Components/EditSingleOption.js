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
    const inputDate = useRef(null)
    const inputHour = useRef(null)

    const [updateOption] = useMutation(UPDATE_OPTION);
    const [deleteOption] = useMutation(DELETE_OPTION);

    useEffect(() => {
        setDate(options[index].date);
        setHour(options[index].hour);
    }, [options, index])

    useEffect(() => {
        if (editingInput === 'date') {
            inputDate.current.focus()
        }
        if (editingInput === 'hour') {
            inputHour.current.focus()
        }
    }, [editingInput])

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
            <Column className="is-half is-offset-one-quarter has-text-centered">
                <Column.Group>
                    <Column size={2} className="is-hidden-mobile">
                        {index + 1}
                    </Column>
                    
                    <Column size={5} style={{display: editingInput === 'date' ? '' : 'none' }}>
                        <Input 
                            ref={inputDate}
                            value={date} 
                            placeholder="Lunes 1 de Enero"
                            onChange={e => setDate(e.target.value)}
                            onBlur={onBlur} 
                        />
                    </Column>
                    <Column
                        size={5}
                        onClick={() => {setEditingInput('date')}}
                        style={{display: editingInput === 'date' ? 'none' : '' }}
                    >
                        {date || <p>Lunes 1 de Enero</p>}
                        <Icon size="medium">
                            <FontAwesomeIcon icon={faEdit} size="xs"/>
                        </Icon>
                    </Column>

                    <Column style={{display: editingInput === 'hour' ? '' : 'none' }}>
                        <Input 
                            ref={inputHour}
                            value={hour}
                            placeholder="14:00pm"
                            onChange={e => setHour(e.target.value)}
                            onBlur={onBlur} 
                        />
                    </Column>
                    <Column
                        onClick={() => {setEditingInput('hour')}}
                        style={{display: editingInput === 'hour' ? 'none' : '' }}
                    >
                        {hour || <p>14:00pm</p>}
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
            <hr></hr>
        </>    
                 
    )
}

export default EditSingleOption