import React from "react";
import "./css/footer.css";

const Footer = () => {
  return (
    <footer>
      <p className="larger-screen-warn">
        To access all features, view this system in a larger screen.
      </p>
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
          <a href="https://github.com/paulonteri/remote-code-execution-environment">
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
        <li>
          <a
            href="https://github.com/paulonteri/remote-code-execution-environment/blob/master/CONTRIBUTING.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contribute
          </a>
        </li>
      </ul>
      <p>
        Built with love by{" "}
        <a
          href="https://paulonteri.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Paul Onteri.
        </a>
      </p>
    </footer>
  );
};

export default Footer;
