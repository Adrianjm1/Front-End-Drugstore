import React, { useState, useEffect } from 'react'
import { Table, Container, Form, Col, Row, Button, InputGroup, ButtonGroup, Dropdown, DropdownButton, ListGroup, Modal } from 'react-bootstrap';

import './seller.css';
import axios from '../../config/axios';
import NavbarLoged from '../Navbar/NavbarLoged';
import Footer from '../Footer/Footer';


const Seller = () => {

    const defaultState = {
        sellers: [],
        monto: 0,
        bank: '',

    };

    const [state, setState] = useState(defaultState);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    useEffect(function () {



        axios.get('/seller/')
            .then((res) => {

                setState({
                    ...state,
                    sellers: res.data
                })


            })
            .catch((error) => console.log(error))


        //eslint-disable-next-line
    }, [])


    const onInputChange = e => {

        const isValid = e.target.validity.valid;

        if (isValid === true) {
            setState({ ...state, [e.target.name]: e.target.value });

        } else {
            console.log(isValid);

        }

    }


    const onChangeMethod = e => {

        const isValid = e.target.value;


        if (isValid === 'Dolares') {
            setState({ ...state, monto: true });

        } else {
            setState({ ...state, monto: false });


        }

    }

    return (
        <>
            <NavbarLoged />
            <div className='divTable'>

                <h2>Vendedores</h2>
                <br />

                <Table className='table-seller' striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Identidad</th>
                            <th>Comision en USD</th>
                            <th>Comision en Bs</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            state.sellers.map(data => (
                                <tr key={data.id}>
                                    <td>{data.id}</td>
                                    <td>{data.name}</td>
                                    <td>{data.lastname}</td>
                                    <td>{data.identification} </td>
                                    <td>{data.commissionUSD} USD</td>
                                    <td>{data.commissionBS} Bs</td>
                                    <td> <Button className='btnSeller' onClick={handleShow}>Registrar pago</Button> </td>

                                </tr>
                            ))
                        }
                    </tbody>
                </Table>

            </div>

            <Footer />

            <Modal className="modalRegister" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Registrar pago a vendedor</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Label>Metodo de pago</Form.Label>

                    <Form.Select onChange={onChangeMethod} name="city">
                        <option value="Dolares">Dolares</option>
                        <option value="Bolivares">Bolivares</option>
                    </Form.Select>

                    <br/>


                    {state.monto ?
                        <Form.Group className="mb-3">
                            <Form.Label>Monto en USD</Form.Label>
                            <Form.Control placeholder="Monto" name="monto" onChange={onInputChange} />
                        </Form.Group>

                        :

                        <Form.Group className="mb-3">
                            <Form.Label>Monto en Bs</Form.Label>
                            <Form.Control placeholder="Monto" name="monto" onChange={onInputChange} />
                        </Form.Group>

                    }


                    <Form.Group className="mb-3">
                        <Form.Label>Banco</Form.Label>
                        <Form.Control placeholder="Banco" name="bank" onChange={onInputChange} />
                    </Form.Group>


                    <Modal.Footer className="registerSeller">
                        <Button variant="primary" >
                            Registrar
                        </Button>
                    </Modal.Footer>



                </Modal.Body>
            </Modal>

        </>
    )
}

export default Seller
