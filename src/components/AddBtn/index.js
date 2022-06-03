import React from "react";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus-icon.svg";
import PropTypes from "prop-types";

import "./index.scss";

function AddBtn({ addElementHandler, title, customClass, disabled }) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`add-btn ${customClass ? customClass : ""}`}
      onClick={addElementHandler}
    >
      <PlusIcon className="add-btn__icon" />

      <p className="add-btn__text">{title ? title : "Add"}</p>
    </button>
  );
}

AddBtn.propTypes = {
  addElementHandler: PropTypes.func,
  title: PropTypes.string,
  customClass: PropTypes.string,
  disabled: PropTypes.bool,
};

export default AddBtn;
