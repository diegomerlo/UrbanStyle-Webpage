import React from 'react';

function Footer() {
  return (
    <footer style={{ backgroundColor: '#333', color: 'white', textAlign: 'center', padding: '20px', marginTop: '20px' }}>
      <p>&copy; 2024 Urban Style. Todos los derechos reservados.</p>
      <p>Síguenos en 
        <a href="#" style={{ color: '#1da1f2', marginLeft: '5px' }}>Twitter</a>, 
        <a href="#" style={{ color: '#0a66c2', marginLeft: '5px' }}>LinkedIn</a> y 
        <a href="#" style={{ color: '#E1306C', marginLeft: '5px' }}>Instagram</a>.
      </p>
    </footer>
  );
}

export default Footer;