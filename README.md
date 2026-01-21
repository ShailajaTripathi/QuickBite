# 🍔 QuickBite – Food Ordering Web Application

QuickBite is a production-style food ordering web application built using **React** and **Redux Toolkit**.  
This project is developed step-by-step focusing on **real-world frontend architecture**, **state management**, **performance optimization**, and **user experience**.

The goal of this project is to simulate how a modern food delivery app works while applying industry-standard React practices.

---

## 🚀 Features of the App

### 🏠 Restaurant & Menu Features
- Browse restaurants and menus
- Display **Top-Rated Restaurants**
- Real-time data fetched from live APIs
- Dynamic routing to show restaurant details
- Search restaurants by name
- Lazy loading of routes and components
- Shimmer UI (skeleton screens) while data loads
- Graceful error handling and fallback UI

---

### 🧭 Navigation & Routing
- Routing using **React Router v6**
- Dynamic routes for restaurant pages
- Centralized layout with `<Outlet />`
- Custom Error Page for invalid routes

---

### ⚡ Performance & Optimization
- Lazy Loading for better performance
- Custom hooks for reusable logic
- Optimized state selection using **memoization (Reselect)**
- Prevent unnecessary re-renders using selectors

---

### 🌐 Network & UX Enhancements
- Detect user’s **online / offline status**
- Show appropriate UI when user is offline
- Smooth loading & error states for better UX

---

### 🛒 Cart Functionality
- Add items to cart
- Increase / decrease item quantity
- Automatically remove items when quantity reaches zero
- Cart data persisted using **LocalStorage**
- Confirmation popups before:
  - Deleting an item
  - Clearing the entire cart
- Global cart state management using Redux

---

### 🧠 State Management & Architecture
- Global state handled using **Redux Toolkit**
- Async API handling using **Redux Saga**
- Clean separation of:
  - UI components
  - State logic
  - Side effects
- Lifting State Up where required
- Controlled & Uncontrolled components in menu handling

---

### 🎨 UI & Styling
- Fully responsive UI
- Styled using **Tailwind CSS**
- Reusable UI components
- Higher Order Component (HOC) to label **Pure Veg Restaurants**

---

### 🧩 Advanced React Concepts Used
- Custom Hooks
- Higher Order Components (HOC)
- Context API
- Redux Toolkit
- Redux Saga
- Memoization with Reselect
- Lazy Loading & Code Splitting
- Controlled & Uncontrolled Components
- Error Boundaries (via Router)

---

## 🛠 Tech Stack

- **React 19**
- **Redux Toolkit**
- **Redux Saga**
- **React Router DOM v6**
- **Reselect**
- **Tailwind CSS**
- **SweetAlert2** (confirmation modals)
- **FontAwesome Icons**
- **LocalStorage API**

---

## ⚙️ Installation & Setup

```bash
git clone https://github.com/ShailajaTripathi/QuickBite
cd QuickBite
npm install
npm run start

```
<!-- | Dashboard / Menus | Remove / Delete | -->
<!-- |-------|--------| -->
<!-- |![Dashboard](./src/assets/Screenshot%20(133).png)| ![Menu](./src/assets/Screenshot%20(132).png)| -->
<!-- |![Menu](./src/assets/Screenshot%20(131).png)|![Menu](./src/assets/Screenshot%20(134).png)| -->

<!-- Order by dropdown 
Top Rated Dining
Rate
asending decending

-- remove online

align center home page text -->