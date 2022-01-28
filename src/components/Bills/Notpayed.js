import React, { useState, useEffect, useMemo } from 'react'
import { Table, Modal, FormControl } from 'react-bootstrap';
import axios from '../../config/axios';
import Details from '../Payments/Details/Details';
import MakeAPayment from '../Payments/MakeAPayment';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from "react-bootstrap-table-next";
import ReactHTMLTableToExcel from "react-html-table-to-excel";



const defaultState = {
    bills3: [],
    busqueda: ''
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
                        id: data.id,
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




    const handleChange = e => {
        setState({ ...state, busqueda: e.target.value.toUpperCase() });
    }

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
                        id: (data.id),
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

    const facturas = useMemo(function () {
        if (state.bills3.length) {
            return state.bills3.filter(factura => (`${factura.id}`).includes(state.busqueda))
        } else if (state.busqueda === '') {
            return state.bills3
        }

        return state.bills3
    }, [state])

    return (
        <>
            <h2><b>Facturas vencidas</b></h2>
            <p className='busquedax'>Busqueda por #</p>
            <FormControl type="text" placeholder="Busqueda" className="busqueda" onChange={handleChange} />

            {<ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="btn btn-success"
                table="NotPayedTable"
                filename="tablexls"
                sheet="tablexls"
                buttonText="Exportar a Excel" />}



            <div className='divTable'>

                <BootstrapTable
                    bootstrap4
                    id='NotPayedTable'
                    keyField="id"
                    data={facturas}
                    columns={columns}
                    pagination={paginationFactory({ sizePerPageList : [ {
                        text: '15', value: 15
                      }, {
                        text: '50', value: 50
                      }, {
                        text: 'Todo', value: state.bills3.length
                      } ] })}
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
