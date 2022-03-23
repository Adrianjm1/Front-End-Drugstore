import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import axios from '../../config/axios';

const userState = {
    id:0,
    name: '',
    lastname: '',
    identification: '',
}

const CreateSeller = () => {

    const [state, setState] = useState(userState);


    const onInputChange = e => {

        setState({ ...state, [e.target.name]: e.target.value });

    }




    const onSubmit = async e => {

        try {

            if (state.name != "" && state.lastname != "" && state.identification != 0) {

                const res = await axios.post('/seller/create',
                    {
                        id: state.id,
                        identification: state.identification,
                        name: state.name,
                        lastname: state.lastname
                    });

                if (res.data.message) {

                    swal({
                        title: 'Error',
                        text: res.data.message,
                        icon: 'error'
                    });

                } else {

                    swal({
                        title: 'Realizado',
                        text: 'Usuario registrado con exito',
                        icon: 'success'
                    });

                    setTimeout(function () { window.location.reload(); }, 1500);

                }

            } else {

                swal({
                    title: 'Error',
                    text: 'Verifique bien los campos',
                    icon: 'error'
                });

            }

        }

        catch (error) {

            swal({
                title: 'Error',
                text: 'Error, no se pudo registrar el usuario',
                icon: 'error'
            });

        }

    }


    return (

        <>

            <Container className='modalSeller'>

                 <Form.Group className="mb-3">
                    <Form.Label>Codigo / Identificacion</Form.Label>
                    <Form.Control name="id" onChange={onInputChange} placeholder='Ingrese el codigo' />
                </Form.Group>


                <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control name="name" onChange={onInputChange} placeholder='Ingrese el nombre' />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control name="lastname" onChange={onInputChange} placeholder='Ingrese el apellido' />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Cedula</Form.Label>
                    <Form.Control name="identification" onChange={onInputChange} placeholder='Ingrese el numero de cedula' />
                </Form.Group>

                <br />

                <Button variant="success" className='btnMake' onClick={onSubmit} type="submit">Registar vendedor</Button>


            </Container>

        </>

    )
}

export default CreateSeller
