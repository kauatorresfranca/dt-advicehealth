import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { saveTokens } from '../utils/auth';
import styles from './Login.module.css';

const Login: React.FC = () => {
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
      const response = await authAPI.login(email, password);
      saveTokens(response.data.access, response.data.refresh);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <h1>📋 TaskMaster</h1>
        <p>Organize suas tarefas com eficiência</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="seu@email.com"
            autoFocus
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
          />
        </div>
        
        {error && <div className={styles.error}>⚠️ {error}</div>}
        
        <button type="submit" disabled={loading} className={styles.submitBtn}>
          {loading ? '⏳ Entrando...' : '🚀 Entrar'}
        </button>
      </form>
      
      <p className={styles.footer}>
        Não tem conta? <Link to="/register">Crie uma agora</Link>
      </p>
    </div>
  );
};

export default Login;