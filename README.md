# Mini Reddit JSON API

A minimal Reddit client built with React and Vite, featuring infinite scrolling, subreddit browsing, and a modern UI.

## 🚀 Technologies Used

- **React** (with Hooks)
- **Redux Toolkit** (state management)
- **React Router** (routing)
- **Vite** (build tool)
- **CSS Modules** (styling)
- **Reddit JSON API** (data source)
- **CORS Proxy** (for API requests)

## ✨ Features

- Browse Reddit posts and popular subreddits
- Infinite scrolling for posts
- View posts by subreddit
- Responsive, modern UI
- Loading skeletons for better UX
- Error handling for API requests

## 🛠️ Project Structure

- `/src/components` — Reusable UI components (e.g., Card)
- `/src/features` — Feature-based Redux slices and related components (e.g., subreddits, comments)
- `/src/api` — API functions for fetching data
- `/src/utils` — Utility functions (e.g., URL sanitization)

## 📋 Future Work

- **Write tests** for components and unit tests for utility functions
- **Review and refactor API functions**:  
  Especially `getPosts`, which is currently complex and could be improved for readability and maintainability
- **Review project structure**:  
  The separation between `components` and `features` folders should be clarified and organized for scalability
- **Improve error boundaries** and user feedback for failed API requests
- **Enhance accessibility** and mobile responsiveness
- **Fix comments rendering bug** where the app crashes while fetching more than couple hundred comments

## 🏁 Getting Started

Install dependencies and start the development server:

```sh
npm install
npm run dev
```

---