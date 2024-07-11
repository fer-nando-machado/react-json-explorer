import "./App.scss";
import JSONExplorer from "./JSONExplorer";

function App() {
  return (
    <div className="App">
      <h1>
        <code>{"<JSON Explorer/>"}</code>
      </h1>
      <JSONExplorer data={{ hello: "world" }} />
      <a href="https://github.com/fer-nando-machado/react-json-explorer">
        GitHub
      </a>
    </div>
  );
}

export default App;
