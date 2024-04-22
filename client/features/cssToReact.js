// cssToReact.js

function cssToReact(cssText) {
  const rules = cssText.split(';').filter(rule => rule.trim() !== '');
  const styleObj = {};

  for (let rule of rules) {
    const [property, value] = rule.split(':').map(part => part.trim());
    if (property && value) {
      const camelCaseProperty = camelize(property);
      if (shorthandProperties[camelCaseProperty]) {
        const expandedProps = expandShorthandProperty(camelCaseProperty, value);
        Object.assign(styleObj, expandedProps);
      } else {
        styleObj[camelCaseProperty] = convertValue(value);
      }
    }
  }

  return Object.entries(styleObj).map(([key, value]) => `${key}: '${value}'`).join(', ');
}

function expandShorthandProperty(property, value) {
  const expandedProps = {};
  const values = value.split(/\s+/);

  switch (property) {
    case 'inset':
      case 'padding':
        const [topInset, rightInset = topInset, bottomInset = topInset, leftInset = rightInset] = values;
        expandedProps[`top`] = convertValue(topInset);
        expandedProps[`right`] = convertValue(rightInset);
        expandedProps[`bottom`] = convertValue(bottomInset);
        expandedProps[`left`] = convertValue(leftInset);
        break;
    case 'margin':
    case 'padding':
      const [top, right = top, bottom = top, left = right] = values;
      expandedProps[`${property}Top`] = convertValue(top);
      expandedProps[`${property}Right`] = convertValue(right);
      expandedProps[`${property}Bottom`] = convertValue(bottom);
      expandedProps[`${property}Left`] = convertValue(left);
      break;
    case 'borderWidth':
    case 'borderRadius':
      const [topLeft, topRight = topLeft, bottomRight = topLeft, bottomLeft = topRight] = values;
      expandedProps[`${property}TopLeft`] = convertValue(topLeft);
      expandedProps[`${property}TopRight`] = convertValue(topRight);
      expandedProps[`${property}BottomRight`] = convertValue(bottomRight);
      expandedProps[`${property}BottomLeft`] = convertValue(bottomLeft);
      break;
    case 'flexFlow':
      const [flexDirection = 'row', flexWrap = 'nowrap'] = values;
      expandedProps.flexDirection = flexDirection;
      expandedProps.flexWrap = flexWrap;
      break;
// more shorthand properties...
    // default:
      // break;
  }

  return expandedProps;
}

const shorthandProperties = {
  inset: true,
  margin: true,
  padding: true,
  borderWidth: true,
  borderRadius: true,
  flexFlow: true,
  // more shorthand properties...
};

function convertValue(value) {
  if (/^\d+$/.test(value)) {
    return Number(value);
  } else if (/^\d+px$/.test(value)) {
    return Number(value.replace('px', ''));
  } else if (/^\d+%$/.test(value)) {
    return value;
  } else {
    return value;
  }
}

function camelize(str) {
  return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
}


// const cssText = `
//   position: absolute;
//   top: 60%;
//   color: white;
//   padding: 10px 20px;
//   border-radius: 5px 10px;
//   flex-flow: column wrap;
// `;

// const reactNativeStyles = cssToReact(cssText);
// console.log(reactNativeStyles);

export { cssToReact }
