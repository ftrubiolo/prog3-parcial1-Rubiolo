function TaskItem({ tarea, categorias, onComplete, onEdit, onDelete }) {
  const cat = categorias.find(c => c.id === tarea.categoriaId);
  const catName = cat ? cat.nombre : 'Sin categoría';
  
  const formattedDate = tarea.fechaVencimiento 
    ? new Date(tarea.fechaVencimiento).toLocaleDateString() 
    : 'Sin fecha';

  const isCompleted = tarea.estado === 1;

  return (
    <div className="card flex justify-between items-center">
      <div>
        <h3 className={isCompleted ? "completed-text" : ""} style={{ marginBottom: "0.25rem" }}>
          {tarea.titulo}
        </h3>
        <p className="text-sm text-secondary">
          {catName} • Vence: {formattedDate}
        </p>
      </div>
      <div className="flex gap-2">
        {!isCompleted && (
          <button className="success" onClick={() => onComplete(tarea.id)}>
            ✓
          </button>
        )}
        <button className="secondary" onClick={() => onEdit(tarea)}>
          Editar
        </button>
        <button className="danger" onClick={() => onDelete(tarea.id)}>
          X
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
