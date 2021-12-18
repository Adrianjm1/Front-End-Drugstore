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


{/* <Container>
<h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">Admin Login</h1>
<Row className="mt-5">
    <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="success btn-block" type="submit">
                Login
            </Button>
        </Form>
    </Col>
</Row>
<h6 className="mt-5 p-5 text-center text-secondary ">Copyright © 2021 Masud Rana. All Rights Reserved.</h6>
</Container> */}