// StudentTable.jsx
import React from 'react';
import PropTypes from 'prop-types';

const StudentTable = ({ students, onEdit, onDelete }) => {
  return (
    <div>
      <h3>Listado de Estudiantes</h3>
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
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>
                <button onClick={() => onEdit(student.id)}>Editar</button>
                <button onClick={() => onDelete(student.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

StudentTable.propTypes = {
  students: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default StudentTable;
