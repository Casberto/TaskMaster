import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Cabecalho';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';

function App() {
  const [activeTab, setActiveTab] = useState('Faculdade');

  const tabs = ['Faculdade', 'Trabalho', 'Casa'];

  const [tasks, setTasks] = useState({
    Faculdade: [],
    Trabalho: [],
    Casa: [],
  });

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    
    const updatedTasks = {
      ...tasks,
      [activeTab]: [...(tasks[activeTab] || []), newTask],
    };
    
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };
  

  const completeTask = (taskId) => {
    const updatedTasks = {
      ...tasks,
      [activeTab]: tasks[activeTab].map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    };
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = {
      ...tasks,
      [activeTab]: tasks[activeTab].filter((task) => task.id !== taskId),
    };
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const saveTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  return (
    <div className="App">
      <Header />
      <section className='app-container'>
      <ul className="nav nav-tabs mb-3">
        {tabs.map((tab) => (
          <li className="nav-item" key={tab}>
            <button
              className={`nav-link ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>
      
      <AddTaskForm onAddTask={addTask} />
      <TaskList
        tasks={tasks[activeTab] || []}
        onCompleteTask={completeTask}
        onDeleteTask={deleteTask}
      />
      </section>
    </div>
    
  );
}

export default App;
