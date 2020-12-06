import React, { useState } from 'react';
import Select from 'react-select'
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.png';

export default function Register(){
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [email, setEmail] = useState('');
    const [tipo, setTipo] = useState('');
    
    const options = [
        { value: "prestador", label: "Prestador de serviços" },
        { value: "contratante", label: "Contratante" },
      ]

    const history = useHistory();

    //integração com o back-end
    async function handleRegister(e){
        e.preventDefault();

        const data = {
            name, 
            password,
            whatsapp,
            email, 
            tipo           
        };
        
        try{
                //axios já envia em json
            const response = await api.post('users', data);

            alert("Cadastro realizado com sucesso!");
            console.log(response);

            history.push('/');
        }catch(err){
            alert('Erro no cadastro, verifique se as informações são válidas. ');
        }
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="College Labs"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma, publique seu projeto e encontre outros de seu interesse!</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color='#E02041' />
                        Menu Principal
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input 
                        placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />                   
                    <input 
                        type="text" 
                        placeholder="Contato (whatsapp)"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />                   
                    <Select 
                        options={options}
                        value={options.find(obj => obj.value === tipo)}
                        onChange={e => setTipo(e.value)}
                    />                 
                 
                   
                    <button className="button" type="submit">Cadastrar</button>                    

                </form>                
            </div>
        </div>
    );
}