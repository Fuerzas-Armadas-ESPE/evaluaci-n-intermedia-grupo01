// TaskTable.jsx
import React from 'react';
import PropTypes from 'prop-types';

const TaskTable = ({ tasks, topics, onEdit, onDelete }) => {
  return (
    <div>
      <h3>Listado de Tareas</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tema</th>
            <th>Clase Impartida</th>
            <th>Actividad Pendiente</th>
            <th>Observaciones</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{topics.find((topic) => topic.id === task.topic_id)?.title || 'Sin asignar'}</td>
              <td>{task.class_delivered ? 'Sí' : 'No'}</td>
              <td>{task.activity_pending ? 'Sí' : 'No'}</td>
              <td>{task.observations}</td>
              <td>
                <button onClick={() => onEdit(task.id)}>Editar</button>
                <button onClick={() => onDelete(task.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TaskTable.propTypes = {
  tasks: PropTypes.array.isRequired,
  topics: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TaskTable;
