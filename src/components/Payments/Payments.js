import React, { useState, useEffect, useMemo, useContext } from 'react'
import { Table, Container, Form, FormControl, Dropdown, ButtonGroup, DropdownButton } from 'react-bootstrap';
import { TableMonthly } from './Details/TableMonthly';
import { TableDaily } from './Details/TableDaily';
import axios, { generateToken } from '../../config/axios';
import NavbarLoged from '../Navbar/NavbarLoged';
import Footer from '../Footer/Footer';
import numberWithCommas from '../../helpers/helpers';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../config/constant';
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
        option: 1
    };

    const [state, setState] = useState(defaultState);

    const { user, dispatch } = useContext(AuthContext);

    useEffect(function () {

        let auth = generateToken(user.token);  // for all requests

        if (auth === false) {

            dispatch({
                type: types.logout,
                payload: {
                    name: "",
                    token: "",
                }
            })
        }

    }, [user.token]);


    const OnChangeMonth = (e) => {

        const month = e.target.value;
        const query = `/payments/month?month=${month}`;

        axios.get(query)
            .then((res) => {

                if (res.data.ok) {
                    setState({ ...state, datosMeses: res.data.pagos, bsMeses: res.data.sumaBS, usdMeses: res.data.sumaUSD, totalMeses: res.data.total })

                } else{
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

                } else{
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


    return (
        <>

            <NavbarLoged />

            <Container>

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
                                    <td>{numberWithCommas(parseFloat(state.totalMeses || 0))} USD</td>
                                </tr>
                            </tbody>
                        </Table>

                        <p></p>

                        <TableMonthly data={state.datosMeses} />

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
                                    <td>{numberWithCommas(parseFloat(state.totalDias || 0))} USD</td>
                                </tr>
                            </tbody>
                        </Table>

                        <p></p>

                        <TableDaily data={state.datosDias} />

                    </Form>

                    :

                    <> </>

                }


            </Container>

            <Footer />
        </>
    )
}

export default Payments
