
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import "aos/dist/aos.css";
import AOS from 'aos';

// Initialize AOS animation library
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: false, // Set to false to repeat animations on scroll
  mirror: true, // Whether elements should animate out while scrolling past them
  offset: 100, // Offset (in px) from the original trigger point
});

createRoot(document.getElementById("root")!).render(<App />);
