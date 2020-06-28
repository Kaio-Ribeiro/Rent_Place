import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

import './styles.css';
import '../../services/api'
import api from '../../services/api';

export default function Residences() {
    const [residences, setResidences] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    //const navigation = useNavigation()
    const history = useHistory()

    function navigateToDetail(residence) {
        history.push(`/detail/${residence}`)
    }

    async function loadResidences() {
        if(loading) {
            return
        }

        if(total > 0 && residences.length === total) {
            return
        }

        setLoading(true)

        const response = await api.get('residences', {
            params: { page }
        })

        setResidences([...residences, ... response.data])
        setTotal(response.headers['x-total-count'])
        setPage(page + 1)
        setLoading(false)
    }
    function handleLogut() {
        localStorage.clear()

        history.push('/')
    }

    useEffect(() => {
        loadResidences()
    }, [])

    return(
        <div className="new-residence-container">
        <div>
            <section>
                <img src={logoImg} alt="Be The Hero" />
                <strong>Total de {total} repúblicas.</strong>
                <button onClick={handleLogut} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>

                <h1>Bem-vindo</h1>
                <p>Veja todas as repúblicas com vagas disponíveis na sua cidade.</p>
            </section>

            <div className="content">
                {residences.map(residence => (
                    <li key={residence.id}>
                        <strong>TÍTULO:</strong>
                        <p>{residence.title}</p>

                        <strong>LOCALIZAÇÃO:</strong>
                        <p>{residence.city}/{residence.uf}</p>

                        <strong>PREÇO:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(residence.preci)}</p>

                        <button type="button" onClick={() => navigateToDetail(residence.id)}>Detalhes</button>
                    </li>
                ))}
            </div>
        </div>
    </div>
    )
}