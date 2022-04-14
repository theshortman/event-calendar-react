import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import reducers from "../store/reducers";
import thunk from "redux-thunk";
import { store } from "../store";

export const renderWithRedux = (
  component: React.Component | React.ReactNode,
  preloadedState = store.getState()
) => {
  const st = createStore(
    combineReducers(reducers),
    preloadedState,
    applyMiddleware(thunk)
  );

  return render(<Provider store={st}>{component}</Provider>);
};
