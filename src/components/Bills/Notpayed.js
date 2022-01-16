import React, { useState, useEffect } from 'react'
import { Table, Modal } from 'react-bootstrap';
import axios from '../../config/axios';
import Details from '../Payments/Details/Details';
import MakeAPayment from '../Payments/MakeAPayment';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from "react-bootstrap-table-next";


const defaultState = {
    bills3: []
};


const Notpayed = () => {
    const [state, setState] = useState(defaultState);
    const [showDetails, setShowDetails] = useState(false);

    const handleCloseDetails = () => {

        axios.get('/bill/notpayed')
            .then((resp) => {

                let productos = [];

                resp.data.map(data => {
                    productos.push({
                        date: (data.billDate).slice(0, 10),
                        expirationDate: data.expirationDate.slice(0, 10),
                        client: data.client,
                        amountNotPayed: `${data.amount.notPayed} $`,
                        billNumber: <b><p onClick={() => { handleShowDetails(); changeNumber(data.id) }} key={data.id} className='tableDetails' href='#'>{data.id}</p></b>,
                        toDo: <b><p className='tableDetails' key={data.id} onClick={() => { handleShow(); changeNumber(data.id); }} >Realizar pago</p></b>
                    })
                });


                setState({ ...state, bills3: productos });
                setShowDetails(false);

            })
            .catch((error) => console.log(error))
    }

    const handleShowDetails = () => setShowDetails(true);

    const [show, setShow] = useState(false);

    const handleClose = () => {

        axios.get('/bill/notpayed')
            .then((resp) => {

                let productos = [];

                resp.data.map(data => {
                    productos.push({
                        date: (data.billDate).slice(0, 10),
                        expirationDate: data.expirationDate.slice(0, 10),
                        client: data.client,
                        amountNotPayed: `${data.amount.notPayed} $`,
                        billNumber: <b><p onClick={() => { handleShowDetails(); changeNumber(data.id) }} key={data.id} className='tableDetails' href='#'>{data.id}</p></b>,
                        toDo: <b><p className='tableDetails' key={data.id} onClick={() => { handleShow(); changeNumber(data.id); }} >Realizar pago</p></b>
                    })
                });

                setState({ ...state, bills3: productos });
                setShow(false);

            })
            .catch((error) => console.log(error))

    }

    const handleShow = () => setShow(true);

    const changeNumber = (id) => {

        setState({
            ...state,
            number: id
        })

    }

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
            dataField: "amountNotPayed",
            text: "Monto Vencido",
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

    useEffect(function () {

        axios.get('/bill/notpayed')
            .then((resp) => {

                let productos = [];

                resp.data.map(data => {
                    productos.push({
                        date: (data.billDate).slice(0, 10),
                        expirationDate: data.expirationDate.slice(0, 10),
                        client: data.client,
                        amountNotPayed: `${data.amount.notPayed} $`,
                        billNumber: <b><p onClick={() => { handleShowDetails(); changeNumber(data.id) }} key={data.id} className='tableDetails' href='#'>{data.id}</p></b>,
                        toDo: <b><p className='tableDetails' key={data.id} onClick={() => { handleShow(); changeNumber(data.id); }} >Realizar pago</p></b>
                    })
                });


                setState({ ...state, bills3: productos })

            })
            .catch((error) => console.log(error))


        //eslint-disable-next-line
    }, [])


    return (
        <>
            <h2><b>Facturas vencidas</b></h2>

            <div className='divTable'>

                <BootstrapTable
                    bootstrap4
                    keyField="billNumber"
                    data={state.bills3}
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

export default Notpayed
