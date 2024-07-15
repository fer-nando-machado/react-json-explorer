import { useState } from "react";
import "./CustomCheckbox.js";
import JSONExplorer from "./JSONExplorer";
import "./App.scss";
import GitHub from "/GitHub.svg?url";

const data = {
  timestamp: "2021-10-27T07:49:14.896Z",
  token: 777,
  permissions: ["create", "read", "update", "delete"],
  fields: [
    {
      id: "d1a2d386-8042-48a2-a1dd-d760e2fc09fb",
      prop: "iban",
      value: "DE81200505501265402568",
      hasError: true,
      ref: null,
    },
    {
      amount: 7.77,
      hasError: false,
      method: undefined,
    },
  ],
};

function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const demoParam = queryParams.get("demo");
  if (demoParam === "checkbox") {
    return <custom-checkbox />;
  }

  const [isLargeMode, setLargeMode] = useState(true);
  const onClick = () => {
    setLargeMode(!isLargeMode);
  };

  return (
    <div className={`App ${isLargeMode ? "large-mode" : ""}`}>
      <h1>{"<JSON Explorer/>"}</h1>
      <div className="content">
        <JSONExplorer data={data} />
      </div>
      <a href="https://github.com/fer-nando-machado/react-json-explorer">
        <img src={GitHub} alt="GitHub" height={24} />
      </a>
      <div className="large-mode-control" onClick={onClick}>
        <custom-checkbox checked={isLargeMode} /> Large Mode
      </div>
    </div>
  );
}

export default App;
