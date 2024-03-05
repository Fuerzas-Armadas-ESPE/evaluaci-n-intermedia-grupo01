// GradeTable.jsx
import React from 'react';
import PropTypes from 'prop-types';

const GradeTable = ({ grades, activities, students, onEdit, onDelete }) => {
  return (
    <div>
      <h3>Listado de Calificaciones</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Actividad</th>
            <th>Estudiante</th>
            <th>Calificación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade) => (
            <tr key={grade.id}>
              <td>{grade.id}</td>
              <td>{activities.find((activity) => activity.id === grade.activity_id)?.description || 'Sin asignar'}</td>
              <td>{students.find((student) => student.id === grade.student_id)?.name || 'Sin asignar'}</td>
              <td>{grade.grade}</td>
              <td>
                <button onClick={() => onEdit(grade.id)}>Editar</button>
                <button onClick={() => onDelete(grade.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

GradeTable.propTypes = {
  grades: PropTypes.array.isRequired,
  activities: PropTypes.array.isRequired,
  students: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default GradeTable;
