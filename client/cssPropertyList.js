const cssPropertyList = {
    "align-content": {
        "moz": false,
        "webkit": true,
        "syntax": "(stretch)|(center)|(flex-start)|(flex-end)|(space-between)|(space-around)|(initial)|(inherit)",
        "initial": "stretch",
        "values": [
            "stretch",
            "center",
            "flex-start",
            "flex-end",
            "space-between",
            "space-around",
            "initial",
            "inherit"
        ]
    },
    "align-items": {
        "moz": false,
        "webkit": true,
        "syntax": "(stretch)|(center)|(flex-start)|(flex-end)|(baseline)|(initial)|(inherit)",
        "initial": "stretch",
        "values": [
            "stretch",
            "center",
            "flex-start",
            "flex-end",
            "baseline",
            "initial",
            "inherit"
        ]
    },
    "align-self": {
        "moz": false,
        "webkit": true,
        "syntax": "(auto)|(stretch)|(center)|(flex-start)|(flex-end)|(baseline)|(initial)|(inherit)",
        "initial": "auto",
        "values": [
            "auto",
            "stretch",
            "center",
            "flex-start",
            "flex-end",
            "baseline",
            "initial",
            "inherit"
        ]
    },
    "all": {
        "moz": false,
        "webkit": false,
        "syntax": "(initial)|(inherit)|(unset)",
        "initial": "none",
        "values": [
            "initial",
            "inherit",
            "unset"
        ]
    },
    "animation": {
        "moz": true,
        "webkit": true,
        "syntax": "(([prop:animation-name]) ([prop:animation-duration]) ([prop:animation-timing-function]) ([prop:animation-delay]) ([prop:animation-iteration-count]) ([prop:animation-direction]) ([prop:animation-fill-mode]) ([prop:animation-play-state]))|(initial)|(inherit)",
        "initial": "none 0 ease 0 1 normal none running",
        "values": [
            "[prop:animation-name]",
            "[prop:animation-duration]",
            "[prop:animation-timing-function]",
            "[prop:animation-delay]",
            "[prop:animation-iteration-count]",
            "[prop:animation-direction]",
            "[prop:animation-fill-mode]",
            "[prop:animation-play-state]",
            "initial",
            "inherit"
        ]
    },
    "animation-delay": {
        "moz": true,
        "webkit": true,
        "syntax": "([time])|(initial)|(inherit)",
        "initial": "0s",
        "values": [
            "[time]",
            "initial",
            "inherit"
        ]
    },
    "animation-direction": {
        "moz": true,
        "webkit": true,
        "syntax": "(normal)|(reverse)|(alternate)|(alternate-reverse)|(initial)|(inherit)",
        "initial": "normal",
        "values": [
            "normal",
            "reverse",
            "alternate",
            "alternate-reverse",
            "initial",
            "inherit"
        ]
    },
    "animation-duration": {
        "moz": true,
        "webkit": true,
        "syntax": "([time])|(initial)|(inherit)",
        "initial": "0",
        "values": [
            "[time]",
            "initial",
            "inherit"
        ]
    },
    "animation-fill-mode": {
        "moz": true,
        "webkit": true,
        "syntax": "(none)|(forwards)|(backwards)|(both)|(initial)|(inherit)",
        "initial": "none",
        "values": [
            "none",
            "forwards",
            "backwards",
            "both",
            "initial",
            "inherit"
        ]
    },
    "animation-iteration-count": {
        "moz": true,
        "webkit": true,
        "syntax": "([number])|(infinite)|(initial)|(inherit)",
        "initial": "1",
        "values": [
            "[number]",
            "infinite",
            "initial",
            "inherit"
        ]
    },
    "animation-name": {
        "moz": true,
        "webkit": true,
        "syntax": "([label])|(none)|(initial)|(inherit)",
        "initial": "none",
        "values": [
            "[label]",
            "none",
            "initial",
            "inherit"
        ]
    },
    "animation-play-state": {
        "moz": true,
        "webkit": true,
        "syntax": "(paused)|(running)|(initial)|(inherit)",
        "initial": "running",
        "values": [
            "paused",
            "running",
            "initial",
            "inherit"
        ]
    },
    "animation-timing-function": {
        "moz": true,
        "webkit": true,
        "syntax": "(linear)|(ease)|(ease-in)|(ease-out)|(ease-in-out)|(step-start)|(step-end)|([steps])|[cubic-bezier]|(initial)|(inherit)",
        "initial": "ease",
        "values": [
            "linear",
            "ease",
            "ease-in",
            "ease-out",
            "ease-in-out",
            "step-start",
            "step-end",
            "[steps]",
            "cubic-bezier",
            "initial",
            "inherit"
        ]
    },
    "backface-visibility": {
        "moz": true,
        "webkit": true,
        "syntax": "(visible)|(hidden)|(initial)|(inherit)",
        "initial": "visible",
        "values": [
            "visible",
            "hidden",
            "initial",
            "inherit"
        ]
    },
    "background": {
        "moz": false,
        "webkit": false,
        "syntax": "(([prop:background-color]) ([prop:background-image]) ((([prop:background-position])|([prop:background-size]))) ([prop:background-repeat]) ([prop:background-origin]) ([prop:background-clip]) ([prop:background-attachment]))|(initial)|(inherit)",
        "initial": "see individual properties",
        "values": [
            "[prop:background-color]",
            "[prop:background-image]",
            "[prop:background-position]",
            "[prop:background-size]",
            "[prop:background-repeat]",
            "[prop:background-origin]",
            "[prop:background-clip]",
            "[prop:background-attachment]",
            "initial",
            "inherit"
        ]
    },
    "background-attachment": {
        "moz": false,
        "webkit": false,
        "syntax": "(scroll)|(fixed)|(local)|(initial)|(inherit)",
        "initial": "scroll",
        "values": [
            "scroll",
            "fixed",
            "local",
            "initial",
            "inherit"
        ]
    },
    "background-blend-mode": {
        "moz": false,
        "webkit": false,
        "syntax": "(normal)|(multiply)|(screen)|(overlay)|(darken)|(lighten)|(color-dodge)|(saturation)|([color])|(luminosity)",
        "initial": "normal",
        "values": [
            "normal",
            "multiply",
            "screen",
            "overlay",
            "darken",
            "lighten",
            "color-dodge",
            "saturation",
            "[color]",
            "luminosity"
        ]
    },
    "background-clip": {
        "moz": false,
        "webkit": false,
        "syntax": "(border-box)|(padding-box)|(content-box)|(initial)|(inherit)",
        "initial": "border-box",
        "values": [
            "border-box",
            "padding-box",
            "content-box",
            "initial",
            "inherit"
        ]
    },
    "background-color": {
        "moz": false,
        "webkit": false,
        "syntax": "([color])|(transparent)|(initial)|(inherit)",
        "initial": "transparent",
        "values": [
            "[color]",
            "transparent",
            "initial",
            "inherit"
        ]
    },
    "background-image": {
        "moz": false,
        "webkit": false,
        "syntax": "([fn:url])|([fn:linear-gradient])|([fn:radial-gradient])|([fn:repeating-linear-gradient])|([fn:repeating-radial-gradient])|(none)|(initial)|(inherit)",
        "initial": "none",
        "values": [
            "[fn:url]",
            "none",
            "[fn:linear-gradient]",
            "[fn:radial-gradient]",
            "[fn:repeating-linear-gradient]",
            "[fn:repeating-radial-gradient]",
            "initial",
            "inherit"
        ]
    },
    "background-origin": {
        "moz": false,
        "webkit": false,
        "syntax": "(padding-box)|(border-box)|(content-box)|(initial)|(inherit)",
        "initial": "padding-box",
        "values": [
            "padding-box",
            "border-box",
            "content-box",
            "initial",
            "inherit"
        ]
    },
    "background-position": {
        "moz": false,
        "webkit": false,
        "syntax": "(left top)|(left center)|(left bottom)|(right top)|(right center)|(right bottom)|(center top)|(center center)|(center bottom)|([percent]){2,2}|([length]){2,2}|(initial)|(inherit)",
        "initial": "0% 0%",
        "values": [
            "left top",
            "left center",
            "left bottom",
            "right top",
            "right center",
            "right bottom",
            "center top",
            "center center",
            "center bottom",
            "([percent]){2,2}",
            "([length]){2,2}",
            "initial",
            "inherit"
        ]
    },
    "background-repeat": {
        "moz": false,
        "webkit": false,
        "syntax": "(repeat)|(repeat-x)|(repeat-y)|(no-repeat)|(initial)|(inherit)",
        "initial": "repeat",
        "values": [
            "repeat",
            "repeat-x",
            "repeat-y",
            "no-repeat",
            "space",
            "round",
            "initial",
            "inherit"
        ]
    },
    "background-size": {
        "moz": true,
        "webkit": true,
        "syntax": "(auto)|([length])|(cover)|(contain)|(initial)|(inherit)",
        "initial": "auto",
        "values": [
            "auto",
            "[length]",
            "percentage",
            "cover",
            "contain",
            "initial",
            "inherit"
        ]
    },
    "border": {
        "moz": false,
        "webkit": false,
        "syntax": "(([prop:border-width]) ([prop:border-style]) ([prop:border-color]))|(initial)|(inherit)",
        "initial": "medium none color",
        "values": [
            "[prop:border-width]",
            "[prop:border-style]",
            "[prop:border-color]",
            "initial",
            "inherit"
        ]
    },
    "border-bottom": {
        "moz": false,
        "webkit": false,
        "syntax": "([prop:border-bottom-width]) ([prop:border-bottom-style]) ([prop:border-bottom-color])|(initial)|(inherit)",
        "initial": "medium none color",
        "values": [
            "[prop:border-bottom-width]",
            "[prop:border-bottom-style]",
            "[prop:border-bottom-color]",
            "initial",
            "inherit"
        ]
    },
    "border-bottom-color": {
        "moz": false,
        "webkit": false,
        "syntax": "([color])|(transparent)|(initial)|(inherit)",
        "initial": "The current color of the element",
        "values": [
            "[color]",
            "transparent",
            "initial",
            "inherit"
        ]
    },
    "border-bottom-left-radius": {
        "moz": true,
        "webkit": true,
        "syntax": "(([length])|([percent])){1,2}|(initial)|(inherit)",
        "initial": "0",
        "values": [
            "[length]",
            "[percent]",
            "initial",
            "inherit"
        ]
    },
    "border-bottom-right-radius": {
        "moz": true,
        "webkit": true,
        "syntax": "(([length])|([percent])){1,2}|(initial)|(inherit)",
        "initial": "0",
        "values": [
            "[length]",
            "[percent]",
            "initial",
            "inherit"
        ]
    },
    "border-bottom-style": {
        "moz": false,
        "webkit": false,
        "syntax": "(none)|(hidden)|(dotted)|(dashed)|(solid)|(double)|(groove)|(ridge)|(inset)|(outset)|(initial)|(inherit)",
        "initial": "none",
        "values": [
            "none",
            "hidden",
            "dotted",
            "dashed",
            "solid",
            "double",
            "groove",
            "ridge",
            "inset",
            "outset",
            "initial",
            "inherit"
        ]
    },
    "border-bottom-width": {
        "moz": false,
        "webkit": false,
        "syntax": "(medium)|(thin)|(thick)|([length])|(initial)|(inherit)",
        "initial": "medium",
        "values": [
            "medium",
            "thin",
            "thick",
            "[length]",
            "initial",
            "inherit"
        ]
    },
    "border-collapse": {
        "moz": false,
        "webkit": false,
        "syntax": "(separate)|(collapse)|(initial)|(inherit)",
        "initial": "separate",
        "values": [
            "separate",
            "collapse",
            "initial",
            "inherit"
        ]
    },
    "border-color": {
        "moz": false,
        "webkit": false,
        "syntax": "([color])|(transparent)|(initial)|(inherit)",
        "initial": "The current color of the element",
        "values": [
            "[color]",
            "transparent",
            "initial",
            "inherit"
        ]
    },
    "border-image": {
        "moz": true,
        "webkit": true,
        "syntax": "(([prop:border-image-source]) ([prop:border-image-slice]) ([prop:border-image-width]) ([prop:border-image-outset]) ([prop:border-image-repeat]))|(initial)|(inherit)",
        "initial": "none 100% 1 0 stretch",
        "values": [
            "[prop:border-image-source]",
            "[prop:border-image-slice]",
            "[prop:border-image-width]",
            "[prop:border-image-outset]",
            "[prop:border-image-repeat]",
            "initial",
            "inherit"
        ]
    },
    "border-image-outset": {
        "moz": false,
        "webkit": false,
        "syntax": "([length])|([number])|(initial)|(inherit)",
        "initial": "0",
        "values": [
            "[length]",
            "[number]",
            "initial",
            "inherit"
        ]
    },
    "border-image-repeat": {
        "moz": false,
        "webkit": false,
        "syntax": "(stretch)|(repeat)|(round)|(initial)|(inherit)",
        "initial": "stretch",
        "values": [
            "stretch",
            "repeat",
            "round",
            "space",
            "initial",
            "inherit"
        ]
    },
    "border-image-slice": {
        "moz": false,
        "webkit": false,
        "syntax": "([number])|([percent])|(fill)|(initial)|(inherit)",
        "initial": "100%",
        "values": [
            "[number]",
            "[percent]",
            "fill",
            "initial",
            "inherit"
        ]
    },
    "border-image-source": {
        "moz": false,
        "webkit": false,
        "syntax": "(none)|(image)|(initial)|(inherit)",
        "initial": "none",
        "values": [
            "none",
            "image",
            "initial",
            "inherit"
        ]
    },
    "border-image-width": {
        "moz": false,
        "webkit": false,
        "syntax": "([number])|([percent])|(auto)|(initial)|(inherit)",
        "initial": "1",
        "values": [
            "[length]",
            "[number]",
            "[percent]",
            "auto",
            "initial",
            "inherit"
        ]
    },
    "border-left": {
        "moz": false,
        "webkit": false,
        "syntax": "(([prop:border-left-width]) ([prop:border-left-style]) ([prop:border-left-color]))|(initial)|(inherit)",
        "initial": "medium none color",
        "values": [
            "[prop:border-left-width]",
            "[prop:border-left-style]",
            "[prop:border-left-color]",
            "initial",
            "inherit"
        ]
    },
    "border-left-color": {
        "moz": false,
        "webkit": false,
        "syntax": "([color])|(transparent)|(initial)|(inherit)",
        "initial": "The current color of the element",
        "values": [
            "[color]",
            "transparent",
            "initial",
            "inherit"
        ]
    },
    "border-left-style": {
        "moz": false,
        "webkit": false,
        "syntax": "(none)|(hidden)|(dotted)|(dashed)|(solid)|(double)|(groove)|(ridge)|(inset)|(outset)|(initial)|(inherit)",
        "initial": "none",
        "values": [
            "none",
            "hidden",
            "dotted",
            "dashed",
            "solid",
            "double",
            "groove",
            "ridge",
            "inset",
            "outset",
            "initial",
            "inherit"
        ]
    },
    "border-left-width": {
        "moz": false,
        "webkit": false,
        "syntax": "(medium)|(thin)|(thick)|([length])|(initial)|(inherit)",
        "initial": "medium",
        "values": [
            "medium",
            "thin",
            "thick",
            "[length]",
            "initial",
            "inherit"
        ]
    },
    "border-radius": {
        "moz": true,
        "webkit": true,
        "syntax": "(([length])|[percent]){1:4}|(initial)|(inherit)",
        "initial": "0",
        "values": [
            "[length]",
            "[percent]",
            "initial",
            "inherit"
        ]
    },
    "border-right": {
        "moz": false,
        "webkit": false,
        "syntax": "(([prop:border-width]) ([prop:border-style]) ([prop:border-color]))|(initial)|(inherit)",
        "initial": "medium none color",
        "values": [
            "[prop:border-right-width]",
            "[prop:border-right-style]",
            "[prop:border-right-color]",
            "initial",
            "inherit"
        ]
    },
    "border-right-color": {
        "moz": false,
        "webkit": false,
        "syntax": "([color])|(transparent)|(initial)|(inherit)",
        "initial": "black",
        "values": [
            "[color]",
            "transparent",
            "initial",
            "inherit"
        ]
    },
    "border-right-style": {
        "moz": false,
        "webkit": false,
        "syntax": "(none)|(hidden)|(dotted)|(dashed)|(solid)|(double)|(groove)|(ridge)|(inset)|(outset)|(initial)|(inherit)",
        "initial": "none",
        "values": [
            "none",
            "hidden",
            "dotted",
            "dashed",
            "solid",
            "double",
            "groove",
            "ridge",
            "inset",
            "outset",
            "initial",
            "inherit"
        ]
    },
    "border-right-width": {
        "moz": false,
        "webkit": false,
        "syntax": "(medium)|(thin)|(thick)|([length])|(initial)|(inherit)",
        "initial": "medium",
        "values": [
            "medium",
            "thin",
            "thick",
            "[length]",
            "initial",
            "inherit"
        ]
    },
    "border-spacing": {
        "moz": false,
        "webkit": false,
        "syntax": "([length]){1,2}|(initial)|(inherit)",
        "initial": "2px",
        "values": [
            "[length]",
            "initial",
            "inherit"
        ]
    },
    "border-style": {
        "moz": false,
        "webkit": false,
        "syntax": "(none)|(hidden)|(dotted)|(dashed)|(solid)|(double)|(groove)|(ridge)|(inset)|(outset)|(initial)|(inherit)",
        "initial": "none",
        "values": [
            "none",
            "hidden",
            "dotted",
            "dashed",
            "solid",
            "double",
            "groove",
            "ridge",
            "inset",
            "outset",
            "initial",
            "inherit"
        ]
    },
    "border-top": {
        "moz": false,
        "webkit": false,
        "syntax": "(([prop:border-left-width]) ([prop:border-left-style]) ([prop:border-left-color]))|(initial)|(inherit)",
        "initial": "medium none color",
        "values": [
            "[prop:border-top-width]",
            "[prop:border-top-style]",
            "[prop:border-top-color]",
            "initial",
            "inherit"
        ]
    },
    "border-top-color": {
        "moz": false,
        "webkit": false,
        "syntax": "([color])|(transparent)|(initial)|(inherit)",
        "initial": "The current color of the element",
        "values": [
            "[color]",
            "transparent",
            "initial",
            "inherit"
        ]
    },
    "border-top-left-radius": {
        "moz": true,
        "webkit": true,
        "syntax": "(([length])|[percent]){1,2}|(initial)|(inherit)",
        "initial": "0",
        "values": [
            "[length]",
            "[percent]",
            "initial",
            "inherit"
        ]
    },
    "border-top-right-radius": {
        "moz": true,
        "webkit": true,
        "syntax": "(([length])|[percent]){1,2}|(initial)|(inherit)",
        "initial": "0",
        "values": [
            "[length]",
            "[percent]",
            "initial",
            "inherit"
        ]
    },
    "border-top-style": {
        "moz": false,
        "webkit": false,
        "syntax": "(none)|(hidden)|(dotted)|(dashed)|(solid)|(double)|(groove)|(ridge)|(inset)|(outset)|(initial)|(inherit)",
        "initial": "none",
        "values": [
            "none",
            "hidden",
            "dotted",
            "dashed",
            "solid",
            "double",
            "groove",
            "ridge",
            "inset",
            "outset",
            "initial",
            "inherit"
        ]
    },
    "border-top-width": {
        "moz": false,
        "webkit": false,
        "syntax": "(medium)|(thin)|(thick)|([length])|(initial)|(inherit)",
        "initial": "medium",
        "values": [
            "medium",
            "thin",
            "thick",
            "[length]",
            "initial",
            "inherit"
        ]
    },
    "border-width": {
        "moz": false,
        "webkit": false,
        "syntax": "(medium)|(thin)|(thick)|([length])|(initial)|(inherit)",
        "initial": "medium",
        "values": [
            "medium",
            "thin",
            "thick",
            "[length]",
            "initial",
            "inherit"
        ]
    },
    "bottom": {
        "moz": false,
        "webkit": false,
        "syntax": "(auto)|([length])|(initial)|(inherit)",
        "initial": "auto",
        "values": [
            "auto",
            "[length]",
            "[percent]",
            "initial",
            "inherit"
        ]
    },
    "box-decoration-break": {
        "moz": false,
        "webkit": true,
        "syntax": "(slice)|(clone)|(initial)|(inherit)|(unset)",
        "initial": "slice",
        "values": [
            "slice",
            "clone",
            "initial",
            "inherit"
        ]
    },
    "box-shadow": {
        "moz": true,
        "webkit": true,
        "syntax": "(none)|(h-offset) v-offset blur spread color |(inset)|(initial)|(inherit)",
        "initial": "none",
        "values": [
            "none",
            "h-offset",
            "v-offset",
            "blur",
            "spread",
            "[color]",
            "inset",
            "initial",
            "inherit"
        ]
    },
    "box-sizing": {
        "moz": true,
        "webkit": true,
        "syntax": "(content-box)|(border-box)|(initial)|(inherit)",
        "initial": "content-box",
        "values": [
            "content-box",
            "border-box",
            "initial",
            "inherit"
        ]
    },
    "caption-side": {
        "moz": false,
        "webkit": false,
        "syntax": "(top)|(bottom)|(initial)|(inherit)",
        "initial": "top",
        "values": [
            "top",
            "bottom",
            "initial",
            "inherit"
        ]
    },
    "caret-color": {
        "moz": false,
        "webkit": false,
        "syntax": "(auto)|([color])",
        "initial": "auto",
        "values": [
            "auto",
            "[color]"
        ]
    },
    "@charset": {
        "moz": false,
        "webkit": false,
        "syntax": "@charset \"charset\"",
        "initial": "charset",
        "values": [
            "charset"
        ]
    },
    "clear": {
        "moz": false,
        "webkit": false,
        "syntax": "(none)|(left)|(right)|(both)|(initial)|(inherit)",
        "initial": "none",
        "values": [
            "none",
            "left",
            "right",
            "both",
            "initial",
            "inherit"
        ]
    },
    "clip": {
        "moz": false,
        "webkit": false,
        "syntax": "(auto)|(shape)|(initial)|(inherit)",
        "initial": "auto",
        "values": [
            "auto",
            "shape",
            "initial",
            "inherit"
        ]
    },
    "color": {
        "moz": false,
        "webkit": false,
        "syntax": "([color])|(initial)|(inherit)",
        "initial": "not specified",
        "values": [
            "[color]",
            "initial",
            "inherit"
        ]
    },
    "column-count": {
        "moz": true,
        "webkit": true,
        "syntax": "([number])|(auto)|(initial)|(inherit)",
        "initial": "auto",
        "values": [
            "[number]",
            "auto",
            "initial",
            "inherit"
        ]
    },
    "column-fill": {
        "moz": true,
        "webkit": true,
        "syntax": "(balance)|(auto)|(initial)|(inherit)",
        "initial": "balance",
        "values": [
            "balance",
            "auto",
            "initial",
            "inherit"
        ]
    },
    "column-gap": {
        "moz": true,
        "webkit": true,
        "syntax": "([length])|(normal)|(initial)|(inherit)",
        "initial": "normal",
        "values": [
            "[length]",
            "normal",
            "initial",
            "inherit"
        ]
    },
    "column-rule": {
        "moz": true,
        "webkit": true,
        "syntax": "(([prop:column-rule-width]) ([prop:column-rule-style]) ([prop:column-rule-color]))|(initial)|(inherit)",
        "initial": "medium none color",
        "values": [
            "[prop:column-rule-width]",
            "[prop:column-rule-style]",
            "[prop:column-rule-color]",
            "initial",
            "inherit"
        ]
    },
    "column-rule-color": {
        "moz": true,
        "webkit": true,
        "syntax": "([color])|(initial)|(inherit)",
        "initial": "The current color of the element",
        "values": [
            "[color]",
            "initial",
            "inherit"
        ]
    },
    "column-rule-style": {
        "moz": true,
        "webkit": true,
        "syntax": "(none)|(hidden)|(dotted)|(dashed)|(solid)|(double)|(groove)|(ridge)|(inset)|(outset)|(initial)|(inherit)",
        "initial": "none",
        "values": [
            "none",
            "hidden",
            "dotted",
            "dashed",
            "solid",
            "double",
            "groove",
            "ridge",
            "inset",
            "outset",
            "initial",
            "inherit"
        ]
    },
    "column-rule-width": {
        "moz": true,
        "webkit": true,
        "syntax": "(medium)|(thin)|(thick)|([length])|(initial)|(inherit)",
        "initial": "medium",
        "values": [
            "medium",
            "thin",
            "thick",
            "[length]",
            "initial",
            "inherit"
        ]
    },
    "column-span": {
        "moz": false,
        "webkit": true,
        "syntax": "(none)|(all)|(initial)|(inherit)",
        "initial": "none",
        "values": [
            "none",
            "all",
            "initial",
            "inherit"
        ]
    },
    "column-width": {
        "moz": true,
        "webkit": true,
        "syntax": "(auto)|([length])|(initial)|(inherit)",
        "initial": "auto",
        "values": [
            "auto",
            "[length]",
            "initial",
            "inherit"
        ]
    },
    "columns": {
        "moz": true,
        "webkit": true,
        "syntax": "(auto)|(([prop:column-width]) ([prop:column-count]))|(initial)|(inherit)",
        "initial": "auto auto",
        "values": [
            "auto",
            "[prop:column-width]",
            "[prop:column-count]",
            "initial",
            "inherit"
        ]
    },
    "content": {
        "moz": false,
        "webkit": false,
        "syntax": "(normal)|(none)|(counter)|(attr)|(string)|(open-quote)|(close-quote)|(no-open-quote)|(no-close-quote)|(url)|(initial)|(inherit)",
        "initial": "normal",
        "values": [
            "normal",
            "none",
            "counter",
            "attr(attribute)",
            "string",
            "open-quote",
            "close-quote",
            "no-open-quote",
            "no-close-quote",
            "url(url)",
            "initial",
            "inherit"
        ]
    },
    "counter-increment": {
        "moz": false,
        "webkit": false,
        "syntax": "(none)|([number])|(initial)|(inherit)",
        "initial": "none",
        "values": [
            "none",
            "[number]",
            "initial",
            "inherit"
        ]
    },
    "counter-reset": {
        "moz": false,
        "webkit": false,
        "syntax": "(none)|([number])|(initial)|(inherit)",
        "initial": "none",
        "values": [
            "none",
            "[number]",
            "initial",
            "inherit"
        ]
    },
    "cursor": {
        "moz": false,
        "webkit": false,
        "syntax": "(alias)|(all-scroll)|(auto)|(cell)|(context-menu)|(col-resize)|(copy)|(crosshair)|(default)|(e-resize)|(ew-resize)|(grab)|(grabbing)|(help)|(move)|(n-resize)|(ne-resize)|(nesw-resize)|(ns-resize)|(nw-resize)|(nwse-resize)|(no-drop)|(none)|(not-allowed)|(pointer)|(progress)|(row-resize)|(s-resize)|(se-resize)|(sw-resize)|(text)|(URL)|(vertical-text)|(w-resize)|(wait)|(zoom-in)|(zoom-out)|(initial)|(inherit)",
        "initial": "auto",
        "values": [
            "alias",
            "all-scroll",
            "auto",
            "cell",
            "context-menu",
            "col-resize",
            "copy",
            "crosshair",
            "default",
            "e-resize",
            "ew-resize",
            "grab",
            "grabbing",
            "help",
            "move",
            "n-resize",
            "ne-resize",
            "nesw-resize",
            "ns-resize",
            "nw-resize",
            "nwse-resize",
            "no-drop",
            "none",
            "not-allowed",
            "pointer",
            "progress",
            "row-resize",
            "s-resize",
            "se-resize",
            "sw-resize",
            "text",
            "URL",
            "vertical-text",
            "w-resize",
            "wait",
            "zoom-in",
            "zoom-out",
            "initial",
            "inherit"
        ]
    },
    "direction": {
        "moz": false,
        "webkit": false,
        "syntax": "(ltr)|(rtl)|(initial)|(inherit)",
        "initial": "ltr",
        "values": [
            "ltr",
            "rtl",
            "initial",
            "inherit"
        ]
    },
    "display": {
        "moz": false,
        "webkit": false,
        "syntax": "(inline)|(block)|(contents)|(flex)|(grid)|(inline-block)|(inline-flex)|(inline-grid)|(inline-table)|(list-item)|(run-in)|(table)|(table-caption)|(table-column-group)|(table-header-group)|(table-footer-group)|(table-row-group)|(table-cell)|(table-column)|(table-row)|(none)|(initial)|(inherit)",
        "initial": "",
        "values": [
            "inline",
            "block",
            "contents",
            "flex",
            "grid",
            "inline-block",
            "inline-flex",
            "inline-grid",
            "inline-table",
            "list-item",
            "run-in",
            "table",
            "table-caption",
            "table-column-group",
            "table-header-group",
            "table-footer-group",
            "table-row-group",
            "table-cell",
            "table-column",
            "table-row",
            "none",
            "initial",
            "inherit"
        ]
    },
    "empty-cells": {
        "moz": false,
        "webkit": false,
        "syntax": "(show)|(hide)|(initial)|(inherit)",
        "initial": "show",
        "values": [
            "show",
            "hide",
            "initial",
            "inherit"
        ]
    },
    "filter": {
        "moz": false,
        "webkit": true,
        "syntax": "(none)|([fn:blur])|([fn:brightness])|([fn:contrast])|([fn:drop-shadow])|([fn:grayscale])|([fn:hue-rotate])|([fn:invert])|([fn:opacity])|([fn:saturate])|([fn:sepia])|([fn:url])",
        "initial": "none",
        "values": [
            "none",
            "[fn:blur]",
            "[fn:brightness]",
            "[fn:contrast]",
            "[fn:drop-shadow]",
            "[fn:grayscale]",
            "[fn:hue-rotate]",
            "[fn:invert]",
            "[fn:opacity]",
            "[fn:saturate]",
            "[fn:sepia]",
            "[fn:url]",
            "initial",
            "inherit"
        ]
    },
    "flex": {
        "moz": true,
        "webkit": true,
        "syntax": "(([prop:flex-grow]) ([prop:flex-shrink]) ([prop:flex-basis]))|(auto)|(initial)|(inherit)",
        "initial": "0 1 auto",
        "values": [
            "[prop:flex-grow]",
            "[prop:flex-shrink]",
            "[prop:flex-basis]",
            "auto",
            "initial",
            "none",
            "inherit"
        ]
    },
    "flex-basis": {
        "moz": true,
        "webkit": true,
        "syntax": "([number])|(auto)|(initial)|(inherit)",
        "initial": "auto",
        "values": [
            "[number]",
            "auto",
            "initial",
            "inherit"
        ]
    },
    "flex-direction": {
        "moz": true,
        "webkit": true,
        "syntax": "(row)|(row-reverse)|(column)|(column-reverse)|(initial)|(inherit)",
        "initial": "row",
        "values": [
            "row",
            "row-reverse",
            "column",
            "column-reverse",
            "initial",
            "inherit"
        ]
    },
    "flex-flow": {
        "moz": true,
        "webkit": true,
        "syntax": "flex-direction (flex-wrap)|(initial)|(inherit)",
        "initial": "row nowrap",
        "values": [
            "flex-direction",
            "flex-wrap",
            "initial",
            "inherit"
        ]
    },
    "flex-grow": {
        "moz": true,
        "webkit": true,
        "syntax": "([number])|(initial)|(inherit)",
        "initial": "0",
        "values": [
            "[number]",
            "initial",
            "inherit"
        ]
    },
    "flex-shrink": {
        "moz": true,
        "webkit": true,
        "syntax": "([number])|(initial)|(inherit)",
        "initial": "1",
        "values": [
            "[number]",
            "initial",
            "inherit"
        ]
    },
    "flex-wrap": {
        "moz": true,
        "webkit": true,
        "syntax": "(nowrap)|(wrap)|(wrap-reverse)|(initial)|(inherit)",
        "initial": "nowrap",
        "values": [
            "nowrap",
            "wrap",
            "wrap-reverse",
            "initial",
            "inherit"
        ]
    },
    "float": {
        "moz": false,
        "webkit": false,
        "syntax": "(none)|(left)|(right)|(initial)|(inherit)",
        "initial": "none",
        "values": [
            "none",
            "left",
            "right",
            "initial",
            "inherit"
        ]
    },
    "font": {
        "moz": false,
        "webkit": false,
        "syntax": "font-style font-variant font-weight font-size/line-height (font-family)|(caption)|(icon)|(menu)|(message-box)|(small-caption)|(status-bar)|(initial)|(inherit)",
        "initial": "The default value of the font properties",
        "values": [
            "[prop:font-style]",
            "[prop:font-variant]",
            "[prop:font-weight]",
            "[prop:font-size/line-height]",
            "[prop:font-family]",
            "caption",
            "icon",
            "menu",
            "message-box",
            "small-caption",
            "status-bar",
            "initial",
            "inherit"
        ]
    },
    "font-family": {
        "moz": false,
        "webkit": false,
        "syntax": "([family-name])|([generic-family])|(initial)|(inherit)",
        "initial": "depends on the browser",
        "values": [
            "[family-name]",
            "[generic-family]",
            "initial",
            "inherit"
        ]
    },
    "font-kerning": {
        "moz": false,
        "webkit": true,
        "syntax": "(auto)|(normal)|(none)",
        "initial": "auto",
        "values": [
            "auto",
            "normal",
            "none"
        ]
    },
    "font-size": {
        "moz": false,
        "webkit": false,
        "syntax": "([length])|([percent])|(medium)|(xx-small)|(x-small)|(small)|(large)|(x-large)|(xx-large)|(smaller)|(larger)|([length])|(initial)|(inherit)",
        "initial": "medium",
        "values": [
            "medium",
            "xx-small",
            "x-small",
            "small",
            "large",
            "x-large",
            "xx-large",
            "smaller",
            "larger",
            "[length]",
            "[percent]",
            "initial",
            "inherit"
        ]
    },
    "font-size-adjust": {
        "moz": false,
        "webkit": false,
        "syntax": "([number])|(none)|(initial)|(inherit)",
        "initial": "none",
        "values": [
            "[number]",
            "none",
            "initial",
            "inherit"
        ]
    },
    "font-stretch": {
        "moz": false,
        "webkit": false,
        "syntax": "(ultra-condensed)|(extra-condensed)|(condensed)|(semi-condensed)|(normal)|(semi-expanded)|(expanded)|(extra-expanded)|(ultra-expanded)|(initial)|(inherit)",
        "initial": "normal",
        "values": [
            "ultra-condensed",
            "extra-condensed",
            "condensed",
            "semi-condensed",
            "normal",
            "semi-expanded",
            "expanded",
            "extra-expanded",
            "ultra-expanded",
            "initial",
            "inherit"
        ]
    },
    "font-style": {
        "moz": false,
        "webkit": false,
        "syntax": "(normal)|(italic)|(oblique)|(initial)|(inherit)",
        "initial": "normal",
        "values": [
            "normal",
            "italic",
            "oblique",
            "initial",
            "inherit"
        ]
    },
    "font-variant": {
        "moz": false,
        "webkit": false,
        "syntax": "(normal)|(small-caps)|(initial)|(inherit)",
        "initial": "normal",
        "values": [
            "normal",
            "small-caps",
            "initial",
            "inherit"
        ]
    },
    "font-weight": {
        "moz": false,
        "webkit": false,
        "syntax": "(normal)|(bold)|(bolder)|(lighter)|([number])|(initial)|(inherit)",
        "initial": "normal",
        "values": [
            "normal",
            "bold",
            "bolder",
            "lighter",
            "100",
            "200",
            "300",
            "400",
            "500",
            "600",
            "700",
            "800",
            "900",
            "initial",
            "inherit"
        ]
    },
    "grid": {
        "moz": false,
        "webkit": false,
        "syntax": "(none)|(grid-template-rows) / (grid-template-columns)|(grid-template-areas)|(grid-template-rows) / [grid-auto-flow] (grid-auto-columns)|[grid-auto-flow] grid-auto-rows / (grid-template-columns)|(initial)|(inherit)",
        "initial": "none none none auto auto row",
        "values": [
            "none",
            "grid-template rows / grid-template-columns",
            "grid-template-areas",
            "grid-template rows / grid-auto-columns",
            "grid-auto-rows / grid-template-columns",
            "grid-template rows / grid-auto-flow grid-auto-columns",
            "grid-auto flow grid-auto-rows / grid-template-columns",
            "initial",
            "inherit"
        ]
    },
    "grid-area": {
        "moz": false,
        "webkit": false,
        "syntax": "(([prop:grid-row-start]) / ([prop:grid-column-start]) / ([prop:grid-row-end]) / ([prop:grid-row-end]))|([label])",
        "initial": "auto / auto / auto / auto",
        "values": [
            "[prop:grid-row-start]",
            "[prop:grid-column-start]",
            "[prop:grid-row-end]",
            "[prop:grid-column-end]",
            "[label]"
        ]
    },
    "grid-auto-columns": {
        "moz": false,
        "webkit": false,
        "syntax": "(auto)|(max-content)|(min-content)|([length])|([percent])|([fn:fit-content])|([fn:minmax])",
        "initial": "auto",
        "values": [
            "auto",
            "[fn:fit-content]",
            "max-content",
            "min-content",
            "[fn:minmax]",
            "[length]",
            "[percent]"
        ]
    },
    "grid-auto-flow": {
        "moz": false,
        "webkit": false,
        "syntax": "(row)|(column)|(dense)|(row dense)|(column dense)",
        "initial": "row",
        "values": [
            "row",
            "column",
            "dense",
            "row dense",
            "column dense"
        ]
    },
    "grid-auto-rows": {
        "moz": false,
        "webkit": false,
        "syntax": "(auto)|(max-content)|(min-content)|([length])",
        "initial": "auto",
        "values": [
            "auto",
            "max-content",
            "min-content",
            "[length]"
        ]
    },
    "grid-column": {
        "moz": false,
        "webkit": false,
        "syntax": "grid-column-start / grid-column-end",
        "initial": "auto / auto",
        "values": [
            "[prop:grid-column-start]",
            "[prop:grid-column-end]"
        ]
    },
    "grid-column-end": {
        "moz": false,
        "webkit": false,
        "syntax": "(auto)|((span) ([number]))|(column-line)",
        "initial": "auto",
        "values": [
            "auto",
            "(span) ([number])",
            "column-line"
        ]
    },
    "grid-column-gap": {
        "moz": false,
        "webkit": false,
        "syntax": "[length]",
        "initial": "0",
        "values": [
            "[length]"
        ]
    },
    "grid-column-start": {
        "moz": false,
        "webkit": false,
        "syntax": "(auto)|((span) ([number]))|(column-line)",
        "initial": "auto",
        "values": [
            "auto",
            "(span) ([number])",
            "column-line"
        ]
    },
    "grid-gap": {
        "moz": false,
        "webkit": false,
        "syntax": "([prop:grid-row-gap]) ([prop:grid-column-gap])",
        "initial": "0 0",
        "values": [
            "[prop:grid-row-gap]",
            "[prop:grid-column-gap]"
        ]
    },
    "grid-row": {
        "moz": false,
        "webkit": false,
        "syntax": "([prop:grid-row-start]) / ([prop:grid-row-end])",
        "initial": "auto / auto",
        "values": [
            "[prop:grid-row-start]",
            "[prop:grid-row-end]"
        ]
    },
    "grid-row-end": {
        "moz": false,
        "webkit": false,
        "syntax": "(auto)|(row-line)|((span) ([number]))|(column-line)",
        "initial": "auto",
        "values": [
            "auto",
            "(span) ([number])",
            "column-line"
        ]
    },
    "grid-row-gap": {
        "moz": false,
        "webkit": false,
        "syntax": "[length]",
        "initial": "0",
        "values": [
            "[length]"
        ]
    },
    "grid-row-start": {
        "moz": false,
        "webkit": false,
        "syntax": "(auto)|(row-line)",
        "initial": "auto",
        "values": [
            "auto",
            "row-line"
        ]
    },
    "grid-template": {
        "moz": false,
        "webkit": false,
        "syntax": "(none)|(grid-template-rows) / (grid-template-columns)|(grid-template-areas)|(initial)|(inherit)",
        "initial": "none none none",
        "values": [
            "none",
            "grid-template rows / grid-template-columns",
            "grid-template-areas",
            "initial",
            "inherit"
        ]
    },
    "grid-template-areas": {
        "moz": false,
        "webkit": false,
        "syntax": "(none)|(itemnames)",
        "initial": "none",
        "values": [
            "none",
            "itemnames"
        ]
    },
    "grid-template-columns": {
        "moz": false,
        "webkit": false,
        "syntax": "(none)|(auto)|(max-content)|(min-content)|([length])|(initial)|(inherit)",
        "initial": "none",
        "values": [
            "none",
            "auto",
            "max-content",
            "min-content",
            "[length]",
            "initial",
            "inherit"
        ]
    },
    "grid-template-rows": {
        "moz": false,
        "webkit": false,
        "syntax": "(none)|(auto)|(max-content)|(min-content)|([length])|(initial)|(inherit)",
        "initial": "none",
        "values": [
            "none",
            "auto",
            "max-content",
            "min-content",
            "[length]"
        ]
    },
    "hanging-punctuation": {
        "moz": false,
        "webkit": false,
        "syntax": "(none)|(first)|(last)|(allow-end)|(force-end)|(initial)|(inherit)",
        "initial": "none",
        "values": [
            "none",
            "first",
            "last",
            "allow-end",
            "force-end",
            "initial",
            "inherit"
        ]
    },
    "height": {
        "moz": false,
        "webkit": false,
        "syntax": "(auto)|([length])|(initial)|(inherit)",
        "initial": "auto",
        "values": [
            "auto",
            "[length]",
            "[percent]",
            "initial",
            "inherit"
        ]
    },
    "hyphens": {
        "moz": false,
        "webkit": true,
        "syntax": "(none)|(manual)|(auto)|(initial)|(inherit)",
        "initial": "manual",
        "values": [
            "none",
            "manual",
            "auto",
            "initial",
            "inherit"
        ]
    },
    "isolation": {
        "moz": false,
        "webkit": false,
        "syntax": "(auto)|(isolate)|(initial)|(inherit)",
        "initial": "auto",
        "values": [
            "auto",
            "isolate",
            "initial",
            "inherit"
        ]
    },
    "justify-content": {
        "moz": true,
        "webkit": true,
        "syntax": "(flex-start)|(flex-end)|(center)|(space-between)|(space-around)|(initial)|(inherit)",
        "initial": "flex-start",
        "values": [
            "flex-start",
            "flex-end",
            "center",
            "space-between",
            "space-around",
            "initial",
            "inherit"
        ]
    },
    "left": {
        "moz": false,
        "webkit": false,
        "syntax": "(auto)|([length])|(initial)|(inherit)",
        "initial": "auto",
        "values": [
            "auto",
            "[length]",
            "[percent]",
            "initial",
            "inherit"
        ]
    },
    "letter-spacing": {
        "moz": false,
        "webkit": false,
        "syntax": "(normal)|([length])|(initial)|(inherit)",
        "initial": "normal",
        "values": [
            "normal",
            "[length]",
            "initial",
            "inherit"
        ]
    },
    "line-height": {
        "moz": false,
        "webkit": false,
        "syntax": "(normal)|([number])|([length])|(initial)|(inherit)",
        "initial": "normal",
        "values": [
            "normal",
            "[number]",
            "[length]",
            "[percent]",
            "initial",
            "inherit"
        ]
    },
    "list-style": {
        "moz": false,
        "webkit": false,
        "syntax": "(([prop:list-style-type]) ([prop:list-style-position]) ([prop:list-style-image]))|(initial)|(inherit)",
        "initial": "disc outside none",
        "values": [
            "[prop:list-style-type]",
            "[prop:list-style-position]",
            "[prop:list-style-image]",
            "initial",
            "inherit"
        ]
    },
    "list-style-image": {
        "moz": false,
        "webkit": false,
        "syntax": "(none)|(url)|(initial)|(inherit)",
        "initial": "none",
        "values": [
            "none",
            "url",
            "initial",
            "inherit"
        ]
    },
    "list-style-position": {
        "moz": false,
        "webkit": false,
        "syntax": "(inside)|(outside)|(initial)|(inherit)",
        "initial": "outside",
        "values": [
            "inside",
            "outside",
            "initial",
            "inherit"
        ]
    },
    "list-style-type": {
        "moz": false,
        "webkit": false,
        "syntax": "(disc)|(armenian)|(circle)|(cjk-ideographic)|(decimal)|(decimal-leading-zero)|(georgian)|(hebrew)|(hiragana)|(hiragana-iroha)|(katakana)|(katakana-iroha)|(lower-alpha)|(lower-greek)|(lower-latin)|(lower-roman)|(none)|(square)|(upper-alpha)|(upper-greek)|(upper-latin)|(upper-roman)|(initial)|(inherit)",
        "initial": "disc",
        "values": [
            "disc",
            "armenian",
            "circle",
            "cjk-ideographic",
            "decimal",
            "decimal-leading-zero",
            "georgian",
            "hebrew",
            "hiragana",
            "hiragana-iroha",
            "katakana",
            "katakana-iroha",
            "lower-alpha",
            "lower-greek",
            "lower-latin",
            "lower-roman",
            "none",
            "square",
            "upper-alpha",
            "upper-greek",
            "upper-latin",
            "upper-roman",
            "initial",
            "inherit"
        ]
    },
    "margin": {
        "moz": false,
        "webkit": false,
        "syntax": "(([length])|([percent])){1,4}|(auto)|(initial)|(inherit)",
        "initial": "0",
        "values": [
            "[length]",
            "[percent]",
            "auto",
            "initial",
            "inherit"
        ]
    },
    "margin-bottom": {
        "moz": false,
        "webkit": false,
        "syntax": "([length])|([percent])|(auto)|(initial)|(inherit)",
        "initial": "0",
        "values": [
            "[length]",
            "[percent]",
            "auto",
            "initial",
            "inherit"
        ]
    },
    "margin-left": {
        "moz": false,
        "webkit": false,
        "syntax": "([length])|([percent])|(auto)|(initial)|(inherit)",
        "initial": "0",
        "values": [
            "[length]",
            "[percent]",
            "auto",
            "initial",
            "inherit"
        ]
    },
    "margin-right": {
        "moz": false,
        "webkit": false,
        "syntax": "([length])|([percent])|(auto)|(initial)|(inherit)",
        "initial": "0",
        "values": [
            "[length]",
            "[percent]",
            "auto",
            "initial",
            "inherit"
        ]
    },
    "margin-top": {
        "moz": false,
        "webkit": false,
        "syntax": "([length])|(auto)|(initial)|(inherit)",
        "initial": "0",
        "values": [
            "[length]",
            "[percent]",
            "auto",
            "initial",
            "inherit"
        ]
    },
    "max-height": {
        "moz": false,
        "webkit": false,
        "syntax": "(none)|([length])|(initial)|(inherit)",
        "initial": "none",
        "values": [
            "none",
            "[length]",
            "[percent]",
            "initial",
            "inherit"
        ]
    },
    "max-width": {
        "moz": false,
        "webkit": false,
        "syntax": "(none)|([length])|(initial)|(inherit)",
        "initial": "none",
        "values": [
            "none",
            "[length]",
            "[percent]",
            "initial",
            "inherit"
        ]
    },
    "min-height": {
        "moz": false,
        "webkit": false,
        "syntax": "([length])|(initial)|(inherit)",
        "initial": "0",
        "values": [
            "[length]",
            "[percent]",
            "initial",
            "inherit"
        ]
    },
    "min-width": {
        "moz": false,
        "webkit": false,
        "syntax": "([length])|(initial)|(inherit)",
        "initial": "0",
        "values": [
            "[length]",
            "[percent]",
            "initial",
            "inherit"
        ]
    },
    "mix-blend-mode": {
        "moz": false,
        "webkit": false,
        "syntax": "(normal)|(multiply)|(screen)|(overlay)|(darken)|(lighten)|(color-dodge)|(color-burn)|(difference)|(exclusion)|(hue)|(saturation)|([color])|(luminosity)",
        "initial": "normal",
        "values": [
            "normal",
            "multiply",
            "screen",
            "overlay",
            "darken",
            "lighten",
            "color-dodge",
            "color-burn",
            "difference",
            "exclusion",
            "hue",
            "saturation",
            "[color]",
            "luminosity"
        ]
    },
    "object-fit": {
        "moz": false,
        "webkit": false,
        "syntax": "(fill)|(contain)|(cover)|(scale-down)|(none)|(initial)|(inherit)",
        "initial": "",
        "values": [
            "fill",
            "contain",
            "cover",
            "none",
            "scale-down",
            "initial",
            "inherit"
        ]
    },
    "object-position": {
        "moz": false,
        "webkit": false,
        "syntax": "(position)|(initial)|(inherit)",
        "initial": "50% 50%",
        "values": [
            "position",
            "initial",
            "inherit"
        ]
    },
    "opacity": {
        "moz": false,
        "webkit": false,
        "syntax": "([number])|(initial)|(inherit)",
        "initial": "1",
        "values": [
            "[number]",
            "initial",
            "inherit"
        ]
    },
    "order": {
        "moz": true,
        "webkit": true,
        "syntax": "([number])|(initial)|(inherit)",
        "initial": "0",
        "values": [
            "[number]",
            "initial",
            "inherit"
        ]
    },
    "outline": {
        "moz": false,
        "webkit": false,
        "syntax": "(([prop:outline-width]) ([prop:outline-style]) ([prop:outline-color]))|(initial)|(inherit)",
        "initial": "medium invert color",
        "values": [
            "[prop:outline-width]",
            "[prop:outline-style]",
            "[prop:outline-color]",
            "initial",
            "inherit"
        ]
    },
    "outline-color": {
        "moz": false,
        "webkit": false,
        "syntax": "(invert)|([color])|(initial)|(inherit)",
        "initial": "invert",
        "values": [
            "invert",
            "[color]",
            "initial",
            "inherit"
        ]
    },
    "outline-offset": {
        "moz": false,
        "webkit": false,
        "syntax": "([length])|(initial)|(inherit)",
        "initial": "0",
        "values": [
            "[length]",
            "initial",
            "inherit"
        ]
    },
    "outline-style": {
        "moz": false,
        "webkit": false,
        "syntax": "(none)|(hidden)|(dotted)|(dashed)|(solid)|(double)|(groove)|(ridge)|(inset)|(outset)|(initial)|(inherit)",
        "initial": "none",
        "values": [
            "none",
            "hidden",
            "dotted",
            "dashed",
            "solid",
            "double",
            "groove",
            "ridge",
            "inset",
            "outset",
            "initial",
            "inherit"
        ]
    },
    "outline-width": {
        "moz": false,
        "webkit": false,
        "syntax": "(medium)|(thin)|(thick)|([length])|(initial)|(inherit)",
        "initial": "medium",
        "values": [
            "medium",
            "thin",
            "thick",
            "[length]",
            "initial",
            "inherit"
        ]
    },
    "overflow": {
        "moz": false,
        "webkit": false,
        "syntax": "(visible)|(hidden)|(scroll)|(auto)|(initial)|(inherit)",
        "initial": "visible",
        "values": [
            "visible",
            "hidden",
            "scroll",
            "auto",
            "initial",
            "inherit"
        ]
    },
    "overflow-x": {
        "moz": false,
        "webkit": false,
        "syntax": "(visible)|(hidden)|(scroll)|(auto)|(initial)|(inherit)",
        "initial": "visible",
        "values": [
            "visible",
            "hidden",
            "scroll",
            "auto",
            "initial",
            "inherit"
        ]
    },
    "overflow-y": {
        "moz": false,
        "webkit": false,
        "syntax": "(visible)|(hidden)|(scroll)|(auto)|(initial)|(inherit)",
        "initial": "visible",
        "values": [
            "visible",
            "hidden",
            "scroll",
            "auto",
            "initial",
            "inherit"
        ]
    },
    "padding": {
        "moz": false,
        "webkit": false,
        "syntax": "(([length])|([percent])){1,4}|(initial)|(inherit)",
        "initial": "0",
        "values": [
            "[length]",
            "[percent]",
            "initial",
            "inherit"
        ]
    },
    "padding-bottom": {
        "moz": false,
        "webkit": false,
        "syntax": "([length])|([percent])|(initial)|(inherit)",
        "initial": "0",
        "values": [
            "[length]",
            "[percent]",
            "initial",
            "inherit"
        ]
    },
    "padding-left": {
        "moz": false,
        "webkit": false,
        "syntax": "([length])|(initial)|(inherit)",
        "initial": "0",
        "values": [
            "[length]",
            "[percent]",
            "initial",
            "inherit"
        ]
    },
    "padding-right": {
        "moz": false,
        "webkit": false,
        "syntax": "([length])|([percent])|(initial)|(inherit)",
        "initial": "0",
        "values": [
            "[length]",
            "[percent]",
            "initial",
            "inherit"
        ]
    },
    "padding-top": {
        "moz": false,
        "webkit": false,
        "syntax": "([length])|([percent])|(initial)|(inherit)",
        "initial": "0",
        "values": [
            "[length]",
            "[percent]",
            "initial",
            "inherit"
        ]
    },
    "page-break-after": {
        "moz": false,
        "webkit": false,
        "syntax": "(auto)|(always)|(avoid)|(left)|(right)|(initial)|(inherit)",
        "initial": "auto",
        "values": [
            "auto",
            "always",
            "avoid",
            "left",
            "right",
            "initial",
            "inherit"
        ]
    },
    "page-break-before": {
        "moz": false,
        "webkit": false,
        "syntax": "(auto)|(always)|(avoid)|(left)|(right)|(initial)|(inherit)",
        "initial": "auto",
        "values": [
            "auto",
            "always",
            "avoid",
            "left",
            "right",
            "initial",
            "inherit"
        ]
    },
    "page-break-inside": {
        "moz": false,
        "webkit": false,
        "syntax": "(auto)|(avoid)|(initial)|(inherit)",
        "initial": "auto",
        "values": [
            "auto",
            "avoid",
            "initial",
            "inherit"
        ]
    },
    "perspective": {
        "moz": true,
        "webkit": true,
        "syntax": "([length])|(none)",
        "initial": "none",
        "values": [
            "[length]",
            "none",
            "initial",
            "inherit"
        ]
    },
    "perspective-origin": {
        "moz": true,
        "webkit": true,
        "syntax": "x-axis (y-axis)|(initial)|(inherit)",
        "initial": "50% 50%",
        "values": [
            "x-axis",
            "y-axis",
            "initial",
            "inherit"
        ]
    },
    "pointer-events": {
        "moz": false,
        "webkit": false,
        "syntax": "(auto)|(none)",
        "initial": "auto",
        "values": [
            "auto",
            "none",
            "initial",
            "inherit"
        ]
    },
    "position": {
        "moz": false,
        "webkit": false,
        "syntax": "(static)|(absolute)|(fixed)|(relative)|(sticky)|(initial)|(inherit)",
        "initial": "static",
        "values": [
            "static",
            "absolute",
            "fixed",
            "relative",
            "sticky",
            "initial",
            "inherit"
        ]
    },
    "quotes": {
        "moz": false,
        "webkit": false,
        "syntax": "(none)|(string)|(initial)|(inherit)",
        "initial": "not specified",
        "values": [
            "none",
            "string string string string",
            "initial",
            "inherit",
            "\"",
            "'",
            "‹",
            "›",
            "«",
            "»",
            "‘",
            "’",
            "“",
            "”",
            "„"
        ]
    },
    "resize": {
        "moz": true,
        "webkit": false,
        "syntax": "(none)|(both)|(horizontal)|(vertical)|(initial)|(inherit)",
        "initial": "none",
        "values": [
            "none",
            "both",
            "horizontal",
            "vertical",
            "initial",
            "inherit"
        ]
    },
    "right": {
        "moz": false,
        "webkit": false,
        "syntax": "(auto)|([length])|(initial)|(inherit)",
        "initial": "auto",
        "values": [
            "auto",
            "[length]",
            "[percent]",
            "initial",
            "inherit"
        ]
    },
    "scroll-behavior": {
        "moz": false,
        "webkit": false,
        "syntax": "(auto)|(smooth)|(initial)|(inherit)",
        "initial": "auto",
        "values": [
            "auto",
            "smooth",
            "initial",
            "inherit"
        ]
    },
    "tab-size": {
        "moz": true,
        "webkit": false,
        "syntax": "([number])|([length])|(initial)|(inherit)",
        "initial": "8",
        "values": [
            "[number]",
            "[length]",
            "initial",
            "inherit"
        ]
    },
    "table-layout": {
        "moz": false,
        "webkit": false,
        "syntax": "(auto)|(fixed)|(initial)|(inherit)",
        "initial": "auto",
        "values": [
            "auto",
            "fixed",
            "initial",
            "inherit"
        ]
    },
    "text-align": {
        "moz": false,
        "webkit": false,
        "syntax": "(left)|(right)|(center)|(justify)|(initial)|(inherit)",
        "initial": "left if direction is ltr, and right if direction is rtl",
        "values": [
            "left",
            "right",
            "center",
            "justify",
            "initial",
            "inherit"
        ]
    },
    "text-align-last": {
        "moz": true,
        "webkit": false,
        "syntax": "(auto)|(left)|(right)|(center)|(justify)|(start)|(end)|(initial)|(inherit)",
        "initial": "auto",
        "values": [
            "auto",
            "left",
            "right",
            "center",
            "justify",
            "start",
            "end",
            "initial",
            "inherit"
        ]
    },
    "text-decoration": {
        "moz": false,
        "webkit": false,
        "syntax": "(([prop:text-decoration-line]) ([prop:text-decoration-color]) ([prop:text-decoration-style]))|(initial)|(inherit)",
        "initial": "none currentcolor solid",
        "values": [
            "[prop:text-decoration-line]",
            "[prop:text-decoration-color]",
            "[prop:text-decoration-style]",
            "initial",
            "inherit"
        ]
    },
    "text-decoration-color": {
        "moz": true,
        "webkit": true,
        "syntax": "([color])|(initial)|(inherit)",
        "initial": "currentColor",
        "values": [
            "[color]",
            "initial",
            "inherit"
        ]
    },
    "text-decoration-line": {
        "moz": true,
        "webkit": true,
        "syntax": "(none)|(underline)|(overline)|(line-through)|(initial)|(inherit)",
        "initial": "none",
        "values": [
            "none",
            "underline",
            "overline",
            "line-through",
            "initial",
            "inherit"
        ]
    },
    "text-decoration-style": {
        "moz": true,
        "webkit": false,
        "syntax": "(solid)|(double)|(dotted)|(dashed)|(wavy)|(initial)|(inherit)",
        "initial": "solid",
        "values": [
            "solid",
            "double",
            "dotted",
            "dashed",
            "wavy",
            "initial",
            "inherit"
        ]
    },
    "text-indent": {
        "moz": false,
        "webkit": false,
        "syntax": "([length])|(initial)|(inherit)",
        "initial": "0",
        "values": [
            "[length]",
            "[percent]",
            "initial",
            "inherit"
        ]
    },
    "text-justify": {
        "moz": false,
        "webkit": false,
        "syntax": "(auto)|(inter-word)|(inter-character)|(none)|(initial)|(inherit)",
        "initial": "auto",
        "values": [
            "auto",
            "inter-word",
            "inter-character",
            "none",
            "initial",
            "inherit"
        ]
    },
    "text-overflow": {
        "moz": false,
        "webkit": false,
        "syntax": "(clip)|(ellipsis)|(string)|(initial)|(inherit)",
        "initial": "clip",
        "values": [
            "clip",
            "ellipsis",
            "string",
            "initial",
            "inherit"
        ]
    },
    "text-shadow": {
        "moz": false,
        "webkit": false,
        "syntax": "h-shadow v-shadow blur-radius ([color])|(none)|(initial)|(inherit)",
        "initial": "none",
        "values": [
            "h-shadow",
            "v-shadow",
            "blur-radius",
            "[color]",
            "none",
            "initial",
            "inherit"
        ]
    },
    "text-transform": {
        "moz": false,
        "webkit": false,
        "syntax": "(none)|(capitalize)|(uppercase)|(lowercase)|(initial)|(inherit)",
        "initial": "none",
        "values": [
            "none",
            "capitalize",
            "uppercase",
            "lowercase",
            "initial",
            "inherit"
        ]
    },
    "top": {
        "moz": false,
        "webkit": false,
        "syntax": "(auto)|([length])|(initial)|(inherit)",
        "initial": "auto",
        "values": [
            "auto",
            "[length]",
            "[percent]",
            "initial",
            "inherit"
        ]
    },
    "transform(2D)": {
        "moz": true,
        "webkit": true,
        "syntax": "(none)|([fn:matrix])|([fn:matrix3d])|([fn:translate])|([fn:translate3d])|([fn:translateX])|([fn:translateY])|([fn:translateZ])|([fn:scale])|([fn:scale3d])|([fn:scaleX])|([fn:scaleY])|([fn:scaleZ])|([fn:rotate])|([fn:rotate3d])|([fn:rotateX])|([fn:rotateY])|([fn:rotateZ])|([fn:skew])|([fn:skewX])|([fn:skewY])|([fn:perspective])|(initial)|(inherit)",
        "initial": "none",
        "values": [
            "none",
            "[fn:matrix]",
            "[fn:matrix3d]",
            "[fn:translate]",
            "[fn:translate3d]",
            "[fn:translateX]",
            "[fn:translateY]",
            "[fn:translateZ]",
            "[fn:scale]",
            "[fn:scale3d]",
            "[fn:scaleX]",
            "[fn:scaleY]",
            "[fn:scaleZ]",
            "[fn:rotate]",
            "[fn:rotate3d]",
            "[fn:rotateX]",
            "[fn:rotateY]",
            "[fn:rotateZ]",
            "[fn:skew]",
            "[fn:skewX]",
            "[fn:skewY]",
            "[fn:perspective]",
            "initial",
            "inherit"
        ]
    },
    "transform-origin(two-value syntax)": {
        "moz": true,
        "webkit": true,
        "syntax": "x-axis y-axis (z-axis)|(initial)|(inherit)",
        "initial": "50% 50% 0",
        "values": [
            "x-axis",
            "y-axis",
            "z-axis",
            "initial",
            "inherit"
        ]
    },
    "transform-style": {
        "moz": true,
        "webkit": true,
        "syntax": "(flat)|(preserve-3d)|(initial)|(inherit)",
        "initial": "flat",
        "values": [
            "flat",
            "preserve-3d",
            "initial",
            "inherit"
        ]
    },
    "transition": {
        "moz": true,
        "webkit": true,
        "syntax": "(([prop:transition-property]) ([prop:transition-duration]) ([prop:transition-timing-function]) ([prop:transition-delay]))|(initial)|(inherit)",
        "initial": "all 0s ease 0s",
        "values": [
            "[prop:transition-property]",
            "[prop:transition-duration]",
            "[prop:transition-timing-function]",
            "[prop:transition-delay]",
            "initial",
            "inherit"
        ]
    },
    "transition-delay": {
        "moz": true,
        "webkit": true,
        "syntax": "([time])|(initial)|(inherit)",
        "initial": "0s",
        "values": [
            "[time]",
            "initial",
            "inherit"
        ]
    },
    "transition-duration": {
        "moz": true,
        "webkit": true,
        "syntax": "([time])|(initial)|(inherit)",
        "initial": "0s",
        "values": [
            "[time]",
            "initial",
            "inherit"
        ]
    },
    "transition-property": {
        "moz": true,
        "webkit": true,
        "syntax": "(none)|(all)|(property)|(initial)|(inherit)",
        "initial": "all",
        "values": [
            "none",
            "all",
            "property",
            "initial",
            "inherit"
        ]
    },
    "transition-timing-function": {
        "moz": true,
        "webkit": true,
        "syntax": "(linear)|(ease)|(ease-in)|(ease-out)|(ease-in-out)|(step-start)|(step-end)|([fn:steps])|([fn:cubic-bezier])|(initial)|(inherit)",
        "initial": "ease",
        "values": [
            "ease",
            "linear",
            "ease-in",
            "ease-out",
            "ease-in-out",
            "step-start",
            "step-end",
            "[fn:steps]",
            "[fn:cubic-bezier]",
            "initial",
            "inherit"
        ]
    },
    "unicode-bidi": {
        "moz": false,
        "webkit": false,
        "syntax": "(normal)|(embed)|(bidi-override)|(isolate)|(isolate-override)|(plaintext)|(initial)|(inherit)",
        "initial": "normal",
        "values": [
            "normal",
            "embed",
            "bidi-override",
            "isolate",
            "isolate-override",
            "plaintext",
            "initial",
            "inherit"
        ]
    },
    "user-select": {
        "moz": true,
        "webkit": true,
        "syntax": "(auto)|(none)|(text)|(all)",
        "initial": "auto",
        "values": [
            "auto",
            "none",
            "text",
            "all"
        ]
    },
    "vertical-align": {
        "moz": false,
        "webkit": false,
        "syntax": "(baseline)|([length])|(sub)|(super)|(top)|(text-top)|(middle)|(bottom)|(text-bottom)|(initial)|(inherit)",
        "initial": "baseline",
        "values": [
            "baseline",
            "[length]",
            "[percent]",
            "sub",
            "super",
            "top",
            "text-top",
            "middle",
            "bottom",
            "text-bottom",
            "initial",
            "inherit"
        ]
    },
    "visibility": {
        "moz": false,
        "webkit": false,
        "syntax": "(visible)|(hidden)|(collapse)|(initial)|(inherit)",
        "initial": "visible",
        "values": [
            "visible",
            "hidden",
            "collapse",
            "initial",
            "inherit"
        ]
    },
    "white-space": {
        "moz": false,
        "webkit": false,
        "syntax": "(normal)|(nowrap)|(pre)|(pre-line)|(pre-wrap)|(initial)|(inherit)",
        "initial": "normal",
        "values": [
            "normal",
            "nowrap",
            "pre",
            "pre-line",
            "pre-wrap",
            "initial",
            "inherit"
        ]
    },
    "width": {
        "moz": false,
        "webkit": false,
        "syntax": "(auto)|([length])|([percent])|(initial)|(inherit)",
        "initial": "auto",
        "values": [
            "auto",
            "[length]",
            "[percent]",
            "initial",
            "inherit"
        ]
    },
    "word-break": {
        "moz": false,
        "webkit": false,
        "syntax": "(normal)|(break-all)|(keep-all)|(break-word)|(initial)|(inherit)",
        "initial": "normal",
        "values": [
            "normal",
            "break-all",
            "keep-all ",
            "break-word",
            "initial",
            "inherit"
        ]
    },
    "word-spacing": {
        "moz": false,
        "webkit": false,
        "syntax": "(normal)|([length])|(initial)|(inherit)",
        "initial": "normal",
        "values": [
            "normal",
            "[length]",
            "initial",
            "inherit"
        ]
    },
    "word-wrap": {
        "moz": false,
        "webkit": false,
        "syntax": "(normal)|(break-word)|(initial)|(inherit)",
        "initial": "normal",
        "values": [
            "normal",
            "break-word",
            "initial",
            "inherit"
        ]
    },
    "writing-mode": {
        "moz": false,
        "webkit": false,
        "syntax": "(horizontal-tb)|(vertical-rl)|(vertical-lr)",
        "initial": "horizontal-tb",
        "values": [
            "horizontal-tb",
            "vertical-rl",
            "vertical-lr"
        ]
    },
    "z-index": {
        "moz": false,
        "webkit": false,
        "syntax": "(auto)|([number])|(initial)|(inherit)",
        "initial": "auto",
        "values": [
            "auto",
            "[number]",
            "initial",
            "inherit"
        ]
    }
}

export {cssPropertyList};
