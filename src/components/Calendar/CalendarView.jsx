import React from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * CalendarView Component
 * -----------------------
 * Displays a monthly grid or daily list (on mobile) of appointments.
 * Allows adding, editing, and deleting appointments.
 */
export default function CalendarView({
  currentDate,
  setCurrentDate,
  appointments,
  setSelectedDate,
  setShowForm,
  setEditingAppointment,
  setAppointments,
  isMobile
}) {
  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // Start the calendar on Sunday
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  const days = [];
  const currentDateObj = new Date(startDate);

  // Prepare 6 weeks (42 days) of view
  for (let i = 0; i < 42; i++) {
    const dateStr = currentDateObj.toISOString().split('T')[0];
    const dayAppointments = appointments.filter(apt => apt.date === dateStr);

    days.push({
      date: new Date(currentDateObj),
      appointments: dayAppointments,
      isCurrentMonth: currentDateObj.getMonth() === month,
      isToday: currentDateObj.toDateString() === today.toDateString()
    });

    currentDateObj.setDate(currentDateObj.getDate() + 1);
  }

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setEditingAppointment(null);
    setShowForm(true);
  };

  const handleEditAppointment = (appointment) => {
    setEditingAppointment(appointment);
    setShowForm(true);
  };

  const handleDeleteAppointment = (id) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== id));
  };

  // -------------------
  // 📱 Mobile View
  // -------------------
  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4"
      >
        <div className="mb-4">
          <input
            type="date"
            value={currentDate.toISOString().split('T')[0]}
            onChange={(e) => setCurrentDate(new Date(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="space-y-4">
          {days
            .filter(day => day.isCurrentMonth)
            .map((day, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.01 }}
                className={`p-4 rounded-xl border transition ${
                  day.isToday
                    ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700'
                    : 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700'
                }`}
              >
                {/* Day Title */}
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {day.date.toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </h3>
                  <button
                    onClick={() => handleDateClick(day.date)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                {/* Appointments */}
                <div className="space-y-2">
                  {day.appointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {apt.patientName}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {apt.time} • {apt.doctorName}
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleEditAppointment(apt)}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteAppointment(apt.id)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {day.appointments.length === 0 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      No appointments
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>
    );
  }

  // -------------------
  // 💻 Desktop View
  // -------------------
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      {/* Weekday Header */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="text-center font-semibold text-gray-700 dark:text-gray-300 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.01 }}
            className={`min-h-32 p-2 border rounded-lg cursor-pointer transition-colors ${
              day.isCurrentMonth
                ? day.isToday
                  ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700'
                  : 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                : 'bg-gray-50 border-gray-100 dark:bg-gray-900 dark:border-gray-800'
            }`}
            onClick={() => day.isCurrentMonth && handleDateClick(day.date)}
          >
            <div
              className={`text-sm font-medium mb-1 ${
                day.isCurrentMonth
                  ? day.isToday
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-900 dark:text-white'
                  : 'text-gray-400 dark:text-gray-600'
              }`}
            >
              {day.date.getDate()}
            </div>

            {/* Show top 3 appointments */}
            <div className="space-y-1">
              {day.appointments.slice(0, 3).map((apt) => (
                <div
                  key={apt.id}
                  className="text-xs p-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded truncate"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditAppointment(apt);
                  }}
                >
                  {apt.time} {apt.patientName}
                </div>
              ))}
              {day.appointments.length > 3 && (
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  +{day.appointments.length - 3} more
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
