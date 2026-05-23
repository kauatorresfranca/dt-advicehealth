import React from 'react';
import { Task } from '../../types';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleComplete, onDelete }) => {
  const priorityConfig = {
    low: { label: '🟢 Baixa', color: 'low' },
    medium: { label: '🟡 Média', color: 'medium' },
    high: { label: '🔴 Alta', color: 'high' },
  };

  const priority = priorityConfig[task.priority];

  return (
    <div className={`${styles.card} ${task.is_completed ? styles.completed : ''} ${styles[priority.color]}`}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>
            {task.is_completed ? '✅ ' : '⬜ '}
            {task.title}
          </h3>
          <span className={`${styles.priorityBadge} ${styles[`priority${priority.color.charAt(0).toUpperCase() + priority.color.slice(1)}`]}`}>
            {priority.label}
          </span>
        </div>
        
        {task.description && (
          <p className={styles.description}>{task.description}</p>
        )}
        
        <div className={styles.metadata}>
          {task.category_name && (
            <span className={styles.tag}>📁 {task.category_name}</span>
          )}
          {task.due_date && (
            <span className={styles.tag}>
              📅 {new Date(task.due_date).toLocaleDateString('pt-BR')}
            </span>
          )}
          {task.shared_with_emails.length > 0 && (
            <span className={styles.tag}>
              👥 {task.shared_with_emails.join(', ')}
            </span>
          )}
        </div>
      </div>
      
      <div className={styles.actions}>
        <button 
          onClick={() => onToggleComplete(task.id)}
          className={task.is_completed ? styles.btnReopen : styles.btnComplete}
        >
          {task.is_completed ? '↩️ Reabrir' : '✓ Concluir'}
        </button>
        <button 
          onClick={() => onDelete(task.id)}
          className={styles.btnDelete}
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TaskCard;