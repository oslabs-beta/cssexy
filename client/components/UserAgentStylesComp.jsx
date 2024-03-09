import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Style from './Style.jsx';

function UserAgentStylesComp() {
    const allStyles = useSelector(state => state.styles.allStyles);
    const [longhandGetter, setLonghandGetter] = useState(null);
    let selector;
    const longShortMap = new Set();
    const userAgentStyles = {};
    const userAgentStylesAr = [];

    useEffect(() => {
        setLonghandGetter(document.querySelector('#longhand-getter'));
    }, []);

    if (longhandGetter) {
        allStyles.forEach((style) => {
            if (style.rule.origin === 'user-agent') {
                // get only the first selector, because this is how it is in the chrome dev tools 
                if (!selector) selector = style.rule.selectorList?.selectors[0].text;
    
                // iterate through shorthand styles and generate the map, which will be used to ignore all longhand styles corresponding to the shorthand styles
                // ex of shorthand style: padding
                // ex of longhand styles: padding-left, padding-right, padding-top, padding-bottom
                const shorthandStyles = style.rule.style.shorthandEntries;
                if (shorthandStyles.length) {
                    for (let shortStyle of shorthandStyles) {
                        if (shortStyle.value) userAgentStyles[shortStyle.name] = shortStyle.value;
                        // get all longhand properties, save them to the map and reset dummy html el for the next iteration
                        longhandGetter.style.setProperty(shortStyle.name, shortStyle.value);
                        const longhandStyles = [...longhandGetter.style];
                        longhandStyles.forEach(ls => longShortMap.add(ls));
                        longhandGetter.style.removeProperty(shortStyle.name);
                    }
                };

                for (let cssProperty of style.rule.style.cssProperties) {
                    if (!longShortMap.has(cssProperty.name) && cssProperty.value) userAgentStyles[cssProperty.name] = cssProperty.value;
                }
            };
        })

        for (let style in userAgentStyles) {
            userAgentStylesAr.push({
                name: style,
                value: userAgentStyles[style]
            })
        }
    };
    
    return (
        <div>
            <h3>Browser default styles</h3>
            <Style 
                selector={selector}
                cssProperties={userAgentStylesAr}
                origin={'user-agent'}
            />
        </div>
    )
};

export default UserAgentStylesComp;