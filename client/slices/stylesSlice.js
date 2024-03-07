import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  // styles applied directly to components using 'style' attribute
  inlineStyles: {
    "styleSheetId": "22552.0",
    "cssProperties": [
      {
        "name": "background",
        "value": "yellow",
        "implicit": false,
        "text": "background: yellow;",
        "disabled": false,
        "range": {
          "startLine": 0,
          "startColumn": 0,
          "endLine": 0,
          "endColumn": 19
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
            "value": "yellow"
          }
        ]
      },
      {
        "name": "font-style",
        "value": "italic",
        "implicit": false,
        "text": "font-style: italic;",
        "disabled": false,
        "range": {
          "startLine": 0,
          "startColumn": 20,
          "endLine": 0,
          "endColumn": 39
        }
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
        "value": "yellow"
      },
      {
        "name": "font-style",
        "value": "italic"
      }
    ],
    "shorthandEntries": [
      {
        "name": "background",
        "value": "yellow"
      }
    ],
    "cssText": "background: yellow; font-style: italic;",
    "range": {
      "startLine": 0,
      "startColumn": 0,
      "endLine": 0,
      "endColumn": 39
    }
  },
  // styles specified in .css files and default browser styles
  matchedStyles: [
    {
      "rule": {
        "selectorList": {
          "selectors": [
            {
              "text": "h1",
              "specificity": {
                "a": 0,
                "b": 0,
                "c": 1
              }
            }
          ],
          "text": "h1"
        },
        "origin": "user-agent",
        "style": {
          "cssProperties": [
            {
              "name": "display",
              "value": "block"
            },
            {
              "name": "font-size",
              "value": "2em"
            },
            {
              "name": "margin-block-start",
              "value": "0.67em"
            },
            {
              "name": "margin-block-end",
              "value": "0.67em"
            },
            {
              "name": "margin-inline-start",
              "value": "0px"
            },
            {
              "name": "margin-inline-end",
              "value": "0px"
            },
            {
              "name": "font-weight",
              "value": "bold"
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
        "styleSheetId": "style-sheet-9820-3",
        "selectorList": {
          "selectors": [
            {
              "text": "h1",
              "range": {
                "startLine": 0,
                "startColumn": 0,
                "endLine": 0,
                "endColumn": 2
              },
              "specificity": {
                "a": 0,
                "b": 0,
                "c": 1
              }
            }
          ],
          "text": "h1"
        },
        "origin": "regular",
        "style": {
          "styleSheetId": "style-sheet-9820-3",
          "cssProperties": [
            {
              "name": "color",
              "value": "fuchsia",
              "implicit": false,
              "text": "color: fuchsia;",
              "disabled": false,
              "range": {
                "startLine": 1,
                "startColumn": 2,
                "endLine": 1,
                "endColumn": 17
              }
            },
            {
              "name": "border-bottom",
              "value": "3px solid blueviolet",
              "implicit": false,
              "text": "border-bottom: 3px solid blueviolet;",
              "disabled": false,
              "range": {
                "startLine": 2,
                "startColumn": 2,
                "endLine": 2,
                "endColumn": 38
              },
              "longhandProperties": [
                {
                  "name": "border-bottom-width",
                  "value": "3px"
                },
                {
                  "name": "border-bottom-style",
                  "value": "solid"
                },
                {
                  "name": "border-bottom-color",
                  "value": "blueviolet"
                }
              ]
            },
            {
              "name": "color",
              "value": "fuchsia"
            },
            {
              "name": "border-bottom-width",
              "value": "3px"
            },
            {
              "name": "border-bottom-style",
              "value": "solid"
            },
            {
              "name": "border-bottom-color",
              "value": "blueviolet"
            }
          ],
          "shorthandEntries": [
            {
              "name": "border-bottom",
              "value": "3px solid blueviolet"
            }
          ],
          "cssText": "\n  color: fuchsia;\n  border-bottom: 3px solid blueviolet;\n",
          "range": {
            "startLine": 0,
            "startColumn": 4,
            "endLine": 3,
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
    },
    {
      "rule": {
          "origin": "inline",
          "style": {
              "styleSheetId": "24352.0",
              "cssProperties": [
                {
                  "name": "background",
                  "value": "yellow",
                  "implicit": false,
                  "text": "background: yellow;",
                  "disabled": false,
                  "range": {
                    "startLine": 0,
                    "startColumn": 0,
                    "endLine": 0,
                    "endColumn": 19
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
                      "value": "yellow"
                    }
                  ]
                },
                {
                  "name": "font-style",
                  "value": "italic",
                  "implicit": false,
                  "text": "font-style: italic;",
                  "disabled": false,
                  "range": {
                    "startLine": 0,
                    "startColumn": 20,
                    "endLine": 0,
                    "endColumn": 39
                  }
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
                  "value": "yellow"
                },
                {
                  "name": "font-style",
                  "value": "italic"
                }
              ],
              "shorthandEntries": [
                {
                  "name": "background",
                  "value": "yellow"
                }
              ],
              "cssText": "background: yellow; font-style: italic;",
              "range": {
                "startLine": 0,
                "startColumn": 0,
                "endLine": 0,
                "endColumn": 39
              }
          }
      }
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