import InlineAndRegularStylesComp from "./InlineAndRegularStylesComp.jsx";
import UserAgentStylesComp from "./UserAgentStylesComp.jsx";
import { findActiveStyles } from "../slices/stylesSlice.js";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function SidebarComp() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findActiveStyles())
  }, []);

  return (
    <div className="sidebar">
      <h3>Styles Editor</h3>
      <InlineAndRegularStylesComp/>
      <UserAgentStylesComp />
    </div>
  );
}

export default SidebarComp;
