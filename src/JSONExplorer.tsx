import React, { useEffect, useMemo, useState } from "react";
import "./JSONExplorer.scss";

type JSONValue =
  | string
  | number
  | boolean
  | JSONValue[]
  | undefined
  | null
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
      onClick={onClick ? () => onClick(path) : undefined}
    >
      {key}
    </span>
  );
};

const buildPath = (key: string, path?: string, isArrayIndex?: boolean) => {
  if (!path) {
    return key;
  }
  if (isArrayIndex) {
    return `${path}[${key}]`;
  }
  return `${path}.${key}`;
};

const renderValue = (
  key: string,
  value: JSONValue,
  path?: string,
  onClick?: (path: string) => void,
  isArrayIndex?: boolean
) => {
  const typeOfValue = typeof value;
  const currentPath = buildPath(key, path, isArrayIndex);

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

  if (typeOfValue === "object" && value !== null) {
    const objectList = (
      <ul className="object">
        {Object.entries(value as Object).map(([subKey, subValue]) =>
          renderValue(subKey, subValue, currentPath, onClick)
        )}
      </ul>
    );
    return path ? <li key={key}>{objectList}</li> : objectList;
  }

  const valueString = String(value);
  cachedPathValue.set(currentPath, valueString);
  return (
    <li key={key}>
      {renderKey(key, currentPath, onClick)}
      <span className={`value ${typeOfValue}`}>{valueString}</span>
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
    if (!property) {
      setValue("");
      return;
    }
    const innerText = cachedPathValue.get(property);
    setValue(innerText || "undefined");
  }, [property]);

  const dataTree = useMemo(() => {
    cachedPathValue.clear();
    return renderValue("data", data, undefined, onClick);
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
