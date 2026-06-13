import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import './style.css';

const COURSE_API = import.meta.env.VITE_COURSE_API || '/api/courses';
const STUDENT_API = import.meta.env.VITE_STUDENT_API || '/api/students';

function App() {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [status, setStatus] = useState('Loading demo data...');

  useEffect(() => {
    loadData();
  }, []);

  // This function protects React from API responses like:
  // [], { data: [] }, { content: [] }, { message: "error" }, etc.
  function normalizeArray(responseData) {
    if (Array.isArray(responseData)) {
      return responseData;
    }

    if (Array.isArray(responseData?.data)) {
      return responseData.data;
    }

    if (Array.isArray(responseData?.content)) {
      return responseData.content;
    }

    if (Array.isArray(responseData?.items)) {
      return responseData.items;
    }

    return [];
  }

  async function loadData() {
    try {
      const [courseResponse, studentResponse] = await Promise.all([
        axios.get(COURSE_API),
        axios.get(STUDENT_API),
      ]);

      console.log('Courses API Response:', courseResponse.data);
      console.log('Students API Response:', studentResponse.data);

      setCourses(normalizeArray(courseResponse.data));
      setStudents(normalizeArray(studentResponse.data));
      setStatus('Connected to Spring Boot APIs');
    } catch (error) {
      console.error('API Error:', error);
      setCourses([]);
      setStudents([]);
      setStatus('API not reachable. Check Spring Boot services, CORS, service URL, or Kubernetes ingress.');
    }
  }

  return (
    <>
      <header className="hero">
        <div className="heroContent">
          <h1>IDream IT Solution</h1>
          <p>
            Enter to learn, Exit to earn.
          </p>
        </div>
      </header>

      <main>

        <section>
          <h2>Popular Courses</h2>
          <div className="grid">
            {courses.length > 0 ? (
              courses.map((course) => (
                <div className="course-card" key={course.id}>
                  <h3>{course.courseName || course.name || 'Course Name'}</h3>
                  <p>{course.description || 'No description available'}</p>
                  <b>Duration: {course.duration || 'N/A'}</b>
                </div>
              ))
            ) : (
              <p>No courses found</p>
            )}
          </div>
        </section>

        <section>
          <h2>Recent Enrollments</h2>
          <div className="grid">
            {students.length > 0 ? (
              students.map((student) => (
                <div className="card student" key={student.id}>
                  <h3>{student.name || student.studentName || 'Student Name'}</h3>
                  <p>{student.email || 'No email available'}</p>
                  <b>Course ID: {student.courseId || 'N/A'}</b>
                </div>
              ))
            ) : (
              <p>No students found</p>
            )}
          </div>
        </section>
      </main>

      <footer>© IDream IT Solution</footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
