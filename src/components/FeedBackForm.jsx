// src/components/FeedbackModal.jsx
import React, { useState, useEffect } from "react";
import {
  X,
  Send,
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle,
} from "lucide-react";

const FeedbackModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      // Reset form when closing
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          fname: "",
          lname: "",
          email: "",
          phone: "",
          message: "",
        });
      }, 300);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Form Submitted", formData);
      setIsSubmitting(false);
      setSubmitted(true);

      // Auto close after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div style={styles.backdrop} onClick={onClose}></div>

      {/* Modal */}
      <div style={styles.modal}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <MessageSquare size={28} color="#3b82f6" />
            <div>
              <h2 style={styles.title}>Share Your Feedback</h2>
              <p style={styles.subtitle}>Help us improve EcoPro</p>
            </div>
          </div>
          <button onClick={onClose} style={styles.closeButton}>
            <X size={24} />
          </button>
        </div>

        {submitted ? (
          // Success Message
          <div style={styles.successContainer}>
            <div style={styles.successIcon}>
              <CheckCircle size={64} color="#10b981" />
            </div>
            <h3 style={styles.successTitle}>Thank You!</h3>
            <p style={styles.successMessage}>
              Your feedback has been submitted successfully. We appreciate your
              input!
            </p>
          </div>
        ) : (
          // Form
          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Name Fields */}
            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <User size={16} />
                  First Name
                </label>
                <input
                  type="text"
                  name="fname"
                  placeholder="John"
                  onChange={handleChange}
                  value={formData.fname}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <User size={16} />
                  Last Name
                </label>
                <input
                  type="text"
                  name="lname"
                  placeholder="Doe"
                  onChange={handleChange}
                  value={formData.lname}
                  style={styles.input}
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <Mail size={16} />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="john.doe@example.com"
                onChange={handleChange}
                value={formData.email}
                style={styles.input}
                required
              />
            </div>

            {/* Phone Field */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <Phone size={16} />
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="+1 (555) 123-4567"
                onChange={handleChange}
                value={formData.phone}
                style={styles.input}
                required
              />
            </div>

            {/* Message Field */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <MessageSquare size={16} />
                Your Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                placeholder="Tell us what you think about EcoPro..."
                onChange={handleChange}
                style={styles.textarea}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                ...styles.submitButton,
                ...(isSubmitting ? styles.submitButtonLoading : {}),
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div style={styles.spinner}></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Submit Feedback
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </>
  );
};

const styles = {
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.7)",
    backdropFilter: "blur(4px)",
    zIndex: 2000,
    animation: "fadeIn 0.3s ease-out",
  },
  modal: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "#fff",
    borderRadius: "20px",
    width: "90%",
    maxWidth: "600px",
    maxHeight: "90vh",
    overflowY: "auto",
    zIndex: 2001,
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    animation: "slideUp 0.3s ease-out",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "30px 30px 20px",
    borderBottom: "1px solid #e2e8f0",
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "800",
    color: "#1e293b",
    margin: 0,
  },
  subtitle: {
    fontSize: "0.9rem",
    color: "#64748b",
    margin: "5px 0 0 0",
  },
  closeButton: {
    background: "#f1f5f9",
    border: "none",
    borderRadius: "8px",
    padding: "8px",
    cursor: "pointer",
    color: "#64748b",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#475569",
  },
  input: {
    padding: "12px 16px",
    fontSize: "1rem",
    border: "2px solid #e2e8f0",
    borderRadius: "10px",
    outline: "none",
    transition: "all 0.3s",
    fontFamily: "inherit",
  },
  textarea: {
    padding: "12px 16px",
    fontSize: "1rem",
    border: "2px solid #e2e8f0",
    borderRadius: "10px",
    outline: "none",
    minHeight: "120px",
    resize: "vertical",
    transition: "all 0.3s",
    fontFamily: "inherit",
  },
  submitButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "16px",
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "1.05rem",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s",
    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
    marginTop: "10px",
  },
  submitButtonLoading: {
    background: "#94a3b8",
    cursor: "not-allowed",
  },
  spinner: {
    width: "20px",
    height: "20px",
    border: "3px solid rgba(255, 255, 255, 0.3)",
    borderTop: "3px solid #fff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  successContainer: {
    padding: "60px 30px",
    textAlign: "center",
  },
  successIcon: {
    marginBottom: "20px",
    animation: "scaleIn 0.5s ease-out",
  },
  successTitle: {
    fontSize: "2rem",
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: "10px",
  },
  successMessage: {
    fontSize: "1.1rem",
    color: "#64748b",
    lineHeight: "1.6",
  },
};

// Add global styles for animations
const styleSheet = document.styleSheets[0];
if (styleSheet) {
  try {
    styleSheet.insertRule(
      `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `,
      styleSheet.cssRules.length,
    );

    styleSheet.insertRule(
      `
      @keyframes slideUp {
        from { 
          opacity: 0;
          transform: translate(-50%, -45%);
        }
        to { 
          opacity: 1;
          transform: translate(-50%, -50%);
        }
      }
    `,
      styleSheet.cssRules.length,
    );

    styleSheet.insertRule(
      `
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `,
      styleSheet.cssRules.length,
    );

    styleSheet.insertRule(
      `
      @keyframes scaleIn {
        from { transform: scale(0.5); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
    `,
      styleSheet.cssRules.length,
    );

    styleSheet.insertRule(
      `
      .closeButton:hover {
        background: #e2e8f0;
        color: #1e293b;
      }
    `,
      styleSheet.cssRules.length,
    );

    styleSheet.insertRule(
      `
      input:focus, textarea:focus {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }
    `,
      styleSheet.cssRules.length,
    );

    styleSheet.insertRule(
      `
      .submitButton:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
      }
    `,
      styleSheet.cssRules.length,
    );
  } catch (e) {
    console.error("Error adding styles:", e);
  }
}

export default FeedbackModal;
