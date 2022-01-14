
import React, { useState, useEffect } from 'react'
import { Table, Modal, Button, Form, Row, Col, DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap';
import axios from '../../config/axios';
import Details from '../Payments/Details/Details';


const defaultState = {
    sellers: [],
    bills: [],
    id: 1

};


const Byseller = () => {

    const [state, setState] = useState(defaultState);
    const [showDetails, setShowDetails] = useState(false);

    const handleCloseDetails = () => setShowDetails(false);
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


                        setState({
                            ...state,
                            sellers: res.data,
                            bills: resp.data,
                        })

                    })
                    .catch((error) => console.log(error))


            })
            .catch((error) => console.log(error))


        //eslint-disable-next-line
    }, [state.id])


    const setID = (id) => {
        console.log('funciono');
        console.log(id);

        if (id) {
            setState({ ...state, id:id })
        }

    }



    return (
        <>
            <h2><b>Facturas por vendedor</b></h2>  <br />



            <DropdownButton as={ButtonGroup} className='selectSeller' style={{ width: '8%', display: "block", margin: "auto" }} title="Vendedor" id="bg-vertical-dropdown-2">
                    {state.sellers.map(data => (
                        <Dropdown.Item key={data.id} onClick={() => { let sellerName = `${data.name} ${data.lastname}`; setID(data.id); }}>{`${data.name}  ${data.lastname}`}</Dropdown.Item>

                    ))}
                </DropdownButton>



            <div className='divTable'>

                <Table className='table-seller' striped bordered hover>
                    <thead>
                        <tr>
                            <th># de factura</th>
                            <th>Fecha</th>
                            <th>Fecha de expiracion</th>
                            <th>Cliente</th>
                            <th>Monto</th>
                            <th>Accion a realizar</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            state.bills.map(data => (


                                <tr className='table-pagadas' key={data.id}>
                                    <td>{data.id}</td>
                                    <td>{(data.billDate).slice(0, 10)}</td>
                                    <td>{data.expirationDate.slice(0, 10)}</td>
                                    <td>{data.client}</td>
                                    <td>{`${data.amountUSD} $`}</td>


                                    <td >{<a onClick={() => { handleShowDetails(); changeNumber(data.id) }} className='tableDetails' href='#'>Detalles</a>}</td>


                                </tr>
                            ))
                        }
                    </tbody>
                </Table>

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
