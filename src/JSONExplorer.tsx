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
  const clickable = onClick ? "clickable" : "";
  const unselectable = !isNaN(Number(key)) ? "unselectable" : "";

  return (
    <>
      <span
        className={`key ${clickable} ${unselectable}`}
        onClick={onClick ? () => onClick(path) : undefined}
      >
        {key}
      </span>
      <span className={unselectable}>{": "}</span>
    </>
  );
};

const buildPath = (key: string, path?: string) => {
  if (!path) {
    return key;
  }
  if (!isNaN(Number(key))) {
    return `${path}[${key}]`;
  }
  return `${path}.${key}`;
};

const renderValue = (
  key: string,
  value: JSONValue,
  path?: string,
  onClick?: (path: string) => void
) => {
  const typeOfValue = typeof value;
  const currentPath = buildPath(key, path);

  if (Array.isArray(value)) {
    return (
      <li key={key}>
        {renderKey(key, currentPath)} {"["}
        <ul className="array">
          {value.map((item, index) =>
            renderValue(index.toString(), item, currentPath, onClick)
          )}
        </ul>
        {"],"}
      </li>
    );
  }

  if (typeOfValue === "object" && value !== null) {
    const isFirst = !path;
    const renderObject = () => (
      <>
        {!isFirst && "{"}
        <ul className="object">
          {Object.entries(value as Object).map(([subKey, subValue]) =>
            renderValue(subKey, subValue, currentPath, onClick)
          )}
        </ul>
        {!isFirst && "},"}
      </>
    );
    return isFirst ? renderObject() : <li key={key}>{renderObject()}</li>;
  }

  const isString = typeOfValue === "string";
  const valueString = String(value);
  cachedPathValue.set(currentPath, valueString);
  return (
    <li key={key}>
      {renderKey(key, currentPath, onClick)}
      {isString && "'"}
      <span className={`value ${typeOfValue}`}>{valueString}</span>
      {isString && "'"},
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
      <input
        type="text"
        value={property}
        placeholder="Property"
        onChange={onChange}
      />
      <aside>{value}</aside>
      {dataTree}
    </div>
  );
};

export default JSONExplorer;
