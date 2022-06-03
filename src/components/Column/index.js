import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
// import { ReactComponent as EditIcon } from "../../assets/icons/edit-icon.svg";
import { ReactComponent as CloseIcon } from "../../assets/icons/close-icon.svg";
import { Droppable } from "react-beautiful-dnd";

import Card from "../Card";
import AddForm from "../AddForm";
import AddBtn from "../AddBtn";

import "./index.scss";

function Column({ column, createCard, removeColumn, removeCard }) {
  const [openCardForm, setOpenCardForm] = useState(false);

  function openCreationForm() {
    setOpenCardForm(true);
  }

  function closeCreationForm() {
    setOpenCardForm(false);
  }

  const onRemoveCard = useCallback((cardId, colId) => {
    removeCard(cardId, colId);
  }, []);

  return (
    <div className={`column ${openCardForm ? "column--adding" : ""}`}>
      <div className="column-header">
        <h2 className="column-header__title">{column.title}</h2>

        {/*<button className="column-header__btn column-header__btn--edit">*/}
        {/*  <EditIcon />*/}
        {/*</button>*/}

        <button
          type="button"
          className="column-header__btn column-header__btn--remove"
          onClick={() => removeColumn(column.id)}
        >
          <CloseIcon />
        </button>
      </div>

      <Droppable droppableId={column.id} key={`${column.id}-column1`}>
        {(provided) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              key={`${column.id}-column`}
            >
              {column.cards.length ? (
                column.cards.map((card, i) => {
                  return (
                    <Card
                      key={card.id}
                      index={i}
                      card={card}
                      colId={column.id}
                      remove={onRemoveCard}
                    />
                  );
                })
              ) : (
                <p className="empty-column-text">Empty column</p>
              )}

              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>

      {openCardForm ? (
        <AddForm
          cancel={closeCreationForm}
          addElement={(cardText) => createCard(cardText, column.id)}
          placeholder={"Type card text"}
          btnTitle="Add card"
        />
      ) : (
        <AddBtn
          addElementHandler={openCreationForm}
          customClass="add-btn--card"
          title="Add card"
        />
      )}
    </div>
  );
}

Column.propTypes = {
  column: PropTypes.object,
  createCard: PropTypes.func,
  removeCard: PropTypes.func,
  removeColumn: PropTypes.func,
};

export default React.memo(Column);
