import React, { Component } from 'react';

import './Sidebar.css';

type SidebarProps = {
}

type SidebarState = {
}

class Sidebar extends Component<SidebarProps, SidebarState> {
  render() {
    return (
      <div className="Sidebar">
        This is a test sidebar.
      </div>
    );
  }
}

export default Sidebar;
