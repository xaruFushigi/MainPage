import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
// Formik
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// CSS
import "./Contact.css";
// icons
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import SubjectIcon from "@mui/icons-material/Subject";
import MessageIcon from "@mui/icons-material/Message";

const Contact = () => {
  // to be able to open contact section at press from other routes
  const location = useLocation();
  const worksRef = useRef(null); // Create a ref for the "contact" section
  const initialValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };
  // validation schema for Formik
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(8).max(64).required(),
    email: Yup.string().min(1).max(30).required(),
    subject: Yup.string().min(3).max(20).required(),
    message: Yup.string().min(3).max(120).required(),
  });
  // on Submit button of Formik
  const onSubmitContact = () => {
    try {
      // Handle form submission logic
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Scroll to the "Contact" section when the component mounts
    if (location.hash === "#contact") {
      worksRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div id="contact" className="contact section" ref={worksRef}>
      <div className="contact__container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmitContact}
        >
          <Form className="contact__formik-container">
            <div className="input-row">
              <div className="contact__formik-input-error-message-container">
                <BadgeIcon sx={{ fontSize: 30 }} />
                <label name="name">Name:</label>
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error-message"
                />
              </div>

              <Field
                autoComplete="off"
                id="inputContactForm"
                name="name"
                placeholder="Your Name"
              />
            </div>

            <div className="input-row">
              <div className="contact__formik-input-error-message-container">
                <EmailIcon sx={{ fontSize: 30 }} />
                <label name="email">Email:</label>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>

              <Field
                autoComplete="off"
                id="inputContactForm"
                name="email"
                placeholder="Your Email"
                type="email"
              />
            </div>

            <div className="input-row">
              <div className="contact__formik-input-error-message-container">
                <SubjectIcon sx={{ fontSize: 30 }} />
                <label name="subject">Subject:</label>
                <ErrorMessage
                  name="subject"
                  component="div"
                  className="error-message"
                />
              </div>

              <Field
                autoComplete="off"
                id="inputContactForm"
                name="subject"
                placeholder="Your Subject"
              />
            </div>

            <div className="input-row">
              <div className="contact__formik-input-error-message-container">
                <MessageIcon sx={{ fontSize: 30 }} />
                <label name="message">Message:</label>
                <ErrorMessage
                  name="message"
                  component="div"
                  className="error-message"
                />
              </div>

              <Field
                autoComplete="off"
                id="inputContactForm"
                name="message"
                component="textarea"
                placeholder="Your Message"
                rows={5}
                className="textarea-input"
                as="textarea"
              />
            </div>
            <button type="submit">Send</button>
          </Form>
        </Formik>
      </div>

      <div className="contact__text">
        <h2>
          You can send message to me in case you need additional information
        </h2>
        <p>
          No personal informaiton of yours will be collected without your input
        </p>
        <p>
          After inputting neccessary inforamtion into inputs do not forget to
          press Send button
        </p>
      </div>
    </div>
  );
};

export default Contact;
