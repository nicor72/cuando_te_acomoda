import React from 'react';
import { Message } from "rbx";

const SubmitedMessage = () => {
    return(
        <Message color="primary">
            <Message.Body className="has-text-centered">
                Gracias! <span role="img" aria-labelledby="img">🎉</span><br></br>
                <strong>Tu respuesta fue enviada exitosamente.</strong>
            </Message.Body>
        </Message>
    )
}

export default SubmitedMessage