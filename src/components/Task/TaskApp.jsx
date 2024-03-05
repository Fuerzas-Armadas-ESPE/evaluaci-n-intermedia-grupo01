// TaskApp.jsx
import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskTable from './TaskTable';

const TaskApp = ({ supabase }) => {
  const [tasks, setTasks] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data: taskData, error: taskError } = await supabase.from('tasks').select('*');
        if (taskError) {
          throw taskError;
        }
        setTasks(taskData || []);
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
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

    fetchTasks();
    fetchTopics();
  }, [supabase]);

  const handleEdit = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setSelectedTask(taskToEdit);
  };

  const handleDelete = async (taskId) => {
    try {
      const { error } = await supabase.from('tasks').delete().eq('id', taskId);
      if (error) {
        throw error;
      }
      console.log('Task deleted successfully');
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      setSelectedTask(null);
    } catch (error) {
      console.error('Error deleting task:', error.message);
    }
  };

  const handleSave = async (newTaskData) => {
    try {
      if (selectedTask) {
        const { error } = await supabase.from('tasks').update(newTaskData).eq('id', selectedTask.id);
        if (error) {
          throw error;
        }
        console.log('Task updated successfully');
      } else {
        const { data, error } = await supabase.from('tasks').upsert([newTaskData]);
        if (error) {
          throw error;
        }
        console.log('Task added successfully:', data);
      }

      const { data: updatedTaskData, error: updatedTaskError } = await supabase.from('tasks').select('*');
      if (updatedTaskError) {
        throw updatedTaskError;
      }
      setTasks(updatedTaskData || []);
      setSelectedTask(null);
    } catch (error) {
      console.error('Error saving task:', error.message);
    }
  };

  return (
    <div>
      <h2>Tareas</h2>
      <TaskForm supabase={supabase} selectedTask={selectedTask} topics={topics} onSave={handleSave} />
      <TaskTable tasks={tasks} topics={topics} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default TaskApp;
