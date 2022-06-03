import { LOCAL_DATA_KEY } from "./constants";

export function setLocalData(boardData) {
  const jsonData = JSON.stringify(boardData);
  localStorage.setItem(LOCAL_DATA_KEY, jsonData);
}

export function getLocalData() {
  const localData = localStorage.getItem(LOCAL_DATA_KEY);

  return JSON.parse(localData);
}
