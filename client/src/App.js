import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
function App() {
  const [baseUrl, setBaseUrl] = useState(
    process.env.NODE_ENV === "production" ? "" : "http://localhost:4242"
  );
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>{`API Server running at::${baseUrl}`}</code>
        </p>
      </header>
    </div>
  );
}

export default App;
