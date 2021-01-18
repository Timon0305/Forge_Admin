import {SIDEBAR} from "./actionType";

const initialDesk = {
  sidebars: true
};


const SidebarDesktop = (state = initialDesk, action) => {
  switch (action.type) {
    case SIDEBAR:
      state = {
        ...state,
        sidebars: action.payload.sidebar
      };
      break;
    default:
      state = {...state};
      break;
  }
  return state;
};

export default SidebarDesktop;



