// ActivityApp.jsx
import React, { useState, useEffect } from 'react';
import ActivityForm from './ActivityForm';
import ActivityTable from './ActivityTable';

const ActivityApp = ({ supabase }) => {
  const [activities, setActivities] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const { data: activityData, error: activityError } = await supabase.from('activities').select('*');
        if (activityError) {
          throw activityError;
        }
        setActivities(activityData || []);
      } catch (error) {
        console.error('Error fetching activities:', error.message);
      }
    };

    const fetchTopics = async () => {
      try {
        const { data: topicData, error: topicError } = await supabase.from('topics').select('*');
        if (topicError) {
          throw topicError;
        }
        setTopics(topicData || []);
      } catch (error) {
        console.error('Error fetching topics:', error.message);
      }
    };

    fetchActivities();
    fetchTopics();
  }, [supabase]);

  const handleEdit = (activityId) => {
    const activityToEdit = activities.find((activity) => activity.id === activityId);
    setSelectedActivity(activityToEdit);
  };

  const handleDelete = async (activityId) => {
    try {
      const { error } = await supabase.from('activities').delete().eq('id', activityId);
      if (error) {
        throw error;
      }
      console.log('Activity deleted successfully');
      setActivities((prevActivities) => prevActivities.filter((activity) => activity.id !== activityId));
      setSelectedActivity(null);
    } catch (error) {
      console.error('Error deleting activity:', error.message);
    }
  };

  const handleSave = async (newActivityData) => {
    try {
      if (selectedActivity) {
        const { error } = await supabase.from('activities').update(newActivityData).eq('id', selectedActivity.id);
        if (error) {
          throw error;
        }
        console.log('Activity updated successfully');
      } else {
        const { data, error } = await supabase.from('activities').upsert([newActivityData]);
        if (error) {
          throw error;
        }
        console.log('Activity added successfully:', data);
      }

      const { data: updatedActivityData, error: updatedActivityError } = await supabase
        .from('activities')
        .select('*');
      if (updatedActivityError) {
        throw updatedActivityError;
      }
      setActivities(updatedActivityData || []);
      setSelectedActivity(null);
    } catch (error) {
      console.error('Error saving activity:', error.message);
    }
  };

  return (
    <div>
      <h2>Actividades</h2>
      <ActivityForm
        supabase={supabase}
        selectedActivity={selectedActivity}
        topics={topics}
        onSave={handleSave}
      />
      <ActivityTable activities={activities} topics={topics} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default ActivityApp;
