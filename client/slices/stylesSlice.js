import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  // allStyles property includes both matchedCSSRules and inlineCSSRules
  // matchedCSSRules are styles specified in .css files (origin=regular) and default browser styles (origin=user-agent)
  // inlineCSSRules are styles specified directly on components (origin=inline)
  regularStyles: [
    {
      "rule": {
        "styleSheetId": "style-sheet-33072-24",
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
          "styleSheetId": "style-sheet-33072-24",
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
              },
              "isActive": true
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
              ],
              "isActive": true
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
              ],
              "isActive": true
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
              ],
              "isActive": true
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
              },
              "isActive": true
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
              },
              "isActive": true
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
              },
              "isActive": true
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
              ],
              "isActive": true
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
              },
              "isActive": true
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
              },
              isActive: true
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
              },
              isActive: true
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
              },
              isActive: true
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
              },
              isActive: true
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
              },
              isActive: true
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
              },
              isActive: true
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
              "value": "auto",
              "isActive": true
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
              "value": "0em",
              "isActive": false
            },
            {
              "name": "margin-right",
              "value": "0em",
              "isActive": true
            },
            {
              "name": "margin-bottom",
              "value": "0em",
              "isActive": true
            },
            {
              "name": "margin-left",
              "value": "0em",
              "isActive": true
            },
            {
              "name": "font-style",
              "value": "",
              "isActive": true
            },
            {
              "name": "font-variant-ligatures",
              "value": "",
              "isActive": true
            },
            {
              "name": "font-variant-caps",
              "value": "",
              "isActive": true
            },
            {
              "name": "font-variant-numeric",
              "value": "",
              "isActive": true
            },
            {
              "name": "font-variant-east-asian",
              "value": "",
              "isActive": true
            },
            {
              "name": "font-variant-alternates",
              "value": "",
              "isActive": true
            },
            {
              "name": "font-variant-position",
              "value": "",
              "isActive": true
            },
            {
              "name": "font-weight",
              "value": "",
              "isActive": true
            },
            {
              "name": "font-stretch",
              "value": "",
              "isActive": true
            },
            {
              "name": "font-size",
              "value": "",
              "isActive": true
            },
            {
              "name": "font-family",
              "value": "",
              "isActive": true
            },
            {
              "name": "font-optical-sizing",
              "value": "",
              "isActive": true
            },
            {
              "name": "font-kerning",
              "value": "",
              "isActive": true
            },
            {
              "name": "font-feature-settings",
              "value": "",
              "isActive": true
            },
            {
              "name": "font-variation-settings",
              "value": "",
              "isActive": true
            },
            {
              "name": "text-rendering",
              "value": "auto",
              "isActive": true
            },
            {
              "name": "color",
              "value": "fieldtext",
              "isActive": true
            },
            {
              "name": "letter-spacing",
              "value": "normal",
              "isActive": true
            },
            {
              "name": "word-spacing",
              "value": "normal",
              "isActive": true
            },
            {
              "name": "line-height",
              "value": "normal",
              "isActive": true
            },
            {
              "name": "text-transform",
              "value": "none",
              "isActive": true
            },
            {
              "name": "text-indent",
              "value": "0px",
              "isActive": true
            },
            {
              "name": "text-shadow",
              "value": "none",
              "isActive": true
            },
            {
              "name": "display",
              "value": "inline-block",
              "isActive": true
            },
            {
              "name": "text-align",
              "value": "start",
              "isActive": true
            }
          ],
          "shorthandEntries": [
            {
              "name": "margin",
              "value": "0em",
              "isActive": true
            },
            {
              "name": "font",
              "value": "",
              "isActive": true
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
              "value": "flex-start",
              "isActive": true
            },
            {
              "name": "text-align",
              "value": "center",
              "isActive": true
            },
            {
              "name": "cursor",
              "value": "default",
              "isActive": true
            },
            {
              "name": "padding-block-start",
              "value": "1px",
              "isActive": true
            },
            {
              "name": "padding-block-end",
              "value": "1px",
              "isActive": true
            },
            {
              "name": "padding-inline-start",
              "value": "6px",
              "isActive": true
            },
            {
              "name": "padding-inline-end",
              "value": "6px",
              "isActive": true
            },
            {
              "name": "border-top-width",
              "value": "2px",
              "isActive": true
            },
            {
              "name": "border-right-width",
              "value": "2px",
              "isActive": true
            },
            {
              "name": "border-bottom-width",
              "value": "2px",
              "isActive": true
            },
            {
              "name": "border-left-width",
              "value": "2px",
              "isActive": true
            },
            {
              "name": "border-top-style",
              "value": "outset",
              "isActive": true
            },
            {
              "name": "border-right-style",
              "value": "outset",
              "isActive": true
            },
            {
              "name": "border-bottom-style",
              "value": "outset",
              "isActive": true
            },
            {
              "name": "border-left-style",
              "value": "outset",
              "isActive": true
            },
            {
              "name": "border-top-color",
              "value": "buttonborder",
              "isActive": true
            },
            {
              "name": "border-right-color",
              "value": "buttonborder",
              "isActive": true
            },
            {
              "name": "border-bottom-color",
              "value": "buttonborder",
              "isActive": true
            },
            {
              "name": "border-left-color",
              "value": "buttonborder",
              "isActive": true
            },
            {
              "name": "border-image-source",
              "value": "initial",
              "isActive": true
            },
            {
              "name": "border-image-slice",
              "value": "initial",
              "isActive": true
            },
            {
              "name": "border-image-width",
              "value": "initial",
              "isActive": true
            },
            {
              "name": "border-image-outset",
              "value": "initial",
              "isActive": true
            },
            {
              "name": "border-image-repeat",
              "value": "initial",
              "isActive": true
            },
            {
              "name": "box-sizing",
              "value": "border-box",
              "isActive": true
            },
            {
              "name": "background-color",
              "value": "buttonface",
              "isActive": true
            },
            {
              "name": "color",
              "value": "buttontext",
              "isActive": true
            }
          ],
          "shorthandEntries": [
            {
              "name": "padding-block",
              "value": "1px",
              "isActive": true
            },
            {
              "name": "padding-inline",
              "value": "6px",
              "isActive": true
            },
            {
              "name": "border-width",
              "value": "2px",
              "isActive": true
            },
            {
              "name": "border-style",
              "value": "outset",
              "isActive": true
            },
            {
              "name": "border-color",
              "value": "buttonborder",
              "isActive": true
            },
            {
              "name": "border-image",
              "value": "initial",
              "isActive": true
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