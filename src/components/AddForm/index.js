import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as CloseIcon } from "../../assets/icons/close-icon.svg";

import "./index.scss";
import PropTypes from "prop-types";

function AddForm({ cancel, addElement, placeholder, btnTitle }) {
  const [elementText, setElementText] = useState("");
  const [isError, setIsError] = useState(false);
  const textareaEl = useRef(null);

  useEffect(() => {
    textareaEl.current.focus();
  }, []);

  function setElementTextHandler(e) {
    setElementText(e.target.value);
    setIsError(false);
  }

  function addElementHandler(e) {
    e.preventDefault();

    const text = elementText.trim().replace(/(?:\r\n|\r|\n)/g, "<br />");

    if (!text) {
      setIsError(true);
      return;
    }

    addElement(text);
    cancel();
  }

  return (
    <form className="add-form" onSubmit={addElementHandler}>
      <textarea
        ref={textareaEl}
        value={elementText}
        className={`add-form__field ${isError ? "add-form__field--error" : ""}`}
        placeholder={placeholder ? placeholder : "Type text"}
        onInput={setElementTextHandler}
      />

      <div className="add-form-btns">
        <button type="submit" className="add-form-btns__submit">
          {btnTitle ? btnTitle : "Add"}
        </button>
        <button
          type="button"
          className="add-form-btns__cancel"
          onClick={cancel}
        >
          <CloseIcon />
        </button>
      </div>
    </form>
  );
}

AddForm.propTypes = {
  cancel: PropTypes.func,
  addElement: PropTypes.func,
  placeholder: PropTypes.string,
  btnTitle: PropTypes.string,
};

export default AddForm;
