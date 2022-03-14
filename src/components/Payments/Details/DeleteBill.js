
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from '../../../config/axios';


const DeleteBill = (props) => {

    const defaultState = {
        datos: [],
    }

    const {close} = props;
    let {numero} = props;



    const [state, setState] = useState(defaultState);

    useEffect(function () {


        axios.get(`/bill/${numero}`)
            .then((res) => {

                        setState({
                            ...state, 
                            datos: res.data, 
                        })


            })
            .catch((error) => console.log(error))

    }, [])

    const OnDelete = ()=>{
        axios.delete(`/bill/delete/${numero}`).catch((error) => console.log(error));
        setTimeout(function () { window.location.reload(); }, 1500);
    }


    return (
        <>
            <div>

                
            <h4>{`¿Esta seguro que desea borrar la informacion de la factura numero ${state.datos.id}  ${state.datos.client}?`} </h4>

            <div className='d-flex justify-content-between w-75 mx-auto'>

            <Button onClick={close} className='btn-danger w-25'>No</Button> <br/>
            <Button onClick={OnDelete} className= 'w-25' >Si</Button>
        </div>

            </div>

        </>
    )
}
  


export default DeleteBill





