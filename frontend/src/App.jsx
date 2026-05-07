import { useState, useEffect } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import './index.css';

const API_URL = 'http://localhost:3000/api';

function App() {
  const [tareas, setTareas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const resTareas = await fetch(API_URL);
      const dataTareas = await resTareas.json();
      setTareas(dataTareas);

      const resCat = await fetch(`${API_URL}/categorias`);
      const dataCat = await resCat.json();
      setCategorias(dataCat);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSaveTask = async (taskData) => {
    try {
      if (taskToEdit) {
        await fetch(`${API_URL}/${taskToEdit.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(taskData)
        });
      } else {
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(taskData)
        });
      }
      setTaskToEdit(null);
      fetchData();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleComplete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}/completado`, { method: 'PUT' });
      fetchData();
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}/eliminar`, { method: 'DELETE' });
      fetchData();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEdit = (task) => {
    setTaskToEdit(task);
  };

  const cancelEdit = () => {
    setTaskToEdit(null);
  };

  return (
    <div>
      <h1>Gestor de Tareas</h1>
      <TaskForm 
        categorias={categorias} 
        onSave={handleSaveTask} 
        taskToEdit={taskToEdit} 
        onCancel={cancelEdit} 
      />
      <TaskList 
        tareas={tareas} 
        categorias={categorias}
        onComplete={handleComplete} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
    </div>
  );
}

export default App;
