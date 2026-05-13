import TaskItem from './TaskItem';

function TaskList({ tareas, categorias, onComplete, onEdit, onDelete }) {
  if (tareas.length === 0) {
    return <p className="text-secondary">No hay tareas pendientes.</p>;
  }

  const sortedTareas = [...tareas].sort((a, b) => {
    // 1. Uncompleted tasks first
    if (a.estado !== b.estado) {
      return a.estado === 1 ? 1 : -1;
    }

    // 2. Sort by date (earliest first)
    if (!a.fechaVencimiento && !b.fechaVencimiento) return 0;
    if (!a.fechaVencimiento) return 1;
    if (!b.fechaVencimiento) return -1;

    const dateA = new Date(a.fechaVencimiento);
    const dateB = new Date(b.fechaVencimiento);
    return dateA - dateB;
  });

  return (
    <div>
      {sortedTareas.map(tarea => (
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
