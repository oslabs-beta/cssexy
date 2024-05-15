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
    // finds highest specificity among all selectors based on matchingSelectors array and sets it as a new property 'calculatedSpecificity' on each rule
    setSpecificity: state => {
      const allStyles = [state.userAgentRules, state.regularRules, state.inlineRules];

      const compareSpecificity = (obj1, obj2) => {
        if (obj1.specificity.a !== obj2.specificity.a) {
          return obj1.specificity.a > obj2.specificity.a ? 1 : -1;
        }
        // If 'a' values are equal, compare the 'b' values
        else if (obj1.specificity.b !== obj2.specificity.b) {
          return obj1.specificity.b > obj2.specificity.b ? 1 : -1;
        }
        // If 'b' values are equal, compare the 'c' values
        else if (obj1.specificity.c !== obj2.specificity.c) {
          return obj1.specificity.c > obj2.specificity.c ? 1 : -1;
        }
        else return 0;
      };

      allStyles.forEach(array => {
        array.forEach(each => {
          let specificity;
          if (each.rule.origin === 'inline') {
            // inline styles have the highest specificity' => hard coding at 999 should ensure inline styles have the highest specificity among other styles
            specificity = {
              'a': 9,
              'b': 9,
              'c': 9
            }
          }
          // origin is regular/ user-agent
          else {
            // matchingSelectors array contains indices of selectors matching css rules. In most cases there's only 1 selector
            if (each.matchingSelectors.length === 1) {
              specificity = each.rule.selectorList.selectors[each.matchingSelectors[0]].specificity;
            }
            else {
              // example of cases with multiple selectors:
              // react: <button className='btn' id='active'></button>
              // css file: .btn, #active { background: pink};
              // in case above, matchingSelectors will point to 2 selectors inside selectorList.selectors array, and specificity for this rule set has to be set at highest specificity among the 2
              let bestSelector = each.rule.selectorList.selectors[each.matchingSelectors[0]];
              for (let selectorIdx of each.matchingSelectors) {
                const curSelector = each.rule.selectorList.selectors[selectorIdx];
                if (compareSpecificity(bestSelector, curSelector) === -1) bestSelector = curSelector;
              };
              specificity = bestSelector.specificity;
            }
          };

          each.calculatedSpecificity = specificity;
        });
      });

    },
    findActiveStyles: (state) => {
      const cache = {};

      const allStyles = [state.userAgentRules, state.regularRules, state.inlineRules];

      const compareSpecificity = (obj1, obj2) => {
        if (obj1.specificity.a !== obj2.specificity.a) {
          return obj1.specificity.a > obj2.specificity.a ? 1 : -1;
        }
        // If 'a' values are equal, compare the 'b' values
        else if (obj1.specificity.b !== obj2.specificity.b) {
          return obj1.specificity.b > obj2.specificity.b ? 1 : -1;
        }
        // If 'b' values are equal, compare the 'c' values
        else if (obj1.specificity.c !== obj2.specificity.c) {
          return obj1.specificity.c > obj2.specificity.c ? 1 : -1;
        }
        else return 0;
      };

      // for all types for styles, add the styles which have isActive property to cache
      // if parent and children properties are present (e.g. 'border', 'border-style', 'border-top-style'), they should be all added into an array corresponding to highest level property (border: [border obj, border-style obj, border-top-style obj])
      allStyles.forEach(array => {
        array.forEach(each => {
          let specificity = each.calculatedSpecificity;
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
                      source: prop,
                      origin
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
                      source: prop,
                      origin
                    });
                  }
                  // checks if cur property is high level property (e.g.'border') or standalone property with no corresponding shorthand/longhand
                  else {
                    if (!cache[prop.name]) cache[prop.name] = [];
                    cache[prop.name].push({
                      specificity,
                      source: prop,
                      origin
                    });
                  };
                };
              };
            });
          };

          bundleRelatedProperties(each.rule.origin, properties);
        });
      });

      const compareOriginsAndNames = (obj1, obj2) => {
        const score = {
          ['user-agent']: 0,
          regular: 10,
          inline: 20
        };

        if (score[obj1.origin] !== score[obj2.origin]) {
          return score[obj1.origin] > score[obj2.origin] ? 1 : -1;
        }
        // If specificity and origins are the same but property names are different, we want to keep both as active
        else if (score[obj1.origin] === score[obj2.origin] && obj1.source.name !== obj2.source.name) return 1;
        // if specificities, origins and property names are all the same, keep the latter one reflecting cascading nature of css rules
        else if (score[obj1.origin] === score[obj2.origin] && obj1.source.name === obj2.source.name) return -1;
        // IF YOU'RE GETTING THE ERROR BELOW, COMMENT THE ELSE BLOCK OUT AND TELL ELENA TO INVESTIGATE
        else {
          throw new Error(`Error in rulesSlice.js: findActiveStyles reducer: compare func \n\nStyle-1: ${JSON.stringify(obj1)} \n\nStyle-2: ${JSON.stringify(obj2)}`);
        }
      };

      for (let key in cache) {
        if (cache[key].length > 1) {
          // Step 1: find max specificity and count how many objs have max specificity. Also handles !important tags
          let bestObj = cache[key][0];
          const countCache = {};

          cache[key].forEach(curObj => {
            // styles with !important tag have property 'important' set to true
            // by adding 10 to their specificity we make their specificity higher than inline styles (which have specificity 999). But we want to maintain 'actual specificity + 10' for cases when there're multiple !important styles. In this case, !important styles will be higher than any other styles, but we want to compare among !important styles themselves and choose the prevailing one, that's why we keep their original specificity but increasing it by 10.
            if (curObj.source.important) {
              curObj.specificity.a += 10;
              curObj.specificity.b += 10;
              curObj.specificity.c += 10;
            }

            // find max specificity and count how many objs have max specificity
            const curSpecificity = `${curObj.specificity.a}${curObj.specificity.b}${curObj.specificity.c}`;
            if (!countCache[curSpecificity]) countCache[curSpecificity] = 0;
            countCache[curSpecificity]++;

            if (compareSpecificity(bestObj, curObj) === -1) {
              bestObj.source.isActive = false;
              bestObj = curObj;
            }
          })

          // Step 2: turn off isActive for everything that is less than max specificity
          cache[key].forEach(obj => {
            if (compareSpecificity(bestObj, obj) === 1) obj.source.isActive = false;
          });

          // Step 3: If there're more than 1 active max specificities, compare them by other parameters
          // this comparison accounts for cases: 1) when specificities are same but origins are different, and
          // 2) when all specificities, origins and property names are the same - applying rule of cascading styles (latter overwrites previous)
          const maxSpecificity = `${bestObj.specificity.a}${bestObj.specificity.b}${bestObj.specificity.c}`;
          if (countCache[maxSpecificity] > 1) {
            const bestObjs = cache[key].filter(obj => obj.source.isActive === true);

            let bestObj = bestObjs[0];
            for (let i = 1; i < bestObjs.length; i++) {
              const curObj = bestObjs[i];
              if (compareOriginsAndNames(bestObj, curObj) === -1) {
                bestObj.source.isActive = false;
                bestObj = curObj;
              }
            }
          }
        }
      }

      state.isActiveCache = cache;
    },
    resetCache: (state) => {
      state.shortToLongMap = {};
      state.longToShortMap = {};
      state.midToShortMap = {};
      state.isActiveCache = {};
    },
    updateStyleSheets: (state, action) => {
      // console.log('rulesSlice: state.styleSheets: updated', action.payload);
      state.styleSheets = action.payload;
    },
  },
});

const initialNodeDataState = {
  data: {},
  error: null, // if we want to track errors
};

const nodeDataSlice = createSlice({
  name: 'nodeData',
  // createSlice expects the initial state to be passed as 'initialState'.
  // so we pass initialNodeDataState as the value of 'initialState'.
  initialState: initialNodeDataState,
  reducers: {
    // every time user selects a DOM element, inline, regular, and user-agent rules are dispatched by the iFrameComp, updating the store via the reducers below.
    updateNodeData: (state, action) => {
      // console.log('nodeDataSlice: state.nodeData: updated', action.payload);
      // console.log('\n\n\n');
      state.data = action.payload;
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
  setIsActiveFlag,
  setSpecificity,
  resetCache
} = rulesSlice.actions;

export const {
  updateNodeData
} = nodeDataSlice.actions;

export const rulesReducer = rulesSlice.reducer;
export const nodeDataReducer = nodeDataSlice.reducer;
