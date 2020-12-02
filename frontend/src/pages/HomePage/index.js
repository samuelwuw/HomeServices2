import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2, FiSearch, FiUser } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function HomePage(){
    const [servicos, setServicos] = useState([]);

    const history = useHistory();

    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const userTipo = localStorage.getItem('userTipo');

    //recebe qual função deseja ser executada, e quando ela será executada
    //toda vez que as informações do array mudarem, ele executa a função
    useEffect(() => {
        api.get('profileDisponivel',{
            headers: {
                Authorization: userId,
            }
        }).then(response => {
            setServicos(response.data);
        })
    }, [userId]);

    //funções com handle no começo interagem com algo do usuário
    async function handleDeletePost(id){
        try{
            await api.delete(`servicoDisponivel/${id}`, {
                headers: {
                    Authorization: userId,
                }
            });

            //faz varredura no array de incidents, procura o que tem o id de delete, e o remove dos incidents
            setServicos(servicos.filter(post => post.id !==  id))
        }catch(err){
            alert('Erro ao deletar caso, tente novamente. ');
        }
    }

    function handleLogout(){
        localStorage.clear();

        history.push('/');
    }

    if(userTipo === "prestador") return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="College Labs"/>
                <span>Bem vindo {userName}!</span>

                
                <Link className="button" to="servicoDisponivel/new">Cadastrar novo serviço</Link>
                <button id = "navigationBtn">
                    <FiSearch size={20}/>
                </button>
                <button type="button">
                    <FiUser size={18} color="#E02041" />
                </button>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
                
            </header>
            <h2>Serviços disponiveis: </h2>

            <ul>
                {servicos.map(post => (
                    <li key={post.id}>
                        <strong>Nome:</strong>
                        <p>{post.nomeServico}</p>

                        <button onClick= {() => handleDeletePost(post.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
    else return(
        <h1>EU SOU UM CONTRATANTE</h1>
    )
}