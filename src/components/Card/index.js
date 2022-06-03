import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { ReactComponent as CloseIcon } from "../../assets/icons/close-icon.svg";

import "./index.scss";
import PropTypes from "prop-types";

function Card({ card, remove, index, colId }) {
  return (
    <Draggable key={card.id} draggableId={card.id} index={index}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="card"
          >
            <p
              className="card__text"
              dangerouslySetInnerHTML={{ __html: card.text }}
            />

            <button
              type="button"
              className="card-remove-btn"
              onClick={() => remove(card.id, colId)}
            >
              <CloseIcon />
            </button>
          </div>
        );
      }}
    </Draggable>
  );
}

Card.propTypes = {
  card: PropTypes.object,
  remove: PropTypes.func,
  index: PropTypes.number,
};

export default Card;
