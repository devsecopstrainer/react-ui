import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import './style.css';

const COURSE_API = import.meta.env.VITE_COURSE_API || '/api/courses';
const STUDENT_API = import.meta.env.VITE_STUDENT_API || '/api/students';

/* ─── Static fallback data (shown when API is unreachable) ─── */
const DEMO_COURSES = [
  { id: 1, courseName: 'AWS Cloud Training', description: 'Become an AWS Cloud Expert with hands-on labs and real-world projects.', duration: '40 Hours', logo: '☁️', rating: '4.8', reviews: '320' },
  { id: 2, courseName: 'DevOps with Kubernetes', description: 'Master DevOps & K8s from Scratch with CI/CD pipelines and container orchestration.', duration: '45 Hours', logo: '⚙️', rating: '4.9', reviews: '280' },
  { id: 3, courseName: 'Jenkins CI/CD', description: 'Implement CI/CD Pipelines and automate your software delivery lifecycle.', duration: '20 Hours', logo: '🔧', rating: '4.7', reviews: '210' },
  { id: 4, courseName: 'Docker & Containers', description: 'Learn Containerization with Docker from basics to production deployments.', duration: '20 Hours', logo: '🐳', rating: '4.8', reviews: '190' },
  { id: 5, courseName: 'Terraform (IaC)', description: 'Infrastructure as Code with Terraform — provision cloud resources at scale.', duration: '25 Hours', logo: '🏗️', rating: '4.7', reviews: '160' },
  { id: 6, courseName: 'Microsoft Azure', description: 'Build & Manage Cloud Solutions on Azure with enterprise-grade security.', duration: '35 Hours', logo: '🌐', rating: '4.8', reviews: '180' },
];

const DEMO_STUDENTS = [
  { id: 1, name: 'Priya Mohanty',    email: 'priya.mohanty@example.com',    courseId: 2 },
  { id: 2, name: 'Rahul Patel',      email: 'rahul.patel@example.com',      courseId: 1 },
  { id: 3, name: 'Sneha Das',        email: 'sneha.das@example.com',        courseId: 3 },
  { id: 4, name: 'Amit Kumar',       email: 'amit.kumar@example.com',       courseId: 5 },
];

const FEATURES = [
  { icon: '👨‍🏫', bg: '#eff6ff', title: 'Expert Trainers',     desc: '10+ Years Industry Experience' },
  { icon: '💼', bg: '#fff7ed', title: 'Live Projects',        desc: 'Real-time Scenarios & Hands-on' },
  { icon: '🏆', bg: '#f0fdf4', title: 'Certification',        desc: 'Globally Recognized Certificates' },
  { icon: '🎯', bg: '#fdf4ff', title: 'Placement Support',    desc: 'Resume, Interview & Job Assistance' },
  { icon: '📅', bg: '#eff6ff', title: 'Flexible Learning',    desc: 'Online & Offline Batches' },
  { icon: '🎧', bg: '#fff7ed', title: '24/7 Support',         desc: 'Always here to help you' },
];

const STATS = [
  { icon: '👥', number: '5000+',  label: 'Students Trained' },
  { icon: '📚', number: '30+',    label: 'Courses' },
  { icon: '💼', number: '100+',   label: 'Projects Delivered' },
  { icon: '📈', number: '95%',    label: 'Placement Rate' },
  { icon: '🏅', number: '10+',    label: 'Years of Excellence' },
  { icon: '🎧', number: '24/7',   label: 'Support' },
];

/* ─── Helpers ─── */
function normalizeArray(data) {
  if (Array.isArray(data))          return data;
  if (Array.isArray(data?.data))    return data.data;
  if (Array.isArray(data?.content)) return data.content;
  if (Array.isArray(data?.items))   return data.items;
  return [];
}

function StarRating({ rating }) {
  return (
    <span className="course-rating">
      <span className="star">★</span> {rating}
    </span>
  );
}

