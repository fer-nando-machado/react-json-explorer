import React from "react";
import "./JSONExplorer.scss";

type JSONValue =
  | string
  | number
  | boolean
  | { [key: string]: JSONValue }
  | JSONValue[];
type JSONObject = { [key: string]: JSONValue };

type JSONExplorerProps = {
  data: JSONObject;
};

const JSONExplorer: React.FC<JSONExplorerProps> = ({ data }) => {
  return <pre className="json-explorer">{JSON.stringify(data, null, 2)}</pre>;
};

export default JSONExplorer;
