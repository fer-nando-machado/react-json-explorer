import { useState } from "react";
import "./CustomCheckbox.js";
import JSONExplorer from "./JSONExplorer";
import "./App.scss";
import GitHub from "./assets/github.svg";

const data = {
  date: "2021-10-27T07:49:14.896Z",
  token: 777,
  fruits: ["banana", "apple", "orange"],
  fields: [
    {
      prop: "iban",
      value: "DE81200505501265402568",
      hasError: false,
      ref: null,
    },
    {
      amount: 7.77,
      size: undefined,
      hasError: true,
    },
  ],
};

function App() {
  const [isLargeMode, setLargeMode] = useState(true);
  const onClick = () => {
    setLargeMode(!isLargeMode);
  };

  return (
    <div className={`App ${isLargeMode ? "large-mode" : ""}`}>
      <h1>
        <code>{"<JSON Explorer/>"}</code>
      </h1>
      <div className="content">
        <JSONExplorer data={data} />
      </div>
      <a href="https://github.com/fer-nando-machado/react-json-explorer">
        <img src={GitHub} alt="GitHub" height={20} />
      </a>
      <div className="large-mode" onClick={onClick}>
        <custom-checkbox checked={isLargeMode} />
        <label>Large Mode</label>
      </div>
    </div>
  );
}

export default App;
