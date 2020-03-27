import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import heroesLogo from '../../assets/images/logo.svg'

import api from '../../services/api'

import './styles.css'

export default function Profile() {

    const ongID = localStorage.getItem('ongID')
    const ongName = localStorage.getItem('ongName')

    const history = useHistory()

    const [ incidents, setIncidents ] = useState([])

    useEffect(() => {
        api.get('/profile', {
            headers: {
                Authorization: ongID
            }
        }).then(res => {
            setIncidents(res.data)
        })
    }, [ongID])

    async function deleteIncident(id) {
        try {
            await api.delete(`/incidents/${id}`, {
                headers: {
                    Authorization: ongID
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id))

        } catch (error) {
            alert('erro ao deletar')
        }
    }

    function handleLogout() {
        localStorage.clear()
        history.push('/')
    }

    return(
        <div className="profile-container">
            <header>
                <img src={heroesLogo} alt="Be The Hero" />
                <span>Bem vindo, {ongName}</span>
                <Link className="button" to="/incidents/new">
                    Cadastrar Novo Caso
                </Link>
                <button 
                    onClick={handleLogout}
                    type="button">
                    <FiPower 
                        size={18}
                        color="#e02041"
                    />
                </button>
            </header>
            <h1>Casos Cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <button
                            onClick={() => deleteIncident(incident.id)}
                            type="button">
                            <FiTrash2
                                size={20}
                                color="#a8a8b3"
                            />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}