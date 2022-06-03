import React, { useState } from "react";
import { v4 } from "uuid";
import { DragDropContext } from "react-beautiful-dnd";

import { INIT_BOARD_DATA } from "../../helpers/moka-data";
import { BOARD_TYPES } from "../../helpers/constants";
import { getLocalData, setLocalData } from "../../helpers/save-local-data";

import Column from "../Column";
import AddBtn from "../AddBtn";
import AddForm from "../AddForm";

import "./index.scss";

function Board() {
  const [boardData, setBoardData] = useState(getLocalData() || INIT_BOARD_DATA);
  const [openColumnForm, setOpenColumnForm] = useState(false);

  function openCreationForm() {
    setOpenColumnForm(true);
  }

  function closeCreationForm() {
    setOpenColumnForm(false);
  }

  function addNewCard(cardText, columnId) {
    const newCard = {
      id: v4(),
      type: BOARD_TYPES.CARD,
      text: cardText,
    };

    const columnIndex = boardData.findIndex((column) => column.id === columnId);

    const newBoardData = [...boardData];
    newBoardData[columnIndex].cards.push(newCard);

    setLocalData(newBoardData);
    setBoardData(newBoardData);
  }

  function addNewColumn(title) {
    const newColumn = {
      id: v4(),
      type: BOARD_TYPES.COLUMN,
      title: title,
      cards: [],
    };

    setLocalData([...boardData, newColumn]);
    setBoardData([...boardData, newColumn]);
  }

  function removeColumn(columnId) {
    const newBoardData = boardData.filter((column) => column.id !== columnId);
    setLocalData(newBoardData);
    setBoardData(newBoardData);
  }

  function removeCard(cardId, columnId) {
    const newBoardData = [...boardData];
    const columnIndex = boardData.findIndex((column) => column.id === columnId);

    newBoardData[columnIndex].cards = newBoardData[columnIndex].cards.filter(
      (card) => {
        return card.id !== cardId;
      }
    );

    setLocalData(newBoardData);
    setBoardData(newBoardData);
  }

  function onDragEnd({ source, destination }) {
    const newBoardData = Object.assign([], boardData);

    if (source.droppableId !== destination.droppableId) {
      const sourceColumnIndex = newBoardData.findIndex(
        (column) => column.id === source.droppableId
      );

      const destinationColumnIndex = newBoardData.findIndex(
        (column) => column.id === destination.droppableId
      );

      const sourceItems = [...newBoardData[sourceColumnIndex].cards];
      const destItems = [...newBoardData[destinationColumnIndex].cards];

      const [removed] = sourceItems.splice(source.index, 1);

      destItems.splice(destination.index, 0, removed);

      newBoardData[sourceColumnIndex].cards = [...sourceItems];
      newBoardData[destinationColumnIndex].cards = [...destItems];

      setLocalData(newBoardData);

      return setBoardData(newBoardData);
    }

    const sourceColumnIndex = newBoardData.findIndex(
      (column) => column.id === source.droppableId
    );
    const copiedItems = [...newBoardData[sourceColumnIndex].cards];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);

    newBoardData[sourceColumnIndex].cards = [...copiedItems];

    setLocalData(newBoardData);

    setBoardData(newBoardData);
  }

  return (
    <div className="board-wrap">
      <img
        src={require("../../assets/images/main-bg.jpg")}
        alt=""
        className="board-bg"
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {boardData.map((column) => {
            return (
              <Column
                key={column.id}
                column={column}
                createCard={addNewCard}
                removeCard={removeCard}
                removeColumn={removeColumn}
              />
            );
          })}

          {openColumnForm && (
            <div className="column column--adding">
              <AddForm
                cancel={closeCreationForm}
                addElement={addNewColumn}
                placeholder={"Type column title"}
                btnTitle="Add column"
              />
            </div>
          )}

          <AddBtn
            addElementHandler={openCreationForm}
            customClass="add-btn--column"
            title="Add column"
            disabled={openColumnForm}
          />
        </div>
      </DragDropContext>
    </div>
  );
}

export default Board;
