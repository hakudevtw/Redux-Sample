import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";
import { fetchUsers } from "./features/users/userSlice.ts";
import { fetchNotifications } from "./features/notifications/notificationsSlice.ts";

store.dispatch(fetchUsers());
store.dispatch(fetchNotifications());
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
