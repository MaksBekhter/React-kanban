import { v4 } from "uuid";
import { BOARD_TYPES } from "./constants";

export const INIT_BOARD_DATA = [
  {
    id: v4(),
    type: BOARD_TYPES.COLUMN,
    title: "Title column 1",
    cards: [
      {
        id: v4(),
        type: BOARD_TYPES.CARD,
        text: "Card1 Some card text",
      },
      {
        id: v4(),
        type: BOARD_TYPES.CARD,
        text: "Card2 Some card text",
      },
      {
        id: v4(),
        type: BOARD_TYPES.CARD,
        text: "Card3 Some card text",
      },
    ],
  },
  {
    id: v4(),
    type: BOARD_TYPES.COLUMN,
    title: "Title column 2",
    cards: [],
  },
];
