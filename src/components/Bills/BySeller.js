
import React, { useState, useEffect } from 'react'
import { Modal, DropdownButton, ButtonGroup, Dropdown, Table } from 'react-bootstrap';
import { AuthContext } from '../../auth/AuthContext';
import axios from '../../config/axios';
import Details from '../Payments/Details/Details';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from "react-bootstrap-table-next";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import numberWithCommas from '../../helpers/helpers';



const defaultState = {
    sellers: [],
    bills: [],
    id: 1,
    usd:0,
    bs:0

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
        dataField: "location",
        text: "Localidad",
        sort: true
    },
    {
        dataField: "amountUSD",
        text: "Monto USD",
        sort: true
    },
    {
        dataField: "amountBS",
        text: "Monto Bs",
        sort: true
    },
    {
        dataField: "billNumber",
        text: "Detalle",
        sort: true
    },

];


const Byseller = () => {
   
    const [state, setState] = useState(defaultState);
    const [showDetails, setShowDetails] = useState(false);

    const handleCloseDetails = () => {

        axios.get('/seller/')
            .then((res) => {

                axios.get(`/bill/seller/${state.id}`)
                    .then((resp) => {

                        let productos = [];

                        resp.data.data.map(data => {
                            productos.push({
                                date: (data.billDate).slice(0, 10),
                                expirationDate: data.expirationDate.slice(0, 10),
                                client: data.client,
                                location: data.location,
                                amountBS: `${data.amountBS} Bs`,
                                amountUSD: `${data.amountUSD} $`,
                                billNumber: <b><p onClick={() => { handleShowDetails(); changeNumber(data.id) }} className='tableDetails'>{data.id}</p></b>
                            })
                        })


                        setState({ ...state, sellers: res.data, bills: productos, usd: resp.data.sumas[0].sumUSD, bs: resp.data.sumas[0].sumBS  })
                        setShowDetails(false);


                    })
                    .catch((error) => console.log(error))


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

                axios.get(`/bill/seller/${state.id}`)
                    .then((resp) => {

                        let productos = [];

                        resp.data.data.map(data => {
                            productos.push({
                                date: (data.billDate).slice(0, 10),
                                expirationDate: data.expirationDate.slice(0, 10),
                                client: data.client,
                                location: data.location,
                                amountBS: `${data.amountBS} Bs`,
                                amountUSD: `${data.amountUSD} $`,
                                billNumber: <b><p onClick={() => { handleShowDetails(); changeNumber(data.id) }} className='tableDetails'>{data.id}</p></b>
                            })
                        })


                        setState({ ...state, sellers: res.data, bills: productos, usd: resp.data.sumas[0].sumUSD, bs: resp.data.sumas[0].sumBS  })

                    })
                    .catch((error) => console.log(error))


            })
            .catch((error) => console.log(error))


    }, [state.id])


    const setID = (id) => {
        
        if (id) {
            setState({ ...state, id: id })
        }

    }



    return (
        <>
            <h2><b>Facturas por vendedor</b></h2>  <br />

            <div className="divTable">

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
                table="Byseller"
                filename="tablexls"
                sheet="tablexls"
                buttonText="Exportar a Excel" />}


            <DropdownButton as={ButtonGroup} className='selectSeller' style={{ width: '7%', display: "block", margin: "auto" }} title="Vendedor" id="bg-vertical-dropdown-2">
                {state.sellers.map(data => (
                    <Dropdown.Item key={data.id} onClick={() => { let sellerName = `${data.name} ${data.lastname}`; setID(data.id); }}>{`${data.name}  ${data.lastname}`}</Dropdown.Item>

                ))}
            </DropdownButton>
            </div>



            <div className='divTable'>

                <BootstrapTable
                    bootstrap4
                    id='Byseller'
                    keyField="id"
                    data={state.bills}
                    columns={columns}
                    pagination={paginationFactory({ sizePerPageList : [ {
                        text: '15', value: 15
                      }, {
                        text: '50', value: 50
                      }, {
                        text: 'Todo', value: state.bills.length
                      } ] })}
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

export default Byseller
