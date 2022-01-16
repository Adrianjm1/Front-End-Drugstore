import React, { useState, useEffect } from 'react'
import { Table, Modal, Button, Form, Row, Col, DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap';
import axios from '../../config/axios';
import Details from '../Payments/Details/Details';
import MakeAPayment from '../Payments/MakeAPayment';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from "react-bootstrap-table-next";


const defaultState = {
    bills: [],
};

const columns = [
    {
        dataField: "date",
        text: "Fecha",
        sort: true
    },
    {
        dataField: "expirationDate",
        text: "Fecha de expiracion",
        sort: true
    },
    {
        dataField: "client",
        text: "Cliente",
        sort: true
    },
    {
        dataField: "amountUSD",
        text: "Monto USD",
        sort: true
    },
    {
        dataField: "unPaid",
        text: "Monto por Cobrar",
        sort: true
    },
    {
        dataField: "paid",
        text: "Monto Pagado",
        sort: true
    },
    {
        dataField: "amountBS",
        text: "Monto BS",
        sort: true
    },
    {
        dataField: "billNumber",
        text: "Detalle",
        sort: true
    },
    {
        dataField: "toDo",
        text: "Accion a Realizar",
        sort: true
    }
];


const Unpaid = () => {
    const [state, setState] = useState(defaultState);
    const [showDetails, setShowDetails] = useState(false);

    const handleCloseDetails = () => {

        axios.get('/bill/unpaid')
            .then((resp) => {

                let productos = [];

                resp.data.map(data => {
                    productos.push({
                        date: (data.billDate).slice(0, 10),
                        expirationDate: data.expirationDate.slice(0, 10),
                        client: data.client,
                        amountUSD: `${data.amountUSD} $`,
                        unPaid: `${data.amount.unPaid} $`,
                        paid: data.amount.paid,
                        amountBS: data.amountBS,
                        billNumber: <b><a onClick={() => { handleShowDetails(); changeNumber(data.id) }} className='tableDetails' href='#'>{data.id}</a></b>,
                        toDo: <b><a className='tableDetails' onClick={() => { handleShow(); changeNumber(data.id); }} >Realizar pago</a></b>
                    })
                });

                setState({ ...state, bills: productos });

            })
            .catch((error) => console.log(error))

        setShowDetails(false);
    };

    const handleShowDetails = () => setShowDetails(true);


    const [show, setShow] = useState(false);

    const handleClose = () => {

        axios.get('/bill/unpaid')
            .then((resp) => {

                let productos = [];

                resp.data.map(data => {
                    productos.push({
                        date: (data.billDate).slice(0, 10),
                        expirationDate: data.expirationDate.slice(0, 10),
                        client: data.client,
                        amountUSD: `${data.amountUSD} $`,
                        unPaid: `${data.amount.unPaid} $`,
                        paid: data.amount.paid,
                        amountBS: data.amountBS,
                        billNumber: <b><a onClick={() => { handleShowDetails(); changeNumber(data.id) }} className='tableDetails' href='#'>{data.id}</a></b>,
                        toDo: <b><a className='tableDetails' onClick={() => { handleShow(); changeNumber(data.id); }} >Realizar pago</a></b>
                    })
                });

                setState({ ...state, bills: productos });

            })
            .catch((error) => console.log(error))

        setShow(false);
    }

    const handleShow = () => setShow(true);

    const changeNumber = (id) => {

        setState({
            ...state,
            number: id
        })

    }

    useEffect(function () {

        axios.get('/bill/unpaid')
            .then((resp) => {

                let productos = [];

                resp.data.map(data => {
                    productos.push({
                        date: (data.billDate).slice(0, 10),
                        expirationDate: data.expirationDate.slice(0, 10),
                        client: data.client,
                        amountUSD: `${data.amountUSD} $`,
                        unPaid: `${data.amount.unPaid} $`,
                        paid: data.amount.paid,
                        amountBS: data.amountBS,
                        billNumber: <b><a onClick={() => { handleShowDetails(); changeNumber(data.id) }} className='tableDetails' href='#'>{data.id}</a></b>,
                        toDo: <b><a className='tableDetails' onClick={() => { handleShow(); changeNumber(data.id); }} >Realizar pago</a></b>
                    })
                });

                setState({ ...state, bills: productos });

            })
            .catch((error) => console.log(error))
    }, [])


    return (
        <>
            <h2><b>Facturas por cobrar</b></h2>

            <div className='divTable'>

                <BootstrapTable
                    bootstrap4
                    keyField="billNumber"
                    data={state.bills}
                    columns={columns}
                    pagination={paginationFactory({ sizePerPage: 5 })}
                />

            </div>



            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Procesar pago</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <MakeAPayment number={state.number} />

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

        </>


    )
}

export default Unpaid
