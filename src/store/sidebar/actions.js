import {SIDEBAR} from "./actionType";

export const sidebar = (sidebar) => {
  return {
    type: SIDEBAR,
    payload: {sidebar}
  }
};
