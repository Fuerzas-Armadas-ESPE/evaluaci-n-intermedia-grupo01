// TopicForm.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TopicForm = ({ supabase, selectedTopic, onSave }) => {
  const [title, setTitle] = useState('');
  const [objective, setObjective] = useState('');

  useEffect(() => {
    if (selectedTopic) {
      setTitle(selectedTopic.title);
      setObjective(selectedTopic.objective);
    } else {
      setTitle('');
      setObjective('');
    }
  }, [selectedTopic]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !objective.trim()) return;
    const newTopicData = {
      title: title.trim(),
      objective: objective.trim(),
    };
    onSave(newTopicData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Título:
        <input
          type="text"
          placeholder="Ingrese el título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Objetivo:
        <input
          type="text"
          placeholder="Ingrese el objetivo"
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
        />
      </label>
      <button type="submit">{selectedTopic ? 'Actualizar Tema' : 'Agregar Tema'}</button>
    </form>
  );
};

TopicForm.propTypes = {
  supabase: PropTypes.object.isRequired,
  selectedTopic: PropTypes.object,
  onSave: PropTypes.func.isRequired,
};

export default TopicForm;
