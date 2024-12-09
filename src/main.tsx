import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemActiveBg: "#fee2e2",
              itemSelectedBg: "#fee2e2",
              itemSelectedColor: "red",
            }
          }
        }}
      >
        <App />
      </ConfigProvider>
    </BrowserRouter>
);
