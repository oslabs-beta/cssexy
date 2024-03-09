import InlineAndRegularStylesComp from "./InlineAndRegularStylesComp.jsx";
import UserAgentStylesComp from "./UserAgentStylesComp.jsx";

function SidebarComp() {
  return (
    <div className="sidebar">
      <h3>Styles Editor</h3>
      <InlineAndRegularStylesComp/>
      <UserAgentStylesComp />
    </div>
  );
}

export default SidebarComp;
