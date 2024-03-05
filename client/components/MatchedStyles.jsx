import React from 'react';
import { useSelector } from 'react-redux';

/* Matched styles include:
1) styles defined in .css files called 'regular' styles
2) default browser styles called 'user agent' styles*/

function MatchedStyles(){
    const matchedStyles = useSelector(state => state.styles.matchedStyles); 

    for (let style of matchedStyles) {
        if (style.rule.origin === 'regular') {
            const selector = style.rule.selectorList.selectors[0].text;
            const userDefinedStyles = style.rule.style.cssProperties;
            for (let property of userDefinedStyles) {
                if (property.text) console.log('Style applied by user:   ', property.name, ': ', property.value);
            }
        }
    }

    return (
        <h3>Matched Styles Component</h3>
    )
};

export default MatchedStyles;