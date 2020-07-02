import React from 'react';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
//import api from '../../services/api'
import './styles.css'

//import logoImg from '../../assets/logo.png'

export default function Detail() {
    const history = useHistory()
    //const route = useRoute()

    const residence = '?'
    const message = `Olá ${residence.name}, estou entrando em contato pois gostaria de alugar a vaga em sua república`


    async function SendEmail(){
        window.open(`mailto:${residence}?subject=${message}`)
    }

    async function sendWhatsApp() {
        message = window.encodeURIComponent(message)
        window.open(`https://api.whatsapp.com/send?phone=${residence.whatsapp}&text=${message}`)
    }

    return (
        <div className="profile-container" id="all">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                <Link className="back-link" to="/Residences">
                    <FiArrowLeft size={16} color="#E02041" />
                    Voltar à busca
                </Link>
            </header>

            <section>
                <h1>Informações da República</h1>
                <div className="container">
                    <strong>TÍTULO:</strong>
                    <p>{residence.title}</p>
                    <p>Testando parágrafo</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{residence.description}</p>
                    <p>Testando parágrafo</p>

                    <strong>LOCALZAÇÃO:</strong>
                    <p>{residence.city}</p>
                    <p>Testando parágrafo</p>

                    <strong>ENDEREÇO:</strong>
                    <p>{residence.street}</p>
                    <p>Testando parágrafo</p>

                    <strong>NÚMERO DE MORADORES:</strong>
                    <p>{residence.residents_number}</p>
                    <p>Testando parágrafo</p>

                    <strong>NÚMERO DE VAGAS:</strong>
                    <p>{residence.vacancies_number}</p>
                    <p>Testando parágrafo</p>

                    <strong>PREÇO:</strong>
                    <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(residence.preci)}</p>
                </div>

                <div className="contact">
                    <div id="speak">
                        <h2>Fale com o anunciante</h2>
                        <h3>Entre em contato</h3>
                    </div>

                    <div className="actions">
                        <button type="button" className="whatsapp" onClick={sendWhatsApp}>WhatsApp</button>

                        <button type="button" className="email" onClick={SendEmail}>E-mail</button>
                    </div>
                    
                </div>
            </section>
        </div>
    )
}