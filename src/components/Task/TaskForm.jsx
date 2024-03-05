// TaskForm.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TaskForm = ({ supabase, selectedTask, onSave }) => {
  const [topicId, setTopicId] = useState('');
  const [classDelivered, setClassDelivered] = useState(false);
  const [activityPending, setActivityPending] = useState(false);
  const [observations, setObservations] = useState('');
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const { data, error } = await supabase.from('topics').select('id, title');
        if (error) {
          throw error;
        }
        setTopics(data || []);
      } catch (error) {
        console.error('Error fetching topics:', error.message);
      }
    };

    fetchTopics();
  }, [supabase]);

  useEffect(() => {
    if (selectedTask) {
      setTopicId(selectedTask.topic_id);
      setClassDelivered(selectedTask.class_delivered);
      setActivityPending(selectedTask.activity_pending);
      setObservations(selectedTask.observations);
    } else {
      setTopicId('');
      setClassDelivered(false);
      setActivityPending(false);
      setObservations('');
    }
  }, [selectedTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topicId) return;
    const newTaskData = {
      topic_id: topicId,
      class_delivered: classDelivered,
      activity_pending: activityPending,
      observations: observations,
    };
    onSave(newTaskData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={topicId} onChange={(e) => setTopicId(e.target.value)}>
        <option value="" disabled>
          Select topic
        </option>
        {topics.map((topic) => (
          <option key={topic.id} value={topic.id}>
            {topic.title}
          </option>
        ))}
      </select>
      <label>
        Class Delivered:
        <input
          type="checkbox"
          checked={classDelivered}
          onChange={(e) => setClassDelivered(e.target.checked)}
        />
      </label>
      <label>
        Activity Pending:
        <input
          type="checkbox"
          checked={activityPending}
          onChange={(e) => setActivityPending(e.target.checked)}
        />
      </label>
      <textarea
        placeholder="Enter observations"
        value={observations}
        onChange={(e) => setObservations(e.target.value)}
      />
      <button type="submit">{selectedTask ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
};

TaskForm.propTypes = {
  supabase: PropTypes.object.isRequired,
  selectedTask: PropTypes.object,
  onSave: PropTypes.func.isRequired,
};

export default TaskForm;
