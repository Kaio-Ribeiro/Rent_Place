import React, { useState } from 'react';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import herosImg from '../../assets/heroes.png';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api'

export default function Logon() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    async function handleLogin(e) {
        e.preventDefault()

        try {

            const response = await api.post('sessions', { email })
            
            //localStorage.setItem('ongId', id)
            //localStorage.setItem('ongName', response.data.name)

            history.push('/Residences')

        }catch (err) {

            alert('Falha no login, tente novamente.')

        }
    }
    return(
        <div className="logon-container">
                <section className="form">
                    <img src= {logoImg} alt="Be The Hero" />

                    <form onSubmit={handleLogin}>
                        <h1>Faça seu logon</h1>

                        <input type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        />

                        <input type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}/>
                        
                        <button className="button" type="submit">Entrar</button>

                        <Link className="back-link" to="/register">
                            <FiLogIn size={16} color="#E02041" />
                            Não tenho cadastro
                        </Link>
                    </form>
                </section>
                <img src= {herosImg} alt="Heroes" />
        </div>
    )
}