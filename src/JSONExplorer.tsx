import React, { useEffect, useRef, useState } from "react";
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

const renderKey = (
  key: string,
  path: string,
  onClick?: (path: string) => void
) => {
  return (
    <span
      className={`key ${onClick ? "clickable" : ""}`}
      onClick={onClick && (() => onClick(path))}
    >
      {key}
    </span>
  );
};

const renderValue = (
  key: string,
  value: JSONValue,
  path: string,
  onClick?: (path: string) => void,
  isArrayValue?: boolean
) => {
  const typeOfValue = typeof value;
  const currentPath = `${path}${isArrayValue ? `[${key}]` : `.${key}`}`;

  if (Array.isArray(value)) {
    return (
      <li key={key}>
        {renderKey(key, currentPath)}
        <ul className="array">
          {value.map((item, index) =>
            renderValue(index.toString(), item, currentPath, onClick, true)
          )}
        </ul>
      </li>
    );
  }

  if (typeOfValue === "object") {
    return (
      <li key={key}>
        <ul className="object">
          {Object.entries(value as Object).map(([subKey, subValue]) =>
            renderValue(subKey, subValue, currentPath, onClick)
          )}
        </ul>
      </li>
    );
  }

  return (
    <li key={key}>
      {renderKey(key, currentPath, onClick)}
      <span id={currentPath} className={`value ${typeOfValue}`}>
        {String(value)}
      </span>
    </li>
  );
};

const JSONExplorer: React.FC<JSONExplorerProps> = ({ data }) => {
  const [property, setProperty] = useState("");
  const [value, setValue] = useState("");

  const onClick = (path: string) => {
    setProperty(path);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProperty(event.target.value);
  };

  useEffect(() => {
    const span = document.getElementById(property);
    setValue(span?.innerText || "");
  }, [property]);

  return (
    <div className="json-explorer">
      <input type="text" value={property} onChange={onChange}></input>
      <label>{value}</label>
      <ul className="object">
        {Object.entries(data).map(([key, value]) =>
          renderValue(key, value, "res", onClick)
        )}
      </ul>
    </div>
  );
};

export default JSONExplorer;
