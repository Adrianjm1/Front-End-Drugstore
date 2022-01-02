import React, { useState, useEffect } from 'react'
import { Table, Modal, Button, Form, Row, Col, DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap';
import './main.css';
import axios from '../../config/axios';
import NavbarLoged from '../Navbar/NavbarLoged';
import Footer from '../Footer/Footer';
import MakeAPayment from '../Payments/MakeAPayment';
import Details from '../Payments/Details/Details';
import Paid from '../Bills/Paid';
import Unpaid from '../Bills/Unpaid';
import Notpayed from '../Bills/Notpayed';
import Create from '../Bills/Create';



const Main = () => {

    const defaultState = {
        sellers: [],
        bills: [],
        number:0,
        option:1,
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    const [showDetails, setShowDetails] = useState(false);


    const [state, setState] = useState(defaultState);


    const changeOption =(op)=>{



            setState({
                ...state,
                option: op,
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



    }, [])



    return (
        <>


            <NavbarLoged />

            <Button className='btnCreateBill' onClick={handleShow}>Crear Factura </Button>
            <br/>

            <DropdownButton as={ButtonGroup} className='dropdownMain' title="Ver facturas" id="bg-vertical-dropdown-1">
            <Dropdown.Item eventKey="1" onClick={()=> changeOption(1)}>Facturas por cobrar</Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={()=> changeOption(2)}>Facturas pagadas</Dropdown.Item>
            <Dropdown.Item eventKey="3" onClick={()=> changeOption(3)}>Facturas vencidas</Dropdown.Item>
            </DropdownButton>

            {state.option ===1 ?
               <Unpaid/>
            :
            <> </>
        }



{state.option ===2 ?

            <Paid/>
            :
            <> </>
        }

{state.option ===3 ?
            <Notpayed/>
            :
            <> </>
        }
            <Footer />


            <Modal className="modalCreateBill" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Registrar factura</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                <Create />

                </Modal.Body>
            </Modal>
        </>
    )
}

export default Main
