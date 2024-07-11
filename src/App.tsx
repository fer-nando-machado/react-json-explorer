import "./App.scss";
import JSONExplorer from "./JSONExplorer";

const data = {
  date: "2021-10-27T07:49:14.896Z",
  hasError: false,
  token: 777,
  fruits: ["banana", "apple", "orange"],
  fields: [
    {
      id: "4c212130",
      prop: "iban",
      value: "DE81200505501265402568",
      hasError: false,
    },
    {
      value: "DE81200505501265402568",
      hasError: true,
    },
  ],
};

function App() {
  return (
    <div className="App">
      <h1>
        <code>{"<JSON Explorer/>"}</code>
      </h1>
      <JSONExplorer data={data} />
      <a href="https://github.com/fer-nando-machado/react-json-explorer">
        GitHub
      </a>
    </div>
  );
}

export default App;
