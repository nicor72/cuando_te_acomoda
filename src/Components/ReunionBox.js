import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply, faRetweet, faHeart} from '@fortawesome/free-solid-svg-icons'
import { Column, Title, Box, Media, Image, Content, Level, Icon, Button } from "rbx";

const ReunionBox = ({reunion, canIGo, setCanIGo}) => {
    return(
        <>
            <Column className="has-text-centered">
                <Title>Proxima Reunión</Title>
            </Column>    

            <Column className="is-half is-offset-one-quarter">
                <Box>
                    <Media>
                        <Media.Item align="left">
                        <Image.Container size={64}>
                            <Image
                                alt="Image"
                                src="https://bulma.io/images/placeholders/128x128.png"
                            />
                        </Image.Container>
                        </Media.Item>
                        <Media.Item>
                        <Content>
                            <p>
                            <strong>{reunion.name}</strong> <small>@johnsmith</small> <br />
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                            ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas
                            non massa sem. Etiam finibus odio quis feugiat facilisis.
                            </p>
                        </Content>
                        <Level breakpoint="mobile">
                            <Level.Item align="left">
                            <Level.Item as="a" aria-label="reply">
                                <Icon size="small">
                                <FontAwesomeIcon icon={faReply} />
                                </Icon>
                            </Level.Item>
                            <Level.Item as="a" aria-label="retweet">
                                <Icon size="small">
                                <FontAwesomeIcon icon={faRetweet} />
                                </Icon>
                            </Level.Item>
                            <Level.Item as="a" aria-label="like">
                                <Icon size="small">
                                <FontAwesomeIcon icon={faHeart} />
                                </Icon>
                            </Level.Item>
                            </Level.Item>
                        </Level>
                        </Media.Item>
                    </Media>
                </Box>
            </Column>

            <Column className="is-half is-offset-one-quarter has-text-centered">
                <Button 
                    rounded 
                    size="large" 
                    color={!canIGo ? "primary" : "danger"}
                    onClick={e => setCanIGo(!canIGo)}
                >
                    {
                        !canIGo ? 'Si, Quiero ir!' : 'No gracias.'
                    }
                </Button>
            </Column>
        </> 
    )
}

export default ReunionBox
