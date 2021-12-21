import React  ,{ useState, useEffect }from 'react'
import { Table } from 'react-bootstrap';
import './seller.css';
import axios from '../../config/axios';
import NavbarLogin from '../Navbar/NavbarLogin';
import Footer from '../Footer/Footer';


const Seller = () => {

    const defaultState = {
        sellers : []
    };

    const [state, setState] = useState(defaultState);



        useEffect(function () {



            axios.get('/seller/')
                .then((res) => {
    
                    setState({
                        ...state,
                        sellers: res.data
                    })
    
    
                })
                .catch((error) => console.log(error))
    
    
            //eslint-disable-next-line
        }, [])
    






    return (
        <>
            <NavbarLogin/>
            <div className='divTable'> 


            <Table className='table-seller' striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Identidad</th>
                        <th>Comision en USD</th>
                        <th>Comision en Bs</th>
                    </tr>
                </thead>
                <tbody>
                                {
                                    state.sellers.map(data => (
                                        <tr key={data.id}>
                                            <td>{data.id}</td>
                                            <td>{data.name}</td>
                                            <td>{data.lastname}</td>
                                            <td>{data.identification}</td>
                                            
                                        </tr>
                                    ))
                                }
                            </tbody>
            </Table>

            </div>

            <Footer/>
        </>
    )
}

export default Seller
