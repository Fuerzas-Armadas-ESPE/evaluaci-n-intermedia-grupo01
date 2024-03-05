// TopicApp.jsx
import React, { useState, useEffect } from 'react';
import TopicForm from './TopicForm';
import TopicTable from './TopicTable';

const TopicApp = ({ supabase }) => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const { data, error } = await supabase.from('topics').select('*');
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

  const handleEdit = (topicId) => {
    const topicToEdit = topics.find((topic) => topic.id === topicId);
    setSelectedTopic(topicToEdit);
  };

  const handleDelete = async (topicId) => {
    try {
      const { error } = await supabase.from('topics').delete().eq('id', topicId);
      if (error) {
        throw error;
      }
      console.log('Topic deleted successfully');
      setTopics((prevTopics) => prevTopics.filter((topic) => topic.id !== topicId));
      setSelectedTopic(null);
    } catch (error) {
      console.error('Error deleting topic:', error.message);
    }
  };

  const handleSave = async (newTopicData) => {
    try {
      if (selectedTopic) {
        const { error } = await supabase.from('topics').update(newTopicData).eq('id', selectedTopic.id);
        if (error) {
          throw error;
        }
        console.log('Topic updated successfully');
      } else {
        const { data, error } = await supabase.from('topics').upsert([newTopicData]);
        if (error) {
          throw error;
        }
        console.log('Topic added successfully:', data);
      }

      const { data, error } = await supabase.from('topics').select('*');
      if (error) {
        throw error;
      }
      setTopics(data || []);
      setSelectedTopic(null);
    } catch (error) {
      console.error('Error saving topic:', error.message);
    }
  };

  return (
    <div>
      <h2>Temas</h2>
      <TopicForm supabase={supabase} selectedTopic={selectedTopic} onSave={handleSave} />
      <TopicTable topics={topics} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default TopicApp;
