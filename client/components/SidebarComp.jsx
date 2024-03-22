import InlineAndRegularStylesComp from "./InlineAndRegularStylesComp.jsx";
import UserAgentStylesComp from "./UserAgentStylesComp.jsx";
import { findActiveStyles, updateShortLongMaps, setIsActiveFlag } from "../slices/stylesSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function SidebarComp() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateShortLongMaps());
    dispatch(setIsActiveFlag());
    dispatch(findActiveStyles());
  }, []);

  // const longToShortMap = useSelector(state => state.styles.longToShortMap);
  // useEffect(() => console.log('LONG TO SHORT MAP:   ', longToShortMap));

  // const regularStyles = useSelector(state => state.styles.userAgentStyles);
  // useEffect(() => console.log('REGULAR STYLES WITH IS ACTIVE UPDATED:   ', regularStyles));

  // const isActiveCache = useSelector(state => state.styles.isActiveCache);
  // useEffect(() => console.log('IS ACTIVE CACHE:   ', isActiveCache));

  return (
    <div className="sidebar">
      <h3>Styles Editor</h3>
      <InlineAndRegularStylesComp/>
      <UserAgentStylesComp />
    </div>
  );
}

export default SidebarComp;
