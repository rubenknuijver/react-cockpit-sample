import React from "react";

interface IDetailPanelProps {
  children: React.ReactNode;
  onClosePanel: any;
}

export const LivenessPanel: React.FC<IDetailPanelProps> = ({
  children,
  onClosePanel
}) => (
  <aside className="hc-liveness-panel">
    <button className="hc-action-btn" onClick={() => onClosePanel()}>
      <i className="material-icons">close</i>
    </button>
    {children}
  </aside>
);
