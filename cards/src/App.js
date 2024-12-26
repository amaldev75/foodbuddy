import "./App.css";
import Approuter from "./components/Approuter";
import { ToastContainer } from "react-toastify";
import Hook from "./components/hooks/hook";
import "react-toastify/dist/ReactToastify.css";
import CartProvider from "./components/hooks/CartContext";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Hook>
        <CartProvider>
          <Approuter />
        </CartProvider>
      </Hook>
    </div>
  );
}

export default App;
