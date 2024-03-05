// TopicTable.jsx
import React from 'react';
import PropTypes from 'prop-types';

const TopicTable = ({ topics, onEdit, onDelete }) => {
  return (
    <div>
      <h3>Listado de Temas</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Objetivo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {topics.map((topic) => (
            <tr key={topic.id}>
              <td>{topic.id}</td>
              <td>{topic.title}</td>
              <td>{topic.objective}</td>
              <td>
                <button onClick={() => onEdit(topic.id)}>Editar</button>
                <button onClick={() => onDelete(topic.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TopicTable.propTypes = {
  topics: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TopicTable;
