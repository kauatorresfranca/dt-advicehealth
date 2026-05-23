import React from 'react';
import { Category } from '../../types';
import styles from './FilterBar.module.css';

interface FilterBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterCompleted: string;
  setFilterCompleted: (value: string) => void;
  filterPriority: string;
  setFilterPriority: (value: string) => void;
  filterCategory: string;
  setFilterCategory: (value: string) => void;
  categories: Category[];
  onNewTask: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  setSearchTerm,
  filterCompleted,
  setFilterCompleted,
  filterPriority,
  setFilterPriority,
  filterCategory,
  setFilterCategory,
  categories,
  onNewTask
}) => {
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="🔍 Buscar tarefas..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      
      <select 
        value={filterCompleted} 
        onChange={(e) => setFilterCompleted(e.target.value)}
        className={styles.select}
      >
        <option value="">📊 Todas</option>
        <option value="false">⏳ Pendentes</option>
        <option value="true">✅ Concluídas</option>
      </select>

      <select 
        value={filterPriority} 
        onChange={(e) => setFilterPriority(e.target.value)}
        className={styles.select}
      >
        <option value="">🎯 Prioridade</option>
        <option value="low">🟢 Baixa</option>
        <option value="medium">🟡 Média</option>
        <option value="high">🔴 Alta</option>
      </select>

      <select 
        value={filterCategory} 
        onChange={(e) => setFilterCategory(e.target.value)}
        className={styles.select}
      >
        <option value="">📁 Categoria</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>

      <button onClick={onNewTask} className={styles.newTaskBtn}>
        ➕ Nova Tarefa
      </button>
    </div>
  );
};

export default FilterBar;