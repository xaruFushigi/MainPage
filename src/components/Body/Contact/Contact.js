import React, { useEffect, useRef, useState } from "react";
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
  const [emailFromUser, setEmailFromUser] = useState(false);
  const [backEndResponse, setBackEndResponse] = useState("");
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
    name: Yup.string().min(2).max(64).required(),
    email: Yup.string().min(0).max(30),
    subject: Yup.string().min(3).max(20).required(),
    message: Yup.string().min(3).max(120).required(),
  });
  // toggle PopUpWindow
  const togglePopUpWindow = () => {
    setEmailFromUser((prevState) => !prevState);
  };
  // on Submit button of Formik
  const onSubmitContact = async (event) => {
    try {
      // Handle form submission logic
      const response = await fetch("http://localhost:10000/auth/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: event.name,
          email: event.email,
          subject: event.subject,
          message: event.message,
        }),
        mode: "cors",
      });
      if (response.ok) {
        const data = await response.json();
        setEmailFromUser((prevState) => !prevState);
        setBackEndResponse(data);
      } else {
        alert("something went wrong");
      }
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

      {emailFromUser && (
        <div className="contact__email">
          <div className="popup">
            <div className="contact__popup-window-close-button-container">
              <button
                className="popup__close-button"
                onClick={togglePopUpWindow}
              >
                X
              </button>
            </div>
            <div className="popup__message">{backEndResponse}</div>
          </div>
        </div>
      )}

      <div className="contact__text">
        <h2>
          You can send message to me in case you need additional information
        </h2>
        <p>Bokhodir will try to reply to you as soon as possible</p>
        <p>
          After inputting neccessary inforamtion into inputs do not forget to
          press Send button
        </p>
      </div>
    </div>
  );
};

export default Contact;
