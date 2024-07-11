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
const renderKey = (key: string, path: string) => {
  return (
    <span className="key" onClick={() => console.log(path)}>
      {key}
    </span>
  );
};

const renderValue = (
  key: string,
  value: JSONValue,
  path: string,
  isArrayValue?: boolean
) => {
  const currentPath = `${path}${isArrayValue ? `[${key}]` : `.${key}`}`;

  if (Array.isArray(value)) {
    return (
      <li key={key}>
        {renderKey(key, currentPath)}
        <ul className="array">
          {value.map((item, index) =>
            renderValue(index.toString(), item, currentPath, true)
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
            renderValue(subKey, subValue, currentPath)
          )}
        </ul>
      </li>
    );
  }

  return (
    <li key={key}>
      {renderKey(key, currentPath)}
      <span className={`value ${typeOfValue}`}>{String(value)}</span>
    </li>
  );
};

const JSONExplorer: React.FC<JSONExplorerProps> = ({ data }) => {
  return (
    <div className="json-explorer">
      <ul className="object">
        {Object.entries(data).map(([key, value]) =>
          renderValue(key, value, "res")
        )}
      </ul>
    </div>
  );
};

export default JSONExplorer;
