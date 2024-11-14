import React, { useEffect, useState } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/user-count');
        const data = await response.json();
        setUserCount(data.count);
      } catch (error) {
        console.error('Error al obtener el conteo de usuarios:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users');
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    fetchUserCount();
    fetchUsers();
  }, []);

  return (
    <div style={{
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#2b2e4a',
      color: '#d3d3d3',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px'
    }}>
      <h2 style={{ paddingTop: '20px', textAlign: 'center', color: '#e5e5e5' }}>
        Lista de Usuarios Registrados
      </h2>

      <p style={{ textAlign: 'center', fontSize: '1.2em', color: '#d3d3d3' }}>
        Total de usuarios registrados: <strong>{userCount}</strong>
      </p>

      <div style={{
        maxHeight: '60vh',  // Limita la altura del contenedor
        overflowY: 'auto',   // Agrega scroll vertical si hay muchos usuarios
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        width: '100%',
      }}>
        {users.length === 0 ? (
          <p style={{ fontSize: '1.1em', color: '#888' }}>No hay usuarios registrados.</p>
        ) : (
          users.map((user, index) => (
            <div key={user.uid} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '10px 20px',
              width: '90%',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
              backgroundColor: '#f9f9f9',
              color: '#333',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <p><strong>#{index + 1}</strong> Email: {user.email}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserList;
