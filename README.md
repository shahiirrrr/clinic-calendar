# 🏥 Clinic Appointment Calendar

A modern, responsive frontend application for managing doctor appointments in a clinic or hospital setting. Designed with React, styled using SCSS, and animated with Framer Motion for a smooth user experience.

---

## ✨ Features

- 💻 **Login Page** – Secure staff login with basic credential check
- 📅 **Appointment Calendar View** – Visual monthly calendar with slots
- 🧑‍⚕️ **Doctor & Patient Info** – Static JSON data to simulate clinic environment
- 📝 **Appointment Form** – Book appointments by selecting a doctor, patient, date & time
- 🎨 **Modern UI** – Fully styled using SCSS
- 🎞️ **Smooth Animations** – Built with Framer Motion for interactive transitions

---

## 📁 Project Structure

```
clinic-calendar/
├── public/
│   ├── index.html
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── LoginForm.jsx
│   │   ├── CalendarView.jsx
│   │   ├── AppointmentForm.jsx
│   ├── data/
│   │   ├── doctors.js
│   │   └── patients.js
│   ├── styles/
│   │   ├── main.scss
│   │   ├── _variables.scss
│   │   └── component-specific styles...
│   ├── App.js
│   └── index.js
├── tailwind.config.js (optional if used)
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/shahiirrrr/clinic-calendar.git
cd clinic-calendar
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm start
```

The app will run at: [http://localhost:3000](http://localhost:3000)

---

## 🔐 Login Credentials

Use the following credentials to login:

- **Email**: `staff@clinic.com`
- **Password**: `123456`

---

## 📦 Dependencies

- **React** – Frontend library
- **Framer Motion** – Animations
- **SCSS** – Custom styling
- **Lucide-react** – Icons
- **React-Date Handling** – Built-in JavaScript `Date` objects

---

## 🎯 Future Enhancements (Optional)

- Integration with a backend (Node.js/Express or Firebase)
- Appointment conflict validation
- Search and filter functionality
- Responsive mobile UI improvements

---

## 🧑‍💻 Author

**Shahir P**  
Frontend Developer

---

## 📄 License

This project is licensed under the MIT License.