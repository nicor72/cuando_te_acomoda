// React imports
import React, {useState, useEffect} from 'react';
// Dependencies
import "rbx/index.css";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Section, Column, Progress } from "rbx";
// Components
import SubmitedMessage from './SubmitedMessage'
import ReunionBox from './ReunionBox'
import DatesTable from './DatesTable'
import AnswerForm from './AnswerForm'
// Querys
import { GET_REUNIONS } from './../Querys/GetReunions'
import { CREATE_ANSWER } from './../Querys/CreateAnswer'

const Reunions = () => {

    const { loading, error, data } = useQuery(GET_REUNIONS);
    const [createAnswer] = useMutation(CREATE_ANSWER);
    const [canIGo, setCanIGo] = useState(false)
    const [date, setDate] = useState('')
    const [nombre, setNombre] = useState('')
    const [depto, setDepto] = useState('')
    const [options, setOptions] = useState({})
    const [submitted, setSubmitted] = useState(window.localStorage.getItem("Submitted") || false)

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

    if (loading) return <Section size="large">
                            <Column className="is-half is-offset-one-quarter has-text-centered">
                                <Column size={4} offset={4}>
                                    <Progress size="small" color="primary"/>
                                </Column>
                            </Column>
                        </Section>
    if (error) return `Error! ${error.message}`;
    
    const handleSubmit = (e) => {
        e.preventDefault();

        Object.keys(options)
        .filter(option => options[option])
        .forEach(
            option => {
                createAnswer({
                    variables: {
                        author: nombre, 
                        depto: parseInt(depto),
                        optionId: option
                    }
                })
            }
        );

        window.localStorage.setItem("Submitted", true);
        setSubmitted(true)
    }
    
    return(
        <>
            {
                submitted ?
                    <SubmitedMessage />
                
                : (!canIGo && date.length <= 0) ?
                    <ReunionBox 
                        reunion={data.allReunions[0]}
                        canIGo={canIGo}
                        setCanIGo={setCanIGo}
                    />
                    
                : (canIGo && date.length <= 0) ?
                    <DatesTable 
                        dates={data.allReunions[0]}
                        options={options}
                        setOptions={setOptions}
                        canIGo={canIGo}
                        setCanIGo={setCanIGo}
                        setDate={setDate}
                    />  

                : (date.length > 0) &&
                    <AnswerForm
                        handleSubmit={handleSubmit}
                        nombre={nombre}
                        setNombre={setNombre}
                        depto={depto}
                        setDepto={setDepto}
                        setDate={setDate}
                    />
            }
        </>
    )
}

export default Reunions