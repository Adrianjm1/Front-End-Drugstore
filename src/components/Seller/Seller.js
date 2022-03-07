import React, { useState, useEffect, useContext } from 'react';
import { types } from '../../config/constant';
import { Table, Form, Button, Modal } from 'react-bootstrap';
import { AuthContext } from '../../auth/AuthContext';
import swal from "sweetalert";
import './seller.css';
import axios, { generateToken } from '../../config/axios';
import NavbarLoged from '../Navbar/NavbarLoged';
import Footer from '../Footer/Footer';
import SellerPayment from './SellerPayment';
import CreateSeller from './CreateSeller';


const Seller = () => {

    const defaultState = {
        sellers: [],
        monto: 1,
        amount: '',
        bank: '',
        paymentUSD: '',
        usdbs: 'Dolares',
        sellerName: '',
        sellerid: 0,
        deleteName: '',
        deleteLastname: '',
        deleteId: ''
    };

    const [state, setState] = useState(defaultState);
    const { user, dispatch } = useContext(AuthContext);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [showPay, setShowPay] = useState(false);
    const handleClosePay = () => setShowPay(false);
    const handleShowPay = () => setShowPay(true);

    const [showCreate, setShowCreate] = useState(false);
    const handleCloseCreate = () => setShowCreate(false);
    const handleShowCreate = () => setShowCreate(true);

    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

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
                } else {
                    axios.get('/seller/')
                        .then((res) => {

                            setState({
                                ...state,
                                sellers: res.data
                            })

                        })
                        .catch((error) => console.log(error))
                }

            }).catch((err) => {
                console.log(err)

            })

        //eslint-disable-next-line
    }, [user.token, show])


    const onChangeSeller = (sellerName) => {

        let fullName = sellerName.name + ' ' + sellerName.lastname;

        if (sellerName) {


            setState({ ...state, sellerName: fullName, sellerid: sellerName.id })
        }


    }


    const onInputChange = e => {

        const isValid = e.target.validity.valid;

        if (isValid === true) {
            setState({ ...state, [e.target.name]: e.target.value });


        } else {
            console.log(isValid);

        }

    }

    const onPay = async e => {

        try {


            let USDBS;
            if (state.usdbs == 'Dolares') {
                // console.log('dolares');
                USDBS = true
            } else {
                USDBS = false

            }


            const res = await axios.post('/sellerPayments/create',
                {
                    bank: state.bank,
                    amount: state.amount,
                    paymentUSD: USDBS,
                    idSeller: state.sellerid

                });


            if (res.data.message) {

                swal({
                    title: 'Error',
                    text: res.data.message,
                    icon: 'error'
                });

            }
            else {

                swal({
                    title: 'Realizado',
                    text: 'Pago realizado con exito',
                    icon: 'success'
                });


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

    const onFocusDelete = (data) => {

        setState({ ...state, deleteName: data.name, deleteLastname: data.lastname, deleteId: data.id });

    }

    const deleteSeller = () => {


        try {

            axios.delete(`/seller/delete/${state.deleteId}`)
                .then(data => {

                    if (!data.data.ok) {

                        swal({
                            title: 'Error',
                            text: 'Ha ocurrido un error al intentar eliminar el usuario',
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

            console.log(error);

            swal({
                title: 'Error',
                text: 'Error, no se pudo eliminar el usuario',
                icon: 'error'
            });

        }

        setTimeout(function () { window.location.reload(); }, 1500);

    }


    const onChangeMethod = e => {

        const isValid = e.target.value;

        if (isValid === 'Dolares') {
            setState({ ...state, monto: true, usdbs: e.target.value });

        } else {
            setState({ ...state, monto: false, usdbs: e.target.value });


        }


    }

    return (
        <>
            <NavbarLoged />


            <div className='divTable'>

                {user.viewer == 0 ?
                    <Button onClick={handleShowCreate}>Agregar nuevo vendedor</Button>
                    :
                    <p></p>

                }



                <h2>Vendedores</h2>
                <br />

                <Table className='table-seller' striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Identidad</th>
                            <th>Comision en USD</th>
                            <th>Comision en Bs</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            state.sellers.map(data => (
                                <tr key={data.id}>
                                    <td>{data.id}</td>
                                    <td>{data.name}</td>
                                    <td>{data.lastname}</td>
                                    <td>{data.identification} </td>
                                    <td>{data.commissionUSD} USD</td>
                                    <td>{data.commissionBS} Bs</td>
                                    <td> <Button className='btnSeller' onClick={() => { handleShowPay(); onChangeSeller(data) }}>Detalles</Button> </td>

                                    {user.viewer === 0 ?
                                        <>
                                            <td> <Button className='btn-success btnSeller' onClick={() => { handleShow(); onChangeSeller(data) }}>Registrar pago</Button> </td>
                                            <td> <Button className='btn-danger btnSeller' onClick={() => { handleShowDelete(); onFocusDelete(data) }}>Eliminar</Button> </td>
                                        </>

                                        :
                                        null
                                    }

                                </tr>
                            ))
                        }
                    </tbody>
                </Table>

            </div>

            <Footer />

            <Modal className="modalRegister" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Registrar pago a vendedor <b> {state.sellerName} </b></Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Label>Metodo de pago</Form.Label>

                    <Form.Select onChange={onChangeMethod} >
                        <option value="Dolares">Dolares</option>
                        <option value="Bolivares">Bolivares</option>
                    </Form.Select>

                    <br />


                    {state.monto ?

                        <Form.Group className="mb-3">
                            <Form.Label>Monto en USD</Form.Label>
                            <Form.Control placeholder="Monto" name="amount" type='number' onChange={onInputChange} />
                        </Form.Group>
                        :

                        <Form.Group className="mb-3">
                            <Form.Label>Monto en Bs</Form.Label>
                            <Form.Control placeholder="Monto" name="amount" type='number' onChange={onInputChange} />
                        </Form.Group>

                    }


                    <Form.Group className="mb-3">
                        <Form.Label>Banco</Form.Label>
                        <Form.Control placeholder="Banco" name="bank" onChange={onInputChange} />
                    </Form.Group>

                    <Modal.Footer className="registerSeller">
                        <Button onClick={onPay} variant="primary" >
                            Registrar
                        </Button>
                    </Modal.Footer>



                </Modal.Body>
            </Modal>

            <Modal className="modalRegister" show={showPay} onHide={handleClosePay}>
                <Modal.Header closeButton>
                    <Modal.Title>Pagos a vendedor <b> {state.sellerName} </b></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SellerPayment id={state.sellerid} />
                </Modal.Body>
            </Modal>

            <Modal className="modalCreate" show={showCreate} onHide={handleCloseCreate}>
                <Modal.Header closeButton>
                    <Modal.Title>Registrar nuevo vendedor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateSeller />
                </Modal.Body>
            </Modal>

            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>¿Estas seguro/a que deseas eliminar a <b>{state.deleteName} {state.deleteLastname}</b> de la lista de vendedores?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={handleCloseDelete} variant="secondary">No</Button>
                    <Button onClick={deleteSeller} className="btn-danger" variant="primary">Si</Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default Seller
