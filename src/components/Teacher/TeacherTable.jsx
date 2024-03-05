// TeacherTable.jsx
import React from 'react';
import PropTypes from 'prop-types';

const TeacherTable = ({ teachers, onEdit, onDelete }) => {
  return (
    <div>
      <h3>Listado de Profesores</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo Electrónico</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>{teacher.id}</td>
              <td>{teacher.name}</td>
              <td>{teacher.email}</td>
              <td>
                <button onClick={() => onEdit(teacher.id)}>Editar</button>
                <button onClick={() => onDelete(teacher.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TeacherTable.propTypes = {
  teachers: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TeacherTable;
