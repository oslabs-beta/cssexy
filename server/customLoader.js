export function customLoader(source) {
    console.log(source)
    return source.replace(
      /_react\.default\.createElement\(([^,]+),\s*({[^}]*})/g,
      (match, p1, p2) => `_react.default.createElement(${p1}, { ...${p2}, yourCustomProp: "value" }`
    );
  };
  