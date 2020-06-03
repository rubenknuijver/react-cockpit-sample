import React from "react";
import { Liveness } from "./models";
import { getStatusConfig, discoveryServices } from "./ResourceConfiguration";
import { CheckTable } from "./CheckTable";
import {
  Button,
  IconButton,
  Icon,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";

interface LivenessTableProps {
  livenessData: Array<Liveness>;
  collapseAll: (event: any) => void;
  expandAll: (event: any) => void;
}

const LivenessTable: React.SFC<LivenessTableProps> = props => {
  // const [state, setState] = useState({
  //   livenessData: props.livenessData
  // });

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  const toggleAll = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const { currentTarget } = event;
    const iconToggle = currentTarget.getElementsByClassName("js-toggle-all")[0];
    const innerValue = iconToggle.innerHTML;

    if (innerValue === "add_circle_outline") {
      iconToggle.innerHTML = "remove_circle_outline";
      currentTarget.setAttribute("title", "close all");
      return props.expandAll(event);
    } else {
      iconToggle.innerHTML = "add_circle_outline";
      currentTarget.setAttribute("title", "expand all");
      return props.collapseAll(event);
    }
  };

  const toggleVisibility = ({
    currentTarget
  }: React.MouseEvent<HTMLTableRowElement, MouseEvent>): void => {
    const checksTable = currentTarget.nextSibling as HTMLElement;
    const isHidden = checksTable.classList.contains("is-hidden");
    isHidden
      ? checksTable.classList.remove("is-hidden")
      : checksTable.classList.add("is-hidden");

    const iconImage = currentTarget.getElementsByClassName(
      "js-toggle-event"
    )[0];
    iconImage.innerHTML = isHidden ? "remove" : "add";
    iconImage.setAttribute("title", isHidden ? "hide info" : "expand info");
  };

  const mapTable = (livenessData: Array<Liveness>): Array<Liveness> => {
    return livenessData.map(liveness => {
      if (liveness.livenessResult) {
        let checks;
        try {
          //Check whether liveness result is an string formatted Array or a simple string
          checks = JSON.parse(liveness.livenessResult).checks;
          Object.assign(liveness, { checks });
        } catch (err) {
          Object.assign(liveness, { checks: liveness.livenessResult });
        }
      }
      return liveness;
    });
  };

  const getDiscoveryServiceImage = (discoveryService: string) => {
    if (discoveryService != null) {
      let discoveryServiceImage = discoveryServices.find(
        ds => ds.name === discoveryService
      )!.image;
      return (
        <img
          alt="Kubernetes discovered liveness"
          className="discovery-icon"
          src={discoveryServiceImage}
          title="Kubernetes discovered liveness"
        />
      );
    }

    return null;
  };

  const rows: any[] = [];
  const Row = (props: any) => {
    return <></>;
  };

  return (
    <>
      <TableContainer>
        <Table aria-label="colapsible table" className="hc-table">
          <TableHead className="hc-table__head">
            <TableRow>
              <TableCell>
                <IconButton title="expand all" onClick={toggleAll}>
                  <i className="material-icons js-toggle-all">
                    add_circle_outline
                  </i>
                </IconButton>
              </TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Health</TableCell>
              <TableCell align="right">On state from</TableCell>
              <TableCell align="right">Last execution</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <table className="hc-table">
        <thead className="hc-table__head">
          <tr>
            <th>
              <IconButton title="expand all" onClick={toggleAll}>
                <i className="material-icons js-toggle-all">
                  add_circle_outline
                </i>
              </IconButton>
            </th>
            <th>Name</th>
            <th>Health</th>
            <th>On state from</th>
            <th>Last execution</th>
          </tr>
        </thead>
        <tbody className="hc-table__body">
          {mapTable(props.livenessData).map((item, index) => {
            const statusConfig = getStatusConfig(item.status);
            return (
              <React.Fragment key={index}>
                <tr className="hc-table__row" onClick={toggleVisibility}>
                  <td className="align-center">
                    <i
                      className="material-icons js-toggle-event"
                      title="expand info"
                    >
                      add
                    </i>
                  </td>
                  <td>
                    {getDiscoveryServiceImage(item.discoveryService)}
                    {item.name}
                  </td>
                  <td className="align-center">
                    <i
                      className="material-icons"
                      style={{
                        paddingRight: "0.5rem",
                        color: `var(${statusConfig!.color})`
                      }}
                    >
                      {statusConfig!.image}
                    </i>
                  </td>
                  <td>{item.onStateFrom}</td>
                  <td className="align-center">
                    {formatDate(item.lastExecuted)}
                  </td>
                </tr>
                <tr className="hc-checks-table-container is-hidden">
                  <td colSpan={5}>
                    <CheckTable checks={item.entries} history={item.history} />
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export { LivenessTable };
