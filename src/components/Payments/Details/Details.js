
import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';

import axios from '../../../config/axios';

const Details = (number) => {

    const defaultState = {
        datos:[],
        amount: [],
        seller: '',
        expiration: '',
        billDate: ''
    }

    const [state, setState] = useState(defaultState);

    useEffect(function () {


        axios.get(`/bill/${number.number}`)
            .then((res) => {

                setState({...state, datos:res.data, seller: res.data.seller.name + ' ' +res.data.seller.lastname,
                 expiration: (res.data.expirationDate).slice(0,10), amount: res.data.amount,
                billDate: (res.data.billDate).slice(0,10) })

            })
            .catch((error) => console.log(error))

        //eslint-disable-next-line
    }, [])





    return (
        <>
           <div>

<ListGroup variant="flush">
  <ListGroup.Item variant='info'>  {`Factura numero:  `} <b>{state.datos.id}</b>      </ListGroup.Item>
  <ListGroup.Item variant='info'>  {`Monto de factura:   `}   <b> {`${state.datos.amountUSD} $`}</b>   </ListGroup.Item>
  <ListGroup.Item variant='info'>  {`Monto pagado   `}   <b> {`${state.amount.paid} $`}</b>   </ListGroup.Item>
  <ListGroup.Item variant='info'>  {`Monto: por cobrar:   `}   <b> {`${state.amount.unPaid} $`}</b>   </ListGroup.Item>
  <ListGroup.Item variant='info'>  {`Monto vencido:   `}   <b> {`${state.amount.notPayed} $`}</b>   </ListGroup.Item>
  <ListGroup.Item variant='info'>  {`Fecha: `}    <b>{(state.billDate)} </b>   </ListGroup.Item>
  <ListGroup.Item variant='info'>  {`Fecha de expiracion: `}   <b>{(state.expiration)}</b>   </ListGroup.Item>
  <ListGroup.Item variant='info'>  {`Dias de credito: `}    <b>{state.datos.creditDays}</b>  </ListGroup.Item>
  <ListGroup.Item variant='info'>  {`Cliente: `}  <b>  {state.datos.client}  </b>    </ListGroup.Item>
  <ListGroup.Item variant='info'>  {`Ciudad: `}  <b>  {state.datos.city}  </b>    </ListGroup.Item>
  <ListGroup.Item variant='info'>  {`Ubicacion: `}  <b>  {state.datos.location}  </b>    </ListGroup.Item>
  <ListGroup.Item variant='info'>  {`Vendedor:  `}  <b> {state.seller} </b>     </ListGroup.Item>
  <ListGroup.Item variant='info'>  {`Comision del vendedor:`}  <b>{state.datos.sellersCommission}</b>    </ListGroup.Item>




</ListGroup>



           </div>

        </>
    )
}

export default Details
