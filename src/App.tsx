import "./App.scss";
import JSONExplorer from "./JSONExplorer";

function App() {
  return (
    <div className="App">
      <h1>
        <code>{"<JSON Explorer/>"}</code>
        <JSONExplorer data={{ hello: "world" }} />
      </h1>
    </div>
  );
}

export default App;
