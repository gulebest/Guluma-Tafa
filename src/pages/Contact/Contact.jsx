// src/Pages/Contact/Contact.jsx
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import "./contact.css";

function Contact() {
  const form = useRef();
  const [popup, setPopup] = useState({ show: false, success: true, message: "" });

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_voig0nc",     // ✅ Your Service ID
        "template_hn0ls2f",    // ✅ Your Template ID
        form.current,
        "Rsbu_R2wllJis4f8a"    // ✅ Your Public Key
      )
      .then(
        () => {
          setPopup({
            show: true,
            success: true,
            message: "✅ Message sent successfully!",
          });
          form.current.reset();
        },
        (error) => {
          console.error("Email send error:", error);
          setPopup({
            show: true,
            success: false,
            message: "❌ Failed to send message. Please try again later.",
          });
        }
      );

    // hide popup after 4 seconds
    setTimeout(() => {
      setPopup({ ...popup, show: false });
    }, 4000);
  };

  return (
    <section className="contact">
      <h2>Contact Me</h2>
      <div className="contact-container">
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:gulumabest694@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-email"
              aria-label="Email gulumabest694@gmail.com"
            >
              gulumabest694@gmail.com
            </a>
          </p>
          <p><strong>Phone:</strong> +251920072951</p>
          {/* Additional direct links keep content discoverable without changing form logic */}
          <div className="contact-meta">
            
            <div className="contact-row">
              <i className="bx bxl-github"></i>
              <a
                href="https://github.com/gulebest"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
              >
                GitHub
              </a>
            </div>
            <div className="contact-row">
              <i className="bx bxl-linkedin"></i>
              <a
                href="https://www.linkedin.com/in/guluma-best-1b2820329"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
              >
                LinkedIn
              </a>
            </div>
            <div className="contact-row">
              <i className="bx bxl-upwork"></i>
              <a
                href="https://www.upwork.com/freelancers/~01b4c1c0422cb412d7"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Upwork profile"
              >
                Upwork
              </a>
            </div>
            <div className="contact-row" aria-label="Location">
              <i className="bx bx-map"></i>
              <span className="contact-label">Location:</span>
              <span className="contact-value">Addis Ababa, Ethiopia</span>
            </div>
          </div>
        </div>

        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <input type="text" name="from_name" placeholder="Your Name" required />
          <input type="email" name="from_email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>

      {/* ✅ Animated popup notification */}
      <AnimatePresence>
        {popup.show && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4 }}
            className={`popup ${popup.success ? "success" : "error"}`}
          >
            {popup.message}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Contact;
