import React, { useState, useEffect } from 'react'
import { Table, Container, Modal, Button, Form, Row, Col } from 'react-bootstrap';
import './payments.css';
import axios from '../../config/axios';
import NavbarLoged from '../Navbar/NavbarLoged';
import Footer from '../Footer/Footer';
import numberWithCommas from '../../helpers/helpers';

const Payments = () => {

    const defaultState = {
        datosDias: [],
        usdDias: '',
        bsDias: '',
        totalDias: '',
        datosMeses: [],
        usdMeses: '',
        bsMeses: '',
        totalMeses: '',
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showDetails, setShowDetails] = useState(false);

    const handleCloseDetails = () => setShowDetails(false);
    const handleShowDetails = () => setShowDetails(true);

    const [state, setState] = useState(defaultState);

    const OnChangeMonth = (e) => {

        const month = e.target.value;
        const query = `/payments/month?month=${month}`;

        axios.get(query)
            .then((res) => {

                if (res.data.ok) {
                    setState({ ...state, datosMeses: res.data.pagos, bsMeses: res.data.sumaBS, usdMeses: res.data.sumaUSD, totalMeses: res.data.total })

                }

            })
            .catch((error) =>
                console.log(error)
            )

    }

    const OnChangeDate = (e) => {

        const day = e.target.value;
        console.log(day);
        const query = `/payments/day?day=${day}`;

        axios.get(query)
            .then((res) => {

                if (res.data.ok) {
                    setState({ ...state, datosDias: res.data.pagos, bsDias: res.data.sumaBS, usdDias: res.data.sumaUSD, totalDias: res.data.total })

                }

            })
            .catch((error) =>
                console.log(error)
            )

    }


    return (
        <>


            <NavbarLoged />

            <Container>

                <Form>

                    <h2><b>Pagos por mes</b></h2>

                    <Form.Group className="mb-3">
                        <Form.Label className="label-date">Ingresa el mes</Form.Label>
                        <Form.Control type="month" className="getPayments" onChange={OnChangeMonth} />
                    </Form.Group>

                    <Table className="margintable" striped bordered hover size="sm" >
                        <thead>
                            <tr className='first'>
                                <th>Facturado en dolares ($)</th>
                                <th>Facturado en bolívares (Bs.S)</th>
                                <th>Total ($)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{numberWithCommas(parseFloat(state.usdMeses || 0))} USD</td>
                                <td>{numberWithCommas(parseFloat(state.bsMeses || 0).toFixed(2))} Bs.</td>
                                <td>{numberWithCommas(parseFloat(state.totalMeses || 0))} USD</td>
                            </tr>
                        </tbody>
                    </Table>

                    <p></p>

                    <Table className="margintable" id="tablaPorDia" striped bordered hover size="sm" >
                        <thead>
                            <tr className='first'>
                                <th>Fecha</th>
                                <th>Cliente</th>
                                <th>Monto en dolares</th>
                                <th>Monto en bolivares</th>
                                <th>Tasa de cambio</th>
                                <th>Referencia</th>
                                <th>Pago en dolares</th>
                                <th>Banco</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                state.datosMeses ?

                                    state.datosMeses.map(data => (
                                        <tr key={data.id}>
                                            <td>{data.date}</td>
                                            <td>{data.bill.client}</td>
                                            <td>{numberWithCommas(parseFloat(data.amountUSD))} USD</td>
                                            <td>{numberWithCommas((parseFloat(data.amountUSD) * parseFloat(data.exchangeRate)).toFixed(2))} Bs.</td>
                                            <td>{numberWithCommas(parseFloat(data.exchangeRate).toFixed(2))} Bs.</td>
                                            <td>{data.referenceNumber}</td>
                                            <td>{data.paymentUSD === false ? 'No' : 'Si'}</td>
                                            <td>{data.bank}</td>
                                        </tr>
                                    ))

                                    :

                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>

                            }
                        </tbody>
                    </Table>

                </Form>

                <Form>


                    <h2><b>Pagos por dia</b></h2>

                    <Form.Group className="mb-3">
                        <Form.Label className="label-date">Ingresa el dia</Form.Label>
                        <Form.Control type="date" className="getPayments" onChange={OnChangeDate} />
                    </Form.Group>

                    <Table className="margintable" striped bordered hover size="sm" >
                        <thead>
                            <tr className='first'>
                                <th>Facturado en dolares ($)</th>
                                <th>Facturado en bolívares (Bs.S)</th>
                                <th>Total ($)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{numberWithCommas(parseFloat(state.usdDias || 0))} USD</td>
                                <td>{numberWithCommas(parseFloat(state.bsDias || 0).toFixed(2))} Bs.</td>
                                <td>{numberWithCommas(parseFloat(state.totalDias || 0))} USD</td>
                            </tr>
                        </tbody>
                    </Table>

                    <p></p>

                    <Table className="margintable" id="tablaPorDia" striped bordered hover size="sm" >
                        <thead>
                            <tr className='first'>
                                <th>Fecha</th>
                                <th>Cliente</th>
                                <th>Monto en dolares</th>
                                <th>Monto en bolivares</th>
                                <th>Tasa de cambio</th>
                                <th>Referencia</th>
                                <th>Pago en dolares</th>
                                <th>Banco</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                state.datosDias ?

                                    state.datosDias.map(data => (
                                        <tr key={data.id}>
                                            <td>{data.date}</td>
                                            <td>{data.bill.client}</td>
                                            <td>{numberWithCommas(parseFloat(data.amountUSD))} USD</td>
                                            <td>{numberWithCommas((parseFloat(data.amountUSD) * parseFloat(data.exchangeRate)).toFixed(2))} Bs.</td>
                                            <td>{numberWithCommas(parseFloat(data.exchangeRate).toFixed(2))} Bs.</td>
                                            <td>{data.referenceNumber}</td>
                                            <td>{data.paymentUSD === false ? 'No' : 'Si'}</td>
                                            <td>{data.bank}</td>
                                        </tr>
                                    ))

                                    :

                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>

                            }
                        </tbody>
                    </Table>

                </Form>


            </Container>

            <Footer />
        </>
    )
}

export default Payments
