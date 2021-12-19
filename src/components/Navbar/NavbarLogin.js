import React from 'react'
import { Navbar, Container, Nav } from "react-bootstrap";
// import '../../assets/css/navbar.css'


const NavbarLogin = () => {
    return (
        <div>

            <>

                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="#home">
                            Sistema de facturacion drogueria Enmanuelle
                        </Navbar.Brand>

                    </Container>
                </Navbar>
            </>

        </div>
    )
}

export default NavbarLogin


// <Navbar className="color-nav"  variant="dark">
// <Container>
//     <Navbar.Brand href="#home">
//         <b className="nav">Control de cobranzas Lago Mall</b>
//     </Navbar.Brand>
// </Container>
// </Navbar>
