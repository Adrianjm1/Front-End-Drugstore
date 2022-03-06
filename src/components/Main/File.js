import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import ReactDOM from 'react-dom';
import { Container, Form, Col, Button, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import FormData from 'form-data'
import imagen from '../../assets/img/dolar.png';
import swal from 'sweetalert';

const File = () => {

    const defaultState = {
        pagadas: [],
        porPagar: [],
        vencidas: [],
        change: {},
        archivo: ''
    }


    const formData = new FormData();
    formData.append("si", 'a');
    const [selectedFile, setSelectedFile] = useState(null);

    const [state, setState] = useState(defaultState);

    const correct = () => {

        axios.get('/bill/correct')
            .catch((error) => console.log(error))

        swal({
            title: 'Esperar',
            text: 'Por favor esperar unos segundos... este mensaje se cerrara automaticamente',
            icon: 'info',
            timer: 15000,
            buttons: false
        }).then(() => {
            axios.get(`/amounts/verify/`)
            .then((respues) => {
               

            })
            .catch((error) => console.log(error))

            window.location.reload();
        });
        ;

    }

    const handleSubmit = (event) => {




        try {


            document.getElementById("subeFile").style = "display:none";


            event.preventDefault()

            formData.append("file", selectedFile, 'tabla.xlsx');
            const uploadd = axios.post('/bill/file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (uploadd) {

                axios.get('/bill/correct')
            }

            swal({
                title: 'Esperar',
                text: 'Por favor esperar unos segundos... este mensaje se cerrara automaticamente',
                icon: 'info',
                timer: 30000,
                buttons: false
            })


        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <div>






                <form onSubmit={handleSubmit} method='POST' encType="multipart/form-data">
                    <Form.Group className="mb-3">
                        <Form.Label>Selecciona el archivo de excel que deseas cargar, <span className='text-danger'>POR FAVOR SEGUIR LAS INTRUCCIONES, DE LO CONTRARIO PUEDE NO FUNCIONAR</span> </Form.Label>
                        <Form.Control type="file" size="lg" onChange={(e) => setSelectedFile(e.target.files[0])} /> <br />
                        <Form.Control className='bg-success text-white' id='subeFile' type="submit" value="Upload File" />
                    </Form.Group>
                    {/* <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
                    <input type="submit" value="Upload File" /> */}
                </form>

                <Button className='d-block mx-auto' onClick={correct}>Completar cambios</Button>





            </div>

        </>
    )
}

export default File;
