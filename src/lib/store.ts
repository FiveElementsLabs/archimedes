import { useReducer } from "react";
import { createContainer } from "react-tracked";

import { reducer, initialState } from "./reducer";

const useGlobalState = () => useReducer(reducer, initialState);

export const { Provider: SharedStateProvider, useTracked: useSharedState } =
  createContainer<any, any, any>(useGlobalState);
