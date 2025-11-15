# Calendar React App

A modern and minimal calendar application built with **React**, featuring event management, authentication structure (placeholder), date handling, and a clean UI. This project is designed to be easily extendable and integrates several powerful libraries to enhance the user experience.

---

## 🚀 Features

- **Interactive Calendar View** using `react-big-calendar`.
- \*\*Event creation, editing, and deletion`.
- **Date selection UI** powered by `react-datepicker`.
- **Modals** for event management using `react-modal`.
- **Global state management** with Redux Toolkit.
- **Routing system** using React Router DOM.
- **User-friendly alerts** with SweetAlert2.
- **Utility functions for date handling** using `date-fns`.
- **Optimized build and fast development environment** with Vite.

---

## 🛠️ Technologies Used

This project uses a modern and efficient stack focused on performance, state management, routing, and an intuitive user interface:

### **Frontend Framework**

- **React 19** for building dynamic UI components.
- **React DOM** for browser rendering.

### **Calendar & Date Tools**

- **react-big-calendar** for the main calendar view.
- **react-datepicker** for selecting dates.
- **date-fns** for fast and lightweight date utilities.

### **State Management**

- **Redux Toolkit** and **React Redux** for global state handling.

### **Routing**

- **React Router DOM** for navigation and protected routes.

### **UI & User Interaction**

- **React Modal** for event dialogs.
- **SweetAlert2** for elegant alerts and confirmations.

### **Networking**

- **Axios** for handling API requests.

### **Build & Development**

- **Vite** for lightning‑fast builds and development.
- **ESLint** & plugins for consistent, clean code.

---

## 📂 Project Structure

```
src/
├── api/            # API utilities and axios config
├── assets/         # Images, icons, and static files
├── auth/           # Authentication-related components
├── calendar/       # Calendar pages and components
├── helpers/        # General utility functions
├── hooks/          # Custom React hooks
├── router/         # Application router
├── store/          # Redux store configuration
├── CalendarApp.jsx # Root application component
├── main.jsx        # App entry point
├── styles.css      # Global styles
```

---

## 📦 Installation

```bash
git clone https://github.com/The-Lup/calendar-react.git
cd calendar-react
npm install
```

---

## ▶️ Run the App

```bash
npm run dev
```

This starts a local development server using Vite.

---

## 🏗️ Build for Production

```bash
npm run build
```

The output will be generated in the `dist/` folder.

---

## 💡 Notes

- The project is structured to support backend integration (e.g., authentication, event persistence) at a later stage.
- Redux Toolkit is used as the main state management system for scalability.
- Vite ensures fast HMR and an optimized final build.

---

## 📜 License

This project is licensed under the MIT License.

---

## 👤 Author

**Lu P.**

Feel free to contribute or open issues to improve the project!
