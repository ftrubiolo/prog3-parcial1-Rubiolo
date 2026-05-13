function TaskItem({ tarea, categorias, onComplete, onEdit, onDelete }) {
  const cat = categorias.find(c => c.id === tarea.categoriaId);
  const catName = cat ? cat.nombre : 'Sin categoría';
  const catColor = cat ? cat.color : '#000';

  let formattedDate = 'Sin fecha';
  if (tarea.fechaVencimiento) {
    const [year, month, day] = tarea.fechaVencimiento.split('T')[0].split('-');
    formattedDate = `${day}/${month}/${year}`;
  }

  const isCompleted = tarea.estado === 1;

  let isOverdue = false;
  if (!isCompleted && tarea.fechaVencimiento) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [year, month, day] = tarea.fechaVencimiento.split('T')[0].split('-');
    const taskDate = new Date(year, month - 1, day);

    if (taskDate < today) {
      isOverdue = true;
    }
  }

  return (
    <div className="card flex justify-between items-center" style={
      {
        borderLeft: `5px solid ${!isCompleted ? catColor : "grey"}`,
        opacity: isCompleted ? "0.5" : "1",
        backgroundColor: isOverdue ? 'rgba(239, 68, 68, 0.05)' : 'var(--surface-color)'
      }
    }>
      <div>
        <h3 className={isCompleted ? "completed-text" : ""} style={{ marginBottom: "0.25rem" }}>
          {tarea.titulo}
        </h3>
        <p className="text-sm text-secondary">
          {catName} • <span style={{ color: isOverdue ? 'var(--danger-color)' : 'inherit', fontWeight: isOverdue ? '600' : 'normal' }}>
            Vence: {formattedDate} {isOverdue}
          </span>
        </p>
      </div>
      <div className="flex gap-2">
        {!isCompleted && (
          <button className="success" onClick={() => onComplete(tarea.id)}>
            ✓
          </button>
        )}
        {!isCompleted && (
          <button className="secondary" onClick={() => onEdit(tarea)}>
            Editar
          </button>
        )}
        <button className="danger" onClick={() => onDelete(tarea.id)}>
          X
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
