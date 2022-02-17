import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import { Container, Form, Col, Button, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import FormData from 'form-data'
import imagen from '../../assets/img/dolar.png'

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
    const [name, setName] = useState("");

    // const upload = () => {

    //     axios.get('/bill/')
    //         .then((res) => {
    //             console.log(res);


    //         }).catch(e => {

    //             console.log(e);

    //         })

    // }


    // useEffect(function () {

    //     updateToDate();


    //     axios.get(`/bill/unpaid`)
    //         .then((res) => {

    //             axios.get(`/bill/paid`)
    //                 .then((resp) => {


    //                     axios.get(`/bill/notPayed`)
    //                         .then((respuesta) => {
    //                             setState({ ...state, porPagar: res.data, pagadas: resp.data, vencidas: respuesta.data })

    //                         })
    //                         .catch((error) => console.log(error))

    //                 })
    //                 .catch((error) => console.log(error))

    //         })
    //         .catch((error) => console.log(error))



    //     //eslint-disable-next-line
    // }, [])


    const ayuda = () => {

        var formData = new FormData();
        var imagefile = document.querySelector('#file');
        formData.append("file", selectedFile);
        console.log(formData);
 
        axios.post('/bill/file', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })



    }


    const handleSubmit = (event) => {



        try {



            event.preventDefault()

            formData.append("file", selectedFile, 'tabla.xlsx');

    


           const uploadd =  axios.post('/bill/file', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            })

            if(uploadd){

                axios.get('/bill/correct')
            }

        } catch(error) {
          console.log(error)
        }
      }

    const onInputChange = e => {

        console.log(e.target.Files);
        const isValid = e.target.validity.valid;


        if (isValid === true) {
            setState({ ...state, [e.target.name]: e.target.value });


        } else {
            console.log(isValid);

        }

    }

    // console.log(selectedFile);
    return (
        <>
            <div>




                    {/* <input
                        type="file"
                        id='file'
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                    /> */}

<form onSubmit={handleSubmit} method='POST'  encType="multipart/form-data">
      <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])}/>
      <input type="submit"  value="Upload File" />
    </form>

                    {/* <form id="uploadForm" encType="multipart/form-data" >
                        <input type="file" id="file" name="file" onChange={(e) => setSelectedFile(e.target.files[0])}
                        />

                    </form> */}





            </div>

        </>
    )
}

export default File;
