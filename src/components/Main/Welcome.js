import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';

const Welcome = (number) => {

    const defaultState = {
        pagadas: [],
        porPagar: [],
        vencidas: [],
    }

    const [state, setState] = useState(defaultState);

    const today = new Date();
    const hoy = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`


    const updateToDate = () => {

        axios.get(`/amounts/verify/`)
            .then((respues) => {
                console.log(respues);

            })
            .catch((error) => console.log(error))


    }

    useEffect(function () {

        updateToDate();


        axios.get(`/bill/unpaid`)
            .then((res) => {

                axios.get(`/bill/paid`)
                    .then((resp) => {

                        
                        axios.get(`/bill/notPayed`)
                            .then((respuesta) => {
                                setState({ ...state, porPagar: res.data.length, pagadas: resp.data.data.length, vencidas: respuesta.data.length })
                           
                            })
                            .catch((error) => console.log(error))

                    })
                    .catch((error) => console.log(error))

            })
            .catch((error) => console.log(error))



    }, [])




    return (
        <>
            <div>
                <p> <span className='diadehoy'>  El dia de hoy <b> {hoy}</b> <br />  </span>
                    Tenemos un total de:
                    <span className='text-success' > <br />-{state.pagadas} facturas pagadas
                    </span>  <br />  <span className='text-primary'>-{state.porPagar} facturas por pagar</span>
                    <br /><span className='text-danger'>-{state.vencidas} facturas vencidas  </span>  </p>

            </div>

        </>
    )
}

export default Welcome
