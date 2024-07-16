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

function describeNumber(value: number): string {
  if (Number.isNaN(value)) {
    return "NaN";
  }
  if (value === Infinity || value === -Infinity) {
    return `infinity`;
  }
  if (Number.isInteger(value)) {
    return `integer`;
  }
  return `float`;
}

const isArrayIndex = (key: string) => {
  return !isNaN(Number(key));
};

const buildPath = (key: string, path?: string) => {
  if (!path) {
    return key;
  }
  if (isArrayIndex(key)) {
    return `${path}[${key}]`;
  }
  return `${path}.${key}`;
};

const renderKey = (
  key: string,
  path: string,
  onClick?: (path: string) => void
) => {
  const clickable = onClick ? "clickable" : "";
  const unselectable = isArrayIndex(key) ? "unselectable" : "";
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

const renderValue = (
  key: string,
  value: JSONValue,
  path?: string,
  onClick?: (path: string) => void
) => {
  const currentPath = buildPath(key, path);

  if (Array.isArray(value)) {
    return (
      <li key={key}>
        {renderKey(key, currentPath)} {"["}
        <ul className="array">
          {value.map((item, index) =>
            renderValue(String(index), item, currentPath, onClick)
          )}
        </ul>
        {"],"}
      </li>
    );
  }

  if (typeof value === "object" && value !== null) {
    const isFirst = !path;
    const objectList = (
      <>
        {!isFirst && "{"}
        <ul className="object">
          {Object.entries(value).map(([objectKey, objectValue]) =>
            renderValue(objectKey, objectValue, currentPath, onClick)
          )}
        </ul>
        {!isFirst && "},"}
      </>
    );
    return !isFirst ? <li key={key}>{objectList}</li> : objectList;
  }

  const valueString = String(value);
  cachedPathValue.set(currentPath, valueString);

  const isString = typeof value === "string";
  const isNumber = typeof value === "number" ? describeNumber(value) : "";

  return (
    <li key={key}>
      {renderKey(key, currentPath, onClick)}
      {isString && "'"}
      <span className={`value ${typeof value} ${isNumber}`}>{valueString}</span>
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
