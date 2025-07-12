import React, { useState, useEffect } from 'react';
import LoginForm from './components/Auth/LoginForm';
import Header from './components/Layout/Header';
import CalendarView from './components/Calendar/CalendarView';
import AppointmentForm from './components/Calendar/AppointmentForm';

/**
 * App Component - Main container for the clinic calendar app.
 * Handles login, layout, state persistence, and view logic.
 */
export default function App() {
  // Authentication
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Date States
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Appointment Logic
  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);

  // UI Preferences
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Load appointments from localStorage on mount
  useEffect(() => {
    const savedAppointments = localStorage.getItem('clinic-appointments');
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    }
  }, []);

  // Save appointments to localStorage on update
  useEffect(() => {
    localStorage.setItem('clinic-appointments', JSON.stringify(appointments));
  }, [appointments]);

  // Listen for screen resizing and update mobile state
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Apply or remove dark mode on the HTML element
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Change calendar month forward or backward
  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  // If user is not logged in, show login form
  if (!isLoggedIn) {
    return <LoginForm onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header Navigation */}
      <Header
        isMobile={isMobile}
        currentDate={currentDate}
        navigateMonth={navigateMonth}
        setShowForm={setShowForm}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Calendar View */}
      <main>
        <CalendarView
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          appointments={appointments}
          setSelectedDate={setSelectedDate}
          setShowForm={setShowForm}
          setEditingAppointment={setEditingAppointment}
          setAppointments={setAppointments}
          isMobile={isMobile}
        />
      </main>

      {/* Appointment Modal Form */}
      {showForm && (
        <AppointmentForm
          appointment={editingAppointment}
          onSave={() => {
            setShowForm(false);
            setEditingAppointment(null);
          }}
          onCancel={() => {
            setShowForm(false);
            setEditingAppointment(null);
          }}
          selectedDate={selectedDate}
          setAppointments={setAppointments}
        />
      )}
    </div>
  );
}