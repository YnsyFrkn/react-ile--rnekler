import { createRoot } from "react-dom/client";
import "./css/app.css";
import { ToastContainer } from "react-toastify";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    <ToastContainer position="top-right" autoClose={3000} />
  </Provider>
);
