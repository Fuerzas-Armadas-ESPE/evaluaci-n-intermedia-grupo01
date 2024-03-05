// TeacherApp.jsx
import React, { useState, useEffect } from 'react';
import TeacherForm from './TeacherForm';
import TeacherTable from './TeacherTable';

const TeacherApp = ({ supabase }) => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const { data, error } = await supabase.from('teachers').select('*');
        if (error) {
          throw error;
        }
        setTeachers(data || []);
      } catch (error) {
        console.error('Error fetching teachers:', error.message);
      }
    };

    fetchTeachers();
  }, [supabase]);

  const handleEdit = (teacherId) => {
    const teacherToEdit = teachers.find((teacher) => teacher.id === teacherId);
    setSelectedTeacher(teacherToEdit);
  };

  const handleDelete = async (teacherId) => {
    try {
      const { error } = await supabase.from('teachers').delete().eq('id', teacherId);
      if (error) {
        throw error;
      }
      console.log('Teacher deleted successfully');
      setTeachers((prevTeachers) => prevTeachers.filter((teacher) => teacher.id !== teacherId));
      setSelectedTeacher(null);
    } catch (error) {
      console.error('Error deleting teacher:', error.message);
    }
  };

  const handleSave = async (newTeacherData) => {
    try {
      if (selectedTeacher) {
        const { error } = await supabase.from('teachers').update(newTeacherData).eq('id', selectedTeacher.id);
        if (error) {
          throw error;
        }
        console.log('Teacher updated successfully');
      } else {
        const { data, error } = await supabase.from('teachers').upsert([newTeacherData]);
        if (error) {
          throw error;
        }
        console.log('Teacher added successfully:', data);
      }

      const { data, error } = await supabase.from('teachers').select('*');
      if (error) {
        throw error;
      }
      setTeachers(data || []);
      setSelectedTeacher(null);
    } catch (error) {
      console.error('Error saving teacher:', error.message);
    }
  };

  return (
    <div>
      <h2>Profesores</h2>
      <TeacherForm supabase={supabase} selectedTeacher={selectedTeacher} onSave={handleSave} />
      <TeacherTable teachers={teachers} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default TeacherApp;
