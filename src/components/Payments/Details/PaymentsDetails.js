import React from 'react';
import { ListGroup, Alert } from 'react-bootstrap';

const PaymentsDetails = ({ pagos }) => {

    let datos = pagos;

    return (
        <>
            <div>

                {

                    datos.length == 0 ?

                        <>
                            <br />
                            <Alert key="1" variant="danger">
                                No se han realizado pagos a esta factura
                            </Alert>
                            <br />
                        </>

                        :

                        datos.map((datos, i) => (

                            <>
                                <p>{`Pago #${i + 1}`}</p>
                                <ListGroup key={i.toString()} variant="flush">
                                    <ListGroup.Item variant="info">  {`Fecha: `} <b>{datos.date}</b>      </ListGroup.Item>
                                    <ListGroup.Item variant="info">  {`Referencia: `} <b>{datos.referenceNumber}</b>      </ListGroup.Item>
                                    <ListGroup.Item variant="info">  {`Banco: `} <b>{datos.bank}</b>      </ListGroup.Item>
                                    <ListGroup.Item variant="info">  {`Monto (USD): `} <b>{datos.amountUSD}</b>      </ListGroup.Item>
                                    {datos.paymentUSD ?

                                        <ListGroup.Item variant="success">  {`Pago en dolares: `} <b>Si</b>      </ListGroup.Item>

                                        :

                                        <>
                                            <ListGroup.Item variant='dark'>  {`Pago en dolares: `} <b>No</b>      </ListGroup.Item>
                                            <ListGroup.Item variant='dark'>  {`Tasa de cambio: `} <b>{datos.exchangeRate}</b>      </ListGroup.Item>
                                            <ListGroup.Item variant='dark'>  {`Monto (Bs.): `} <b>{(parseFloat(datos.exchangeRate) * parseFloat(datos.amountUSD)).toFixed(2)}</b>      </ListGroup.Item>

                                        </>

                                    }

                                </ListGroup>
                                <hr />
                            </>


                        ))

                }


                {/*                 < ListGroup variant="flush">
                    <ListGroup.Item variant='info'>  {`Factura numero:  `} <b>{state.datos.id}</b>      </ListGroup.Item>
                    <ListGroup.Item variant='info'>  {`Monto de factura:   `}   <b> {`${state.datos.amountUSD} $`}</b>   </ListGroup.Item>
                    <ListGroup.Item variant='info'>  {`Monto pagado   `}   <b> {`${state.amount.paid} $`}</b>   </ListGroup.Item>
                    <ListGroup.Item variant='info'>  {`Monto: por cobrar:   `}   <b> {`${state.amount.unPaid} $`}</b>   </ListGroup.Item>
                    <ListGroup.Item variant='info'>  {`Monto vencido:   `}   <b> {`${state.amount.notPayed} $`}</b>   </ListGroup.Item>
                    <ListGroup.Item variant='info'>  {`Tasa de cambio:   `}   <b> {`${state.datos.exchange}`}</b>   </ListGroup.Item>
                    <ListGroup.Item variant='info'>  {`Fecha: `}    <b>{(state.billDate)} </b>   </ListGroup.Item>
                    <ListGroup.Item variant='info'>  {`Fecha de expiracion: `}   <b>{(state.expiration)}</b>   </ListGroup.Item>
                    <ListGroup.Item variant='info'>  {`Cliente: `}  <b>  {state.datos.client}  </b>    </ListGroup.Item>
                    <ListGroup.Item variant='info'>  {`Ciudad: `}  <b>  {state.datos.city}  </b>    </ListGroup.Item>
                    <ListGroup.Item variant='info'>  {`Ubicacion: `}  <b>  {state.datos.location}  </b>    </ListGroup.Item>
                    <ListGroup.Item variant='info'>  {`Vendedor:  `}  <b> {state.seller} </b>     </ListGroup.Item>
                    <ListGroup.Item variant='info'>  {`Comision del vendedor:`}  <b>{state.datos.sellersComission} %</b>    </ListGroup.Item>
                </ListGroup>
 */}

            </div>

        </>
    )
}

export default PaymentsDetails
