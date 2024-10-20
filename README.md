# Salon Booking System Frontend
This repository contains the frontend code for the Salon Booking System, developed using Next.js and TypeScript. The platform allows users to search for nearby salons, book appointments, leave reviews, and compare salon-related products. Additionally, it enables salon owners to showcase their services and manage bookings.

### Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)

## Features
- Search for salons by location and beauty services offered.
- Book appointments with available time slots.
- Leave reviews and ratings for salon services.
- Filter salons based on services (e.g., haircuts, manicures, etc.).
- Compare salon products based on reviews, price, and ingredients.
- Salon owners can display their services and manage bookings.
- Product recommendations based on user preferences and medical conditions.

## Tech Stack
- Frontend Framework: React
- Language: TypeScript - Strictly typed JavaScript for better development experience.
- Styling: Tailwind CSS
- State Management: 
- API Integration: Axios/Fetch API for communicating with backend services.
- Maps: Google Maps API for location-based search.


---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

