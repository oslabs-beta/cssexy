import { cssPropertyList } from './cssPropertyList.js';

const getCssValueOptions = (cssProp) => {
    let arr = [];
    if (cssPropertyList[cssProp.name] && cssPropertyList[cssProp.name].values) {
        // console.log('cssPropertyList[cssProp.name].values', cssPropertyList[cssProp.name].values);

        cssPropertyList[cssProp.name].values.forEach((value) => {
            if (!value.includes('[')) {
                arr.push(value);
            }
        })
        return arr
    }

}

export { getCssValueOptions };
