import StylesSection from "./StylesSection.jsx";

function Sidebar() {
  return (
    <div className="sidebar"
    style={{width: '250px', borderRight: '5px solid purple', padding: '20px'}}>
      {/* placeholder for our sidebar */}
      <p>Styles Editor</p>
      <StylesSection/>
    </div>
  );
}

export default Sidebar;
