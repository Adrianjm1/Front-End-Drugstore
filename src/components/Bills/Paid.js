
import React, { useState, useEffect, useMemo } from 'react'
import { Modal, Table, FormControl } from 'react-bootstrap';
import axios from '../../config/axios';
import Details from '../Payments/Details/Details';
import numberWithCommas from '../../helpers/helpers';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from "react-bootstrap-table-next";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { AuthContext } from '../../auth/AuthContext';



const defaultState = {
    bills1: [],
    usd: 0,
    bs: 0,
    busqueda: '',
    busquedaxcliente: '',
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
                        location: data.location,
                        seller: data.seller.name,
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
                        id: (data.id),
                        date: (data.billDate).slice(0, 10),
                        expirationDate: data.expirationDate.slice(0, 10),
                        client: data.client,
                        location: data.location,
                        seller: data.seller.name,
                        amountPayed: `${parseFloat(data.amount.paid).toFixed(2)} $`,
                        overPaidBS: `${data.overPaidBS}Bs.`,
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
            dataField: "location",
            text: "Localidad",
            sort: true
        },
        {
            dataField: "amountPayed",
            text: "Monto Pagado",
            sort: true
        },
        {
            dataField: "overPaidBS",
            text: "Diferencial Cambiario",
            sort: true
        },
        {
            dataField: "seller",
            text: "Vendedor",
            sort: true
        },
        {
            dataField: "toDo",
            text: "Detalle",
            sort: true
        }
    ];

    const handleChange = e => {
        setState({ ...state, [e.target.name]: e.target.value.toUpperCase() });
    }


    const facturas1 = useMemo(function () {
        if (state.bills1.length) {
            return state.bills1.filter(factura => (`${factura.id}`).includes(state.busqueda))
        } else if (state.busqueda === '') {
            return state.bills1
        }

        return state.bills1
    }, [state])


    const facturas = useMemo(function () {
        if (state.bills1.length) {
            return facturas1.filter(factura => (`${factura.client}`).includes(state.busquedaxcliente))
        } else if (state.busquedaxcliente === '') {
            return facturas1
        }

        return state.bills
    }, [state])


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
                            <td>{numberWithCommas(parseFloat(state.usd || 0).toFixed(2))} USD</td>
                            <td>{numberWithCommas(parseFloat(state.bs || 0).toFixed(2))} Bs.</td>
                        </tr>
                    </tbody>
                </Table>

                {<ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="btn btn-success"
                    table="Paid"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Exportar a Excel" />}
            </div>
                    
            <br />
            <br />
            <div className='row'>
                <div className='col'>
                    <p className='busquedax'>Busqueda por #</p>
                    <FormControl type="text" name='busqueda' placeholder="Busqueda" className="busqueda" onChange={handleChange} />

                </div>
                <div className='col'>            <p className='busquedax'>Busqueda por Cliente</p>
                    <FormControl type="text" name='busquedaxcliente' placeholder="Busqueda por cliente" className="busqueda" onChange={handleChange} />
                </div>

            </div>



            <div className='divTable'>

                <BootstrapTable
                    bootstrap4
                    id='Paid'
                    keyField="id"
                    data={facturas}
                    columns={columns}
                    pagination={paginationFactory({
                        sizePerPageList: [{
                            text: '15', value: 15
                        }, {
                            text: '50', value: 50
                        }, {
                            text: 'Todo', value: state.bills1.length
                        }]
                    })}
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
