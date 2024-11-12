// src/componentes/UserList.js
import React, { useEffect, useState } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0); // Para almacenar el conteo de usuarios

  useEffect(() => {
    // Obtener el conteo de usuarios
    const fetchUserCount = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/user-count');
        const data = await response.json();
        setUserCount(data.count); // Asigna el conteo al estado
      } catch (error) {
        console.error('Error al obtener el conteo de usuarios:', error);
      }
    };

    // Obtener la lista de usuarios
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users');
        const data = await response.json();
        console.log('Usuarios recibidos:', data); // Agrega este log
        setUsers(data.users); // Asigna la lista de usuarios al estado
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    fetchUserCount();
    fetchUsers();
  }, []);

  return (
    <div>
      <h2 style={{ paddingTop: '50px', paddingLeft: '10px' }}>Lista de Usuarios Registrados</h2>
      
      {/* Mostrar el conteo de usuarios */}
      <p>Total de usuarios registrados: {userCount}</p>
      
      <ul style={{ paddingLeft: '10px' }}>
        {users.length === 0 ? (
          <li>No hay usuarios registrados.</li>
        ) : (
          users.map((user) => (
            <li key={user.uid}>
              <strong>ID:</strong> {user.uid} | <strong>Email:</strong> {user.email} | <strong>Nombre:</strong> {user.displayName}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default UserList;
