import React, { useState, useMemo,useContext } from 'react';
import { AuthContext } from '../../../auth/AuthContext';
import { Form, FormControl } from 'react-bootstrap';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from "react-bootstrap-table-next";
import numberWithCommas from '../../../helpers/helpers';

import './tables.css';

export const TableDaily = (props) => {



    const defaultstate = {
        busqueda: '',
    }

    const [state, setState] = useState(defaultstate)

    const { setPayment } = props;


    const columns = [
        {
            dataField: "client",
            text: "Cliente",
            sort: true
        },
        {
            dataField: "idBill",
            text: "Numero",
            sort: true
        },
        {
            dataField: "expirationDate",
            text: "Expiracion",
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
            dataField: "seller",
            text: "Vendedor",
            sort: true
        },
        {
            dataField: "delete",
            text: "",
            sort: true
        }
    ];
    const { user} = useContext(AuthContext);

    if (user.viewer !==0) {
        columns.pop()
    }

    
    const onFocusDelete = (data) => {

        setPayment({ id: data.id, client: data.bill.client, amount: data.amountUSD, });

    }


    const productsGenerator = items => {

        let productos = [];

        items.map(data => {
            productos.push({
                id: data.id,
                idBill: data.idBill,
                client: data.bill.client,
                priceUSD: `${numberWithCommas( parseFloat((data.amountUSD)).toFixed(2)   )} $`,
                priceBS: `${numberWithCommas(  ((parseFloat(data.amountUSD) * parseFloat(data.exchangeRate))).toFixed(2)  )} Bs`,
                exchange: `${numberWithCommas(parseFloat(data.exchangeRate).toFixed(2))} Bs`,
                reference: data.referenceNumber,
                paymentUSD: data.paymentUSD === false ? 'No' : 'Si',
                bank: data.bank,
                expirationDate: (data.bill.expirationDate).slice(0, 10),
                seller: data.bill.seller.name,
                delete: <b><p className="btn btn-danger delete-payment" onClick={() => { onFocusDelete(data) }}>Eliminar</p></b>
            })
        })

        return productos;

    };

    const products = productsGenerator(props.data);
    const dataTable = useMemo(function () {
            return products.filter(product => product.bank.includes((state.busqueda).toUpperCase()))

    }, [products])

    const onInputChange = e => {

        const isValid = e.target.validity.valid;

        if (isValid === true) {
            setState({ ...state, [e.target.name]: e.target.value });

        }

    }





    return (

        <>

            <div>


                <div className='overTable' >

                    <div>

                        <Form.Group className="mb-3">
                            <Form.Label className="label-date">Banco</Form.Label>
                            <FormControl type="text" placeholder="Busqueda por banco" className="getPayments" id="busqueda" name="busqueda" onChange={onInputChange} />
                        </Form.Group>
                    </div>


                    <div>
                        {<ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="btn btn-success"
                            table="dailyTable"
                            filename="pagoxdia"
                            sheet="tablexls"
                            buttonText="Exportar a Excel" />}


                    </div>

                </div>



                <BootstrapTable
                    bootstrap4
                    id='dailyTable'
                    hover={true}
                    keyField="id"
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
