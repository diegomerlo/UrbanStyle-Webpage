import React, { useState, useEffect } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function Home() {
    const [userCount, setUserCount] = useState(null); // Estado para almacenar la cantidad de usuarios
    const [productCount, setProductCount] = useState(0); // Estado para cantidad de productos
    const [categoryCount, setCategoryCount] = useState(0); // Estado para cantidad de categorías

    // Efecto para obtener la cantidad de usuarios
    useEffect(() => {
        const fetchUserCount = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/user-count');
                const data = await response.json();
                setUserCount(data.count);
            } catch (error) {
                console.error('Error al obtener la cantidad de usuarios:', error);
            }
        };

        fetchUserCount();
    }, []);

    // Efecto para obtener la cantidad de productos y categorías
    useEffect(() => {
        const fetchProductsData = async () => {
            try {
                const snapshot = await getDocs(collection(db, 'productos'));
                const products = snapshot.docs.map(doc => doc.data());
                
                // Cuenta el número total de productos
                setProductCount(products.length);

                // Cuenta el número único de categorías
                const uniqueCategories = new Set(products.map(product => product.tipo));
                setCategoryCount(uniqueCategories.size);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            }
        };

        fetchProductsData();
    }, []);

    const data = [
        { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
        { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
        { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
        { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
    ];

    return (
        <main className='main-container'>
            <div className='main-title'>
                <h3>DASHBOARD</h3>
            </div>

            <div className='main-cards'>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>PRODUCTS</h3>
                        <BsFillArchiveFill className='card_icon' />
                    </div>
                    <h1>{productCount !== null ? productCount : 'Cargando...'}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>CATEGORIES</h3>
                        <BsFillGrid3X3GapFill className='card_icon' />
                    </div>
                    <h1>{categoryCount !== null ? categoryCount : 'Cargando...'}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>CUSTOMERS</h3>
                        <BsPeopleFill className='card_icon' />
                    </div>
                    <h1>{userCount !== null ? userCount : 'Cargando...'}</h1>
                </div>
                {/* <div className='card'>
                    <div className='card-inner'>
                        <h3>ALERTS</h3>
                        <BsFillBellFill className='card_icon' />
                    </div>
                    <h1>42</h1>
                </div> */}
            </div>

            <div className='charts'>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart width={500} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#8884d8" />
                        <Bar dataKey="uv" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="100%" height="100%">
                    <LineChart width={500} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </main>
    );
}

export default Home;
