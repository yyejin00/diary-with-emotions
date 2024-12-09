import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
// 브라우저 현재주소를 저장하고 감지
//브라우저라우터에 보관되는 데이터는 provider컴포넌트와 같은 context객체를 통해 app 컴포넌트의 모든 자손컴포넌트들에게 context로 공급되는 것을 확인할 수 있다.
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
