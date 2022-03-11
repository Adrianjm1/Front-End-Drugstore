import React, { useState, useMemo } from 'react';
import {  Form, FormControl } from 'react-bootstrap';

import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from "react-bootstrap-table-next";
import numberWithCommas from '../../../helpers/helpers';

export const TableMonthly = (props) => {

    const { setPayment } = props;

    const defaultstate = {
        busqueda: '',
    }


    const [state, setState] = useState(defaultstate)



    const columns = [
        {
            dataField: "date",
            text: "Fecha",
            sort: true
        },
        {
            dataField: "idBill",
            text: "Numero",
            sort: true
        },
        {
            dataField: "client",
            text: "Cliente",
            sort: true
        },
        {
            dataField: "priceUSD",
            text: "Monto en $",
            sort: true
        },
        {
            dataField: "priceBS",
            text: "Monto en Bs",
            sort: true
        },
        {
            dataField: "exchange",
            text: "Tasa de cambio",
            sort: true
        },
        {
            dataField: "reference",
            text: "Referencia",
            sort: true
        },
        {
            dataField: "paymentUSD",
            text: "Pago en dolares",
            sort: true
        },
        {
            dataField: "bank",
            text: "Banco",
            sort: true
        },
        {
            dataField: "delete",
            text: "",
            sort: true
        }
    ];

    const onFocusDelete = (data) => {

        setPayment({ id: data.id, client: data.bill.client, amount: data.amountUSD });

    }


    const productsGenerator = items => {

        let productos = [];



        items.map(data => {
            productos.push({
                idBill: data.idBill,
                date: data.date,
                client: data.bill.client,
                priceUSD: `${numberWithCommas(parseFloat(data.amountUSD))} USD`,
                priceBS: `${numberWithCommas((parseFloat(data.amountUSD) * parseFloat(data.exchangeRate)).toFixed(2))} Bs`,
                exchange: `${numberWithCommas(parseFloat(data.exchangeRate).toFixed(2))} Bs`,
                reference: data.referenceNumber,
                paymentUSD: data.paymentUSD === false ? 'No' : 'Si',
                bank: data.bank,
                delete: <b><p className="btn btn-danger delete-payment" onClick={() => { onFocusDelete(data) }}>Eliminar Pago</p></b>

            })
        })

        return productos;

    };

    const products = productsGenerator(props.data);

    

     const  dataTable = useMemo(function () {
        if (state.busqueda.length ) {

            return products.filter(product => product.bank.includes( (state.busqueda).toUpperCase() ))
        }

        return products
    }, [products])




    const onInputChange = e => {

        const isValid = e.target.validity.valid;

        if (isValid === true) {
            setState({ ...state, [e.target.name]: e.target.value });

        }

    }




    return (
        <>

            <Form.Group className="mb-3">
                <Form.Label className="label-date">Banco</Form.Label>
                <FormControl type="text" placeholder="Busqueda por banco" className="getPayments" id="busqueda" name="busqueda" onChange={onInputChange} />
            </Form.Group>
            <div>
                <BootstrapTable
                    bootstrap4
                    keyField="idBill"
                    data={dataTable}
                    columns={columns}
                    pagination={paginationFactory({
                        sizePerPageList: [{
                            text: '15', value: 15
                        }, {
                            text: '50', value: 50
                        }, {
                            text: 'Todo', value: products.length
                        }]
                    })}
                />
            </div>
        </>
    )
}
