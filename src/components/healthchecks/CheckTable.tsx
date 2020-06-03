import React, { useState } from "react";
import { ExecutionHistory, Check } from "./models";
import { LivenessPanel } from "./LivenessPanel";
import { LivenessDetail } from "./LivenessDetail";
import { Status } from "./Status";

interface CheckTableProps {
  checks: Array<Check>;
  history: Array<ExecutionHistory>;
}

interface CheckTableState {
  isOpenPanel: boolean;
  selectedHistory?: Array<ExecutionHistory>;
  selectedHealthcheck?: Check;
}

export const CheckTable: React.FC<CheckTableProps> = props => {
  const [state, setState] = useState<CheckTableState>({
    isOpenPanel: false,
    selectedHistory: null,
    selectedHealthcheck: null
  });

  const renderTable = () =>
    !Array.isArray(props.checks) ? (
      <tr>
        <td colSpan={5}>{props.checks}</td>
      </tr>
    ) : (
      props.checks.map((item, index) => {
        return (
          <tr key={index}>
            <td>{item.name}</td>
            <td>
              <Status status={item.status} />
            </td>
            <td>{item.description}</td>
            <td className="align-center">{item.duration.toString()}</td>
            <td>
              <button
                className="hc-action-btn"
                onClick={() =>
                  openPanel(
                    item,
                    props.history.filter(h => h.name == item.name)
                  )
                }
              >
                <i className="material-icons">history</i>
              </button>
            </td>
          </tr>
        );
      })
    );

  const closePanel = () => {
    setState({
      isOpenPanel: false,
      selectedHealthcheck: null,
      selectedHistory: null
    });
  };

  const openPanel = (healthCheck: Check, history: Array<ExecutionHistory>) => {
    setState({
      isOpenPanel: true,
      selectedHistory: history,
      selectedHealthcheck: healthCheck
    });
  };

  const renderPanel = state.selectedHealthcheck != null && state.isOpenPanel;
  return (
    <>
      <table className="hc-checks-table">
        <thead className="hc-checks-table__header">
          <tr>
            <th>Name</th>
            <th>Health</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody className="hc-checks-table__body">{renderTable()}</tbody>
      </table>
      {renderPanel && (
        <LivenessPanel onClosePanel={closePanel}>
          <LivenessDetail
            healthcheck={state.selectedHealthcheck!}
            executionHistory={state.selectedHistory!}
          />
        </LivenessPanel>
      )}
    </>
  );
};
