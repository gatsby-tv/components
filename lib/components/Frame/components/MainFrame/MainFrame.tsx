import React from "react";

export interface MainFrameProps {
  children?: React.ReactNode;
}

export const MainFrame: React.FC<MainFrameProps> = (props) => (
  <>{props.children}</>
);
