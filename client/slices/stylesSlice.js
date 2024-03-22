import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  // allStyles property includes both matchedCSSRules and inlineCSSRules
  // matchedCSSRules are styles specified in .css files (origin=regular) and default browser styles (origin=user-agent)
  // inlineCSSRules are styles specified directly on components (origin=inline)
  regularRules: [
    {
      "rule": {
        "styleSheetId": "style-sheet-33556-41",
        "selectorList": {
          "selectors": [
            {
              "text": ".btn",
              "range": {
                "startLine": 478,
                "startColumn": 0,
                "endLine": 478,
                "endColumn": 4
              },
              "specificity": {
                "a": 0,
                "b": 1,
                "c": 0
              }
            }
          ],
          "text": ".btn"
        },
        "origin": "regular",
        "style": {
          "styleSheetId": "style-sheet-33556-41",
          "cssProperties": [
            {
              "name": "width",
              "value": "100%",
              "implicit": false,
              "text": "width: 100%;",
              "disabled": false,
              "range": {
                "startLine": 479,
                "startColumn": 2,
                "endLine": 479,
                "endColumn": 14
              }
            },
            {
              "name": "border-radius",
              "value": "100px",
              "implicit": false,
              "text": "border-radius: 100px;",
              "disabled": false,
              "range": {
                "startLine": 480,
                "startColumn": 2,
                "endLine": 480,
                "endColumn": 23
              },
              "longhandProperties": [
                {
                  "name": "border-top-left-radius",
                  "value": "100px"
                },
                {
                  "name": "border-top-right-radius",
                  "value": "100px"
                },
                {
                  "name": "border-bottom-right-radius",
                  "value": "100px"
                },
                {
                  "name": "border-bottom-left-radius",
                  "value": "100px"
                }
              ]
            },
            {
              "name": "padding",
              "value": "10px",
              "implicit": false,
              "text": "padding: 10px;",
              "disabled": false,
              "range": {
                "startLine": 481,
                "startColumn": 2,
                "endLine": 481,
                "endColumn": 16
              },
              "longhandProperties": [
                {
                  "name": "padding-top",
                  "value": "10px"
                },
                {
                  "name": "padding-right",
                  "value": "10px"
                },
                {
                  "name": "padding-bottom",
                  "value": "10px"
                },
                {
                  "name": "padding-left",
                  "value": "10px"
                }
              ]
            },
            {
              "name": "background",
              "value": "#adadff",
              "implicit": false,
              "text": "background: #adadff;",
              "disabled": false,
              "range": {
                "startLine": 482,
                "startColumn": 2,
                "endLine": 482,
                "endColumn": 22
              },
              "longhandProperties": [
                {
                  "name": "background-image",
                  "value": "initial"
                },
                {
                  "name": "background-position-x",
                  "value": "initial"
                },
                {
                  "name": "background-position-y",
                  "value": "initial"
                },
                {
                  "name": "background-size",
                  "value": "initial"
                },
                {
                  "name": "background-repeat",
                  "value": "initial"
                },
                {
                  "name": "background-attachment",
                  "value": "initial"
                },
                {
                  "name": "background-origin",
                  "value": "initial"
                },
                {
                  "name": "background-clip",
                  "value": "initial"
                },
                {
                  "name": "background-color",
                  "value": "rgb(173, 173, 255)"
                }
              ]
            },
            {
              "name": "font-weight",
              "value": "bold",
              "implicit": false,
              "text": "font-weight: bold;",
              "disabled": false,
              "range": {
                "startLine": 483,
                "startColumn": 2,
                "endLine": 483,
                "endColumn": 20
              }
            },
            {
              "name": "color",
              "value": "white",
              "implicit": false,
              "text": "color: white;",
              "disabled": false,
              "range": {
                "startLine": 484,
                "startColumn": 2,
                "endLine": 484,
                "endColumn": 15
              }
            },
            {
              "name": "text-shadow",
              "value": "0 0 1px black",
              "implicit": false,
              "text": "text-shadow: 0 0 1px black;",
              "disabled": false,
              "range": {
                "startLine": 485,
                "startColumn": 2,
                "endLine": 485,
                "endColumn": 29
              }
            },
            {
              "name": "border",
              "value": "none",
              "implicit": false,
              "text": "border: none;",
              "disabled": false,
              "range": {
                "startLine": 486,
                "startColumn": 2,
                "endLine": 486,
                "endColumn": 15
              },
              "longhandProperties": [
                {
                  "name": "border-top-width",
                  "value": "initial"
                },
                {
                  "name": "border-right-width",
                  "value": "initial"
                },
                {
                  "name": "border-bottom-width",
                  "value": "initial"
                },
                {
                  "name": "border-left-width",
                  "value": "initial"
                },
                {
                  "name": "border-top-style",
                  "value": "none"
                },
                {
                  "name": "border-right-style",
                  "value": "none"
                },
                {
                  "name": "border-bottom-style",
                  "value": "none"
                },
                {
                  "name": "border-left-style",
                  "value": "none"
                },
                {
                  "name": "border-top-color",
                  "value": "initial"
                },
                {
                  "name": "border-right-color",
                  "value": "initial"
                },
                {
                  "name": "border-bottom-color",
                  "value": "initial"
                },
                {
                  "name": "border-left-color",
                  "value": "initial"
                },
                {
                  "name": "border-image-source",
                  "value": "initial"
                },
                {
                  "name": "border-image-slice",
                  "value": "initial"
                },
                {
                  "name": "border-image-width",
                  "value": "initial"
                },
                {
                  "name": "border-image-outset",
                  "value": "initial"
                },
                {
                  "name": "border-image-repeat",
                  "value": "initial"
                }
              ]
            },
            {
              "name": "font-size",
              "value": "16px",
              "implicit": false,
              "text": "font-size: 16px;",
              "disabled": false,
              "range": {
                "startLine": 487,
                "startColumn": 2,
                "endLine": 487,
                "endColumn": 18
              }
            },
            {
              "name": "width",
              "value": "100%"
            },
            {
              "name": "border-top-left-radius",
              "value": "100px"
            },
            {
              "name": "border-top-right-radius",
              "value": "100px"
            },
            {
              "name": "border-bottom-right-radius",
              "value": "100px"
            },
            {
              "name": "border-bottom-left-radius",
              "value": "100px"
            },
            {
              "name": "padding-top",
              "value": "10px"
            },
            {
              "name": "padding-right",
              "value": "10px"
            },
            {
              "name": "padding-bottom",
              "value": "10px"
            },
            {
              "name": "padding-left",
              "value": "10px"
            },
            {
              "name": "background-image",
              "value": "initial"
            },
            {
              "name": "background-position-x",
              "value": "initial"
            },
            {
              "name": "background-position-y",
              "value": "initial"
            },
            {
              "name": "background-size",
              "value": "initial"
            },
            {
              "name": "background-repeat",
              "value": "initial"
            },
            {
              "name": "background-attachment",
              "value": "initial"
            },
            {
              "name": "background-origin",
              "value": "initial"
            },
            {
              "name": "background-clip",
              "value": "initial"
            },
            {
              "name": "background-color",
              "value": "rgb(173, 173, 255)"
            },
            {
              "name": "font-weight",
              "value": "bold"
            },
            {
              "name": "color",
              "value": "white"
            },
            {
              "name": "text-shadow",
              "value": "black 0px 0px 1px"
            },
            {
              "name": "border-top-width",
              "value": "initial"
            },
            {
              "name": "border-right-width",
              "value": "initial"
            },
            {
              "name": "border-bottom-width",
              "value": "initial"
            },
            {
              "name": "border-left-width",
              "value": "initial"
            },
            {
              "name": "border-top-style",
              "value": "none"
            },
            {
              "name": "border-right-style",
              "value": "none"
            },
            {
              "name": "border-bottom-style",
              "value": "none"
            },
            {
              "name": "border-left-style",
              "value": "none"
            },
            {
              "name": "border-top-color",
              "value": "initial"
            },
            {
              "name": "border-right-color",
              "value": "initial"
            },
            {
              "name": "border-bottom-color",
              "value": "initial"
            },
            {
              "name": "border-left-color",
              "value": "initial"
            },
            {
              "name": "border-image-source",
              "value": "initial"
            },
            {
              "name": "border-image-slice",
              "value": "initial"
            },
            {
              "name": "border-image-width",
              "value": "initial"
            },
            {
              "name": "border-image-outset",
              "value": "initial"
            },
            {
              "name": "border-image-repeat",
              "value": "initial"
            },
            {
              "name": "font-size",
              "value": "16px"
            }
          ],
          "shorthandEntries": [
            {
              "name": "border-radius",
              "value": "100px"
            },
            {
              "name": "padding",
              "value": "10px"
            },
            {
              "name": "background",
              "value": "rgb(173, 173, 255)"
            },
            {
              "name": "border-width",
              "value": "initial"
            },
            {
              "name": "border-style",
              "value": "none"
            },
            {
              "name": "border-color",
              "value": "initial"
            },
            {
              "name": "border-image",
              "value": "initial"
            }
          ],
          "cssText": "\n  width: 100%;\n  border-radius: 100px;\n  padding: 10px;\n  background: #adadff;\n  font-weight: bold;\n  color: white;\n  text-shadow: 0 0 1px black;\n  border: none;\n  font-size: 16px;\n",
          "range": {
            "startLine": 478,
            "startColumn": 6,
            "endLine": 488,
            "endColumn": 0
          }
        },
        "media": [],
        "containerQueries": [],
        "supports": [],
        "layers": [],
        "scopes": [],
        "ruleTypes": []
      },
      "matchingSelectors": [
        0
      ]
    }
  ],
  inlineRules: [
    {
      "rule": {
        "origin": "inline",
        "style": {
          "styleSheetId": "4138.6",
          "cssProperties": [
            {
              "name": "translate",
              "value": "none",
              "implicit": false,
              "text": "translate: none;",
              "disabled": false,
              "range": {
                "startLine": 0,
                "startColumn": 0,
                "endLine": 0,
                "endColumn": 16
              }
            },
            {
              "name": "rotate",
              "value": "none",
              "implicit": false,
              "text": "rotate: none;",
              "disabled": false,
              "range": {
                "startLine": 0,
                "startColumn": 17,
                "endLine": 0,
                "endColumn": 30
              }
            },
            {
              "name": "scale",
              "value": "none",
              "implicit": false,
              "text": "scale: none;",
              "disabled": false,
              "range": {
                "startLine": 0,
                "startColumn": 31,
                "endLine": 0,
                "endColumn": 43
              }
            },
            {
              "name": "opacity",
              "value": "1",
              "implicit": false,
              "text": "opacity: 1;",
              "disabled": false,
              "range": {
                "startLine": 0,
                "startColumn": 44,
                "endLine": 0,
                "endColumn": 55
              }
            },
            {
              "name": "transform",
              "value": "translate(0px, 0px)",
              "implicit": false,
              "text": "transform: translate(0px, 0px);",
              "disabled": false,
              "range": {
                "startLine": 0,
                "startColumn": 56,
                "endLine": 0,
                "endColumn": 87
              }
            },
            {
              "name": "color",
              "value": "rgb(255, 255, 255)",
              "implicit": false,
              "text": "color: rgb(255, 255, 255);",
              "disabled": false,
              "range": {
                "startLine": 0,
                "startColumn": 88,
                "endLine": 0,
                "endColumn": 114
              }
            },
            {
              "name": "translate",
              "value": "none"
            },
            {
              "name": "rotate",
              "value": "none"
            },
            {
              "name": "scale",
              "value": "none"
            },
            {
              "name": "opacity",
              "value": "1"
            },
            {
              "name": "transform",
              "value": "translate(0px, 0px)"
            },
            {
              "name": "color",
              "value": "rgb(255, 255, 255)"
            }
          ],
          "shorthandEntries": [],
          "cssText": "translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px, 0px); color: rgb(255, 255, 255);",
          "range": {
            "startLine": 0,
            "startColumn": 0,
            "endLine": 0,
            "endColumn": 114
          }
        }
      }
    }
  ],
  userAgentRules: [
    {
      "rule": {
        "selectorList": {
          "selectors": [
            {
              "text": "button",
              "specificity": {
                "a": 0,
                "b": 0,
                "c": 1
              }
            }
          ],
          "text": "button"
        },
        "origin": "user-agent",
        "style": {
          "cssProperties": [
            {
              "name": "appearance",
              "value": "auto"
            }
          ],
          "shorthandEntries": []
        },
        "media": [],
        "containerQueries": [],
        "supports": [],
        "layers": [],
        "scopes": [],
        "ruleTypes": []
      },
      "matchingSelectors": [
        0
      ]
    },
    {
      "rule": {
        "selectorList": {
          "selectors": [
            {
              "text": "input",
              "specificity": {
                "a": 0,
                "b": 0,
                "c": 1
              }
            },
            {
              "text": "textarea",
              "specificity": {
                "a": 0,
                "b": 0,
                "c": 1
              }
            },
            {
              "text": "select",
              "specificity": {
                "a": 0,
                "b": 0,
                "c": 1
              }
            },
            {
              "text": "button",
              "specificity": {
                "a": 0,
                "b": 0,
                "c": 1
              }
            }
          ],
          "text": "input, textarea, select, button"
        },
        "origin": "user-agent",
        "style": {
          "cssProperties": [
            {
              "name": "margin-top",
              "value": "0em"
            },
            {
              "name": "margin-right",
              "value": "0em"
            },
            {
              "name": "margin-bottom",
              "value": "0em"
            },
            {
              "name": "margin-left",
              "value": "0em"
            },
            {
              "name": "font-style",
              "value": ""
            },
            {
              "name": "font-variant-ligatures",
              "value": ""
            },
            {
              "name": "font-variant-caps",
              "value": ""
            },
            {
              "name": "font-variant-numeric",
              "value": ""
            },
            {
              "name": "font-variant-east-asian",
              "value": ""
            },
            {
              "name": "font-variant-alternates",
              "value": ""
            },
            {
              "name": "font-variant-position",
              "value": ""
            },
            {
              "name": "font-weight",
              "value": ""
            },
            {
              "name": "font-stretch",
              "value": ""
            },
            {
              "name": "font-size",
              "value": ""
            },
            {
              "name": "font-family",
              "value": ""
            },
            {
              "name": "font-optical-sizing",
              "value": ""
            },
            {
              "name": "font-kerning",
              "value": ""
            },
            {
              "name": "font-feature-settings",
              "value": ""
            },
            {
              "name": "font-variation-settings",
              "value": ""
            },
            {
              "name": "text-rendering",
              "value": "auto"
            },
            {
              "name": "color",
              "value": "fieldtext"
            },
            {
              "name": "letter-spacing",
              "value": "normal"
            },
            {
              "name": "word-spacing",
              "value": "normal"
            },
            {
              "name": "line-height",
              "value": "normal"
            },
            {
              "name": "text-transform",
              "value": "none"
            },
            {
              "name": "text-indent",
              "value": "0px"
            },
            {
              "name": "text-shadow",
              "value": "none"
            },
            {
              "name": "display",
              "value": "inline-block"
            },
            {
              "name": "text-align",
              "value": "start"
            }
          ],
          "shorthandEntries": [
            {
              "name": "margin",
              "value": "0em"
            },
            {
              "name": "font",
              "value": ""
            }
          ]
        },
        "media": [],
        "containerQueries": [],
        "supports": [],
        "layers": [],
        "scopes": [],
        "ruleTypes": []
      },
      "matchingSelectors": [
        3
      ]
    },
    {
      "rule": {
        "selectorList": {
          "selectors": [
            {
              "text": "input[type=\"button\" i]",
              "specificity": {
                "a": 0,
                "b": 1,
                "c": 1
              }
            },
            {
              "text": "input[type=\"submit\" i]",
              "specificity": {
                "a": 0,
                "b": 1,
                "c": 1
              }
            },
            {
              "text": "input[type=\"reset\" i]",
              "specificity": {
                "a": 0,
                "b": 1,
                "c": 1
              }
            },
            {
              "text": "input[type=\"file\" i]::-webkit-file-upload-button",
              "specificity": {
                "a": 0,
                "b": 2,
                "c": 1
              }
            },
            {
              "text": "button",
              "specificity": {
                "a": 0,
                "b": 0,
                "c": 1
              }
            }
          ],
          "text": "input[type=\"button\" i], input[type=\"submit\" i], input[type=\"reset\" i], input[type=\"file\" i]::-webkit-file-upload-button, button"
        },
        "origin": "user-agent",
        "style": {
          "cssProperties": [
            {
              "name": "align-items",
              "value": "flex-start"
            },
            {
              "name": "text-align",
              "value": "center"
            },
            {
              "name": "cursor",
              "value": "default"
            },
            {
              "name": "padding-block-start",
              "value": "1px"
            },
            {
              "name": "padding-block-end",
              "value": "1px"
            },
            {
              "name": "padding-inline-start",
              "value": "6px"
            },
            {
              "name": "padding-inline-end",
              "value": "6px"
            },
            {
              "name": "border-top-width",
              "value": "2px"
            },
            {
              "name": "border-right-width",
              "value": "2px"
            },
            {
              "name": "border-bottom-width",
              "value": "2px"
            },
            {
              "name": "border-left-width",
              "value": "2px"
            },
            {
              "name": "border-top-style",
              "value": "outset"
            },
            {
              "name": "border-right-style",
              "value": "outset"
            },
            {
              "name": "border-bottom-style",
              "value": "outset"
            },
            {
              "name": "border-left-style",
              "value": "outset"
            },
            {
              "name": "border-top-color",
              "value": "buttonborder"
            },
            {
              "name": "border-right-color",
              "value": "buttonborder"
            },
            {
              "name": "border-bottom-color",
              "value": "buttonborder"
            },
            {
              "name": "border-left-color",
              "value": "buttonborder"
            },
            {
              "name": "border-image-source",
              "value": "initial"
            },
            {
              "name": "border-image-slice",
              "value": "initial"
            },
            {
              "name": "border-image-width",
              "value": "initial"
            },
            {
              "name": "border-image-outset",
              "value": "initial"
            },
            {
              "name": "border-image-repeat",
              "value": "initial"
            },
            {
              "name": "box-sizing",
              "value": "border-box"
            },
            {
              "name": "background-color",
              "value": "buttonface"
            },
            {
              "name": "color",
              "value": "buttontext"
            }
          ],
          "shorthandEntries": [
            {
              "name": "padding-block",
              "value": "1px"
            },
            {
              "name": "padding-inline",
              "value": "6px"
            },
            {
              "name": "border-width",
              "value": "2px"
            },
            {
              "name": "border-style",
              "value": "outset"
            },
            {
              "name": "border-color",
              "value": "buttonborder"
            },
            {
              "name": "border-image",
              "value": "initial"
            }
          ]
        },
        "media": [],
        "containerQueries": [],
        "supports": [],
        "layers": [],
        "scopes": [],
        "ruleTypes": []
      },
      "matchingSelectors": [
        4
      ]
    }
  ],
  shortToLongMap: {},
  longToShortMap: {},
  isActiveCache: {}
};

