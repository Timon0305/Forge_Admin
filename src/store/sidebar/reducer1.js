import {SIDEBAR} from "./actionType";

const initialMobile = {
  sidebars: false
};

const SidebarMobile = (state = initialMobile, action) => {
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

export default SidebarMobile;
