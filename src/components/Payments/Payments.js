import React, { useState, useEffect, useMemo, useContext } from 'react'
import { Table, Container, Form, FormControl, Dropdown, ButtonGroup, DropdownButton, Modal, Button } from 'react-bootstrap';
import { TableMonthly } from './Tables/TableMonthly';
import { TableDaily } from './Tables/TableDaily';
import axios, { generateToken } from '../../config/axios';
import NavbarLoged from '../Navbar/NavbarLoged';
import Footer from '../Footer/Footer';
import numberWithCommas from '../../helpers/helpers';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../config/constant';
import swal from "sweetalert";

import './payments.css';

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
        busqueda: '',
        option: 1,
        deleteId: 0
    };

    const paymentValues = {
        id: '',
        client: '',
        amount: '',
    }


    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => {
        setShowDelete(false);
        setPayment({ ...state, id: '', client: '', amount: '' });
    }
    const handleShowDelete = () => setShowDelete(true);


    const [payment, setPayment] = useState(paymentValues);

    const [state, setState] = useState(defaultState);

    const { user, dispatch } = useContext(AuthContext);

    const logout = () => {
        dispatch({
            type: types.logout,
            payload: {
                name: '',
                token: '',
            }
        })
    }

    useEffect(function () {

        generateToken(user.token);

        axios.get('/user/')
            .then((resp) => {

                if (!resp.data.ok) {
                    logout();
                }

            }).catch((err) => {
                console.log(err)

            })

    }, [user.token]);

    useEffect(function () {

        if(payment.id !== ''){

            console.log('it works!');
            handleShowDelete();

        }


    }, [payment]);



    const OnChangeMonth = (e) => {

        const month = e.target.value;
        const query = `/payments/month?month=${month}`;

        axios.get(query)
            .then((res) => {

                if (res.data.ok) {
                    setState({ ...state, datosMeses: res.data.pagos, bsMeses: res.data.sumaBS, usdMeses: res.data.sumaUSD, totalMeses: res.data.total })

                } else {
                    setState({ ...state, datosMeses: res.data.pagos, bsMeses: '0', usdMeses: '0', totalMeses: '0' })

                }

            })
            .catch((error) =>
                console.log(error)
            )

    }


    const OnChangeDate = (e) => {

        const day = e.target.value;
        const query = `/payments/day?day=${day}`;

        axios.get(query)
            .then((res) => {

                if (res.data.ok) {
                    setState({ ...state, datosDias: res.data.pagos, bsDias: res.data.sumaBS, usdDias: res.data.sumaUSD, totalDias: res.data.total })

                } else {
                    setState({ ...state, datosDias: res.data.pagos, bsDias: '0', usdDias: '0', totalDias: '0' })
                }

            })
            .catch((error) =>
                console.log(error)
            )

    }



    const handleChangeBDias = e => {

        let suma = 0;
        let sumaBS = 0;
        let sumaUSD = 0;
        let datos = state.datosDias.filter(local => local.bank.includes(e.target.value.toUpperCase()));

        datos.map(data => {

            if (data.paymentUSD === true) {
                sumaUSD = sumaUSD + parseFloat(data.amountUSD);
            } else {
                sumaBS = sumaBS + (parseFloat(data.amountUSD) * parseFloat(data.exchangeRate));
            }

            suma = suma + parseFloat(data.amountUSD);

        });

        setState({ ...state, busqueda: e.target.value.toUpperCase(), bsDias: sumaBS, usdDias: sumaUSD, totalDias: suma, datosDias: datos });


    }

    const handleChangeBMeses = e => {

        e.preventDefault();

        let suma = 0;
        let sumaBS = 0;
        let sumaUSD = 0;
        let datos = state.datosMeses.filter(local => local.bank.includes(e.target.value.toUpperCase()));

        datos.map(data => {

            if (data.paymentUSD === true) {
                sumaUSD = sumaUSD + parseFloat(data.amountUSD);
            } else {
                sumaBS = sumaBS + (parseFloat(data.amountUSD) * parseFloat(data.exchangeRate));
            }

            suma = suma + parseFloat(data.amountUSD);

        });

        setState({ ...state, busqueda: e.target.value.toUpperCase(), bsMeses: sumaBS, usdMeses: sumaUSD, totalMeses: suma, datosMeses: datos });

    }

    const changeOption = (op) => {

        setState({ ...state, option: op })

    }


    const deletePay = () => {

console.log(payment.id);
        try {

            axios.delete(`/payments/delete/${payment.id}`)
                .then(data => {

                    if (!data.data.ok) {

                        swal({
                            title: 'Error',
                            text: 'Ha ocurrido un error al intentar eliminar el pago',
                            icon: 'error'
                        });

                    } else {

                        swal({
                            title: 'Realizado',
                            text: data.data.res,
                            icon: 'success'
                        });


                    }

                })

        }
        catch (error) {

            swal({
                title: 'Error',
                text: 'Error, no se pudo eliminar el usuario',
                icon: 'error'
            });

        }

        setTimeout(function () { window.location.reload(); }, 1500);

    }

    return (
        <>

            <NavbarLoged />

            <Container>

                <br />
                <br />

                <DropdownButton as={ButtonGroup} className='dropdownMain' title="Ver pagos" id="bg-vertical-dropdown-1">
                    <Dropdown.Item eventKey="1" onClick={() => changeOption(1)}>Pagos por mes</Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={() => changeOption(2)}>Pagos por dia</Dropdown.Item>
                </DropdownButton>

                {state.option === 1 ?


                    <Form>

                        <h2><b>Pagos por mes</b></h2>

                        <Form.Group className="mb-3">
                            <Form.Label className="label-date">Ingresa el mes</Form.Label>
                            <Form.Control type="month" className="getPayments" onChange={OnChangeMonth} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="label-date">Banco</Form.Label>
                            <FormControl type="text" placeholder="Busqueda por banco" className="getPayments" id="busqueda" onChange={handleChangeBMeses} />
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
                                    <td>{numberWithCommas(parseFloat(state.totalMeses || 0).toFixed(2))} USD</td>
                                </tr>
                            </tbody>
                        </Table>

                        <p></p>

                        <TableMonthly data={state.datosMeses} setPayment={setPayment} />

                    </Form>

                    :

                    <> </>

                }


                {state.option === 2 ?



                    <Form>


                        <h2><b>Pagos por dia</b></h2>

                        <Form.Group className="mb-3">
                            <Form.Label className="label-date">Ingresa el dia</Form.Label>
                            <Form.Control type="date" className="getPayments" onChange={OnChangeDate} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="label-date">Banco</Form.Label>
                            <FormControl type="text" placeholder="Busqueda por banco" className="getPayments" id="busqueda" onChange={handleChangeBDias} />
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
                                    <td>{numberWithCommas(parseFloat(state.totalDias || 0).toFixed(2))} USD</td>
                                </tr>
                            </tbody>
                        </Table>

                        <p></p>

                        <TableDaily data={state.datosDias} setPayment={setPayment} />

                    </Form>

                    :

                    <> </>

                }

                <Modal show={showDelete} onHide={handleCloseDelete}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmar</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>¿Estas seguro/a que deseas eliminar el pago de <b>{payment.client}</b> por el monto de <b>{payment.amount}</b>?</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={handleCloseDelete} variant="secondary">No</Button>
                        <Button onClick={deletePay} className="btn-danger" variant="primary">Si</Button>
                    </Modal.Footer>
                </Modal>


            </Container>

            <Footer />
        </>
    )
}

export default Payments
