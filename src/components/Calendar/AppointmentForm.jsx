import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { patients } from '../../data/patients';
import { doctors } from '../../data/doctors';

/**
 * AppointmentForm Component
 * --------------------------
 * Modal form for creating or editing an appointment.
 * Props:
 * - appointment (object or null)
 * - onSave (callback after save)
 * - onCancel (callback when canceled)
 * - selectedDate (Date object)
 * - setAppointments (state updater)
 */
export default function AppointmentForm({
  appointment,
  onSave,
  onCancel,
  selectedDate,
  setAppointments
}) {
  const [formData, setFormData] = useState({
    patientId: appointment?.patientId || '',
    doctorId: appointment?.doctorId || '',
    date: appointment?.date || (selectedDate ? selectedDate.toISOString().split('T')[0] : ''),
    time: appointment?.time || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.patientId && formData.doctorId && formData.date && formData.time) {
      const newAppointment = {
        id: appointment?.id || Date.now(),
        ...formData,
        patientName: patients.find(p => p.id === parseInt(formData.patientId))?.name,
        doctorName: doctors.find(d => d.id === parseInt(formData.doctorId))?.name
      };

      setAppointments(prev =>
        appointment
          ? prev.map(apt => (apt.id === appointment.id ? newAppointment : apt))
          : [...prev, newAppointment]
      );

      onSave();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-lg"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            {appointment ? 'Edit Appointment' : 'New Appointment'}
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Patient Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Patient
              </label>
              <select
                value={formData.patientId}
                onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              >
                <option value="">Select Patient</option>
                {patients.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Doctor Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Doctor
              </label>
              <select
                value={formData.doctorId}
                onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              >
                <option value="">Select Doctor</option>
                {doctors.map(d => (
                  <option key={d.id} value={d.id}>{d.name} - {d.specialty}</option>
                ))}
              </select>
            </div>

            {/* Date Picker */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            {/* Time Picker */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Time
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.02 }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                {appointment ? 'Update' : 'Create'}
              </motion.button>

              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.02 }}
                onClick={onCancel}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Cancel
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}