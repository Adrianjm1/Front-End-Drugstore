
import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap';
import axios from '../../config/axios';
import Details from '../Payments/Details/Details';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from "react-bootstrap-table-next";


const defaultState = {
    bills1: [],
};


const Paid = () => {

    const [state, setState] = useState(defaultState);
    const [showDetails, setShowDetails] = useState(false);

    const handleCloseDetails = () => {

        axios.get('/bill/paid')
            .then((resp) => {

                let productos = [];

                resp.data.map(data => {
                    productos.push({
                        billNumber: data.id,
                        date: (data.billDate).slice(0, 10),
                        expirationDate: data.expirationDate.slice(0, 10),
                        client: data.client,
                        amountPayed: `${data.amount.paid} $`,
                        toDo: <b><a onClick={() => { handleShowDetails(); changeNumber(data.id) }} className='tableDetails' href='#'>Detalles</a></b>,
                    })
                });

                setState({ ...state, bills1: productos });
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


        axios.get('/seller/')
            .then((res) => {

                axios.get('/bill/paid')
                    .then((resp) => {

                        let productos = [];

                        resp.data.map(data => {
                            productos.push({
                                billNumber: data.id,
                                date: (data.billDate).slice(0, 10),
                                expirationDate: data.expirationDate.slice(0, 10),
                                client: data.client,
                                amountPayed: `${data.amount.paid} $`,
                                toDo: <a onClick={() => { handleShowDetails(); changeNumber(data.id) }} key={data.id} className='tableDetails' href='#'>Detalles</a>,
                            })
                        });

                        setState({ ...state, bills1: productos });

                    })
                    .catch((error) => console.log(error))

            })
            .catch((error) => console.log(error))

    }, [])

    const columns = [
        {
            dataField: "billNumber",
            text: "# de Factura",
            sort: true
        },
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
            text: "Accion a Realizar",
            sort: true
        }
    ];



    return (
        <>
            <h2><b>Facturas pagadas</b></h2>

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
