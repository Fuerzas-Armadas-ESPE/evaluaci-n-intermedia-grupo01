// TeacherForm.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TeacherForm = ({ supabase, selectedTeacher, onSave }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (selectedTeacher) {
      setName(selectedTeacher.name);
      setEmail(selectedTeacher.email);
    } else {
      setName('');
      setEmail('');
    }
  }, [selectedTeacher]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    const newTeacherData = {
      name: name.trim(),
      email: email.trim(),
    };
    onSave(newTeacherData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          placeholder="Ingrese el nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Correo electrónico:
        <input
          type="email"
          placeholder="Ingrese el correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button type="submit">{selectedTeacher ? 'Actualizar Profesor' : 'Agregar Profesor'}</button>
    </form>
  );
};

TeacherForm.propTypes = {
  supabase: PropTypes.object.isRequired,
  selectedTeacher: PropTypes.object,
  onSave: PropTypes.func.isRequired,
};

export default TeacherForm;
