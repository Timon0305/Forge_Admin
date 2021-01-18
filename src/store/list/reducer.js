import {ADD_TO_LIST} from "./actionTypes";

const initialState = {
  products: []
};

const List = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_LIST:
        state = {
          ...state,
          products: [...action.payload.product],
        };
        break;
    default:
        state = {...state};
        break;
  }
  return state;
};

export default List;
