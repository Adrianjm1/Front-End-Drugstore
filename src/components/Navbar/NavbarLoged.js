import React from 'react'
import { Navbar, Container, Nav, Button } from "react-bootstrap";
// import '../../assets/css/navbar.css'


const NavbarLoged = () => {
    return (

        <Navbar bg="dark" variant="dark">

            <Container>

            <Container>
                <Navbar.Brand>
                    <b>Sistema de facturacion drogueria Enmanuelle</b>
                </Navbar.Brand>
            </Container>

            <Navbar.Brand href="/">
                <b>Inicio</b>
            </Navbar.Brand>

            <Navbar.Brand href="/seller">
                <b>Vendedores</b>
            </Navbar.Brand>
            
            <Navbar.Brand href="/payments">
                <b>Pagos</b>
            </Navbar.Brand>

            <Button>
                <b>Salir</b>
            </Button>

            </Container>

        </Navbar>
    )
}

export default NavbarLoged