
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import { Container, Form, Col, Row, Button, InputGroup, ButtonGroup, Dropdown, DropdownButton, ListGroup } from 'react-bootstrap';

import swal from 'sweetalert';
import axios from '../../config/axios';



const stateCreate = {
    sellers: [],
    amountUSD: 0,
    amountBS: 0,
    exchange: 0,
    rif: '',
    billDate: '',
    dispatchDate: '',
    client: '',
    vendedor: '',
    location: '',
    city: "No",
    sellersCommission: 0,
    expirationDate: '',
    vendedorID: 0


}

const Create = () => {

    const [state, setState] = useState(stateCreate);


    useEffect(function () {


        axios.get(`/seller/`)
            .then((res) => {




                if (res.data) {

                    setState({ ...state, sellers: res.data })

                } else {
                    console.log('No hay data')
                }



            })
            .catch((error) => console.log(error))

    }, [])

    const onInputChange = e => {

        const isValid = e.target.validity.valid;

        if (isValid === true) {
            setState({ ...state, [e.target.name]: e.target.value });

        } else {
            console.log(isValid);

        }

    }

    const onCityChange = e => {

        setState({ ...state, city: e.target.value });
        console.log(e.target.value);

    }

    const onChangeSeller = (sellerName, vendedorID) => {


        setState({ ...state, vendedor: sellerName, vendedorID: vendedorID });
        const vendedor =
            <Form.Group className="mb-3">
                <Form.Label>Vendedor</Form.Label>
                <Form.Control disabled placeholder="Tasa de cambio" value={sellerName} name="vendedor" />
            </Form.Group>


        ReactDOM.render(vendedor, document.getElementById('vendedor'));

    }


    const onSubmit = async e => {

        if (state.city == "No") {

            swal({
                title: 'Error',
                text: 'Seleccione la sede',
                icon: 'error'
            });

        } else {

            try {

                axios.post('/bill/create',
                    {

                        client: state.client,
                        city: state.city,
                        rif: (state.rif),
                        amountUSD: state.amountUSD,
                        amountBS: (state.amountUSD * state.exchange),
                        billDate: state.billDate,
                        dispatchDate: state.dispatchDate,
                        expirationDate: state.expirationDate,
                        creditDays: state.creditDays,
                        location: state.location,
                        sellersComission: state.sellersCommission,
                        idSeller: state.vendedorID,
                        exchange: state.exchange

                    }).then(res => {

                        if (!res.data.ok) {

                            swal({
                                title: 'Error',
                                text: res.data.ok,
                                icon: 'error'
                            });

                        } else {

                            swal({
                                title: 'Realizado',
                                text: 'Factura registrada',
                                icon: 'success'
                            });

                            setTimeout(function () { window.location.reload(); }, 2000);


                        }

                    }).catch(e => {

                        console.log(e);

                        swal({
                            title: 'Error',
                            text: `Verifica bien los campos.`,
                            icon: 'error'
                        });

                    })


            }
            catch (error) {

                if (state.vendedorID === 0) {

                    swal({
                        title: 'Error',
                        text: 'Error, debe seleccionar vendedor',
                        icon: 'error'
                    });


                } else {

                    swal({
                        title: 'Error',
                        text: 'Error, no se pudo procesar la factura',
                        icon: 'error'
                    });
                }


            }

        }

    }


    return (

        <>

            {/* <NavbarLoged /> */}

            <Container className='containerPayment'>

                <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Fecha de factura</Form.Label>
                    <Form.Control
                        name='billDate'
                        onChange={onInputChange}
                        required
                        type="date"
                        placeholder="Fecha"
                    />
                </Form.Group>

                <br />

                <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Fecha de despacho</Form.Label>
                    <Form.Control
                        name='dispatchDate'
                        onChange={onInputChange}
                        required
                        type="date"
                        placeholder="Fecha de despacho"
                    />
                </Form.Group>
                <br />


                <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Fecha de expiracion</Form.Label>
                    <Form.Control
                        name='expirationDate'
                        onChange={onInputChange}
                        required
                        type="date"
                        placeholder="Fecha de expiracion"
                    />
                </Form.Group>
                <br />


                <Form.Group className="mb-3">
                    <Form.Label>Cliente</Form.Label>
                    <Form.Control placeholder="Cliente" name="client" onChange={onInputChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>RIF</Form.Label>
                    <Form.Control placeholder="RIF" name="rif" onChange={onInputChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Monto USD</Form.Label>
                    <Form.Control placeholder="Monto" name="amountUSD" pattern="[0-9.]{0,13}" value={state.amountUSD} onChange={onInputChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Tasa de cambio</Form.Label>
                    <Form.Control placeholder="Tasa " name="exchange" pattern="[0-9.]{0,13}" value={state.exchange} onChange={onInputChange} />
                </Form.Group>


                <Form.Group className="mb-3">
                    <Form.Label>Comision (%)</Form.Label>
                    <Form.Control placeholder="Comision" name="sellersCommission" pattern="[0-9.]{0,13}" value={state.sellersCommission} onChange={onInputChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Ciudad de la sede que distribuye</Form.Label>
                    <Form.Select onChange={onCityChange} name="city">
                        <option value="No">--- Seleccione</option>
                        <option value="Cabimas">Cabimas</option>
                        <option vlaue="Caracas">Caracas</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Direccion</Form.Label>
                    <Form.Control placeholder="Direccion" name="location" onChange={onInputChange} />
                </Form.Group>

                <Form.Group id='vendedor' className="mb-3"></Form.Group>

                <DropdownButton as={ButtonGroup} className='dropdownSeller' title="Vendedor" id="bg-vertical-dropdown-2">
                    {state.sellers.map(data => (
                        <Dropdown.Item key={data.id} onClick={() => { let sellerName = `${data.name} ${data.lastname}`; onChangeSeller(sellerName, data.id); }}>{`${data.name}  ${data.lastname}`}</Dropdown.Item>

                    ))}
                </DropdownButton>
                <br />
                <br />

                <Button variant="success" className='btnMake' onClick={onSubmit} type="submit">Registrar factura</Button>


            </Container>




        </>

    )
}

export default Create
