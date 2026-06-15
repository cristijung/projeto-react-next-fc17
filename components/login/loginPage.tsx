'use client';

import { useState } from 'react';
import { useAuth } from '@/context/authContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const { login, estaAutenticado } = useAuth();

  const makeLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      await login(email);
    }
  };

  if (estaAutenticado) {
    return <p style={{ padding: '20px' }}>Você já está logado</p>;
  }

  return (
    <>
      <div style={{ maxWidth: '300px', margin: '40px auto' }}>
        <h2>Acessar o sistema</h2>        
        <form onSubmit={makeLogin} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <input
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu email"
            style={{ padding: '8px' }}
          />
          <button type="submit" style={{ padding: '8px', cursor: 'pointer' }}>
            Entrar
          </button>
        </form>
      </div>
    </>
  );
}