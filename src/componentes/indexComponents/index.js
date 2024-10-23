import * as React from 'react';
import "../indexComponents/inicio.css";
import logo from "../../assets/urbanStyleBanner.jpg";

function Index() {
    return (
        <div className="container">
            <header className="header">
                <h1>NOS LLAMAN LA REVOLUCION</h1>
                <p>Usa la nueva moda y conquista la ciudad</p>
            </header>

            <main className="main-content">
                <div className="image-container">
                    <img src={logo} alt="3D figure" className="image" />
                    <div className="overlay-text">
                        <h2>NOS LLAMAN LA REVOLUCION</h2>
                    </div>
                </div>
            </main>
        </div>
    );

}

export default Index;