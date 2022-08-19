import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavBar = () => {
  return(
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/'>Ver productos</Nav.Link>
            <Nav.Link as={Link} to='/Product/0'>Agregar producto</Nav.Link>
            <Nav.Link as={Link} to='/Cart'>Ver carrito</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};