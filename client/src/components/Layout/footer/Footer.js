import React from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const Footer = () => {

  return (
    <div>
      <footer className="bg-dark text-white text-center py-3">
        <Container>
          &copy; 2024 Your Website
        </Container>
      </footer>
    </div>
  );
};

export default Footer;