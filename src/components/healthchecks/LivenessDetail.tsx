import React from "react";
import { Check, ExecutionHistory } from "./models";
import { Status } from "./Status";
import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import moment from "moment";

interface LivenessDetailsProps {
  healthcheck: Check;
  executionHistory: Array<ExecutionHistory>;
}

export const LivenessDetail: React.SFC<LivenessDetailsProps> = props => (
  <section className="hc-liveness-detail">
    <header>
      <h2>{props.healthcheck.name}</h2>
      <Status status={props.healthcheck.status} />
    </header>
    <div className="hc-liveness-detail__body">
      {props.executionHistory.length > 0 && (
        <VerticalTimeline className="hc-timeline">
          {" "}
          {props.executionHistory.reverse().map(e => {
            return (
              <VerticalTimelineElement
                className="hc-timeline__event"
                date={moment(e.on)
                  .format("LLL")
                  .toString()}
              >
                <p>
                  <Status status={e.status} />
                  <span title={e.description}>
                    {e.description && e.description.length > 100
                      ? `${e.description.substring(0, 100)}...`
                      : e.description}
                  </span>
                </p>
              </VerticalTimelineElement>
            );
          })}
        </VerticalTimeline>
      )}
    </div>
  </section>
);
