// StudentApp.jsx
import React, { useState, useEffect } from 'react';
import StudentForm from './StudentForm';
import StudentTable from './StudentTable';

const StudentApp = ({ supabase }) => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data, error } = await supabase.from('students').select('*');
        if (error) {
          throw error;
        }
        setStudents(data || []);
      } catch (error) {
        console.error('Error fetching students:', error.message);
      }
    };

    fetchStudents();
  }, [supabase]);

  const handleEdit = (studentId) => {
    const studentToEdit = students.find((student) => student.id === studentId);
    setSelectedStudent(studentToEdit);
  };

  const handleDelete = async (studentId) => {
    try {
      const { error } = await supabase.from('students').delete().eq('id', studentId);
      if (error) {
        throw error;
      }
      console.log('Student deleted successfully');
      setStudents((prevStudents) => prevStudents.filter((student) => student.id !== studentId));
      setSelectedStudent(null);
    } catch (error) {
      console.error('Error deleting student:', error.message);
    }
  };

  const handleSave = async (newStudentData) => {
    try {
      if (selectedStudent) {
        const { error } = await supabase.from('students').update(newStudentData).eq('id', selectedStudent.id);
        if (error) {
          throw error;
        }
        console.log('Student updated successfully');
      } else {
        const { data, error } = await supabase.from('students').upsert([newStudentData]);
        if (error) {
          throw error;
        }
        console.log('Student added successfully:', data);
      }

      const { data, error } = await supabase.from('students').select('*');
      if (error) {
        throw error;
      }
      setStudents(data || []);
      setSelectedStudent(null);
    } catch (error) {
      console.error('Error saving student:', error.message);
    }
  };

  return (
    <div>
      <h2>Estudiantes</h2>
      <StudentForm supabase={supabase} selectedStudent={selectedStudent} onSave={handleSave} />
      <StudentTable students={students} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default StudentApp;
