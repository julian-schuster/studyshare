import { CLEAR_STORE } from "../types/rootTypes";

export const clearStoreAct = () => {
  return {
    type: CLEAR_STORE,
  };
};
