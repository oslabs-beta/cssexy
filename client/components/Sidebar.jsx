function Sidebar() {
  return (
    <div className="sidebar">
      {/* placeholder for our sidebar */}
      <p>Styles Editor</p>
      <iframe
        src="/api/proxy"
        width="100%"
        height="100%"
        title="User Site"
        className="site-frame"
      ></iframe>
    </div>
  );
}

export default Sidebar;
