import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import styles from './Register.module.css';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authAPI.register(username, email, password);
      alert('✅ Conta criada com sucesso! Redirecionando para login...');
      navigate('/login');
    } catch (err: any) {
      const errorMsg = err.response?.data?.email?.[0] || 
                       err.response?.data?.username?.[0] || 
                       'Erro ao registrar. Tente novamente.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <h1>📋 TaskMaster</h1>
        <p>Crie sua conta e comece a organizar</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Nome de usuário</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="seu_usuario"
            autoFocus
          />
        </div>
        
        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="seu@email.com"
          />
        </div>
        
        <div className={styles.formGroup}>
          <label>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            minLength={6}
          />
        </div>
        
        {error && <div className={styles.error}>⚠️ {error}</div>}
        
        <button type="submit" disabled={loading} className={styles.submitBtn}>
          {loading ? '⏳ Criando conta...' : '✨ Criar conta'}
        </button>
      </form>
      
      <p className={styles.footer}>
        Já tem conta? <Link to="/login">Faça login</Link>
      </p>
    </div>
  );
};

export default Register;