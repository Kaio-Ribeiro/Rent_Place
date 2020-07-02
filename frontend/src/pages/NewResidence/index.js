import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

import './styles.css';
import '../../services/api'
import api from '../../services/api';

export default function NewIncident() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('')
    const [street, setStreet] = useState('')
    const [house_number, setHouse_number] = useState('')
    const [residents_number, setResidents_number] = useState('')
    const [vacancies_number, setVacancies_number] = useState('')
    const [price, setPrece] = useState('')
    const [uf, setUf] = useState('')

    const history = useHistory()
    const users_id = localStorage.getItem('user_id')

    async function handleNewIncident(e) {
        e.preventDefault()

        const data = {
            users_id,
            title,
            description,
            city,
            district,
            street,
            house_number,
            residents_number,
            vacancies_number,
            price,
            uf,
        }
        try {
            await api.post('residences', data)
            history.push('/profile')
        }catch (err) {
            alert('Erro ao cadastrar caso, tente novamente.')
        }
    }
    return(
        <div className="new-incident-container" id="all">
        <div className="content">
            <section>
                <img src={logoImg} alt="Be The Hero" />
                <h1>Cadastrar República</h1>
                <p>Descreva detalhadamente para encontrar um morador.</p>

                <Link className="back-link" to="/residences">
                    <FiArrowLeft size={16} color="#E02041" />
                    Voltar
                </Link>
            </section>

            <form onSubmit={handleNewIncident}>
                <input 
                placeholder="Título"
                value={title}
                onChange={e => setTitle(e.target.value)}
                />
                <textarea 
                placeholder="Descrição"
                value={description}
                onChange={e => setDescription(e.target.value)}
                />
                <input 
                placeholder="Cidade"
                value={city}
                onChange={e => setCity(e.target.value)}
                />
                <input 
                placeholder="Distrito"
                value={district}
                onChange={e => setDistrict(e.target.value)}
                />
                <input 
                placeholder="Rua"
                value={street}
                onChange={e => setStreet(e.target.value)}
                />
                <input 
                placeholder="Número da casa"
                type="number"
                min="1"
                value={house_number}
                onChange={e => setHouse_number(e.target.value)}
                />
                <input
                placeholder="Número de moradores"
                type="number"
                min="0"
                value={residents_number}
                onChange={e => setResidents_number(e.target.value)}
                />
                <input
                placeholder="Número de vagas"
                type="number"
                min="0"
                value={vacancies_number}
                onChange={e => setVacancies_number(e.target.value)}
                />
                <input 
                placeholder="Valor em reais"
                type="number"
                min="0"
                step="0.1"
                value={price}
                onChange={e => setPrece(e.target.value)}
                />
                <input
                placeholder="UF"
                value={uf}
                style={{ width: 80 }}
                onChange={e => setUf(e.target.value)} />
                <button className="button" type="submit">Cadastrar</button>
            </form>
        </div>
    </div>
    )
}