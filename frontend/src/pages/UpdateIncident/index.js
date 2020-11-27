import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function UpdateIncident(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const history = useHistory();

    const researcherId = localStorage.getItem('researcherId'); 
    console.log(researcherId);

    async function handleUpdatePost(e){
        //previnir comportamento padrão do form, recarregando a pag
        e.preventDefault();

        const post_id = localStorage.getItem('post_id');

        const data = {
            title, 
            description,  
        };

        try{
            await api.put(`posts/${post_id}`, data, {
                headers: {
                    Authorization: researcherId, 
                }
            })

            history.push('/profile'); 
        }catch(err){
            alert('Erro ao cadastrar post, tente de novamente. ')
        }
    }

    return ( 
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="College Labs"/>

                    <h1>Editar post</h1>
                    <p>Escreva o post</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color='#E02041' />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleUpdatePost}>
                    <input 
                        placeholder="Título do post"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />

                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}