import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';

import axios from '../../config/axios';

const Welcome = (number) => {

    const defaultState = {
        pagadas:[],
        porPagar:[],
        vencidas:[],
    }

    const [state, setState] = useState(defaultState);

    const today = new Date();
    const hoy = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`

    useEffect(function () {


        axios.get(`/bill/unpaid`)
        .then((res) => {

                    axios.get(`/bill/paid`)
                    .then((resp) => {
    
    
                        axios.get(`/bill/notPayed`)
                        .then((respuesta) => {
                            setState({...state, porPagar:res.data, pagadas: resp.data, vencidas: respuesta.data })
                          
                        })
                        .catch((error) => console.log(error))
                      
                    })
                    .catch((error) => console.log(error))
    
                })
                .catch((error) => console.log(error))
    
    

        //eslint-disable-next-line
    }, [])




    return (
        <>
           <div>
                <p> <span className='diadehoy'>  El dia de hoy <b> {hoy}</b> <br/>  </span>  
                Tenemos un total de:
                <span className='text-success' > <br/>-{state.pagadas.length} facturas pagadas 
                </span>  <br/>  <span className='text-primary'>-{state.porPagar.length} facturas por pagar</span>
                <br/><span className='text-danger'>-{state.vencidas.length} facturas vencidas  </span>  </p>
 
           </div>

        </>
    )
}

export default Welcome
