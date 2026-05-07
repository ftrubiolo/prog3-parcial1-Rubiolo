import { useState, useEffect } from 'react';

function TaskForm({ categorias, onSave, taskToEdit, onCancel }) {
  const [titulo, setTitulo] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitulo(taskToEdit.titulo);
      setCategoriaId(taskToEdit.categoriaId || '');
      setFechaVencimiento(taskToEdit.fechaVencimiento ? taskToEdit.fechaVencimiento.split('T')[0] : '');
    } else {
      setTitulo('');
      setCategoriaId('');
      setFechaVencimiento('');
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo || !categoriaId || !fechaVencimiento) {
      alert("Por favor completa todos los campos.");
      return;
    }
    onSave({ titulo, categoriaId, fechaVencimiento });
    setTitulo('');
    setCategoriaId('');
    setFechaVencimiento('');
  };

  return (
    <div className="card">
      <h2>{taskToEdit ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título</label>
          <input 
            type="text" 
            value={titulo} 
            onChange={e => setTitulo(e.target.value)} 
            placeholder="Ej: Hacer las compras" 
          />
        </div>
        
        <div className="flex gap-4">
          <div className="form-group" style={{ flex: 1 }}>
            <label>Categoría</label>
            <select value={categoriaId} onChange={e => setCategoriaId(e.target.value)}>
              <option value="">Seleccione...</option>
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
              ))}
            </select>
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Fecha Vencimiento</label>
            <input 
              type="date" 
              value={fechaVencimiento} 
              onChange={e => setFechaVencimiento(e.target.value)} 
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button type="submit" className="primary">
            {taskToEdit ? 'Actualizar' : 'Agregar'}
          </button>
          {taskToEdit && (
            <button type="button" className="secondary" onClick={onCancel}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
