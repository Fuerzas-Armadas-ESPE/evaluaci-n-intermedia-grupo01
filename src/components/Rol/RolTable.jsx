// RolTable.jsx
import React from 'react';
import PropTypes from 'prop-types';

const RolTable = ({ roles, onEdit, onDelete }) => {
  return (
    <div>
      <h3>Listado de Roles</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Role Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.id}</td>
              <td>{role.name}</td>
              <td>
                <button onClick={() => onEdit(role.id)}>Edit</button>
                <button onClick={() => onDelete(role.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

RolTable.propTypes = {
  roles: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default RolTable;
