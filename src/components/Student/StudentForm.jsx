// StudentForm.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const StudentForm = ({ supabase, selectedStudent, onSave }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (selectedStudent) {
      setName(selectedStudent.name);
      setEmail(selectedStudent.email);
    } else {
      setName('');
      setEmail('');
    }
  }, [selectedStudent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    const newStudentData = {
      name: name.trim(),
      email: email.trim(),
    };
    onSave(newStudentData);
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
        Correo Electrónico:
        <input
          type="email"
          placeholder="Ingrese el correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button type="submit">{selectedStudent ? 'Actualizar Estudiante' : 'Agregar Estudiante'}</button>
    </form>
  );
};

StudentForm.propTypes = {
  supabase: PropTypes.object.isRequired,
  selectedStudent: PropTypes.object,
  onSave: PropTypes.func.isRequired,
};

export default StudentForm;
