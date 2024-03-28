import { createSlice } from "@reduxjs/toolkit";

// regularRules are styles specified in .css files (origin=regular)
// inlineRules are styles specified directly on components (origin=inline)
// userAgentRules are default browser styles (origin=user-agent)
const initialState = {
  regularRules: [],
  inlineRules: [],
  userAgentRules: [],
  inheritedRules: [],
  keyframeRules: [],
  styleSheets: {},
  loaded: false, // if we want to track if styles have been loaded
  error: null, // if we want to track errors
  shortToLongMap: {},
  longToShortMap: {},
  // stores mapping between mid level properties and its high level parent (border-style: border)
  midToShortMap: {},
  isActiveCache: {},
};

const rulesSlice = createSlice({
  name: 'rules',
  initialState,
  reducers: {
    // every time user selects a DOM element, inline, regular, and user-agent rules are dispatched by the iFrameComp, updating the store via the reducers below.
    updateInlineRules: (state, action) => {
      // console.log('rulesSlice: state.inlineRules: updated', action.payload);
      state.inlineRules = action.payload;
    },
    updateRegularRules: (state, action) => {
      // console.log('rulesSlice: state.regularRules: updated', action.payload);
      state.regularRules = action.payload;
    },
    updateUserAgentRules: (state, action) => {
      // console.log('rulesSlice: state.userAgentRules: updated', action.payload);
      state.userAgentRules = action.payload;
    },
    updateInheritedRules: (state, action) => {
      // console.log('rulesSlice: state.inheritedRules: updated', action.payload);
      state.inheritedRules = action.payload;
    },
    updateKeyframeRules: (state, action) => {
      // console.log('rulesSlice: state.keyframeRules: updated', action.payload);
      state.keyframeRules = action.payload;
    },
    updateStyleSheets: (state, action) => {
      // console.log('rulesSlice: state.styleSheets: updated', action.payload);
      state.styleSheets = action.payload;
    },
    // iterates over shorthandEntries arr on all types of styles, builds: 
    // 1) mapping of each shorthand property to corresponding longhand properties and saves to shortToLongMap state;
    // 2) reverse mapping of each longhand property to its corresponding shorthand property and saves to longToShortMap state
    updateShortLongMaps: (state) => {
      const dummy = document.querySelector('#longhand-getter');

      const allStyles = [state.userAgentRules, state.regularRules, state.inlineRules];

      // gets all longhand styles for passed in shorthand and update shortToLongMap and longToShortMap redux state
      const getLonghandStyles = (dummy, propName, propVal, shortToLongMap, longToShortMap) => {
        // assign 1 shorthand property to a dummy DOM element
        dummy.style.setProperty(propName, propVal);
        // get names of all longhand properties corresponding to a shorthand property
        const longhandProps = [...dummy.style];
        // for each shorthand, add all corresponding longhands to shortToLongMap state. If longhandProps array has only 1 element, propName passed in was not a shorthand
        if (longhandProps.length > 1) {
          shortToLongMap[propName] = longhandProps;
          // for each longhand, add its shorthand property to longToShortMap state
          longhandProps.forEach(ls => {
            if (!longToShortMap[ls]) {
              longToShortMap[ls] = {
                allParents: [],
                highestParent: ''
              }
            }
            longToShortMap[ls].allParents.push(propName);
          });
        }
        // reset the dummy element for the next iteration
        dummy.style.removeProperty(propName);
      };

      allStyles.forEach(array => {
        array.forEach(each => {
          for (let shortProp of each.rule.style.shorthandEntries) {
            // only add props to maps which have valid values and not add them again if they're already in the maps
            if (shortProp.value && !state.shortToLongMap[shortProp.name]) {
              getLonghandStyles(dummy, shortProp.name, shortProp.value, state.shortToLongMap, state.longToShortMap);
            }
          };

          for (let cssProperty of each.rule.style.cssProperties) {
            if (each.rule.origin === 'regular' && 
                cssProperty.text &&
                !state.shortToLongMap[cssProperty.name]) {
              getLonghandStyles(dummy, cssProperty.name, cssProperty.value, state.shortToLongMap, state.longToShortMap);
            }
          }
        })
      })
    },
    // iterates over all longhand properties from longToShort redux state, identifies high level vs mid level properties and adds them to midToShortMap in redux state (mid is mid level, short is high level, e.g. border-style: border)
    updateMidShortMap: (state) => {
      for (let longhand in state.longToShortMap) {
        const parentCandidates = state.longToShortMap[longhand].allParents;
        // If array has more than 1 element, that would mean that this is a complex hierarchy (high-mid-low) => need to add to midToShortMap
        let minChars = Infinity;
        let parent;
        
        // find high level parent
        parentCandidates.forEach(candidate => {
          if (candidate.length < minChars) {
            minChars = candidate.length;
            parent = candidate;
          };
        });
        // for each longhand set its high level parent
        state.longToShortMap[longhand].highestParent = parent;

        // assumption is that high level properties (e.g. border) will have shorter length than mid-level (e.g. border-style). This should work in majority cases
        if (parentCandidates.length > 1) {
          // find all mid level styles and add them to midToShortMap
          parentCandidates.forEach(candidate => {
            if (candidate !== parent) {
              if (!state.midToShortMap[candidate]) state.midToShortMap[candidate] = parent;
            }
          });
        }
      }
    },
    // iterates over all types of styles and sets isActive flag only on the css properties which get rendered
    setIsActiveFlag: (state) => {
      const allStyles = [state.userAgentRules, state.regularRules, state.inlineRules];

      allStyles.forEach(array => {
        array.forEach(each => {
          // for user-agent styles, if shorthands are available they get rendered => add isActive for all shorthand properties first
          if (each.rule.origin === 'user-agent' && each.rule.style.shorthandEntries.length) {
            for (let shortStyle of each.rule.style.shorthandEntries) {
              if (shortStyle.value) shortStyle.isActive = true;
            }
          };

          for (let cssProperty of each.rule.style.cssProperties) {
            // for user-agent styles, only longhand properties which do not have corresponding shorthand properties get rendered. If property is in longToShortMap it means it was already added as a shorthand property
            if ((each.rule.origin === 'user-agent' && cssProperty.value && !state.longToShortMap[cssProperty.name]) ||
                // for regular and inline styles, add isActive only to user-defined properties (which have text property on them)
                (each.rule.origin === 'regular' && cssProperty.text) ||
                (each.rule.origin === 'inline' && cssProperty.text)) {
                  cssProperty.isActive = true;
                }
          }
        })
      });
    },
    findActiveStyles: (state) => {
      const cache = {};

      const allStyles = [state.userAgentRules, state.regularRules, state.inlineRules];

      // for all types for styles, add the styles which have isActive property to cache
      // if parent and children properties are present (e.g. 'border', 'border-style', 'border-top-style'), they should be all added into an array corresponding to highest level property (border: [border obj, border-style obj, border-top-style obj])
      allStyles.forEach(array => {
        array.forEach(each => {
          let specificity;
          if (each.rule.origin === 'inline') {
            // temporarily hardcoded until researched how to set specificity for inline styles (CDP returns inline styles without specificity and per Chat GPT 'inline styles have inherently highest specificity')
            specificity = {
              "a": 9,
              "b": 9,
              "c": 9
            }
          } else specificity = each.rule.selectorList.selectors[each.matchingSelectors[0]].specificity;

          let properties;
          if (each.rule.origin === 'user-agent') properties = [each.rule.style.shorthandEntries, each.rule.style.cssProperties];
          else properties = [each.rule.style.cssProperties];

          const bundleRelatedProperties = (origin, targetProps) => {
            targetProps.forEach(arr => {
              for (let prop of arr) {
                if (prop.hasOwnProperty('isActive')) {
                  // checks if cur property is a mid level property (has a high level parent)
                  // e.g. if 'border-width' has a parent and it does ('border'), push it to property 'border' of isActiveCache
                  if ((origin === 'user-agent' && state.midToShortMap[prop.name]) ||
                    // regular/inline properties which have 'longhandProperties' array are shorthands - either high or mid level
                      ((origin === 'regular' || origin === 'inline') && prop.longhandProperties && state.midToShortMap[prop.name])) {
                    const highLevelProp = state.midToShortMap[prop.name];
                    if (!cache[highLevelProp]) cache[highLevelProp] = [];
                    cache[highLevelProp].push({
                      specificity,
                      source: prop
                    });
                  }
                  // checks if cur property is a longhand property which has a shorthand parent)
                  // e.g. if 'background-image' has a parent and it does ('background'), push it to property 'background' of isActiveCache  
                  else if ((origin === 'user-agent' && state.longToShortMap[prop.name]) || 
                          ((origin === 'regular' || origin === 'inline') && !prop.longhandProperties && state.longToShortMap[prop.name])) {
                    const highLevelProp = state.longToShortMap[prop.name].highestParent;
                    if (!cache[highLevelProp]) cache[highLevelProp] = [];
                    cache[highLevelProp].push({
                      specificity,
                      source: prop
                    });
                  }
                  // checks if cur property is high level property (e.g.'border') or standalone property with no corresponding shorthand/longhand
                  else {
                    if (!cache[prop.name]) cache[prop.name] = [];
                    cache[prop.name].push({
                      specificity,
                      source: prop
                    });
                  };
                };
              };
            });
          };

          bundleRelatedProperties(each.rule.origin, properties);
        });
      });

      const compareSpecificity = (specificity1, specificity2) => {
        if (specificity1.a !== specificity2.a) {
          return specificity1.a > specificity2.a ? 1 : -1;
        }
        // If 'a' values are equal, compare the 'b' values
        if (specificity1.b !== specificity2.b) {
          return specificity1.b > specificity2.b ? 1 : -1;
        }
        // If 'b' values are equal, compare the 'c' values
        if (specificity1.c !== specificity2.c) {
          return specificity1.c > specificity2.c ? 1 : -1;
        }
        // If all values are equal, the specificities are equal
        return 0;
      };

      // go through cache and update isActive flag to false when needed
      for (let key in cache) {
        // if only 1 prop in array, it means there're no similar styles => no need to update isActive
        if (cache[key].length > 1) {
          let maxSpecificity = cache[key][0].specificity;
          let maxSource = cache[key][0].source;
          maxSource.isActive = true;

          for (let i = 1; i < cache[key].length; i++) {
            const item = cache[key][i];
            const result = compareSpecificity(maxSpecificity, item.specificity);

            // if 2 specificies are the same, the latter takes precedence
            if (result === -1 || result === 0) {
              maxSource.isActive = false;
              maxSpecificity = item.specificity;
              maxSource = item.source;
              maxSource.isActive = true;          
            }
            else if (result === 1) {
              item.source.isActive = false;
            }
          }
        }
      };

      state.isActiveCache = cache;
    },
  },
});

export const {
  updateInlineRules,
  updateRegularRules,
  updateUserAgentRules,
  updateInheritedRules,
  updateKeyframeRules,
  updateStyleSheets,
  findActiveStyles, 
  updateShortLongMaps,
  updateMidShortMap,
  setIsActiveFlag 
} = rulesSlice.actions;

export default rulesSlice.reducer;
