
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import { Container, Form, Col, Row, Button, InputGroup, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';

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
    creditDays: 0,
    client: '',
    vendedor:'',
    location:'',
    city:'',
    sellerComission:'',
    vendedorID: 0


}

const Create = () => {

    const [state, setState] = useState(stateCreate);


    useEffect(function () {


    axios.get(`/seller/`)
    .then((res) => {




        if (res.data) {

        setState({...state, sellers: res.data})

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

            console.log(e.target.value);

        } else {
            console.log(isValid);

        }

    }



    const onChangeSeller = (sellerName, vendedorID) => {

      

        // const isValid = e.target.validity.valid;


            setState({ ...state, vendedor: sellerName, vendedorID: vendedorID });
            const vendedor =
            <Form.Group className="mb-3">
            <Form.Label>Vendedor</Form.Label>
            <Form.Control disabled  placeholder="Tasa de cambio" value={sellerName} name="vendedor"  />
            </Form.Group>


            ReactDOM.render(vendedor, document.getElementById('vendedor'));
            


    }



     const onSubmit = async e => {

        try {


            console.log(`  Se hara la siguiente consulta: Create             
            \n
            
            client: ${state.client}   \n
            city: ${state.city}   \n
            rif: ${state.rif}   \n
            amountUSD: ${state.amountUSD}   \n
            amountBS: ${(state.amountUSD * state.exchange )}   \n
            date: ${state.billDate}   \n
            dispatchDate: ${state.dispatchDate}   \n
            creditDays: ${state.creditDays}   \n
            location: ${state.location}   \n
            sellerComission: ${state.comision}   \n
            idSeller: ${state.vendedorID}   \n
            
            
            
            `);




            const res = await axios.post('/bill/create',
                {
                    
                    client: state.client,
                    city: state.city,
                    rif: (state.rif),
                    amountUSD: state.amountUSD,
                    amountBS: (state.amountUSD * state.exchange ),
                    billDate: state.billDate,
                    dispatchDate: state.dispatchDate,
                    creditDays: state.creditDays,
                    location: state.location,
                    sellerComission: state.sellerComission,
                    idSeller: state.vendedorID,
                    daysLate:0


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
                    text: 'Factura creada',
                    icon: 'success'
                });


            }




        }
        catch (error) {

            console.log(error);

            swal({
                title: 'Error',
                text: 'Error, no se pudo procesar la factura',
                icon: 'error'
            });

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

                <br/>

                <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Despacho</Form.Label>
                    <Form.Control
                        name='dispatchDate'
                        onChange={onInputChange}
                        required
                        type="date"
                        placeholder="Fecha de despacho"
                    />
                </Form.Group>
                <br/>

                <Form.Group className="mb-3">
                    <Form.Label>Dias de credito</Form.Label>
                    <Form.Control  placeholder="Dias" name="creditDays" onChange={onInputChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Cliente</Form.Label>
                    <Form.Control  placeholder="Cliente" name="client" onChange={onInputChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>RIF</Form.Label>
                    <Form.Control  placeholder="RIF" name="rif" onChange={onInputChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Monto USD</Form.Label>
                    <Form.Control  placeholder="Monto" name="amountUSD" onChange={onInputChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Tasa de cambio</Form.Label>
                    <Form.Control  placeholder="Tasa " name="exchange" onChange={onInputChange} />
                </Form.Group>


                <Form.Group className="mb-3">
                    <Form.Label>Comision</Form.Label>
                    <Form.Control  placeholder="Comision" name="sellerComission" onChange={onInputChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Ciudad</Form.Label>
                    <Form.Control  placeholder="Ciudad" name="city" onChange={onInputChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Direccion</Form.Label>
                    <Form.Control  placeholder="Direccion" name="location" onChange={onInputChange} />
                </Form.Group>



                <Form.Group id='vendedor' className="mb-3"></Form.Group>

                <DropdownButton as={ButtonGroup} className='dropdownSeller' title="Vendedor" id="bg-vertical-dropdown-2">
                    {state.sellers.map(data=>(
                        <Dropdown.Item key={data.id}  onClick={()=> { let sellerName = `${data.name} ${data.lastname}`;  onChangeSeller(sellerName, data.id);}}>{ `${data.name}  ${data.lastname}`}</Dropdown.Item>

                    ))}
                </DropdownButton>
                <br/>


                <Button variant="success" className='btnMake' onClick={onSubmit} type="submit">Crear factura</Button>


            </Container>

                        
  

        </>

    )
}

export default Create
