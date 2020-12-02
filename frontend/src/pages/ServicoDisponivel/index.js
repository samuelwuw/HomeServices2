import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function ServicoDisponivel(){
    const [nomeServico, setNomeServico] = useState('');
    const [precoMedio, setPrecoMedio] = useState('');
    const [detalhes, setDetalhes] = useState('');

    const history = useHistory();

    const prestadorId = localStorage.getItem('userId'); 

    async function handleNewPost(e){
        //previnir comportamento padrão do form, recarregando a pag
        e.preventDefault();

        const data = {
            nomeServico, 
            precoMedio,
            detalhes,
            prestadorId
        };

        try{
            await api.post('servicoDisponivel', data)

            history.push('/homepage'); 
        }catch(err){
            alert('Erro ao cadastrar post, tente de novamente. ')
        }
    }

    return ( 
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="College Labs"/>

                    <h1>Cadastrar novo servico</h1>
                    <p>Detalhe o servico</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color='#E02041' />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewPost}>
                    <input 
                        placeholder="Nome do Serviço"
                        value={nomeServico}
                        onChange={e => setNomeServico(e.target.value)}
                    />

                    <input 
                        type="number"
                        step=".01"
                        placeholder="Preço médio"
                        value={precoMedio}
                        onChange={e => setPrecoMedio(e.target.value)}
                    />

                    <textarea 
                        placeholder="Detalhes"
                        value={detalhes}
                        onChange={e => setDetalhes(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}