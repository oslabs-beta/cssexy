import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  // allStyles property includes both matchedCSSRules and inlineCSSRules
  // matchedCSSRules are styles specified in .css files (origin=regular) and default browser styles (origin=user-agent)
  // inlineCSSRules are styles specified directly on components (origin=inline)
  regularStyles: [
    {
      "rule": {
        "styleSheetId": "style-sheet-36416-2",
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
          "styleSheetId": "style-sheet-36416-2",
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
  inlineStyles: [
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
  userAgentStyles: [
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
  ]
};

const stylesSlice = createSlice({
  name: 'styles',
  initialState,
  reducers: {
    // every time user selects a DOM element, this triggers update of inline styles
    // now triggered by cdp scripts - need to change later
    updateInlineStyles: (state, action) => {
      state.inlineStyles = action.payload;
    },
    updateMatchedStyles: (state, action) => {
      state.matchedStyles = action.payload;
    }
  }
});

export const { updateInlineStyles } = stylesSlice.actions;
export default stylesSlice.reducer;