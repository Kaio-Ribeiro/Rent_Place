import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FiPower, FiArrowRight } from 'react-icons/fi';
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
        <div className="new-residence-container" id='all'>
        <div>
            <section>
                <div className="header-r">
                    <img src={logoImg} alt="Be The Hero" />
                    <button onClick={handleLogut} type="button">
                        <FiPower size={18} color="#E02041" />
                    </button>
                    <Link to="/newresidences/">Cadastre uma república</Link>
                </div>
                <h1>Bem-vindo</h1>
                <strong id="total">Total de {total} repúblicas.</strong>
                <p id="show-residences">Veja todas as repúblicas com vagas disponíveis na sua cidade.</p>
            </section>

            <div className="content">
                {residences.map(residence => (
                    <li key={residence.id}>
                            <section>
                            <strong>TÍTULO:</strong>
                            <p>{residence.title}</p>

                            <strong>LOCALIZAÇÃO:</strong>
                            <p>{residence.city}/{residence.uf}</p>

                            <strong>PREÇO:</strong>
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(residence.preci)}</p>
                            
                            <span className="go-link" onClick={() => navigateToDetail(residence)}>
                                Ver mais detalhes
                                <FiArrowRight id="right" size={16} color="E02041" />
                                </span>
                            </section>
                    </li>
                ))}
            </div>
        </div>
    </div>
    )
}