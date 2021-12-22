
import React, { useEffect, useState } from 'react';
import { Container, Form, Col, Row, Button, InputGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import NavbarLoged from '../Navbar/NavbarLoged';
import axios from '../../config/axios';
import './makeAPayment.css'


const billState = {
    number: '',
    client: '',
    city: '',
    seller: '',
    amountUSD: 0
}

const MakeAPayment = ({ history }) => {

    const [state, setState] = useState(billState);


    let id = useParams().id;

    useEffect(function () {

        axios.get(`/bill/${id}`)
            .then((res) => {

                if (res.data) {
                    console.log(res.data);

                    setState({ ...state, number: res.data.id, client: res.data.client, city: res.data.city, seller: `${res.data.seller.name} ${res.data.seller.lastname}`, amountUSD: res.data.amountUSD })



                } else {
                    console.log('No hay nada')
                }

            })
            .catch((error) => console.log(error))

        //eslint-disable-next-line
    }, [])


    return (

        <>

            <NavbarLoged />

            <Container>

                <Form.Group className="mb-3">
                    <Form.Label>Numero de factura</Form.Label>
                    <Form.Control placeholder={state.number} disabled />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Cliente</Form.Label>
                    <Form.Control placeholder={state.client} disabled />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Ciudad</Form.Label>
                    <Form.Control placeholder={state.city} disabled />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Vendedor encargado</Form.Label>
                    <Form.Control placeholder={state.seller} disabled />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Restante por pagar</Form.Label>
                    <Form.Control placeholder={state.amountUSD} disabled />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Monto a pagar</Form.Label>
                    <Form.Control placeholder="Ingrese el monto" />
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
                    <Col sm={{ span: 5, offset: 2 }}>
                        <Form.Check label="Pagado en dolares" />
                    </Col>
                </Form.Group>

                <Button variant="success"  className='btnMake'>Realizar pago</Button>


            </Container>





        </>

    )
}

export default MakeAPayment
