// GradeApp.jsx
import React, { useState, useEffect } from 'react';
import GradeForm from './GradeForm';
import GradeTable from './GradeTable';

const GradeApp = ({ supabase }) => {
  const [grades, setGrades] = useState([]);
  const [activities, setActivities] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState(null);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const { data: gradeData, error: gradeError } = await supabase.from('grades').select('*');
        if (gradeError) {
          throw gradeError;
        }
        setGrades(gradeData || []);
      } catch (error) {
        console.error('Error fetching grades:', error.message);
      }
    };

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

    const fetchStudents = async () => {
      try {
        const { data: studentData, error: studentError } = await supabase.from('students').select('*');
        if (studentError) {
          throw studentError;
        }
        setStudents(studentData || []);
      } catch (error) {
        console.error('Error fetching students:', error.message);
      }
    };

    fetchGrades();
    fetchActivities();
    fetchStudents();
  }, [supabase]);

  const handleEdit = (gradeId) => {
    const gradeToEdit = grades.find((grade) => grade.id === gradeId);
    setSelectedGrade(gradeToEdit);
  };

  const handleDelete = async (gradeId) => {
    try {
      const { error } = await supabase.from('grades').delete().eq('id', gradeId);
      if (error) {
        throw error;
      }
      console.log('Grade deleted successfully');
      setGrades((prevGrades) => prevGrades.filter((grade) => grade.id !== gradeId));
      setSelectedGrade(null);
    } catch (error) {
      console.error('Error deleting grade:', error.message);
    }
  };

  const handleSave = async (newGradeData) => {
    try {
      if (selectedGrade) {
        const { error } = await supabase.from('grades').update(newGradeData).eq('id', selectedGrade.id);
        if (error) {
          throw error;
        }
        console.log('Grade updated successfully');
      } else {
        const { data, error } = await supabase.from('grades').upsert([newGradeData]);
        if (error) {
          throw error;
        }
        console.log('Grade added successfully:', data);
      }

      const { data: updatedGradeData, error: updatedGradeError } = await supabase.from('grades').select('*');
      if (updatedGradeError) {
        throw updatedGradeError;
      }
      setGrades(updatedGradeData || []);
      setSelectedGrade(null);
    } catch (error) {
      console.error('Error saving grade:', error.message);
    }
  };

  return (
    <div>
      <h2>Calificaciones</h2>
      <GradeForm
        supabase={supabase}
        selectedGrade={selectedGrade}
        activities={activities}
        students={students}
        onSave={handleSave}
      />
      <GradeTable grades={grades} activities={activities} students={students} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default GradeApp;
