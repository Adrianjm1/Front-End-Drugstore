import React from 'react';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import './login.css';

const login = () => {
    return (
        <>
            <Container className='container-login'>
                <h1 className="logintext shadow-sm  mt-5 p-20 text-center rounded">Login</h1>

                <Row >
                    <Col lg={9} md={10} sm={12} className='p-5 m-auto shadow-sm rounded-lg' >
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="formtext">Usuario</Form.Label>
                                <Form.Control type="email" placeholder="Ingrese usuario" />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label className="formtext">Contraseña</Form.Label>
                                <Form.Control type="password" placeholder="Ingrese contraseña" />
                            </Form.Group>


                            <Button variant="primary btn-block w-100" type="submit">
                                Iniciar sesion
                            </Button>
                        </Form>

                    </Col>


                </Row>

            </Container>





        </>

    )
}

export default login
