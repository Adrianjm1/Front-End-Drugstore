import { useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { useNavigate } from 'react-router';
import { types } from '../../config/constant';
import { Navbar, Container, Button } from 'react-bootstrap';


const NavbarLoged = () => {

    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {

        dispatch({
            type: types.logout,
            payload: {
                name: '',
                token: '',
            }
        })

        navigate("../login", { replace: true });

    }

    return (

        <Navbar bg="dark" variant="dark">

            <Container>

                <Container>
                    <Navbar.Brand>
                        <b>Sistema de facturacion drogueria Enmanuelle</b><br />
                        Bienvenido, {user.name}
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

                <Button onClick={handleLogout}>
                    <b>Salir</b>
                </Button>

            </Container>

        </Navbar>
    )
}

export default NavbarLoged