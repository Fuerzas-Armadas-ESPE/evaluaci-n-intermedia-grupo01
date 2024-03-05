// GradeForm.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const GradeForm = ({ supabase, selectedGrade, onSave }) => {
  const [activityOptions, setActivityOptions] = useState([]);
  const [studentOptions, setStudentOptions] = useState([]);
  const [activityId, setActivityId] = useState('');
  const [studentId, setStudentId] = useState('');
  const [grade, setGrade] = useState('');

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // Fetch activity options
        const { data: activityData, error: activityError } = await supabase.from('activities').select('id, description');
        if (activityError) {
          throw activityError;
        }
        setActivityOptions(activityData || []);

        // Fetch student options
        const { data: studentData, error: studentError } = await supabase.from('students').select('id, name');
        if (studentError) {
          throw studentError;
        }
        setStudentOptions(studentData || []);
      } catch (error) {
        console.error('Error fetching options:', error.message);
      }
    };

    fetchOptions();
  }, [supabase]);

  useEffect(() => {
    if (selectedGrade) {
      setActivityId(selectedGrade.activity_id);
      setStudentId(selectedGrade.student_id);
      setGrade(selectedGrade.grade);
    } else {
      setActivityId('');
      setStudentId('');
      setGrade('');
    }
  }, [selectedGrade]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!activityId.trim() || !studentId.trim() || !grade.trim()) return;
    const newGradeData = {
      activity_id: activityId.trim(),
      student_id: studentId.trim(),
      grade: parseFloat(grade.trim()), // Assuming grade is a float
    };
    onSave(newGradeData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Actividad:
        <select value={activityId} onChange={(e) => setActivityId(e.target.value)}>
          <option value="" disabled>
            Seleccione una actividad
          </option>
          {activityOptions.map((activity) => (
            <option key={activity.id} value={activity.id}>
              {activity.description}
            </option>
          ))}
        </select>
      </label>
      <label>
        Estudiante:
        <select value={studentId} onChange={(e) => setStudentId(e.target.value)}>
          <option value="" disabled>
            Seleccione un estudiante
          </option>
          {studentOptions.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Calificación:
        <input
          type="text"
          placeholder="Ingrese la calificación"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
      </label>
      <button type="submit">{selectedGrade ? 'Actualizar Calificación' : 'Agregar Calificación'}</button>
    </form>
  );
};

GradeForm.propTypes = {
  supabase: PropTypes.object.isRequired,
  selectedGrade: PropTypes.object,
  onSave: PropTypes.func.isRequired,
};

export default GradeForm;
