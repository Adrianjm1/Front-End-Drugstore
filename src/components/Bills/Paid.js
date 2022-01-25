
import React, { useState, useEffect } from 'react'
import { Modal, Table, Container } from 'react-bootstrap';
import axios from '../../config/axios';
import Details from '../Payments/Details/Details';
import numberWithCommas from '../../helpers/helpers';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from "react-bootstrap-table-next";


const defaultState = {
    bills1: [],
    usd: 0,
    bs: 0
};


const Paid = () => {

    const [state, setState] = useState(defaultState);
    const [showDetails, setShowDetails] = useState(false);

    const handleCloseDetails = () => {

        axios.get('/bill/paid')
            .then((resp) => {

                let datos = resp.data;

                let productos = [];

                datos.data.map(data => {
                    productos.push({
                        date: (data.billDate).slice(0, 10),
                        expirationDate: data.expirationDate.slice(0, 10),
                        client: data.client,
                        amountPayed: `${data.amount.paid} $`,
                        toDo: <b><a onClick={() => { handleShowDetails(); changeNumber(data.id) }} className='tableDetails' href='#'>{data.id}</a></b>,
                    })
                });

                setState({ ...state, bills1: productos, usd: datos.sumUSD, bs: datos.sumBS });
                setShowDetails(false);

            })
            .catch((error) => console.log(error))


    }

    const handleShowDetails = () => setShowDetails(true);

    const changeNumber = (id) => {

        setState({
            ...state,
            number: id
        })

    }


    useEffect(function () {

        axios.get('/bill/paid')
            .then((resp) => {

                let productos = [];
                let datos = resp.data;

                datos.data.map(data => {
                    productos.push({
                        date: (data.billDate).slice(0, 10),
                        expirationDate: data.expirationDate.slice(0, 10),
                        client: data.client,
                        amountPayed: `${data.amount.paid} $`,
                        toDo: <b><a onClick={() => { handleShowDetails(); changeNumber(data.id) }} className='tableDetails' href='#'>{data.id}</a></b>,
                    })
                });

                setState({ ...state, bills1: productos, usd: datos.sumUSD, bs: datos.sumBS });

            })
            .catch((error) => console.error(error))

    }, [])

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
            dataField: "amountPayed",
            text: "Monto Pagado",
            sort: true
        },
        {
            dataField: "toDo",
            text: "Detalle",
            sort: true
        }
    ];

    const column2 = [
        {
            dataField: "usd",
            text: "Facturado en Dolares ($)",
            sort: true
        },
        {
            dataField: "bs",
            text: "Facturado en Bolivares (Bs.)",
            sort: true
        }
    ];



    return (
        <>
            <h2><b>Facturas cobradas</b></h2>

            <div className='divTable'>
                <Table className="margintable" striped bordered hover size="sm" >
                    <thead>
                        <tr className='first'>
                            <th>Facturado en dolares ($)</th>
                            <th>Facturado en bolívares (Bs.)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{numberWithCommas(parseFloat(state.usd || 0))} USD</td>
                            <td>{numberWithCommas(parseFloat(state.bs || 0).toFixed(2))} Bs.</td>
                        </tr>
                    </tbody>
                </Table>
            </div>

            <div className='divTable'>

                <BootstrapTable
                    bootstrap4
                    keyField="billNumber"
                    data={state.bills1}
                    columns={columns}
                    pagination={paginationFactory({ sizePerPage: 5 })}
                />

            </div>

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

export default Paid
