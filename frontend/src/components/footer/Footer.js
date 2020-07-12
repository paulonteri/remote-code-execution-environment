import React from "react";
import "./css/footer.css";

const Footer = () => {
  return (
    <footer>
      <ul>
        <li>
          <a
            href="https://github.com/paulonteri/remote-code-execution-environment/blob/master/README.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="https://github.com/paulonteri/remote-code-execution-environment"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Code
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/paulonteri/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact
          </a>
        </li>
      </ul>
      <p>
        Built with love by{" "}
        <a
          href="https://www.linkedin.com/in/paulonteri/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Paul Onteri
        </a>
      </p>
    </footer>
  );
};

export default Footer;
