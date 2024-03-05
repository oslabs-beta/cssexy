import StylesSection from "./StylesSection.jsx";
import MatchedStyles from "./MatchedStyles.jsx";

function Sidebar() {
  return (
    <div className="sidebar">
      <h3>Styles Editor</h3>
      <StylesSection/>
      <MatchedStyles/>
    </div>
  );
}

export default Sidebar;
