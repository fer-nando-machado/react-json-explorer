import React from "react";
import "./JSONExplorer.scss";

type JSONExplorerProps = {
  data: { [key: string]: any };
};

const JSONExplorer: React.FC<JSONExplorerProps> = ({ data }) => {
  return (
    <div className="json-explorer">
      {<pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default JSONExplorer;
