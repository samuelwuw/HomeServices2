import React, { useState } from 'react';
//usar <Link /> ao invés de <a href> para que a página troque de rota sem ser recarregada novamente
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';
import heroesImg from '../../assets/heroes.png';

export default function Logon(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        //preventDefault previne que a página recarrege
        e.preventDefault();

        try{
            const response = await api.post('sessions', { email, password });

            localStorage.setItem('researcherEmail', email);
            localStorage.setItem('researcherName', response.data.name);
            localStorage.setItem('researcherId', response.data.id);

            //faz o direcionamento de rotas quando não podemos usar <Link />
            history.push('/profile');
        }catch(err){
            alert('Email ou senha incorretos, tente novamente.');
        }
    }   

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="College Labs"/>

                <form onSubmit={handleLogin}>
                    {/*<h1 id = "logon">Seja Bem-Vindo!</h1>*/}
                    <h1>Faça seu logon!</h1>
                    <input 
                        placeholder="Seu email"
                        value = {email}
                        onChange= {e => setEmail(e.target.value)}
                     />

                    <input 
                        placeholder="Senha" 
                        value = {password}
                        onChange= {e => setPassword(e.target.value)}
                     />
                
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color='#E02041' />
                        Seja um Pesquisador
                    </Link>

                    <Link className="back-link" to="/registerUser" id = "back-link2">
                        <FiLogIn size={16} color='#E02041' />
                        Tenha acesso a pesquisas 
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="heroes"/>
        </div>
    );
}