// ActivityTable.jsx
import React from 'react';
import PropTypes from 'prop-types';

const ActivityTable = ({ activities, topics, onEdit, onDelete }) => {
  return (
    <div>
      <h3>Listado de Actividades</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tema</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity.id}>
              <td>{activity.id}</td>
              <td>{topics.find((topic) => topic.id === activity.topic_id)?.title || 'Sin asignar'}</td>
              <td>{activity.description}</td>
              <td>{activity.status ? 'Completada' : 'Pendiente'}</td>
              <td>
                <button onClick={() => onEdit(activity.id)}>Editar</button>
                <button onClick={() => onDelete(activity.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ActivityTable.propTypes = {
  activities: PropTypes.array.isRequired,
  topics: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ActivityTable;
