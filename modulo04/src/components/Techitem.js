import React from "react";
import PropTypes from "prop-types";

export default function Techitem({ tech, onDelete }) {
  return (
    <li>
      {tech}
      <button type="button" onClick={() => onDelete && onDelete(tech)}>
        Remover
      </button>
    </li>
  );
}

Techitem.defaultProps = {
  tech: "Oculto"
};

Techitem.propTypes = {
  tech: PropTypes.string,
  onDelete: PropTypes.func.isRequired
};
