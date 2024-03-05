// ActivityForm.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ActivityForm = ({ supabase, selectedActivity, onSave }) => {
  const [topicOptions, setTopicOptions] = useState([]);
  const [topicId, setTopicId] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // Fetch topic options
        const { data: topicData, error: topicError } = await supabase.from('topics').select('id, title');
        if (topicError) {
          throw topicError;
        }
        setTopicOptions(topicData || []);
      } catch (error) {
        console.error('Error fetching topic options:', error.message);
      }
    };

    fetchOptions();
  }, [supabase]);

  useEffect(() => {
    if (selectedActivity) {
      setTopicId(selectedActivity.topic_id);
      setDescription(selectedActivity.description);
      setStatus(selectedActivity.status);
    } else {
      setTopicId('');
      setDescription('');
      setStatus(false);
    }
  }, [selectedActivity]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topicId.trim() || !description.trim()) return;
    const newActivityData = {
      topic_id: topicId.trim(),
      description: description.trim(),
      status,
    };
    onSave(newActivityData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Tema:
        <select value={topicId} onChange={(e) => setTopicId(e.target.value)}>
          <option value="" disabled>
            Seleccione un tema
          </option>
          {topicOptions.map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.title}
            </option>
          ))}
        </select>
      </label>
      <label>
        Descripción:
        <input
          type="text"
          placeholder="Ingrese la descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Estado:
        <input
          type="checkbox"
          checked={status}
          onChange={(e) => setStatus(e.target.checked)}
        />
      </label>
      <button type="submit">{selectedActivity ? 'Actualizar Actividad' : 'Agregar Actividad'}</button>
    </form>
  );
};

ActivityForm.propTypes = {
  supabase: PropTypes.object.isRequired,
  selectedActivity: PropTypes.object,
  onSave: PropTypes.func.isRequired,
};

export default ActivityForm;
