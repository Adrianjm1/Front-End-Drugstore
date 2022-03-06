import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Container, Form, Col, Row, Button } from 'react-bootstrap';
import image from '../../assets/img/dolar.png'
import swal from 'sweetalert';
import axios from '../../config/axios';
import numberWithComas from '../../helpers/helpers';
import './makeAPayment.css'


const billState = {
    datos: [],
    seller: [],
    amount: [],
    restante: 0,
    amountPay: 0,
    reference: '',
    bank: '',
    date: '',
    oldExchange: 0,
    restanteBS: 0,
    exchangeHide: false,
}

const handle = {
    tasadecambio: 0,
}


var paymentUSD = 1;
let value1 = 0;
let value2 = 0;
let diferencialBancario = 0;

const MakeAPayment = (number) => {

    const [state, setState] = useState(billState);
    const [stateHandle, setHandle] = useState(handle);

    useEffect(function () {


        axios.get(`/bill/${number.number}`)
            .then((res) => {

                if (res.data) {

                    if (res.data.amount.unPaid == 0) {
                        setState({ ...state, datos: res.data, seller: res.data.seller, amount: res.data.amount, restante: res.data.amount.notPayed, oldExchange: res.data.exchange })

                    }

                    else {
                        setState({ ...state, datos: res.data, seller: res.data.seller, amount: res.data.amount, restante: res.data.amount.unPaid, oldExchange: res.data.exchange, restanteBS: res.data.overPaidBS })

                    }

                } 

            })
            .catch((error) => console.log(error))



        //eslint-disable-next-line
    }, [])


    const onInputChange = e => {

        setState({ ...state, [e.target.name]: e.target.value });

    }

    const onRestanteChange = () => {

        if (isNaN(value1) || isNaN(value2)) {
            document.getElementById('diferencialInput').placeholder = `Ingrese los numeros correctos`;
            diferencialBancario = 0;

        } else {
            let old = parseFloat(state.restante) * parseFloat(state.oldExchange);
            let now = value1 * value2;

            if (old < now) {
                document.getElementById('diferencialInput').placeholder = `${-(old - now).toFixed(2)}Bs.`;
                diferencialBancario = -(old - now);

            } else {
                document.getElementById('diferencialInput').placeholder = `0`;
                diferencialBancario = 0;

            }
        }

    }

    const onNumberChange = e => {

        setHandle({ ...stateHandle, tasadecambio: (isNaN(e.target.value) == true ? 0 : parseFloat(e.target.value)) });
        value2 = parseFloat(e.target.value);

        onRestanteChange();

    }

    const onNumber2Change = e => {

        setState({ ...state, amountPay: (isNaN(e.target.value) == true ? 0 : parseFloat(e.target.value)) });
        value1 = parseFloat(e.target.value);

        if (paymentUSD == 0) {
            onRestanteChange();

        }

    }


    const handleChange = e => {

        if (e.target.checked == false) {

            document.getElementById('restantePorPagar').placeholder = `${numberWithComas(parseFloat(state.restante))}$`;

            ReactDOM.render(<p></p>, document.getElementById('tasadecambio'));
            ReactDOM.render(<p></p>, document.getElementById('diferencial'));

        } else {

            const tasa =
                <Form.Group className="mb-3">
                    <Form.Label>Tasa de cambio</Form.Label>
                    <Form.Control placeholder="Tasa de cambio" name='tasadecambio' onChange={onNumberChange} />
                </Form.Group>

            const diferencial =
                <Form.Group className="mb-3">
                    <Form.Label>Diferencial Cambiario</Form.Label>
                    <Form.Control placeholder="0" id='diferencialInput' disabled />
                </Form.Group>

            document.getElementById('restantePorPagar').placeholder = `${numberWithComas(parseFloat(state.restante))}$ (${numberWithComas((parseFloat(state.restante) * parseFloat(state.oldExchange)).toFixed(2))}Bs.)`;
            ReactDOM.render(tasa, document.getElementById('tasadecambio'));
            ReactDOM.render(diferencial, document.getElementById('diferencial'));

        }

        paymentUSD = e.target.checked == false ? 1 : 0;

        setHandle({ ...stateHandle, tasadecambio: (e.target.checked == false ? 0 : stateHandle.tasadecambio) });

    }



    const onSubmit = async e => {

        try {

            if (state.date != "" && state.bank != "" && state.amountPay != 0 && state.referenceNumber != "") {

                if ((isNaN(stateHandle.tasadecambio == '' ? 'a' : stateHandle.tasadecambio) === false || stateHandle.tasadecambio === 0) && (isNaN(state.amountPay == '' ? 'a' : state.amountPay) === false)) {

                    const res = await axios.post('/payments/create',
                        {
                            id: state.datos.id,
                            client: state.datos.client,
                            city: state.datos.city,
                            referenceNumber: (state.reference),
                            amountUSD: state.amountPay,
                            date: state.date,
                            bank: state.bank,
                            paymentUSD: paymentUSD,
                            exchangeRate: stateHandle.tasadecambio,
                            overPaidBS: diferencialBancario

                        });

                    if (res.data.message) {

                        swal({
                            title: 'Error',
                            text: res.data.message,
                            icon: 'error'
                        });

                    } else {

                        swal({
                            title: 'Realizado',
                            text: 'Pago realizado con exito',
                            icon: 'success'
                        });

                        setTimeout(function () { window.location.reload(); }, 1500);

                    }


                } else {
                    swal({
                        title: 'Error',
                        text: 'Uno de los campos ingresados no es numerico',
                        icon: 'error'
                    });
                }

            } else {

                swal({
                    title: 'Error',
                    text: 'Verifique bien los campos',
                    icon: 'error'
                });

            }

        }

        catch (error) {

            swal({
                title: 'Error',
                text: 'Error, no se pudo procesar el pago',
                icon: 'error'
            });

        }

    }


    return (

        <>

            <Container className='containerPayment'>

                <Form.Group className="mb-3">
                    <Form.Label>Numero de factura</Form.Label>
                    <Form.Control placeholder={state.datos.id} disabled />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Cliente</Form.Label>
                    <Form.Control placeholder={state.datos.client} disabled />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Ciudad</Form.Label>
                    <Form.Control placeholder={state.datos.city} disabled />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Vendedor encargado</Form.Label>
                    <Form.Control placeholder={state.seller.name + '  ' + state.seller.lastname} disabled />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Restante por pagar</Form.Label>
                    <Form.Control id="restantePorPagar" placeholder={`${state.restante}$`} disabled />
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control
                        name='date'
                        onChange={onInputChange}
                        required
                        type="date"
                        placeholder="Fecha"
                    />

                </Form.Group>
                <br />

                <Form.Group className="mb-3">
                    <Form.Label>Monto a pagar</Form.Label>
                    <Form.Control placeholder="Ingrese el monto" type='text' name="amountPay" onChange={onNumber2Change} />
                </Form.Group>

                <Form.Group id='tasadecambio' className="mb-3">

                </Form.Group>

                <Form.Group id='diferencial' className="mb-3">

                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Referencia</Form.Label>
                    <Form.Control placeholder="Ingrese el numero de refrencia" name="reference" onChange={onInputChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Banco</Form.Label>
                    <Form.Control placeholder="Ingrese el banco" name="bank" onChange={onInputChange} />
                </Form.Group>

                <Form.Group as={Row} className="mb-3 checkPayment" name="paymentUSD" controlId="formHorizontalCheck">

                    <img className='imgDolar' src={image} />
                    <label className="switch">
                        <input onChange={handleChange} type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                    <p className='bolivares' >Bs</p>

                </Form.Group>

                <Button variant="success" className='btnMake' onClick={onSubmit} type="submit">Realizar pago</Button>


            </Container>





        </>

    )
}

export default MakeAPayment
