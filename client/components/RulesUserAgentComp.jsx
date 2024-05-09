import React from 'react';
import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';
import SidebarStyling from './SidebarStyling.jsx';

/* Styles included: default browser styles*/

function RulesUserAgentComp() {
    const userAgentRulesData = useSelector(state => state.rules.userAgentRules);
    const shortToLongMap = useSelector(state => state.rules.shortToLongMap);    
    // userAgentRules stores data by selector, so that we can display <SidebarStyling/> by selector
    const userAgentRules = {};

    const ObjToArr = stylesObj => {
        const arr = [];
        for (let style in stylesObj) {
            arr.push({
                name: style,
                value: stylesObj[style].val,
                isActive: stylesObj[style].isActive
            })
        }
        return arr;
    };

    const compareSpecificityDescending = (obj1, obj2) => {
        if (obj1.specificity.a !== obj2.specificity.a) {
          return obj1.specificity.a < obj2.specificity.a ? 1 : -1;
        }
        // If 'a' values are equal, compare the 'b' values
        else if (obj1.specificity.b !== obj2.specificity.b) {
          return obj1.specificity.b < obj2.specificity.b ? 1 : -1;
        }
        // If 'b' values are equal, compare the 'c' values
        else if (obj1.specificity.c !== obj2.specificity.c) {
          return obj1.specificity.c < obj2.specificity.c ? 1 : -1;
        }
        else return 0;
    };

    userAgentRulesData.forEach(style => {
        let userAgentSelector;
        // user-agent styles typically have only 1 matching selector
        if (style.matchingSelectors.length === 1) {
            userAgentSelector = style.rule.selectorList.selectors[style.matchingSelectors[0]].text;
            const specificity = style.calculatedSpecificity;
            // we are only showing valid selectors which have styles attached to them
            if (style.rule.style.cssProperties.length) {
                if (!userAgentRules[userAgentSelector]) {
                    userAgentRules[userAgentSelector] = {
                        properties: {},
                        specificity
                    };
                };
            };
        }
        // if you encounter the error below, add the logic that iterates through all matching selectors and finds the one with highest specificity
        else throw new Error('MULTIPLE MATCHING SELECTORS ARE FOUND IN "matchingSelectors" ARRAY!');

        // add all longhand properties
        for (let cssProperty of style.rule.style.cssProperties) {
            if (cssProperty.value) {
                userAgentRules[userAgentSelector]['properties'][cssProperty.name] = {
                    val: cssProperty.value,
                    isActive: cssProperty.isActive
                }
            }
        }
        const shorthandStyles = style.rule.style.shorthandEntries;
        if (shorthandStyles.length) {
            for (let shortStyle of shorthandStyles) {
                // add all shorthand properties
                if (shortStyle.value) {
                    userAgentRules[userAgentSelector]['properties'][shortStyle.name] = {
                        val: shortStyle.value,
                        isActive: shortStyle.isActive
                    };

                    // get and remove longhand properties corresponding to each shorthand
                    const longhands = shortToLongMap[shortStyle.name];
                    longhands.forEach(lh => {
                        if (userAgentRules[userAgentSelector]['properties'][lh]) delete userAgentRules[userAgentSelector]['properties'][lh];
                    })
                }
            }
        }
    });

    // convert userAgentRules object into array, sort it by specificity in descending order and generate jsx components to render
    const userAgentRulesAr = [];
    for (let selector in userAgentRules) {
        userAgentRulesAr.push({
            selector: selector,
            properties: userAgentRules[selector].properties,
            specificity: userAgentRules[selector].specificity
        });
    };

    userAgentRulesAr.sort(compareSpecificityDescending);
    
    const sidebarStylingComponents = userAgentRulesAr.map(each => {
        return (
            <SidebarStyling
                key={nanoid()}
                selector={each.selector}
                cssProperties={ObjToArr(each.properties)}
                origin='user-agent'
            />
        )
    });
   
    return (
        <div>
            <h4>user agent</h4>
            {/* making this conditionally rendered as otherwise there is a bottom border where there's not one for inline and regular */}
            {sidebarStylingComponents.length > 0 && sidebarStylingComponents}
        </div>
    )
};

export default RulesUserAgentComp;
