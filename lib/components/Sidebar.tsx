import React, { Component } from 'react';

type SidebarProps = {
}

type SidebarState = {
}

const styles = {
  fontSize: "48px"
}

class Sidebar extends Component<SidebarProps, SidebarState> {
  render() {
    return (
      <div className="Sidebar" style={styles}>
        This is a test sidebar.
      </div>
    );
  }
}

export default Sidebar;
