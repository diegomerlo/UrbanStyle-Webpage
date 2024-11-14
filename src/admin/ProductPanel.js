import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query, addDoc, deleteDoc, doc } from 'firebase/firestore';

function ProductPanel() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    imagenUrl: '',
    tipo: '',
    calificacion: '',
    stock: ''
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, 'productos'), orderBy('nombre'));
        const snapshot = await getDocs(q);
        const productsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsList);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'productos', id));
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const calificacion = Math.min(Math.max(parseFloat(newProduct.calificacion), 1), 5); // Limita el rango entre 1 y 5
    try {
      const docRef = await addDoc(collection(db, 'productos'), {
        ...newProduct,
        precio: parseFloat(newProduct.precio),
        calificacion,
        stock: parseInt(newProduct.stock)
      });
      setProducts([...products, { id: docRef.id, ...newProduct, calificacion }]);
      setNewProduct({ nombre: '', descripcion: '', precio: '', imagenUrl: '', tipo: '', calificacion: '', stock: '' });
    } catch (error) {
      console.error("Error al agregar el producto:", error);
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
      <form onSubmit={handleAddProduct} style={{
        marginBottom: '20px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <h2>Agregar nuevo producto</h2>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del producto"
          value={newProduct.nombre}
          onChange={handleChange}
          required
          style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={newProduct.descripcion}
          onChange={handleChange}
          required
          style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={newProduct.precio}
          onChange={handleChange}
          required
          style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
        />
        <input
          type="text"
          name="imagenUrl"
          placeholder="URL de la imagen"
          value={newProduct.imagenUrl}
          onChange={handleChange}
          required
          style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
        />
        <input
          type="text"
          name="tipo"
          placeholder="Tipo"
          value={newProduct.tipo}
          onChange={handleChange}
          required
          style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
        />
        <input
          type="number"
          name="calificacion"
          placeholder="Calificación (1-5)"
          value={newProduct.calificacion}
          onChange={handleChange}
          required
          min="1"
          max="5"
          style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={handleChange}
          required
          style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
        />
        <button type="submit" style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Agregar producto
        </button>
      </form>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px'
      }}>
        {products.length === 0 ? (
          <p>No hay productos registrados.</p>
        ) : (
          products.map(product => (
            <div key={product.id} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: '#fff',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <img src={product.imagenUrl} alt={product.nombre} style={{
                width: '100%',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '8px 8px 0 0'
              }} />
              <h3 style={{ fontSize: '1.2em', margin: '10px 0' }}>{product.nombre}</h3>
              <p style={{ color: '#888', fontSize: '0.9em' }}>{product.descripcion}</p>
              <p>Tipo: {product.tipo}</p>
              <p>Calificación: {product.calificacion}</p>
              <p>Stock: {product.stock}</p>
              <p style={{ fontWeight: 'bold' }}>${product.precio}</p>
              <button 
                onClick={() => handleDelete(product.id)} 
                style={{
                  marginTop: '10px',
                  padding: '8px 12px',
                  backgroundColor: '#ff4d4d',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductPanel;
