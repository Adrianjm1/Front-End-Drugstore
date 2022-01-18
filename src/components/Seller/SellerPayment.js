import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap';
import axios from '../../config/axios';
import Details from '../Payments/Details/Details';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from "react-bootstrap-table-next";


const defaultState = {
    pagos: [],
};


const SellerPayment = (id) => {

    const [state, setState] = useState(defaultState);
    // const [showDetails, setShowDetails] = useState(false);

    // const handleCloseDetails = () => {

    //     axios.get('/bill/paid')
    //         .then((resp) => {

    //             let productos = [];

    //             resp.data.map(data => {
    //                 productos.push({
    //                     billNumber: data.id,
    //                     date: (data.billDate).slice(0, 10),
    //                     expirationDate: data.expirationDate.slice(0, 10),
    //                     client: data.client,
    //                     amountPayed: `${data.amount.paid} $`,
    //                     toDo: <b><a onClick={() => { handleShowDetails(); changeNumber(data.id) }} className='tableDetails' href='#'>Detalles</a></b>,
    //                 })
    //             });

    //             setState({ ...state, bills1: productos });
    //             setShowDetails(false);

    //         })
    //         .catch((error) => console.log(error))


    // }
    // const handleShowDetails = () => setShowDetails(true);

    const changeNumber = (id) => {

        setState({
            ...state,
            number: id
        })

    }


    useEffect(function () {


        axios.get(`/sellerPayments/${id.id}`)
            .then((res) => {

                let data = res.data;

                data.map ((datos)=>(
                    datos.createdAt = (datos.createdAt).slice(0, 10)

                ))


                
                data.map ((datos)=>{
                    if (datos.paymentUSD){
                        datos.paymentUSD = 'Dolares'
                    }else{
                        datos.paymentUSD = 'Bolivares'
                    }
                })

                console.log(data);
                

                setState({...state, pagos: data})


            })
            .catch((error) => console.log(error))

    }, [])

    const columns = [
        {
            dataField: "id",
            text: "id",
            sort: true
        },
        {
            dataField: "createdAt",
            text: "Fecha",
            sort: true
        },
        {
            dataField: "amount",
            text: "Monto",
            sort: true
        },
        {
            dataField: "bank",
            text: "Banco",
            sort: true
        },
        {
            dataField: "paymentUSD",
            text: "Pago",
            sort: true
        },

    ];



    return (
        <>

            <div >

                <BootstrapTable
                    bootstrap4
                    keyField="id"
                    data={state.pagos}
                    columns={columns}
                    pagination={paginationFactory({ sizePerPage: 5 })}
                />

            </div>

        </>
    )
}

export default SellerPayment
