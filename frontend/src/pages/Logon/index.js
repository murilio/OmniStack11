import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import heroesImg from '../../assets/images/heroes.png'
import heroesLogo from '../../assets/images/logo.svg'

import api from '../../services/api'

import './styles.css'

export default function Logon() {

    const [ id, setId ] = useState('')

    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await api.post('/login', { id })
            
            localStorage.setItem('ongID', id)
            localStorage.setItem('ongName', res.data.name)

            history.push('/profile')

        } catch (error) {
            alert('Falha no login, tente novamente')
        }
        
    }

  return (
    <div className="logon-container">
        <section className="form">
            <img src={heroesLogo} alt="logo" />
            <form onSubmit={handleSubmit}>
                <h1>Faça seu Logon</h1>

                <input 
                    placeholder="Seu ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <button className="button">Entrar</button>
                
                <Link className="back-link" to="/register">
                    <FiLogIn 
                        size={16}
                        color="#e02041"
                    />
                    Não tenho cadastro
                </Link>

            </form>
        </section>

        <img src={heroesImg} alt="heroes" />
    </div>
  );
}
