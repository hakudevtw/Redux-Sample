import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";
import { extendedApiSlice } from "./features/users";

// Fixing dispatch type error
// https://lightrun.com/answers/reduxjs-redux-thunk-thunkaction-is-not-assignable-to-parameter-of-type-anyaction
import type {} from "redux-thunk/extend-redux";

store.dispatch(extendedApiSlice.endpoints.getUsers.initiate());
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
