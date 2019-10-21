import React from 'react';
import { Column, Title, Card, Media, Image, Content, Button } from "rbx";

// Images
import logo from './../Assets/Images/logo_pocuro_view.png'
import place from './../Assets/Images/sala_eventos.jpg'

const ReunionBox = ({reunion, canIGo, setCanIGo}) => {
    return(
        <>
            {/* <Column className="has-text-centered">
                <Title>Próxima Reunión</Title>
            </Column>     */}
            <Column.Group centered>
                <Column className="is-mobile is-half">
                    <Card>
                        <Card.Image>
                            <Image.Container size="3by2">
                            <Image src={place} />
                            </Image.Container>
                        </Card.Image>
                        <Card.Content>
                            <Media>
                            <Media.Item as="figure" align="left">
                                <Image.Container as="p" size={64}>
                                <Image
                                    alt="64x64"
                                    src={logo}
                                />
                                </Image.Container>
                            </Media.Item>
                            <Media.Item>
                                <Title as="p" size={4}>
                                    {reunion.name}
                                </Title>
                                <Title as="p" subtitle size={6}>
                                    @{reunion.where}
                                </Title>
                            </Media.Item>
                            </Media>
                            <Content>
                                {reunion.description}
                            </Content>
                        </Card.Content>
                    </Card>
                </Column>
            </Column.Group>
            
            <Column.Group centered>
                <Column className="is-half has-text-centered">
                    <Button 
                        rounded 
                        size="large" 
                        color={!canIGo ? "primary" : "danger"}
                        onClick={e => setCanIGo(!canIGo)}
                    >
                        {
                            !canIGo ? 'Sí, quiero ir! ☝️' : 'No, gracias.'
                        }
                    </Button>
                </Column>
            </Column.Group>

        </> 
    )
}

export default ReunionBox
