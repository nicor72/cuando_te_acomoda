import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Column, Select, Tab, Loader } from "rbx";

import EditReunion from './EditReunion'
import EditOptions from './EditOptions'
import Results from './Results'

import { GET_REUNIONS } from './../Querys/GetReunions'

const Dashboard = () => {
    const [reunionSelected, setReunionSelected] = useState('');
    const [activeTab, setActiveTab] = useState('');
    const [options, setOptions] = useState({})
    const [reunion, setReunion] = useState({})
    const { loading, data } = useQuery(GET_REUNIONS);

    useEffect(() => {
        if (typeof data !== "undefined" && reunionSelected !== '' ) {
            setReunion(data.allReunions[parseInt(reunionSelected)]);
            setOptions(data.allReunions[parseInt(reunionSelected)].options);
            setActiveTab('Edit')
        }
    }, [data, reunionSelected])

    if (loading) {
        return <Column className="is-half is-offset-one-quarter has-text-centered">
                    <Column style={{marginLeft: '45%'}}>
                        <Loader />
                    </Column>
                </Column>
    }

    return(
        typeof data !== "undefined" &&
        <>
            <Column className="is-half is-offset-one-quarter has-text-centered">
                <Select.Container rounded state={loading ?  'loading' : ''}>
                    <Select onChange={e => setReunionSelected(e.target.value)}>
                        <Select.Option value="">Selecciona una reunión</Select.Option>
                        {
                            data.allReunions.map((reunion, i) =>
                                <Select.Option key={i} value={i}>{reunion.name}</Select.Option>
                            )
                        }
                    </Select>
                </Select.Container>
            </Column>

            {
                reunionSelected !== '' &&
                <Column className="is-half is-offset-one-quarter has-text-centered">
                    <Tab.Group>
                        <Tab active={activeTab === 'Edit'} onClick={() => setActiveTab('Edit')}>Datos de la reunión</Tab>
                        <Tab active={activeTab === 'Options'} onClick={() => setActiveTab('Options')}>Opciones</Tab>
                        <Tab active={activeTab === 'Results'} onClick={() => setActiveTab('Results')}>Resultados</Tab>
                    </Tab.Group>
                </Column>
            }

            {
                activeTab === 'Edit' && reunionSelected !== '' &&
                <EditReunion reunion={reunion} setReunion={setReunion}/>
            }
            {
                activeTab === 'Options' && reunionSelected !== '' &&
                <EditOptions options={options} setOptions={setOptions} reunionId={data.allReunions[parseInt(reunionSelected)].id}/>
            }
            {
                activeTab === 'Results' && reunionSelected !== '' &&
                <Results options={options}/>
            }
        </>    
    )
}

export default Dashboard