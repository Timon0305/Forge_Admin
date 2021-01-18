import {ADD_TO_LIST} from "./actionTypes";

export const addToList = (product) => {
  console.log('action', product)
  return {
    type: ADD_TO_LIST,
    payload: { product }
  }
};
