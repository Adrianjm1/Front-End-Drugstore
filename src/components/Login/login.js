import React from 'react';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import Footer from '../Footer/Footer';
import NavbarLogin from '../Navbar/NavbarLogin';
import './login.css';

const login = () => {
    return (
        <>

<NavbarLogin/>

<body className='theLogin'>
      <div className="wrapper">
         <div className="title">
            Login 
         </div>
         <form action="#">
            <div className="field">
               <input type="text" required></input>
               <label>Usuario</label>
            </div>
            <div className="field">
               <input type="password" required></input>
               <label>Contraseña</label>
            </div>
        <br/> <br/>
            <div className="field">
               <input type="submit" value="Iniciar sesion"></input>
            </div>

         </form>
      </div>
   </body>

   <Footer/>




        </>

    )
}

export default login
