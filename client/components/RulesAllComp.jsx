import React from 'react';
import RulesUserAgentComp from "./RulesUserAgentComp.jsx";
import RulesRegularComp from "./RulesRegularComp.jsx";
import RulesInlineComp from "./RulesInlineComp.jsx";

function RulesAllComp() {

    return (
        <div>
            <RulesInlineComp />
            <RulesRegularComp />
            <RulesUserAgentComp />
        </div>
    )
};

export default RulesAllComp;
