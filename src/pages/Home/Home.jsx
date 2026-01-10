import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import About from "../About/About";
import Services from "../Services/Services";
import Projects from "../Portfolio/Portfolio";
import Skills from "../../Components/Skills/Skills";
import Contact from "../Contact/Contact";
import HeroCanvas from "../../Components/Three/HeroCanvas";
import "./home.css";

function Home() {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        "Full Stack Developer",
        "&",
        "Mobile App Developer",
      ],
      typeSpeed: 60,
      backSpeed: 40,
      loop: true,
    });

    return () => typed.destroy();
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        {/* 3D background layer (pointer-events disabled in CSS) */}
        <div className="hero-bg" aria-hidden="true">
          <HeroCanvas />
        </div>

        <div className="hero-text">
          <h3>Hello, It's Me</h3>
          <h1>Gule Best</h1>
          <h3>
            And I'm a <span ref={typedRef} className="typing-text"></span>
          </h3>
          <p>
            A passionate software engineer who loves building modern web and
            mobile applications that make life easier and more beautiful.
          </p>
          <div className="home-sci">
            <a href="#">
              <i className="bx bxl-facebook"></i>
            </a>
            <a
              href="https://www.instagram.com/gule.oro.best"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bx bxl-instagram"></i>
            </a>
            <a href="#">
              <i className="bx bxl-whatsapp"></i>
            </a>
            <a href="#">
              <i className="bx bxl-tiktok"></i>
            </a>
          </div>
          <a href="#contact" className="hero-btn">
            Get in Touch
          </a>
        </div>

         <div className="hero-content"></div>
      </section>
      <div className="home_components">
      {/* About Section */}
      <section id="about">
        <About />
      </section>

      {/* Services Section */}
      <section id="services">
        <Services />
      </section>

      {/* Portfolio Section */}
      <section id="projects">
        <Projects />
      </section>

      {/* Skills Section */}
      <section id="skills">
        <Skills />
      </section>

      {/* Contact Section */}
      <section id="contact">
        <Contact />
      </section>
      </div>
      </div>
    
  );
}

export default Home;
