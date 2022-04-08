import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../../auth/AuthContext';
import { ListGroup, Modal, Button } from 'react-bootstrap';
import axios from '../../../config/axios';
import DeleteBill from './DeleteBill';
import PaymentsDetails from './PaymentsDetails';

const Details = (number) => {

    const defaultState = {
        datos: [],
        pagos: [],
        amount: [],
        seller: '',
        expiration: '',
        billDate: '',
        comision: 0
    }


    const { user, dispatch } = useContext(AuthContext);
    const [showDetails, setShowDetails] = useState(false);
    const handleCloseDetails = () => setShowDetails(false);
    const handleShowDetails = () => setShowDetails(true);

    const [showDetailsDelete, setShowDetailsDelete] = useState(false);
    const handleCloseDetailsDelete = () => setShowDetailsDelete(false);
    const handleShowDetailsDelete = () => setShowDetailsDelete(true);

    const [state, setState] = useState(defaultState);

    useEffect(function () {


        axios.get(`/bill/${number.number}`)
            .then((res) => {

                axios.get(`/payments/bill?bill=${number.number}`)
                    .then((resp) => {

                        setState({
                            ...state, 
                            datos: res.data, 
                            seller: res.data.seller.name + ' ' + res.data.seller.lastname,
                            expiration: (res.data.expirationDate).slice(0, 10), 
                            amount: res.data.amount,
                            billDate: (res.data.billDate).slice(0, 10), 
                            comision: res.data.sellersCommission,
                            pagos: resp.data.pagos,
                        })

                    })
                    .catch((error) => console.log(error))

            })
            .catch((error) => console.log(error))

    }, [])


    return (
        <>
            <div>

                <ListGroup variant="flush">
                    <ListGroup.Item variant='info'>  {`Factura numero:  `} <b>{state.datos.id}</b>      </ListGroup.Item>
                    <ListGroup.Item variant='info'>  {`Monto de factura:   `}   <b> {`${state.datos.amountUSD} $`}</b>   </ListGroup.Item>
                    <ListGroup.Item variant='info'>  {`Monto pagado   `}   <b> {`${parseFloat(state.amount.paid).toFixed(2) } $ o ${ (parseFloat( state.amount.paid)  *  parseFloat(state.datos.exchange)).toFixed(2) } Bs`}</b>   </ListGroup.Item>
                    <ListGroup.Item variant='info'>  {`Monto: por cobrar:   `}   <b> {`${state.amount.unPaid} $  o ${ (parseFloat( state.amount.unPaid)  *  parseFloat(state.datos.exchange)).toFixed(2) } Bs`}</b>   </ListGroup.Item>
                    <ListGroup.Item variant='info'>  {`Monto vencido:   `}   <b> {`${state.amount.notPayed} $ o o ${ (parseFloat( state.amount.notPayed)  *  parseFloat(state.datos.exchange)).toFixed(2) } Bs`}</b>   </ListGroup.Item>
                    <ListGroup.Item variant='info'>  {`Tasa de cambio:   `}   <b> {`${state.datos.exchange}`}</b>   </ListGroup.Item>
                    <ListGroup.Item variant='info'>  {`Fecha: `}    <b>{(state.billDate)} </b>   </ListGroup.Item>
                    <ListGroup.Item variant='info'>  {`Fecha de expiracion: `}   <b>{(state.expiration)}</b>   </ListGroup.Item>
                    <ListGroup.Item variant='info'>  {`Cliente: `}  <b>  {state.datos.client}  </b>    </ListGroup.Item>
                    <ListGroup.Item variant='info'>  {`Ciudad: `}  <b>  {state.datos.city}  </b>    </ListGroup.Item>
                    <ListGroup.Item variant='info'>  {`Ubicacion: `}  <b>  {state.datos.location}  </b>    </ListGroup.Item>
                    <ListGroup.Item variant='info'>  {`Vendedor:  `}  <b> {state.seller} </b>     </ListGroup.Item>
                    <ListGroup.Item variant='info'>  {`Comision del vendedor:`}  <b>{state.datos.sellersComission} %</b>    </ListGroup.Item>
                   
                   <div className='d-flex mx-auto'>

                    <ListGroup.Item variant='info'>  <Button onClick={() => { handleShowDetails(); }}><b>Ver pagos</b></Button>    </ListGroup.Item>

                    {user.viewer === 0 ?
                    <ListGroup.Item variant='info'>  <Button className="btn-danger" onClick={() => { handleShowDetailsDelete(); }}><b>Borrar factura</b></Button>    </ListGroup.Item>
                    :
                        <></>
                    }
                   </div>
                   

                </ListGroup>

                <Modal show={showDetails} onHide={handleCloseDetails}>
                    <Modal.Header closeButton>
                        <Modal.Title>Detalles</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <PaymentsDetails pagos={state.pagos} />

                    </Modal.Body>
                </Modal>


                <Modal show={showDetailsDelete} onHide={handleCloseDetailsDelete}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmacion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <DeleteBill numero ={state.datos.id} close={handleCloseDetailsDelete}/>

                    </Modal.Body>
                </Modal>



            </div>

        </>
    )
}

export default Details
