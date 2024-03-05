// RoleForm.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const RoleForm = ({ supabase, selectedRole, onSave }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (selectedRole) {
      setName(selectedRole.name);
    } else {
      setName('');
    }
  }, [selectedRole]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const newRoleData = {
      name: name.trim(),
    };
    onSave(newRoleData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Role Name:
        <input
          type="text"
          placeholder="Enter role name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button type="submit">{selectedRole ? 'Update Role' : 'Add Role'}</button>
    </form>
  );
};

RoleForm.propTypes = {
  supabase: PropTypes.object.isRequired,
  selectedRole: PropTypes.object,
  onSave: PropTypes.func.isRequired,
};

export default RoleForm;
