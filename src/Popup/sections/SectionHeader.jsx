import React from "react";


const SectionHeader = ({ title, children, }) => (React.createElement(React.Fragment, null,
  React.createElement("header", null,
      React.createElement("h2", null, title),
      children),
  React.createElement("style", { jsx: true }, `
    header {
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    header > h2 {
      font-size: 1.275rem;
    }
  `)));
export default SectionHeader;