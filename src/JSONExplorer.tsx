import React, { useEffect, useMemo, useState } from "react";
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

const cachedPathValue = new Map<string, string>();

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

const buildPath = (path: string, key: string, isArrayValue?: boolean) => {
  if (isArrayValue) {
    return `${path}[${key}]`;
  }
  if (path) {
    return `${path}.${key}`;
  }
  return key;
};

const renderValue = (
  key: string,
  value: JSONValue,
  path: string,
  onClick?: (path: string) => void,
  isArrayValue?: boolean
) => {
  const typeOfValue = typeof value;
  const currentPath = buildPath(path, key, isArrayValue);

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

  cachedPathValue.set(currentPath, String(value));
  return (
    <li key={key}>
      {renderKey(key, currentPath, onClick)}
      <span className={`value ${typeOfValue}`}>{String(value)}</span>
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
    const innerText = cachedPathValue.get(property);
    setValue(innerText || "");
  }, [property]);

  const dataTree = useMemo(() => {
    cachedPathValue.clear();
    return renderValue("res", data, "", onClick);
  }, [data]);

  return (
    <div className="json-explorer">
      <input type="text" value={property} onChange={onChange}></input>
      <label>{value}</label>
      {dataTree}
    </div>
  );
};

export default JSONExplorer;
