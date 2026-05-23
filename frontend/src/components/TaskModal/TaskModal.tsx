import React from 'react';
import { Category, User } from '../../types';
import styles from './TaskModal.module.css';

interface TaskModalProps {
  newTask: {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    category: string;
    due_date: string;
    shared_with: number[];
  };
  setNewTask: React.Dispatch<React.SetStateAction<any>>;
  categories: Category[];
  users: User[];
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({
  newTask,
  setNewTask,
  categories,
  users,
  onSubmit,
  onClose
}) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>✨ Nova Tarefa</h2>
          <button onClick={onClose} className={styles.closeBtn}>✕</button>
        </div>
        
        <form onSubmit={onSubmit}>
          <div className={styles.formGroup}>
            <label>Título *</label>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              required
              placeholder="Ex: Estudar React"
              autoFocus
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Descrição</label>
            <textarea
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              placeholder="Detalhes da tarefa..."
              rows={4}
            />
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Prioridade</label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
              >
                <option value="low">🟢 Baixa</option>
                <option value="medium">🟡 Média</option>
                <option value="high">🔴 Alta</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label>Categoria</label>
              <select
                value={newTask.category}
                onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
              >
                <option value="">Nenhuma</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label>Data de vencimento</label>
            <input
              type="date"
              value={newTask.due_date}
              onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Compartilhar com</label>
            <select
              multiple
              value={newTask.shared_with.map(String)}
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions, option => parseInt(option.value));
                setNewTask({ ...newTask, shared_with: selected });
              }}
              className={styles.multiSelect}
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>{user.email}</option>
              ))}
            </select>
            <small className={styles.hint}>
              💡 Segure Ctrl (Windows) ou Cmd (Mac) para selecionar múltiplos
            </small>
          </div>
          
          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.btnCancel}>
              Cancelar
            </button>
            <button type="submit" className={styles.btnSubmit}>
              ✓ Criar Tarefa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;