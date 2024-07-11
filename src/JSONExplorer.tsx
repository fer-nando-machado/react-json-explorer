import React from "react";
import "./JSONExplorer.scss";

type JSONValue =
  | string
  | number
  | boolean
  | JSONValue[]
  | undefined
  | { [key: string]: JSONValue };
type JSONObject = { [key: string]: JSONValue };

type JSONExplorerProps = {
  data: JSONObject;
};

const renderValue = (key: string, value: JSONValue, omitKey?: boolean) => {
  if (Array.isArray(value)) {
    return (
      <li key={key}>
        <span className="key">{key}</span>
        <ul className="array">
          {value.map((item, index) =>
            renderValue(index.toString(), item, true)
          )}
        </ul>
      </li>
    );
  }

  const typeOfValue = typeof value;
  if (typeOfValue === "object") {
    return (
      <li key={key}>
        <ul className="object">
          {Object.entries(value as Object).map(([subKey, subValue]) =>
            renderValue(subKey, subValue)
          )}
        </ul>
      </li>
    );
  }

  return (
    <li key={key}>
      {!omitKey && <span className={`key`}>{key}</span>}
      <span className={`value ${typeOfValue}`}>{String(value)}</span>
    </li>
  );
};

const JSONExplorer: React.FC<JSONExplorerProps> = ({ data }) => {
  return (
    <div className="json-explorer">
      <ul className="object">
        {Object.entries(data).map(([key, value]) => renderValue(key, value))}
      </ul>
    </div>
  );
};

export default JSONExplorer;