/* ─── Main App ─── */
function App() {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [apiStatus, setApiStatus] = useState('Loading...');
  const [usingDemo, setUsingDemo] = useState(false);

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    try {
      const [courseRes, studentRes] = await Promise.all([
        axios.get(COURSE_API),
        axios.get(STUDENT_API),
      ]);
      const c = normalizeArray(courseRes.data);
      const s = normalizeArray(studentRes.data);
      setCourses(c.length ? c : DEMO_COURSES);
      setStudents(s.length ? s : DEMO_STUDENTS);
      setUsingDemo(!c.length);
      setApiStatus(c.length ? '✅ Connected to Spring Boot APIs' : '⚠️ API returned empty — showing demo data');
    } catch {
      setCourses(DEMO_COURSES);
      setStudents(DEMO_STUDENTS);
      setUsingDemo(true);
      setApiStatus('⚠️ API not reachable — showing demo data. Check Spring Boot / NGINX / K8s ingress.');
    }
  }

  const displayCourses  = courses.length  ? courses  : DEMO_COURSES;
  const displayStudents = students.length ? students : DEMO_STUDENTS;

  return (
    <>
      {/* ── TOP BAR ── */}
      <div className="topbar">
        <div className="topbar-left">
          <a href="tel:+917396009227">📞 +91 7396009227</a>
          <a href="mailto:info@idreamitsolution.in">✉️ info@idreamitsolution.in</a>
        </div>
        <div className="topbar-right">
          <a href="#" className="social-icon" title="LinkedIn">in</a>
          <a href="#" className="social-icon" title="YouTube">▶</a>
          <a href="#" className="social-icon" title="GitHub">GH</a>
          <a href="#" className="social-icon" title="Instagram">IG</a>
        </div>
      </div>

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <a href="#" className="logo">
          <div className="logo-icon">☁️</div>
          <div className="logo-text">
            <div className="brand">IDream</div>
            <div className="sub">IT Solution</div>
          </div>
        </a>
        <div className="nav-menu">
          <a href="#" className="active">Home</a>
          <a href="#">Courses <span className="chevron">▼</span></a>
          <a href="#">Services <span className="chevron">▼</span></a>
          <a href="#">About Us</a>
          <a href="#">Blog</a>
          <a href="#">Placements</a>
          <a href="#">Contact</a>
        </div>
        <div className="nav-actions">
          <div className="nav-search">🔍</div>
          <button className="btn-login">Login</button>
          <button className="btn-register">Register</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-left">
            <div className="hero-badge">
              <span className="dot"></span>
              #1 Cloud & DevOps Training Institute in Odisha
            </div>
            <h1>
              Build Your <span className="highlight">Cloud & DevOps</span> Career
            </h1>
            <p className="hero-desc">
              Industry-focused training, real-time projects and hands-on experience by{' '}
              <span className="brand-link">IDream IT Solution.</span>
            </p>
            <div className="hero-actions">
              <button className="btn-primary">📚 Explore Courses</button>
              <button className="btn-outline">💼 View Services</button>
            </div>
            <div className="hero-tags">
              <span className="hero-tag">🚀 100% Practical</span>
              <span className="hero-tag">⚡ Real-time Projects</span>
              <span className="hero-tag">👤 Industry Experts</span>
              <span className="hero-tag">🏆 Placement Support</span>
            </div>
          </div>

          {/* Tech cloud visual */}
          <div className="hero-right">
            <div className="tech-cloud">
              <div className="cloud-core">
                <div className="cloud-core-inner">
                  <span className="cloud-emoji">☁️</span>
                  <div className="cloud-brand">IDream</div>
                  <div className="cloud-sub">IT Solution</div>
                </div>
              </div>
              <div className="tech-orbit">
                <div className="tech-icon aws"   title="AWS">☁️</div>
                <div className="tech-icon k8s"   title="Kubernetes">⚙️</div>
                <div className="tech-icon docker" title="Docker">🐳</div>
                <div className="tech-icon jenkins"title="Jenkins">🔧</div>
                <div className="tech-icon gitlab" title="GitLab">🦊</div>
                <div className="tech-icon tf"     title="Terraform">🏗️</div>
                <div className="tech-icon azure"  title="Azure">🌐</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES STRIP ── */}
      <div className="features-strip">
        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <div className="feature-item" key={i}>
              <div className="feature-icon-wrap" style={{ background: f.bg }}>
                {f.icon}
              </div>
              <div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <main>
        {/* API status */}
        <div className="api-status">{apiStatus}</div>

        {/* Popular Courses */}
        <div className="section">
          <div className="section-header">
            <div>
              <h2>Popular Courses</h2>
            </div>
            <a href="#" className="view-all">View All Courses →</a>
          </div>
          <div className="courses-grid">
            {displayCourses.map((course) => (
              <div className="course-card" key={course.id}>
                <div className="course-logo">{course.logo || '📖'}</div>
                <h3>{course.courseName || course.name || 'Course Name'}</h3>
                <p>{course.description || 'No description available.'}</p>
                <div className="course-meta">
                  <span className="course-hours">⏱ {course.duration || 'N/A'}</span>
                  <StarRating rating={course.rating || '4.5'} />
                </div>
                <button className="btn-enroll">Enroll Now</button>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ── STATS BAR ── */}
      <div className="stats-bar">
        {STATS.map((s, i) => (
          <div className="stat-item" key={i}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-number">{s.number}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── RECENT ENROLLMENTS ── */}
      <main>
        <div className="section">
          <div className="section-header">
            <div><h2>Recent Enrollments</h2></div>
          </div>
          {displayStudents.length > 0 ? (
            <div className="students-grid">
              {displayStudents.map((student) => (
                <div className="student-card" key={student.id}>
                  <h3>{student.name || student.studentName || 'Student Name'}</h3>
                  <p>{student.email || 'No email available'}</p>
                  <span className="student-badge">Course ID: {student.courseId || 'N/A'}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">No enrollments found.</div>
          )}
        </div>
      </main>

      {/* ── NEWSLETTER ── */}
      <div className="newsletter">
        <div>
          <h3>Stay Updated</h3>
          <p>Subscribe to get latest updates on courses & offers</p>
        </div>
        <div className="newsletter-form">
          <input type="email" placeholder="Enter your email" />
          <button type="button">Subscribe</button>
        </div>
        <div className="newsletter-badges">
          <div className="nl-badge"><span className="nl-badge-icon">🏅</span> Best Training</div>
          <div className="nl-badge"><span className="nl-badge-icon">⚡</span> Real-time Projects</div>
          <div className="nl-badge"><span className="nl-badge-icon">🎯</span> Job Assistance</div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer>
        © {new Date().getFullYear()} IDream IT Solution, Bhubaneswar, Odisha. All rights reserved.
      </footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
