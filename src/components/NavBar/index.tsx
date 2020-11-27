import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NavBar = () => {
  return (
    <Navbar bg='dark' variant='dark'>
      <LinkContainer to='/'>
        <Navbar.Brand>Todo list</Navbar.Brand>
      </LinkContainer>
      <Nav className='ml-auto'>
        <LinkContainer to='/create-new-todo'>
          <Nav.Link>Create new todo</Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
