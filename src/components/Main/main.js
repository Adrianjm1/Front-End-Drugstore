import React, { useState, useEffect } from 'react'
import { Table, Modal, Button, Form, Row, Col } from 'react-bootstrap';
import './main.css';
import axios from '../../config/axios';
import NavbarLoged from '../Navbar/NavbarLoged';
import Footer from '../Footer/Footer';
import MakeAPayment from '../Payments/MakeAPayment';
import Details from '../Payments/Details/Details';


const Main = () => {

    const defaultState = {
        sellers: [],
        bills: [],
        number:0,
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    const [showDetails, setShowDetails] = useState(false);

    const handleCloseDetails = () => setShowDetails(false);
    const handleShowDetails = () => setShowDetails(true);

    const [state, setState] = useState(defaultState);


    const changeNumber = (id)=>{

        setState({
            ...state,
            number: id
        })

    }


    useEffect(function () {



        axios.get('/seller/')
            .then((res) => {

                axios.get('/bill/')
                    .then((resp) => {

                            setState({
                                ...state,
                                sellers: res.data,
                                bills: resp.data,
                            })

                    })
                    .catch((error) => console.log(error))


            })
            .catch((error) => console.log(error))


        //eslint-disable-next-line
    }, [])

    console.log(state.bills);

    return (
        <>


            <NavbarLoged />

            <h2><b>Facturas pagadas</b></h2>

            <div className='divTable'>

                <Table className='table-seller' striped bordered hover>
                    <thead>
                        <tr>
                            <th># de factura</th>
                            <th>Fecha</th>
                            <th>Fecha de expiracion</th>
                            <th>Cliente</th>
                            <th>Monto</th>

                            <th>Accion a realizar</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {
                            state.bills.map(data => (


                                <tr className='table-pagadas' key={data.id}>
                                    <td>{data.id}</td>
                                    <td>{(data.billDate).slice(0, 10)}</td>
                                    <td>{data.expirationDate.slice(0, 10)}</td>
                                    <td>{data.client}</td>
                                    <td>{`${data.amountUSD} $`}</td>
                                    

                                    <td >{<a  onClick={()=>{handleShowDetails(); changeNumber(data.id) }}  className='tableDetails' href='#'>Detalles</a>}</td>
                             

                                </tr>
                            ))
                        }
                    </tbody>
                </Table>

            </div>

            <h2><b>Facturas por pagar</b></h2>

            <div className='divTable'>

                <Table className='table-seller' striped bordered hover>
                    <thead>
                        <tr>
                            <th># de factura</th>
                            <th>Fecha</th>
                            <th>Cliente</th>
                            <th>Monto</th>
                            <th>Pagado</th>
                            <th>Por pagar</th>
                            <th>Accion a realizar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key="1" className='table-danger'>
                            <td>123456</td>
                            <td>2021-12-20</td>
                            <td>Farmatodo</td>
                            <td>1000</td>
                            <td>100</td>
                            <td>900</td>
                            <th><a href='#'>Detalles</a> / <a onClick={() => handleShow()} >Realizar pago</a></th>
                        </tr>
                        <tr key="2" className='table-danger'>
                            <td>123456</td>
                            <td>2021-12-20</td>
                            <td>Farmatodo</td>
                            <td>1000</td>
                            <td>100</td>
                            <td>900</td>
                            <th><a href='#'>Detalles</a> / <a onClick={() => handleShow()} >Realizar pago</a></th>
                        </tr>
                    </tbody>
                </Table>

            </div>

     

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Procesar pago</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <MakeAPayment/>

                </Modal.Body>
            </Modal>

            <Modal show={showDetails} onHide={handleCloseDetails}>
                <Modal.Header closeButton>
                    <Modal.Title>Detalles</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Details number={state.number} />

                </Modal.Body>
            </Modal>



            <Footer />
        </>
    )
}

export default Main
