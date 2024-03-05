// RolApp.jsx
import React, { useState, useEffect } from 'react';
import RolForm from './RolForm';
import RolTable from './RolTable';

const RolApp = ({ supabase }) => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const { data, error } = await supabase.from('roles').select('*');
        if (error) {
          throw error;
        }
        setRoles(data || []);
      } catch (error) {
        console.error('Error fetching roles:', error.message);
      }
    };

    fetchRoles();
  }, [supabase]);

  const handleEdit = (roleId) => {
    const roleToEdit = roles.find((role) => role.id === roleId);
    setSelectedRole(roleToEdit);
  };

  const handleDelete = async (roleId) => {
    try {
      const { error } = await supabase.from('roles').delete().eq('id', roleId);
      if (error) {
        throw error;
      }
      console.log('Role deleted successfully');
      setRoles((prevRoles) => prevRoles.filter((role) => role.id !== roleId));
      setSelectedRole(null);
    } catch (error) {
      console.error('Error deleting role:', error.message);
    }
  };

  const handleSave = async (newRoleData) => {
    try {
      if (selectedRole) {
        const { error } = await supabase.from('roles').update(newRoleData).eq('id', selectedRole.id);
        if (error) {
          throw error;
        }
        console.log('Role updated successfully');
      } else {
        const { data, error } = await supabase.from('roles').upsert([newRoleData]);
        if (error) {
          throw error;
        }
        console.log('Role added successfully:', data);
      }

      const { data, error } = await supabase.from('roles').select('*');
      if (error) {
        throw error;
      }
      setRoles(data || []);
      setSelectedRole(null);
    } catch (error) {
      console.error('Error saving role:', error.message);
    }
  };

  return (
    <div>
      <h2>Roles</h2>
      <RolForm supabase={supabase} selectedRole={selectedRole} onSave={handleSave} />
      <RolTable roles={roles} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default RolApp;
