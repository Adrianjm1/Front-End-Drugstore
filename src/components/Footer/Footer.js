import React, { Component } from 'react'
import { Card } from "react-bootstrap";
import "./footer.css"


const Footer = () => {
    return (
        <div>
            <div>
                <Card className='sty'>
                    <Card.Body className='footer-c'><b>© Droguerie Enmanuelle. Todos los derechos reservados.</b></Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default Footer
