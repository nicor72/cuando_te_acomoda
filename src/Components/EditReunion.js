import React, { useState, useEffect, useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { Column, Container, Card, Image, Media, Title, Content, Input, Icon, Textarea } from "rbx";

import logo from './../Assets/Images/logo_pocuro_view.png'
import place from './../Assets/Images/sala_eventos.jpg'

import { UPDATE_REUNION } from './../Querys/UpdateReunion'

const EditReunion = ({reunion, setReunion}) => {
    const [editingInput, setEditingInput] = useState('');
    const [name, setName] = useState(reunion.name);
    const [where, setWhere] = useState(reunion.where);
    const [description, setDescription] = useState(reunion.description);
    const inputName = useRef(null)
    const inputWhere = useRef(null)
    const inputDescription = useRef(null)

    const [updateReunion] = useMutation(UPDATE_REUNION);

    useEffect(() => {
        if (editingInput === 'name') {
            inputName.current.focus()
        }
        if (editingInput === 'where') {
            inputWhere.current.focus()
        }
        if (editingInput === 'description') {
            inputDescription.current.focus()
        }
    }, [editingInput])

    const onBlur = () => {
        updateReunion({
            variables: {
                id: reunion.id,
                name: name,
                where: where,
                description: description
            }
        })

        setReunion({
            id: reunion.id,
            name: name,
            where: where,
            description: description
        })
        
        setEditingInput('')
    }

    let whereStyle = ''
    if (editingInput === 'name') {
        whereStyle = 'contents'
    } else if (editingInput === 'where') {
        whereStyle = 'none'
    }

    return(
        
        <Container fluid>
            <Column.Group centered>
                <Column className="is-mobile is-half">
                    <Card>
                        <Card.Image>
                            <Image.Container size="3by2">
                            <Image src={place} />
                            </Image.Container>
                        </Card.Image>
                        <Card.Content>
                            <Media style={{marginBottom: 0}}>
                                <Media.Item as="figure" align="left">
                                    <Image.Container as="p" size={64}>
                                    <Image
                                        alt="64x64"
                                        src={logo}
                                    />
                                    </Image.Container>
                                </Media.Item>
                                <Media.Item>
                        
                                    <Input 
                                        ref={inputName}
                                        value={name} 
                                        onChange={e => setName(e.target.value)}
                                        onBlur={onBlur} 
                                        style={{display: editingInput === 'name' ? '' : 'none' }}
                                    />
                                    <Title 
                                        as="p" 
                                        size={4} 
                                        onClick={() => {setEditingInput('name')}}
                                        style={{display: editingInput === 'name' ? 'none' : '' }}
                                    >
                                        {name}
                                        <Icon size="medium">
                                            <FontAwesomeIcon icon={faEdit} size="xs"/>
                                        </Icon>
                                    </Title>

                                    <Title 
                                        as="p" 
                                        subtitle 
                                        size={6} 
                                        onClick={() => {setEditingInput('where')}}
                                        style={{display: whereStyle}}
                                    >
                                        @{where}
                                        <Icon size="medium">
                                            <FontAwesomeIcon icon={faEdit} size="xs"/>
                                        </Icon>
                                    </Title>
                                    <Input 
                                        ref={inputWhere}
                                        value={where}
                                        onChange={e => setWhere(e.target.value)}
                                        onBlur={onBlur} 
                                        style={{display: editingInput === 'where' ? '' : 'none' }}
                                    />

                                </Media.Item>
                            </Media>

                            <Textarea
                                ref={inputDescription}
                                value={description} 
                                onChange={e => setDescription(e.target.value)}
                                onBlur={onBlur} 
                                style={{display: editingInput === 'description' ? '' : 'none' }}
                            />
                            <Content
                                style={{display: editingInput === 'description' ? 'none' : '' }}
                                onClick={() => {setEditingInput('description')}}
                            >
                                {description}
                                <Icon size="medium">
                                    <FontAwesomeIcon icon={faEdit} size="xs"/>
                                </Icon>
                            </Content>

                        </Card.Content>
                    </Card>
                </Column>
            </Column.Group>
        </Container>
    )
}

export default EditReunion