
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import { Container, Form, Col, Row, Button, InputGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import image from '../../assets/img/dolar.png'
import image2 from '../../assets/img/bolivar.png'
import NavbarLoged from '../Navbar/NavbarLoged';
import swal from 'sweetalert';
import axios from '../../config/axios';
import './makeAPayment.css'


const billState = {
    datos:[],
    seller: [],
    amount: [],
    restante: 0,
    amountPay:0,
    reference: '',
    bank:'',
    date: '',
    paymentUSD: false,
    exchange: 0,
    exchangeHide: false
}


const payState ={

    paymentUSD: false,
    exchange: 0
}


const MakeAPayment = (number) => {

    const [state, setState] = useState(billState);

    const [pay, setPay] = useState(payState);

    const [exc, setExc] = useState(payState);

    let id = useParams().id;

    useEffect(function () {


        axios.get(`/bill/${number.number}`)
            .then((res) => {


                if (res.data) {


                    if (res.data.amount.unPaid == 0){
                        setState({ ...state,datos: res.data, seller: res.data.seller, amount: res.data.amount,restante: res.data.amount.notPayed })
    
                    }
                    
                    
                    else{
                        setState({ ...state,datos: res.data, seller: res.data.seller, amount: res.data.amount,restante: res.data.amount.unPaid })
                    }
    
 
                } else {
                    console.log('No hay data')
                }



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


    const onExchangeChange = e => {

        const isValid = e.target.validity.valid;


        if (isValid === true) {
            setExc({ ...exc, exchange: e.target.value });

        } else {
            console.log(isValid);

        }

    }


    const handleChange =  e =>{




      
        if(e.target.checked === false){
            setPay({ ...pay, paymentUSD: false });
            setExc({exchange: 0})

            ReactDOM.render(<p></p>, document.getElementById('tasadecambio'));
            
        }else{

            setPay({ ...pay, paymentUSD: true });

            const tasa =
            <Form.Group className="mb-3">
            <Form.Label>Tasa de cambio</Form.Label>
            <Form.Control  placeholder="Tasa de cambio" name="exchange" onChange={onExchangeChange} />
            </Form.Group>


            ReactDOM.render(tasa, document.getElementById('tasadecambio'));
           
           
       }

       console.log(e.target.checked);
    }



     const onSubmit = async e => {

        try {

            // console.log( 'ID:      '   + state.datos.id  +'   Cliente:   '  
            //  +  state.datos.client  +' Ciudad:     '   +   state.datos.city  +'   Referece:   '
            //     +    state.reference  +'  Monto:    '   +   state.amountPay   + '  date: '+ state.date  + ' checkUSD: ' + state.checkUSD   );

            console.log(pay);
            const res = await axios.post('/payments/create',
                {
                    id: state.datos.id,
                    client: state.datos.client,
                    city: state.datos.city,
                    referenceNumber: (state.reference),
                    amountUSD: state.amountPay,
                    date: state.date,
                    bank: state.bank,
                    paymentUSD: pay.paymentUSD,
                    exchangeRate: exc.exchange

                });


            if (res.data.message) {

                swal({
                    title: 'Error',
                    text: res.data.message,
                    icon: 'error'
                });
            } else if (state.date === '' || state.bank === '' || state.amountPay===0 || state.referenceNumber === ''){

                swal({
                    title: 'Error',
                    text: 'Faltan campos por rellenar',
                    icon: 'error'
                });

            } 
            else {


                swal({
                    title: 'Realizado',
                    text: 'Pago realizado con exito',
                    icon: 'success'
                });

                // setTimeout(function () { window.location.reload(); }, 3500);

            }




        }
        catch (error) {

            console.log(error);

            swal({
                title: 'Error',
                text: 'Error, no se pudo procesar el pago',
                icon: 'error'
            });

        }

    }


    return (

        <>

            {/* <NavbarLoged /> */}

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
                    <Form.Control placeholder={state.seller.name  +  '  ' + state.seller.lastname} disabled />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Restante por pagar</Form.Label>
                    <Form.Control placeholder={state.restante} disabled />
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
                <br/>

                <Form.Group className="mb-3">
                    <Form.Label>Monto a pagar</Form.Label>
                    <Form.Control  placeholder="Ingrese el monto" name="amountPay" onChange={onInputChange} />
                </Form.Group>

                <Form.Group id='tasadecambio' className="mb-3">

                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Referencia</Form.Label>
                    <Form.Control  placeholder="Ingrese el monto" name="reference" onChange={onInputChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Banco</Form.Label>
                    <Form.Control  placeholder="Ingrese el monto" name="bank" onChange={onInputChange} />
                </Form.Group>




                <Form.Group as={Row} className="mb-3 checkPayment" name="paymentUSD" onChange={onInputChange}  controlId="formHorizontalCheck">

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