const stylesSlice = createSlice({
  name: 'styles',
  initialState,
  reducers: {
    // every time user selects a DOM element, this triggers update of inline styles
    // now triggered by cdp scripts - need to change later
    updateInlineRules: (state, action) => {
      state.inlineRules = action.payload;
    },
    updateMatchedStyles: (state, action) => {
      state.matchedStyles = action.payload;
    },
    findActiveStyles: (state) => {
      const cache = {};

      // for all types for styles, add the styles which have isActive property to cache
      state.userAgentRules.forEach(each => {
        const specificity = each.rule.selectorList.selectors[each.matchingSelectors[0]].specificity;
        const userAgentArrays = [each.rule.style.shorthandEntries, each.rule.style.cssProperties];
      
        userAgentArrays.forEach(userAgentArr => {
          for (let prop of userAgentArr) {
            if (prop.hasOwnProperty('isActive')) {
              if (!cache[prop.name]) cache[prop.name] = [];
              cache[prop.name].push({
                specificity,
                source: prop
              });            
            }
          }
        });
      });

      const regularAndInlineRules = [state.regularRules, state.inlineRules];

      regularAndInlineRules.forEach(array => {
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
  
          for (let cssProperty of each.rule.style.cssProperties) {
            if (cssProperty.hasOwnProperty('isActive')) {
              if (cssProperty.longhandProperties) {
                if (!cache[cssProperty.name]) cache[cssProperty.name] = [];
                cache[cssProperty.name].push({
                  specificity,
                  source: cssProperty
                }); 
              }
              else {
                if (state.longToShortMap[cssProperty.name]) {
                  const shortProp = state.longToShortMap[cssProperty.name];
                  if (!cache[shortProp]) cache[shortProp] = [];
                  cache[shortProp].push({
                    specificity,
                    source: cssProperty
                  });
                }
                else {
                  if (!cache[cssProperty.name]) cache[cssProperty.name] = [];
                  cache[cssProperty.name].push({
                    specificity,
                    source: cssProperty
                  }); 
                }
              }
            }
          }
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
    // iterates over shorthandEntries arr on all types of styles, builds: 
    // 1) mapping of each shorthand property to corresponding longhand properties and saves to shortToLongMap state;
    // 2) reverse mapping of each longhand property to its corresponding shorthand property and saves to longToShortMap state
    updateShortLongMaps: (state) => {
      const dummy = document.querySelector('#longhand-getter');

      const allStyles = [state.userAgentRules, state.regularRules, state.inlineRules];

      allStyles.forEach(array => {
        array.forEach(each => {
          for (let shortProp of each.rule.style.shorthandEntries) {
            // only add props to maps which have valid values and not add them again if they're already in the maps
            if (shortProp.value && !state.shortToLongMap[shortProp.name]) {
              // assign 1 shorthand property to a dummy DOM element
              dummy.style.setProperty(shortProp.name, shortProp.value);
              // get names of all longhand properties corresponding to the shorthand property
              const longhandProps = [...dummy.style];
              // for each shorthand, add all corresponding longhands to shortToLongMap state
              state.shortToLongMap[shortProp.name] = longhandProps;
              // for each longhand, add its shorthand property to longToShortMap state
              longhandProps.forEach(ls => {
                state.longToShortMap[ls] = shortProp.name;
              })
              // reset the dummy element for the next iteration
              dummy.style.removeProperty(shortProp.name);
            }
          }
        })
      })
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
    }
  }
});

export const { updateInlineRules, findActiveStyles, updateShortLongMaps, setIsActiveFlag } = stylesSlice.actions;
export default stylesSlice.reducer;