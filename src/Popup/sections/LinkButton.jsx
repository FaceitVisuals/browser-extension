import React from "react";

const LinkButton = ({ text, url, icon }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="link-button"
  >
    {icon && <i className={icon}></i>}
    {text}
    <style jsx>
      {`
        .link-button {
          display: inline-flex;
          align-items: center;
          padding: 10px 20px;
          font-size: 1rem;
          background-color: #007bff; /* Adjust the background color as needed */
          color: #fff; /* Adjust the text color as needed */
          border: none;
          border-radius: 5px;
          text-decoration: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .link-button:hover {
          background-color: #0056b3; /* Adjust the hover background color as needed */
        }

        .link-button i {
          margin-right: 10px; /* Adjust the icon spacing as needed */
        }
      `}
    </style>
  </a>
);

export default LinkButton
