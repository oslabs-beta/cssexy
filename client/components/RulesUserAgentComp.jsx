import React from 'react';
import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';
import SidebarStyling from './SidebarStyling.jsx';

/* Styles included: default browser styles*/

function RulesUserAgentComp() {
    const userAgentRulesData = useSelector(state => state.rules.userAgentRules);
    const shortToLongMap = useSelector(state => state.rules.shortToLongMap);

    let userAgentSelector;
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

    userAgentRulesData.forEach(style => {
        // user-agent styles typically have only 1 matching selector
        if (style.matchingSelectors.length === 1) {
            userAgentSelector = style.rule.selectorList.selectors[style.matchingSelectors[0]].text;
            // we are only showing valid selectors which have styles attached to them
            if (style.rule.style.cssProperties.length && !userAgentRules[userAgentSelector]) userAgentRules[userAgentSelector] = {};
        }
        // if you encounter the error below, add the logic that iterates through all matching selectors and finds the one with highest specificity
        else throw new Error('MULTIPLE MATCHING SELECTORS ARE FOUND IN "matchingSelectors" ARRAY!');

        // add all longhand properties
        for (let cssProperty of style.rule.style.cssProperties) {
            if (cssProperty.value) {
                userAgentRules[userAgentSelector][cssProperty.name] = {
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
                    userAgentRules[userAgentSelector][shortStyle.name] = {
                        val: shortStyle.value,
                        isActive: shortStyle.isActive
                    };

                    // get and remove longhand properties corresponding to each shorthand
                    const longhands = shortToLongMap[shortStyle.name];
                    longhands.forEach(lh => {
                        if (userAgentRules[userAgentSelector][lh]) delete userAgentRules[userAgentSelector][lh];
                    })
                }
            }
        }
    });

    const sidebarStylingComponents = [];
    for (let selector in userAgentRules) {
        sidebarStylingComponents.push(
            <SidebarStyling
                key={nanoid()}
                selector={selector}
                cssProperties={ObjToArr(userAgentRules[selector])}
                origin='user-agent'
            />
        )
    }

    return (
        <div>
            <h4>user agent</h4>
            {/* making this conditionally rendered as otherwise there is a bottom border where there's not one for inline and regular */}
            {sidebarStylingComponents.length > 0 && sidebarStylingComponents}
        </div>
    )
};

export default RulesUserAgentComp;
