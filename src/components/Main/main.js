import React, { useState, useEffect, useContext } from 'react'
import { Modal, Button, DropdownButton, ButtonGroup, Dropdown, Col, Row } from 'react-bootstrap';
import axios, { generateToken } from '../../config/axios';
import { AuthContext } from '../../auth/AuthContext';
import NavbarLoged from '../Navbar/NavbarLoged';
import Footer from '../Footer/Footer';
import Paid from '../Bills/Paid';
import Unpaid from '../Bills/Unpaid';
import Notpayed from '../Bills/Notpayed';
import Create from '../Bills/Create';
import Welcome from './Welcome';
import { types } from '../../config/constant';
import './main.css';
import Byseller from '../Bills/BySeller';
import File from './File';




const Main = () => {




    const defaultState = {
        number: 0,
        option: 1,
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showFile, setShowFile] = useState(false);
    const handleCloseFile = () => setShowFile(false);
    const handleShowFile = () => setShowFile(true);



    const [showWelcome, setShowWelcome] = useState(false);
    const handleCloseWelcome = () => setShowWelcome(false);
    const handleShowWelcome = () => setShowWelcome(true);

    const [state, setState] = useState(defaultState);


    const changeOption = (op) => {

        setState({
            ...state,
            option: op,
        })

    }


    const welcome = () => {
        handleShowWelcome();
    }

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

        welcome();

    }, [user.token]);



    return (
        <>

            <NavbarLoged />

            <br />
            <br />

            <Row className='buttons'>

                <Col>
                    {user.viewer === 0 ?
                        <Button className="bg-danger d-block" style={{ borderColor: 'black' }} onClick={handleShowFile}>Subir archivo</Button>
                        :
                        <></>
                    }
                </Col>

                <Col>

                    <DropdownButton as={ButtonGroup} className='dropdownMain' title="Ver facturas" id="bg-vertical-dropdown-1">
                        <Dropdown.Item eventKey="1" onClick={() => changeOption(1)}>Facturas por cobrar</Dropdown.Item>
                        <Dropdown.Item eventKey="2" onClick={() => changeOption(2)}>Facturas cobradas</Dropdown.Item>
                        <Dropdown.Item eventKey="3" onClick={() => changeOption(3)}>Facturas vencidas</Dropdown.Item>
                        <Dropdown.Item eventKey="3" onClick={() => changeOption(4)}>Facturas por vendedor</Dropdown.Item>
                    </DropdownButton>

                </Col>

                <Col>

                    {user.viewer === 0 ?
                        <Button className='bg-success d-block' style={{ borderColor: 'black' }} onClick={handleShow}>Crear Factura </Button>
                        :
                        <> {user.viewer}</>
                    }

                </Col>

            </Row>

            <br />

            {state.option === 1 ?
                <Unpaid key={1} />
                :
                <> </>
            }



            {state.option === 2 ?

                <Paid key={2} />
                :
                <> </>
            }

            {state.option === 3 ?
                <Notpayed key={3} />
                :
                <> </>
            }

            {state.option === 4 ?
                <Byseller key={4} />
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

            <Modal className="modalFile" show={showFile} onHide={handleCloseFile}>
                <Modal.Header >
                    <Modal.Title>Importar datos desde Excel</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <File />

                </Modal.Body>
            </Modal>


            <Modal className="modalWelcome" show={showWelcome} onHide={handleCloseWelcome}>

                <Modal.Header closeButton>
                    <Modal.Title>Bienvenido usuario</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Welcome />

                </Modal.Body>
                <Modal.Footer>

                    <Button variant="primary" onClick={handleCloseWelcome}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Main
