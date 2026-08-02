# 🍽️ Party Menu Application

> A high-performance, responsive food discovery web application built with **React 19**, **React Router v7**, **Tailwind CSS v4**, and **Vite**. Features secure JWT authentication, structured search & multi-criteria filtering, custom animated dropdown selectors, rich dish detail views, and client-side recipe persistence with zero unnecessary re-renders.

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![React Router](https://img.shields.io/badge/React_Router-v7-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-v8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

---

## 🌐 Live Links & Repository

- 🚀 **Live Demo (Vercel):** [https://food-menu-omega-six.vercel.app/](https://food-menu-omega-six.vercel.app/) *(or your deployed Vercel URL)*
- 📦 **GitHub Repository:** [https://github.com/suryavamsi1729/food_menu.git](https://github.com/suryavamsi1729/food_menu.git)

---

## 📑 Table of Contents

1. [What We Are Creating in This Project](#1-what-we-are-creating-in-this-project)
2. [Key Features](#2-key-features)
3. [UI Enhancement: Custom Structured Dropdown System](#3-ui-enhancement-custom-structured-dropdown-system)
4. [Tech Stack & Architecture](#4-tech-stack--architecture)
5. [Performance & Re-render Optimization Techniques](#5-performance--re-render-optimization-techniques)
6. [Folder Structure](#6-folder-structure)
7. [Setup & Installation Guide](#7-setup--installation-guide)
8. [Test Credentials & API Specification](#8-test-credentials--api-specification)
9. [Deployment (Vercel Configuration)](#9-deployment-vercel-configuration)
10. [Contributor](#10-contributor)

---

## 1. What We Are Creating in This Project

The **Party Menu Application** is a specialized food discovery and curation platform built from scratch. It enables event planners, hosts, and food enthusiasts to seamlessly explore, filter, inspect, and bookmark dishes for parties and gatherings.

### Core Objectives
- **Secure Authentication Flow**: Authenticate users against a live JWT-based authentication service with client-side token management.
- **Protected Exploration Area**: Restrict the core menu dashboard to authenticated users via route guards while keeping shared dish detail pages and saved collections publicly accessible.
- **Intelligent Dish Discovery**: Allow users to browse a curated party menu with real-time multi-dimensional filtering (Category, Dietary Preference, Search Query).
- **Persistent Recipe Bookmarking**: Enable users to save favorite recipes to local storage and manage their saved collection across sessions.
- **Modern Luxury Aesthetics**: Deliver a visually stunning, responsive dark-mode interface powered by custom design tokens, fluid micro-interactions, and refined typography.

### Application Flow

```
[ Unauthenticated User ]
          │
          ▼
   ┌───────────────┐        Invalid Credentials
   │  /signin Page │ ────────────────────────────────┐
   └───────┬───────┘                                 │
           │ Successful Login (JWT Token)            ▼
           ▼                               ┌───────────────────┐
   ┌───────────────┐                       │ Show Error Banner │
   │ Protected /   │                       └───────────────────┘
   │  (Menu Page)  │ ◄─────── Logged In ─────┐
   └───┬───────┬───┘                         │
       │       │                             │
       │       └───────────► ┌────────────────────────┐
       │                     │ /saved-recipes Page    │
       ▼                     │ (Persistent Bookmarks) │
┌──────────────────┐         └────────────────────────┘
│ /menu/:id Page   │
│ (Dish & Details) │
└──────────────────┘
```

---

## 2. Key Features

### 🔐 Authentication & Protected Routing
- **Live API Integration**: Secure POST login endpoint integration via `axios` with global error handling.
- **Form Validation with Zod & React Hook Form**: Type-safe schema validation providing instant client-side feedback on malformed emails or short passwords.
- **Interactive Password Visibility Toggle**: Custom hook `usePasswordToggle` providing an accessible eye icon to toggle password masking.
- **Protected Route Guard (`ProtectedRoute.jsx`)**: Automatically inspects authentication state; redirects unauthenticated visitors to `/signin` with smooth return transitions.
- **Seamless Logout**: Completely cleans up `localStorage` tokens and user state before navigating back to login.

### 🔍 Advanced Multi-Criteria Search & Filtering
- **Keyword Search**: Instant dish name search with case-insensitive matching.
- **Dynamic Category Filter**: Filter by *All*, *Starter*, *Main*, *Sides*, and *Dessert*.
- **Dietary Filter**: Filter by *All*, *Veg* (green badge with leaf indicator), and *Non-Veg* (red badge).
- **Interactive Counters**: Displays live matching item count (e.g., `"50 items found"`).
- **Empty State Fallback**: Displays an intuitive placeholder graphic and clear reset suggestions when no dishes match search criteria.

### 📖 Dish Detail Page (`/menu/:id`)
- **Hero Image Presentation**: High-resolution image card with dietary status and category pill.
- **Party Servings Indicator**: Clearly indicates recommended party group sizing (e.g., `For 2 people`).
- **Full Culinary Descriptions**: Extended recipe background and serving notes.
- **Structured Ingredients Breakdown**: Clean, organized component displaying ingredient names alongside precise measurements.
- **One-Click Bookmark Toggle**: Dynamic action button switching seamlessly between `Save Recipe` and `Saved` (with green checkmark).

### 🔖 Saved Recipes Collection (`/saved-recipes`)
- **Persistent Storage**: Retains bookmarked recipes in `localStorage` under `party_menu_saved_recipes`.
- **Live Badge Counters**: Navigation bar displays real-time saved recipe count badges across all views.
- **Individual Deletion**: Dedicated `Delete Recipe` button on each saved recipe card with `stopPropagation()` preventing accidental navigation.
- **Dedicated Empty State**: Prompts users to return to the menu when their saved list is empty.

### 🚫 Custom 404 Not Found Page
- Catches all invalid routes (`*`) and provides smart dynamic navigation back to the Menu (if logged in) or the Sign-In screen.

---

## 3. UI Enhancement: Custom Structured Dropdown System

### The Problem with Basic Chips
Standard horizontal filter chips consume excessive horizontal real estate, clutter smaller mobile screens, and cause awkward multi-line wrapping when multiple filter categories coexist (Category + Diet + Sorting).

### The Enhanced Solution (`src/components/ui/Select.jsx`)
We upgraded the user interface by designing a **custom, accessible, animated Dropdown Select component** styled with dark glassmorphism:

| Feature | Standard HTML `<select>` / Chips | Our Custom Dropdown (`Select.jsx`) |
| :--- | :--- | :--- |
| **Visual Design** | Inconsistent OS-native styling | Dark luxury theme matching dark background (`#101010`) |
| **Motion & Polish** | Abrupt show/hide | Smooth CSS scale & opacity transitions (`duration-200`) |
| **State Feedback** | Basic checkmarks or dots | Highlighted active item with primary tint + Lucide `Check` icon |
| **Outside Blur Handling** | Requires manual listeners | Built-in `onBlur` and `tabIndex={0}` container handling |
| **Responsiveness** | Horizontal overflowing chips | Compact grid layout adapting cleanly from mobile to desktop |

```jsx
// Custom Dropdown Integration in FilterBar.jsx
<Select
  value={category}
  onChange={onCategoryChange}
  options={categoryOptions}
  placeholder="Category"
/>
```

---

## 4. Tech Stack & Architecture

### Frontend Core
- **Framework:** [React 19](https://react.dev/) (`19.2.8`)
- **Routing:** [React Router DOM v7](https://reactrouter.com/) (`7.18.2`)
- **Build Tool:** [Vite 8](https://vitejs.dev/) (`8.2.0`)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite`

### Form & Validation
- **Form Controller:** [React Hook Form](https://react-hook-form.com/) (`v7.84.0`)
- **Schema Validation:** [Zod](https://zod.dev/) (`v4.4.3`) with `@hookform/resolvers`

### State & Networking
- **State Management:** React Context API (`AuthContext`, `SavedRecipesContext`)
- **HTTP Client:** [Axios](https://axios-http.com/) (`v1.19.0`) with centralized instance config
- **Icons:** [Lucide React](https://lucide.dev/) (`v1.28.0`)
- **Class Utilities:** `clsx` + `tailwind-merge` for conflict-free dynamic styling

---

## 5. Performance & Re-render Optimization Techniques

To ensure the application maintains **60 FPS performance** even with large datasets and frequent user interactions, we implemented rigorous React rendering optimization strategies:

```
┌────────────────────────────────────────────────────────┐
│               App Optimization Strategy                │
├──────────────────────────┬─────────────────────────────┤
│ Technique                │ Purpose                     │
├──────────────────────────┼─────────────────────────────┤
│ 1. React.memo            │ Skips unneeded component    │
│                          │ re-evaluations              │
│ 2. useCallback           │ Preserves stable handler    │
│                          │ function references         │
│ 3. useMemo               │ Caches expensive filtering  │
│                          │ & context provider values   │
│ 4. Atomic State Scoping  │ Prevents state changes from │
│                          │ bubbling across components  │
│ 5. useDeferredValue      │ Keeps typing responsive     │
│                          │ during heavy list queries   │
└──────────────────────────┴─────────────────────────────┘
```

### 1. Component Memoization via `React.memo`
Key presentation components are wrapped in `React.memo`. When parent state changes (such as search keystrokes), pure components only re-render if their explicit props have mutated:
- **`Header.jsx`**: Only re-renders when `user` or `savedCount` updates.
- **`FilterBar.jsx`**: Prevents dish card re-renders while typing.
- **`MenuItemCard.jsx`**: Each card in the 50+ item grid is memoized; modifying one card's save state does not trigger re-rendering of the entire grid.
- **`FoodDetailHeader.jsx`**: Memoized to isolate recipe detail header action states.

### 2. Stable Handler References with `useCallback`
All event handlers passed as props (`onClick`, `onDelete`, `onLogout`, `handleSaveRecipe`) are wrapped in `useCallback` with exact dependency arrays. This guarantees prop reference equality across renders, allowing `React.memo` child components to bail out of rendering:
```javascript
const handleCardClick = useCallback((id) => {
  navigate(`/menu/${id}`);
}, [navigate]);
```

### 3. Computation & Context Value Memoization with `useMemo`
- **Filtering Logic**: The `filterMenuItems` function is wrapped in `useMemo` to only execute when `category`, `diet`, `searchKey`, or `items` actually change.
- **Context Providers**: `AuthContext.Provider` and `SavedRecipesContext.Provider` wrap their `value` objects in `useMemo`. This prevents every subscriber component in the tree from re-rendering on unrelated parent renders.

### 4. Atomic State Management
Filter state (`search`, `category`, `diet`) is localized to `MenuPage` and `FilterBar`, while authentication and saved recipe state are isolated in their respective Context Providers. This prevents cross-cutting state pollution.

---

## 6. Folder Structure

```
food_menu/
├── public/                     # Static assets (favicons, logos, icons)
│   ├── food_icon.png
│   └── vite.svg
├── src/
│   ├── assets/                 # SVGs and graphic resources
│   ├── components/             # Reusable UI component library
│   │   ├── common/             # Shared application components
│   │   │   ├── MenuItemCard.jsx      # Food card with veg/non-veg badges
│   │   │   └── ProtectedRoute.jsx   # Route security wrapper
│   │   ├── foodDetails/        # Food Detail page subcomponents
│   │   │   ├── FoodDetailHeader.jsx  # Detail page header with save toggle
│   │   │   └── IngredientsSection.jsx# Categorized ingredients breakdown
│   │   ├── layout/             # Major layout blocks
│   │   │   ├── FilterBar.jsx         # Search + custom dropdown filter bar
│   │   │   └── Header.jsx            # Branding, greeting, saved badge, logout
│   │   └── ui/                 # Atomic UI components
│   │       └── Select.jsx            # Custom animated dropdown selector
│   ├── config/                 # Configuration files
│   │   ├── axios.js            # Axios baseURL and interceptor setup
│   │   └── storage.js          # LocalStorage key constants
│   ├── context/                # React Context providers
│   │   ├── AuthContext.jsx           # User session & token state
│   │   └── SavedRecipesContext.jsx   # Saved recipes & localStorage sync
│   ├── data/                   # Static mock data
│   │   └── MenuItems.js              # Complete party menu catalog
│   ├── hooks/                  # Custom reusable hooks
│   │   ├── useAuth.js                # Consumes AuthContext
│   │   ├── usePasswordToggle.js      # Controls password input visibility
│   │   └── useSavedRecipes.js        # Consumes SavedRecipesContext
│   ├── pages/                  # Top-level route views
│   │   ├── FoodDetailsPage.jsx       # Single dish recipe detail view
│   │   ├── LoginPage.jsx             # Sign-in page with Zod validation
│   │   ├── MenuPage.jsx              # Protected main dashboard
│   │   ├── NotFoundPage.jsx          # 404 fallback page
│   │   └── SavedRecipesPage.jsx      # User's bookmarked recipes page
│   ├── services/               # API service layer
│   │   └── authService.js            # POST authentication handler
│   ├── utils/                  # Utility helper functions
│   │   ├── cn.js                     # Classnames merger (clsx + tailwind-merge)
│   │   └── menuUtils.js              # Search, filter, and item lookup logic
│   ├── App.jsx                 # Route definitions & router outlet
│   ├── index.css               # Global styles & Tailwind CSS v4 design tokens
│   └── main.jsx                # React DOM root entry with Providers
├── .env                        # Environment variables (VITE_BASE_URL)
├── .gitignore                  # Git ignore rules
├── .prettierrc                 # Code formatting rules
├── eslint.config.js            # ESLint v10 configuration
├── index.html                  # HTML entry point
├── package.json                # Project dependencies & scripts
├── vercel.json                 # Vercel SPA rewrite routing rules
└── vite.config.js              # Vite configuration
```

---

## 7. Setup & Installation Guide

### Prerequisites
- **Node.js**: `v18.0.0` or higher (Recommended: `v20+`)
- **npm**: `v9.0.0` or higher

### 1. Clone the Repository
```bash
git clone https://github.com/suryavamsi1729/food_menu.git
cd food_menu
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory (or use the provided defaults):
```env
VITE_BASE_URL=https://serverless-api-teal.vercel.app/api
```

### 4. Run the Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 5. Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Vite local development server with Hot Module Replacement (HMR). |
| `npm run build` | Compiles and bundles production assets into the `dist/` directory. |
| `npm run preview` | Locally previews the compiled production build. |
| `npm run lint` | Runs ESLint to check for code quality and syntax issues. |
| `npm run lint:fix` | Automatically fixes fixable ESLint warnings and errors. |
| `npm run format` | Formats the entire codebase using Prettier. |
| `npm run format:check` | Verifies whether all files conform to Prettier formatting. |

---

## 8. Test Credentials & API Specification

### Authentication API Endpoint
- **Method:** `POST`
- **URL:** `https://serverless-api-teal.vercel.app/api/auth/signin`

### Test Credentials
| Field | Value |
| :--- | :--- |
| **Email** | `admin@example.com` |
| **Password** | `admin123` |

### Sample Payload
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

### LocalStorage Storage Contract
| Key | Purpose | Example Value |
| :--- | :--- | :--- |
| `party_menu_token` | JWT authorization bearer token | `"eyJhbGciOiJIUzI1NiIsInR5cCI6..."` |
| `party_menu_user` | Serialized user profile object | `{"id":1,"email":"admin@example.com","name":"Admin User","role":"admin"}` |
| `party_menu_saved_recipes` | Array of bookmarked recipe objects | `[ { "id": "1", "name": "Bruschetta", ... } ]` |

---

## 9. Deployment (Vercel Configuration)

To enable client-side routing on Vercel without triggering 404 errors on page refresh, a `vercel.json` rewrite configuration is configured:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Deploying to Vercel
1. Push your code to GitHub.
2. Import the repository in [Vercel Dashboard](https://vercel.com).
3. Set the Framework Preset to **Vite**.
4. Add the Environment Variable `VITE_BASE_URL` with value `https://serverless-api-teal.vercel.app/api`.
5. Click **Deploy**.

---

## 10. Contributor

- **Author:** [Suryavamsi Doddi](https://github.com/suryavamsi1729)
- **GitHub:** [@suryavamsi1729](https://github.com/suryavamsi1729)
- **Project Repository:** [https://github.com/suryavamsi1729/food_menu](https://github.com/suryavamsi1729/food_menu)

---

<div align="center">
  <sub>Built with ❤️ for the Party Menu Application Assignment</sub>
</div>
