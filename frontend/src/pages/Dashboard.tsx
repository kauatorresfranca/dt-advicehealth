import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { tasksAPI, categoriesAPI, authAPI } from '../services/api';
import { Task, Category, User } from '../types';
import { clearTokens } from '../utils/auth';
import FilterBar from '../components/FilterBar/FilterBar';
import TaskCard from '../components/TaskCard/TaskCard';
import TaskModal from '../components/TaskModal/TaskModal';
import styles from './Dashboard.module.css';

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [filterCompleted, setFilterCompleted] = useState<string>('');
  const [filterPriority, setFilterPriority] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    category: '',
    due_date: '',
    shared_with: [] as number[],
  });

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const params: any = {};
      if (filterCompleted) params.is_completed = filterCompleted === 'true';
      if (filterPriority) params.priority = filterPriority;
      if (filterCategory) params.category = filterCategory;
      if (searchTerm) params.search = searchTerm;

      const [tasksRes, categoriesRes, usersRes] = await Promise.all([
        tasksAPI.list(params),
        categoriesAPI.list(),
        authAPI.getUsers(),
      ]);

      setTasks(tasksRes.data.results);
      setCategories(categoriesRes.data.results);
      setUsers(usersRes.data.results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filterCompleted, filterPriority, filterCategory, searchTerm]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogout = () => {
    clearTokens();
    navigate('/login');
  };

  const handleToggleComplete = async (id: number) => {
    try {
      await tasksAPI.toggleComplete(id);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async (id: number) => {
    if (window.confirm('🗑️ Deseja realmente deletar esta tarefa?')) {
      try {
        await tasksAPI.delete(id);
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await tasksAPI.create({
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority,
        category: newTask.category ? parseInt(newTask.category) : null,
        due_date: newTask.due_date || null,
        shared_with: newTask.shared_with,
      });
      setShowModal(false);
      setNewTask({
        title: '',
        description: '',
        priority: 'medium',
        category: '',
        due_date: '',
        shared_with: [],
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}>⏳</div>
        <p>Carregando suas tarefas...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1>📋 TaskMaster</h1>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            🚪 Sair
          </button>
        </div>

        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterCompleted={filterCompleted}
          setFilterCompleted={setFilterCompleted}
          filterPriority={filterPriority}
          setFilterPriority={setFilterPriority}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          categories={categories}
          onNewTask={() => setShowModal(true)}
        />

        <div className={styles.tasksList}>
          {tasks.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.icon}>📭</div>
              <h3>Nenhuma tarefa encontrada</h3>
              <p>Crie sua primeira tarefa ou ajuste os filtros</p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTask}
              />
            ))
          )}
        </div>
      </div>

      {showModal && (
        <TaskModal
          newTask={newTask}
          setNewTask={setNewTask}
          categories={categories}
          users={users}
          onSubmit={handleCreateTask}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;