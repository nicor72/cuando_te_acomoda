import React from 'react';
import { Column, Title, Card, Media, Image, Content, Button } from "rbx";

const ReunionBox = ({reunion, canIGo, setCanIGo}) => {
    return(
        <>
            {/* <Column className="has-text-centered">
                <Title>Próxima Reunión</Title>
            </Column>     */}

            <Column className="is-half is-offset-one-quarter">
                <Card>
                    <Card.Image>
                        <Image.Container size="3by2">
                        <Image src="https://bulma.io/images/placeholders/1280x960.png" />
                        </Image.Container>
                    </Card.Image>
                    <Card.Content>
                        <Media>
                        <Media.Item as="figure" align="left">
                            <Image.Container as="p" size={64}>
                            <Image
                                alt="64x64"
                                src="https://bulma.io/images/placeholders/128x128.png"
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

            <Column className="is-half is-offset-one-quarter has-text-centered">
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
        </> 
    )
}

export default ReunionBox
