import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function ServicoDisponivel(){
    const [ prestador, setPrestador] = useState([]);

    const userId = localStorage.getItem('prestadorAlvo');  
    
    useEffect(() => {
        console.log("userID", userId);
        api.get('prestadorById', {
            headers: {
                Authorization: userId,
            }
        }).then(response => {
            setPrestador(response.data);
            console.log("prestador", response.data);
        });
    }, [userId]);

    return ( 
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="College Labs"/>

                    <h1>Informações do prestador</h1>                    

                    <Link className="back-link" to="/homepage">
                        <FiArrowLeft size={16} color='#E02041' />
                        Voltar para home
                    </Link>
                </section>

                <section>
                    <ul>
                        {prestador.map(post => (
                            <li key={post.id}>
                                <strong>Nome:</strong>
                                <p>{post.name}</p>

                                <strong>Contato:</strong>
                                <p>{post.whatsapp}</p>

                                <strong>Email:</strong>
                                <p>{post.email}</p>
                            </li>
                        ))}
                    </ul>
                </section>

            </div>
        </div>
    );
}