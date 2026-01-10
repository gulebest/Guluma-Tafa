# Guluma Tafa Portfolio (React + Vite)

Personal portfolio built with React and Vite. It highlights projects, skills, and services, features a 3D hero background on the Home section, and includes a working EmailJS contact form with animated feedback.

## Features
- Responsive layout with hero, about, services, portfolio, skills, and contact sections
- Home hero uses a lightweight @react-three/fiber/@react-three/drei background with reduced-motion and mobile safeguards
- Typewriter intro text via Typed.js
- Contact form powered by EmailJS plus Framer Motion popup feedback
- Clean social/profile links and polished hover states

## Tech Stack
- React + Vite
- @react-three/fiber, @react-three/drei (background only on Home)
- Framer Motion
- EmailJS
- Typed.js

## Getting Started
Prerequisites: Node.js 18+ and npm.

```bash
npm install
npm run dev   # start locally
npm run build # production build
npm run preview # preview the production build
```

## Configuration
- EmailJS credentials are currently set in `src/pages/Contact/Contact.jsx`. Update `service`, `template`, and `public key` values to your own EmailJS account. For production, consider moving them to environment variables and importing them (e.g., `VITE_EMAILJS_SERVICE_ID`, etc.).
- 3D runs only on Home and is pointer-events:none so it stays a background layer.

## Project Structure (key parts)
- `src/pages/Home/` — hero layout, typed intro, background 3D canvas
- `src/pages/Contact/` — contact form, popup feedback
- `src/Components/Three/` — 3D scene components for the hero background
- `src/Components/` — header, footer, skills, etc.

## Deployment
After `npm run build`, deploy the `dist/` folder to your hosting of choice (e.g., Vercel, Netlify, GitHub Pages). Ensure EmailJS keys are valid in the deployed environment.

## Notes
- prefers-reduced-motion and mobile viewports dial back 3D effects and DPR for performance.
- Canvas has pointer-events disabled so scrolling and clicks hit content layers.
