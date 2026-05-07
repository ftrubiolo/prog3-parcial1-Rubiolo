import TaskItem from './TaskItem';

function TaskList({ tareas, categorias, onComplete, onEdit, onDelete }) {
  if (tareas.length === 0) {
    return <p className="text-secondary">No hay tareas pendientes.</p>;
  }

  return (
    <div>
      {tareas.map(tarea => (
        <TaskItem 
          key={tarea.id} 
          tarea={tarea} 
          categorias={categorias}
          onComplete={onComplete} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
}

export default TaskList;
